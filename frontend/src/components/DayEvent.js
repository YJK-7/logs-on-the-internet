import { useEffect, useRef, useState } from "react";
import {jsx as _jsx} from 'react/jsx-runtime'; 

import "../style/DayEvent.css"

const DayEvent = ({ clickDate, events, setEvents, todayEvent, setTodayEvent }) => {
  const [type, setType] =useState(undefined);
  const [content, setContent] = useState(undefined);
  const [view, setView] = useState(true);

  const idk = useRef(null);
  console.log(todayEvent);
  
  const StartEdit = () => {
    return (
      <>
      <div className="day-content event-content">
        <form className="day-content">
            <div className="input-box-event">
                <label className="lable">
                  Event:
                </label>
                <input
                  className='input-field' 
                  type="text"
                  name="Event"
                  placeholder="Event Name" 
                  onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="input-box">
                <label className="lable">
                  Event Type:
                </label>
                <select>
                  <option value="Ford">Ford</option>
                  <option value="Volvo" selected>Volvo</option>
                  <option value="Fiat">Fiat</option>
                </select>
                {/* <input
                  className='input-field' 
                  type="text"
                  name="Event"
                  placeholder="Event Name" 
                  onChange={(e) => setContent(e.target.value)}
                /> */}
            </div>
          <input type="submit" value="Submit" className='login-signup-button day'/>
        </form>
      </div>
      </>
    )
  }
  const editEvent = async (eventEl) => {
    console.log(eventEl)
    const putEvent = await fetch("/event", {
      method:"PUT",
      headers:{
        "id":eventEl["id"],
        "userid":eventEl["user_id"]
      }
    })
    const putDone = await putEvent.json();
  }

  const makeEvents = (eventEl) => {
    if(clickDate.toDateString()===eventEl.date){
      return (<span 
        className={eventEl["event_type"]} 
        key={eventEl.id}
        onClick={(e)=>{
          // setType(eventEl["event_type"])
          setView(false)
        }}
      >
        {eventEl["event_content"]}
      </span>)
    }
  }
  // console.log(type)
  return (
    <>
      <div className='events' ref={idk}>
        {view ? todayEvent.map(makeEvents): <StartEdit/>}
      </div>
    </>
  )
}

export default DayEvent;