import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../style/DayView.css"
import DayEvent from './DayEvent';
import DayImage from './DayImage';

const DayView = ({ events, setEvents, eventOptions, updateColor }) => {
  const [todayEvent, setTodayEvent] = useState([]);
  const [newContent, setNewContent] = useState(undefined);
  const [posted, setPosted] = useState(undefined);
  const [disable, setDisable] = useState(false);
  
  const [addMode, setAddMode] = useState(false);

  const textLink = useRef(null);
  const sessionDate = sessionStorage.getItem("clickDay");

  const clickDate = new Date(sessionDate).toDateString();
  const monthName = new Date(sessionDate)
  .toLocaleString('default', { month: 'long' });

  const fullDayTitle = new Date(sessionDate)
  .toLocaleString("default",{
    weekday:"long",
    day:"2-digit", 
    month:"long", 
    year:"numeric"
  });

  //get day relative user event 
  // by default events === []
  useEffect(()=> {
    if(events && events.length !== 0){
      setTodayEvent([]);// stopped duplicate loads
      events.forEach((eventEl) => {
        if(clickDate === eventEl.date){
          setTodayEvent(oldArray => [...oldArray, eventEl]);
        }
      })
    } else {
      setTodayEvent([])
    }
  }, [events])

  //fetch today journal
  useEffect(() => {
    // console.log(posted,disable);
    const fetchJour = async () => {
      const jourData = await fetch("/journal", {
        method:"GET",
        headers:{
          "postDate":clickDate,
          "userid":localStorage.getItem("userid")
        }
      })
      const jourArr = await jourData.json();
      if(jourArr.length > 0) {
        setPosted(jourArr[0].content);
        setDisable(true);
      }
    }
      fetchJour()
      .catch(console.error);
  },[])
  // console.log("💙",posted,disable);


  useEffect(() => {
    // console.log("💚",posted,disable);
    if(posted === undefined){
      textLink.current.focus();
    }
  },[posted])
  

  const backToSub = async () => {
    setDisable(false);
    textLink.current.focus();
  }
  //post and put journal
  // console.log("🦋",content,posted)
  const journal = async (e) => {
    let journalContent;
    const headerObj = {
      "postDate":clickDate,
      "content":newContent || posted,
      "userid":localStorage.getItem("userid")
    }
    
    if(posted) {
      const edits = await fetch("/journal", {
        method:"PUT",
        headers:headerObj
      })
      journalContent = await edits.json();
    } else if (newContent){
      const add = fetch("/journal", {
        method:"POST",
        headers:headerObj
      })
      journalContent = await add.json();
    }
    setPosted(journalContent[0]["content"]);
    setDisable(true);
  }

  return (
    <>
    <div className='top-day'>
      <div className='temp'>
          <Link to="/month" className='add'>{monthName}</Link>
      </div>
      {
        (todayEvent && todayEvent.length<3) ? 
        <button className='my-button sub-ed add' onClick={(e) => setAddMode(true)}>Add Event +</button>
        :<div></div>
      }
    </div>
      <DayEvent 
        clickDate={clickDate} 
        events={events}
        setEvents={setEvents} 
        todayEvent={todayEvent} 
        addMode={addMode}
        setAddMode={setAddMode}
        eventOptions={eventOptions}
        updateColor={updateColor}
      />

    <div className='day-wrap'>
      <div className='day-title-bar'>
        <span className='deco-circle left'></span>
          <h2 className='title'>{fullDayTitle}</h2>
        <span className='deco-circle right'></span>
      </div>

        <div className='day-content'>
          <form className='journal-form' onSubmit={journal}>
              <textarea className='journal-field' 
                type="text"
                name="Journal"
                placeholder="Type Here!"
                ref={textLink}
                disabled={disable} 
                defaultValue={posted}
                onChange={(e) => setNewContent(e.target.value)}
                > 
              </textarea>
          
              {
                !disable ? 
                <input type="submit" value="Submit" className='my-button sub-ed'/>
                :<button className='my-button sub-ed' onClick={backToSub}>Edit</button>
              }
              
          </form>
          <div>
            <DayImage clickDate={clickDate} posted={posted}/>
          </div>
        </div>
    </div>
    
    </>
  )
}

export default DayView;