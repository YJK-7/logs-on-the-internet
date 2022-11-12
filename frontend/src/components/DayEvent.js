import { useEffect, useRef, useState } from "react";
import {jsx as _jsx} from 'react/jsx-runtime'; 
import EventEdit from "./EventEditForm";

import "../style/DayEvent.css"

const DayEvent = ({ clickDate, events, setEvents, todayEvent, setTodayEvent }) => {
  const [typeOpt, setTypeOpt] = useState(undefined);
  // const [type, setType] = useState(undefined);
  const [editView, setEditView] = useState(undefined);
  const [today, setToday] = useState(undefined);


  const idk = useRef(null);

  useEffect(()=>{
    const loadEventType = async () => {
      const fetchType = await fetch("/event", {
        method:"GET",
      })
      const eventTypes = await fetchType.json();
      setTypeOpt(eventTypes);
      setTypeOpt((typeArr)=> {
        setTypeOpt(typeArr.map((typeEl) => {
          return (
            <>
              <option value={typeEl["id"]} key={typeEl["id"]}>{typeEl["event_type"]}</option>
            </>
          )
        }))
      })
    }
    loadEventType()
    .catch(console.error);
  },[])
  // console.log("💙",todayEvent)
  // console.log("💜",events)

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


  // const deleteEvent = async (selEvent) => {
  //   const deleteE = await fetch("/event", {
  //     method:"DELETE",
  //     headers:{
  //       "id":selEvent["id"]
  //     }
  //   })
  //   const deleteDone = await deleteE.json();
  //   //assuming deleteDone returns updated db
  //   setEvents(deleteDone)
  //   setEditView(undefined)
  // }

  
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