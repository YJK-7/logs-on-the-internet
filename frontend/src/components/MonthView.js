import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';

import '../style/MonthView.css';

const MonthView = ({ userInfo, date, setDate }) => {
  const [calendarType, setCalendarType] = useState("US"); 
  const [locale, setLocale] = useState("en"); //set default lanuage to english
  const linkRef = useRef(null);

  const dayView  = async (selectedDate) => {
    await setDate(selectedDate);
    linkRef.current.click();
  }

  const tileContent = () => {

  }

  return (
    <>
      <Calendar
        onClickDay={dayView}  
        onChange={setDate} 
        value={date} //today
        calendarType={calendarType} 
        locale={locale}
        // tileContent={tileContent}
        minDetail={"decade"}
      />

      <div className='hide'>
        <Link to={`/day/${date.getDate()}`} ref={linkRef}>Hide</Link>
      </div>
    </>
  )
}

export default MonthView;