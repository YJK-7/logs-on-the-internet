import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';

import '../style/MonthView.css';

const MonthView = ({ events, setEvents, userInfo, date, setDate }) => {
  const [calendarType] = useState("US"); 
  const [locale] = useState("en"); //set default lanuage to english
  const dayRef = useRef(null);

  const dayView  = async (selectedDate) => {
    await setDate(selectedDate);
    sessionStorage.setItem("clickDay",selectedDate);
    dayRef.current.click();
  }
  // console.log("💛",events)
  

  const tileContent = (date) => {
    //function runs for every day seen in current month view
    //date is a object returning 
    // { 
    //   activeStartDate: Tue Nov 01 2022 00:00:00 GMT+0900 (Japan Standard Time), 
    //   date: Sun Oct 30 2022 00:00:00 GMT+0900 (Japan Standard Time), 
    //   view: 'month'
    // }
    // activeStartDate & date are date objects
    // console.log("rerender?💿")
    const dayOfMonth = date.date;
    let dayContent = [];

    if(events) {
      events.forEach((event) => {
        if(dayOfMonth.toDateString() === event.date) {
          // console.log("🌟",events)
          // console.log("💖",event["event_type"])
          //Do I need event_type_id?
          // console.log(dayOfMonth.getDate())
          dayContent.push(
            <span 
              className={event["event_type"]} 
              key={event.id}
            >
              {event["event_content"]}
            </span>
          )
        }
      })
    }
    return dayContent;
  }

  // console.log(date)
  return (
    <>
      <Calendar
        onClickDay={dayView}  
        onChange={setDate} 
        value={date} //today
        calendarType={calendarType} 
        locale={locale}
        tileContent={tileContent}
        minDetail={"decade"}
      />

      <div className='hide'>
        <Link to={`/day/${date.getDate()}`} ref={dayRef}>Hide</Link>
      </div>
      {/* {' '}
      <div></div>{' '}
      <div></div>{' '}
      <div></div> */}
    </>
  )
}

export default MonthView;