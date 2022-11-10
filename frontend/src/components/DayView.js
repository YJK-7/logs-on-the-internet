// import { PostgresError } from 'postgres';
import { useState, useEffect, useRef } from 'react';
// import { addStyle } from 'react-bootstrap/lib/utils/bootstrapUtils';
import { Link, useParams } from 'react-router-dom';
import "../style/DayView.css"
import DayEvent from './DayEvent';

const DayView = ({ events, setEvents }) => {
  const [content, setContent] = useState(undefined);
  const [posted, setPosted] = useState(undefined);
  const [disable, setDisable] = useState(false);
  const [button, setButton] = useState("Submit");
  const [todayEvent, setTodayEvent] = useState([]);
  const { day } = useParams();
  const date = new Date(sessionStorage.getItem("clickDay"))

  useEffect(()=> {
    if(events && todayEvent.length === 0) {
      events.forEach((eventEl) => {
        if(date.toDateString()===eventEl.date){
          console.log(eventEl.date)
          setTodayEvent(oldArray => [...oldArray, eventEl]);
        }
      })
    }
  }, [events])

  
  // need to find way to filter events before getting here
  // look at notes in App.js 15-20

  const textLink = useRef(null);

  // console.log(tooMuch)
  const backToSub = () => {
    setDisable(false);
    setButton("Submit");
  }
  const journal = async (e) => {
    let journalContent;
    // e.preventDefault();
    // console.log("🐱",posted)

    if(posted) {
      const edits = await fetch("/journal", {
        method:"PUT",
        headers:{
          "postDate":date.toDateString(),
          "content":content,
          "userid":events[0]["user_id"]
        }
      })
      // const editedCont = await edits.json();
      journalContent = await edits.json();
    } else {
      // console.log("🦋",content)
      if (content) {
        const add = fetch("/journal", {
          method:"POST",
          headers:{
            "postDate":date.toDateString(),
            "content":content,
            "userid":events[0]["user_id"]
          }
        })
        journalContent = await add.json();
      }
    }
    setPosted(journalContent[0]["content"]);
    setDisable(true);
    setButton("Edit");
  }

  // console.log(events)

  useEffect(() => {
    const fetchJour = async () => {
        if(events){
          const jourData = await fetch("/journal", {
            method:"GET",
            headers:{
              "postDate":date.toDateString(),
              "userid":events[0]["user_id"]
            }
          })
          const jourArr = await jourData.json();
          if(jourArr.length > 0) {
            setPosted(jourArr[0].content);
            setDisable(true);
            setButton("Edit");
          }
      }
    }
      fetchJour()
      .catch(console.error);
  },[events])

  useEffect(() => {
    if(posted === undefined){
      textLink.current.focus();
    }
  },[posted])

  return (
    <>
    <div className='top-day'>
      <div className='back-to-month'>
          <Link to="/month">{date.toLocaleString('default', { month: 'long' })}</Link>
      </div>
    </div>

      <DayEvent 
        clickDate={date} 
        setEvents={setEvents} 
        todayEvent={todayEvent} 
        setTodayEvent={setTodayEvent}
      />

    <div className='day-wrap'>
      <div className='day-title-bar'>
        <span className='deco-circle left'></span>
        <h2 className='title'>
            {date.toLocaleDateString("default",{
              weekday:"long",
              day:"2-digit", 
              month:"long", 
              year:"numeric"
              })
            }
        </h2>
        <span className='deco-circle right'></span>
      </div>
        <div className='day-content'>
          <form className='journal-form'>
              <textarea
                className='journal-field' 
                type={"text"}
                name="Journal"
                placeholder="Type Here!"
                ref={textLink}
                disabled={disable} 
                defaultValue={posted}
                onChange={(e) => setContent(e.target.value)}
                > 
              </textarea>
              {
                button === "Submit"? 
                <input type="submit" value={button} className='login-signup-button day' onClick={journal}/>
                :<button className='login-signup-button day' onClick={backToSub}>{button}</button>
              }
              
          </form>
        </div>
    </div>
    
    </>
  )
}

export default DayView;