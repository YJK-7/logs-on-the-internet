import { useEffect, useState } from "react";
import {jsx as _jsx} from 'react/jsx-runtime'; 
import EventEdit from "./EventEditForm";

import "../style/DayEvent.css"

const DayEvent = ({ clickDate, setEvents, todayEvent, addMode, setAddMode }) => {
  const [editView, setEditView] = useState(undefined);
  const [today, setToday] = useState(undefined);
  const [typeOpt, setTypeOpt] = useState(undefined);

  // load type options
  useEffect(()=>{
    const loadEventType = async () => {
      const fetchType = await fetch("/event", {
        method:"GET",
      })
      const eventTypes = await fetchType.json();
      // console.log(eventTypes)
      setTypeOpt(eventTypes);
      setTypeOpt((typeArr)=> {
        setTypeOpt(typeArr.map((typeEl) => {
          return (
              <option value={typeEl["id"]} key={typeEl["event_type"]}>{typeEl["event_type"]}</option>
          )
        }))
      })
    }
    loadEventType()
    .catch(console.error);
  },[])
  // console.log("💜",typeOpt)

  //if addmode true open edit field
  useEffect(()=>{
    // console.log("🌠",addMode)
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
  
    
  //create events of the day to page
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