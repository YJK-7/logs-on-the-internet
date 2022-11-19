import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';

import '../style/MonthView.css';

const MonthView = ({ events, date, setDate, updateColor }) => {
  const [calendarType] = useState("US"); 
  const [locale] = useState("en"); //set default lanuage to english
  const dayRef = useRef(null);
  const [cal, setCal] = useState(undefined);

  const dayView  = async (selectedDate) => {
    await setDate(selectedDate); // highlihgt selcted day in month
    sessionStorage.setItem("clickDay",selectedDate); //prevent date reset on refresh
    dayRef.current.click();
  }
  
  // create tile content 
  const tileContent = (date) => {
    //function runs for every day seen in current month view
    //date is a object returning 
    // { 
    //   activeStartDate: Tue Nov 01 2022 00:00:00 GMT+0900 (Japan Standard Time), 
    //   date: Sun Oct 30 2022 00:00:00 GMT+0900 (Japan Standard Time), 
    //   view: 'month'
    // }
    // activeStartDate & date are date objects
    
    const dayOfMonth = date.date;
    let dayContent = [];

    if(events && updateColor) {
      // console.log("🌟",events,updateColor);
      events.forEach((event) => {
        if(dayOfMonth.toDateString() === event.date) {
          let loadColor;
          if(updateColor.length !== 0){
            // console.log(updateColor);
            loadColor = updateColor.find((el) => {
              // console.log("💙",el);
              return event.event_type_id === el.id
            })
          } else if (updateColor.length === 0){
            return
          }
          // console.log(loadColor);
          //loadColor is object
          dayContent.push(
            <span 
              className={event["event_type"]} 
              key={event.id}
              style={{background:loadColor.hex_code}}
            >
              {event["event_content"]}
            </span>
          )
        }
      })
    }
    return dayContent;
  }

  useEffect(()=> {
    setCal(
      <Calendar
      onClickDay={dayView}  
      onChange={setDate} 
      value={date} //selected day
      calendarType={calendarType} 
      locale={locale}
      tileContent={tileContent}
      minDetail={"decade"}
    />
    )
  },[updateColor,events,date])
  
  return (
    <>
      {cal}
      <div className='hide'>
        <Link to={`/day/${date.getDate()}`} ref={dayRef}>Hide</Link>
      </div>
    </>
  )
}

export default MonthView;