import { useEffect, useState } from "react";
import EventEdit from "./EventEditForm";

import "../style/DayEvent.css"

const DayEvent = ({ clickDate, events, setEvents, todayEvent, addMode, setAddMode, eventOptions, updateColor }) => {
  const [editView, setEditView] = useState(undefined);
  const [today, setToday] = useState(undefined);
  const [typeOpt, setTypeOpt] = useState(undefined);

  // create type options
  useEffect(()=>{
    if(eventOptions){
      setTypeOpt(eventOptions);
      setTypeOpt((typeArr)=> {
        setTypeOpt(typeArr.map((typeEl) => {
          return (
              <option value={typeEl["id"]} key={typeEl["event_type"]}>{typeEl["event_type"]}</option>
          )
        }))
      })
    }
  },[eventOptions])
  // console.log("💜",typeOpt)

  //if addmode true open edit field
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
  
  
  //create events of the day to page
  useEffect(() => {
    if(todayEvent && updateColor){
      // console.log("HERE",todayEvent,updateColor);
      const loadEvents = todayEvent.map((eventEl) => {
        // console.log("HERE",eventEl);
        let loadColor;
        if(updateColor.length !== 0){
          loadColor = updateColor.find((el) => {
            // console.log("HERE",eventEl.event_type_id,el.id);
            // console.log("💙",el);
            return eventEl.event_type_id === el.id
          })
        } else if (updateColor.length === 0){
          return
        }
        
        // console.log(loadColor);
        return (
          <span 
            className={eventEl["event_type"]} 
            key={eventEl.id}
            style={{background:loadColor.hex_code}}
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
    } else {
      return <div></div>
    }
  },[todayEvent, typeOpt])

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