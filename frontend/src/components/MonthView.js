import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';

import '../style/MonthView.css';

const MonthView = ({ events, setEvents, userInfo, date, setDate }) => {
  const [calendarType] = useState("US"); 
  const [locale] = useState("en"); //set default lanuage to english
  // const [events, setEvents] = useState(undefined);
  const dayRef = useRef(null);

  const dayView  = async (selectedDate) => {
    await setDate(selectedDate);
    sessionStorage.setItem("clickDay",selectedDate);
    dayRef.current.click();
  }
  // console.log(userInfo)


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

    if(events) {
      events.forEach((event) => {
        if(dayOfMonth.toDateString() === event.date) {
          //Do I need event_type_id?
          // console.log(dayOfMonth.getDate())
          dayContent.push(
            <span 
              className={event["event_type"]} 
              key={`${dayOfMonth.getDate()}_${event.id}`}
            >
              {event["event_content"]}
            </span>
          )
        }
      })
    }
    return dayContent;
  }


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
    </>
  )
}

export default MonthView;