import { useState } from 'react';
import "../style/EventEdit.css"

const EventEdit = ({clickDate, eventEl, typeOpt, setEditView, setEvents, addMode, setAddMode}) => {
  
  const [content, setContent] = useState({
    eventContent:"",
    eventTypeId:""
  });
 
  const event_id = eventEl ? eventEl["id"]: "";
  const event_content = eventEl ? eventEl["event_content"]: "";
  const event_type_id = eventEl ? eventEl["event_type_id"]: "";

  const addEvent = async (cont) => {
    const newCont = cont["eventContent"];
    const newTypeId = cont["eventTypeId"]? cont["eventTypeId"]: "1";
    if(newCont && newTypeId) {
      const postEvent = await fetch("/event", {
        method:"POST",
        headers:{
          "clickDate":clickDate,
          "eventContent":newCont,
          "userid":localStorage.getItem("userid"),
          "eventTypeId":newTypeId
        }
      })
      const postDone = await postEvent.json();
      // console.log(postDone returns new event and updated events)
      setEvents(postDone);
      setEditView(undefined); 
      setAddMode(false);
    } else {
      alert("Please enter all fields");
    }
  }
  

  const editEvent = async (cont) => {
    const newCont = (cont["eventContent"] !== "")? cont["eventContent"] : event_content;
    const newTypeId = (cont["eventTypeId"] !== "")? cont["eventTypeId"] : event_type_id;
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
    //putDone returns all events in db relative to user
    setEvents(putDone);
    setEditView(undefined); 
    setAddMode(false);
  }

  const deleteEvent = async () => {
    const deleteE = await fetch("/event", {
      method:"DELETE",
      headers:{
        "id":event_id,
        "userid":localStorage.getItem("userid")
      }
    })
    const deleteDone = await deleteE.json();
    //assuming deleteDone returns updated db
    setEvents(deleteDone);
    setEditView(undefined);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(addMode){
      addEvent(content)
    } else {
      editEvent(content)
    }
  }

  return (
    <>
    <div className="day-content event-content">
      <form className="day-content edit" >
          <div className="input-box-event">
              <label className="lable">
                Event:
              </label>
              <input
                className='input-field' 
                type="text"
                name="Event"
                defaultValue={event_content}
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
                className='input-field select'
                defaultValue={event_type_id} 
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
      <div className='edit button'>
        <button className="my-button day ed" onClick={()=>{setEditView(undefined); setAddMode(false)}}>Close</button>
        <button className="my-button day ed" onClick={deleteEvent}>Delete</button>
      </div>
    </div>
    </>
  )
}

export default EventEdit;