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
  // console.log("🌟");
  
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

    if(events.length !== 0 && updateColor.length !== 0) {
      events.forEach((event) => {
        if(dayOfMonth.toDateString() === event.date) {
          const loadColor = updateColor.find((el) => {
            return event.event_type_id === el.id
          })
          // console.log("💖",loadColor)
          //Do I need event_type_id?
          // console.log(dayOfMonth.getDate())
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
  },[updateColor])
  

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