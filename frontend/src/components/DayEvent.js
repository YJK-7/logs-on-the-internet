import { useEffect, useRef, useState } from "react";
import {jsx as _jsx} from 'react/jsx-runtime'; 
import EventEdit from "./EventEditForm";

import "../style/DayEvent.css"

const DayEvent = ({ clickDate, events, setEvents, todayEvent, setTodayEvent, typeOpt, addMode, setAddMode }) => {
  // const [type, setType] = useState(undefined);
  const [editView, setEditView] = useState(undefined);
  const [today, setToday] = useState(undefined);


  const idk = useRef(null);

  // console.log("🌠",addMode)
  useEffect(()=>{
    if(addMode){
      setEditView(<EventEdit 
        clickDate={clickDate}
        typeOpt={typeOpt} 
        setEditView={setEditView}
        setEvents={setEvents}
        addMode={addMode}
        setAddMode={setAddMode}
      />)
    } else {
      setEditView(undefined)
    }
  },[addMode])
  // console.log("💜",typeOpt)


  //load events of the day to page
  useEffect(() => {
    if(todayEvent){
      const loadEvents = todayEvent.map((eventEl) => {
        return (
          <span 
            className={eventEl["event_type"]} 
            key={eventEl.id}
            onClick={(e)=>{
              if(typeOpt){
                setEditView(<EventEdit 
                  eventEl={eventEl} 
                  typeOpt={typeOpt} 
                  setEditView={setEditView}
                  setEvents={setEvents}
                  addMode={addMode}
                  setAddMode={setAddMode}
                />)
              }
            }}
          >
            {eventEl["event_content"]}
          </span>)
      })
      setToday(loadEvents)
    }
  },[todayEvent,typeOpt])




  
  return (
    <>
      <div className='events'>
        {editView}
        {today}
      </div>
    </>
  )
}

export default DayEvent;