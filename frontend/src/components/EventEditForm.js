import { useState } from 'react';
import {jsx as _jsx} from 'react/jsx-runtime'; 

const EventEdit = ({eventEl, typeOpt, setEditView, setEvents}) => {
  const [content, setContent] = useState({
    eventContent:"",
    eventTypeId:""
  });
  const event_id = eventEl["id"];
  const event_content = eventEl["event_content"];
  const event_type_id = eventEl["event_type_id"];
  

  const editEvent = async (cont) => {
    const newCont = (cont["eventContent"] !== "")? cont["eventContent"] : event_content;
    const newTypeId = (cont["eventTypeId"] !== "")? cont["eventTypeId"] : event_type_id;
    console.log(newCont,newTypeId,event_id)
    const putEvent = await fetch("/event", {
      method:"PUT",
      headers:{
        "id":event_id,
        "userid":localStorage.getItem("userid"),
        "eventContent":newCont,
        "eventTypeId":newTypeId
      }
    })
    const putDone = await putEvent.json();
    //assuming that pudone returns all events in db relative to user
    setEvents(putDone);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);// why undefined?
    editEvent(content)
  }

  return (
    <>
    <div className="day-content event-content">
      <form className="day-content" >
          <div className="input-box-event">
              <label className="lable">
                Event:
              </label>
              <input
                className='input-field' 
                type="text"
                name="Event"
                defaultValue={event_content} //can't edit content??
                placeholder="Event Name" 
                onChange={e => {setContent({
                  ...content,
                  eventContent: e.target.value
                })}}
              />
          </div>
          <div className="input-box">
              <label className="lable">
                Event Type:
              </label>
              <select 
                defaultValue={eventEl["id"]} 
                onChange={e => {setContent({
                  ...content,
                  eventTypeId: e.target.value
                })}}
              > 
                {typeOpt.map(e => {return e})}
              </select>

          </div>
        <input type="submit" value="Submit" className='my-button day' onClick={handleSubmit}/>
      </form>
      <button onClick={()=>setEditView(undefined)}>Close</button>
      {/* <button onClick={deleteEvent}>Delete</button> */}
    </div>
    </>
  )
}

export default EventEdit;