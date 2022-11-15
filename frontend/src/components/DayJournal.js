import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../style/DayJournal.css"
import DayEvent from './DayEvent';
// import logo from "../logo.svg"
// import DayAddEvent from './DayAddEvent';

const DayJournal = ({ events, setEvents }) => {
  const [content, setContent] = useState(undefined);
  const [posted, setPosted] = useState(undefined);
  const [disable, setDisable] = useState(false);
  const [button, setButton] = useState("Submit");
  const [todayEvent, setTodayEvent] = useState([]);
  const [typeOpt, setTypeOpt] = useState(undefined);
  const [addMode, setAddMode] = useState(false);
  const { day } = useParams();
  const date = new Date(sessionStorage.getItem("clickDay"))
  const textLink = useRef(null);
  const imgUp = useRef(null);
  const imgUpField = useRef(null);
  // const addLink = useRef(null);
  // console.log(addMode)

  //get event data relevet to today
  useEffect(()=> {
    // console.log("🧡",events,todayEvent)
    if(events){
      setTodayEvent([]);// stopped duplicate loads, but why?
      events.forEach((eventEl) => {
        if(date.toDateString()===eventEl.date){
          setTodayEvent(oldArray => [...oldArray, eventEl]);
        }
      })
    }
  }, [events])
  // load type options
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

  //fetch today journal
  useEffect(() => {
    const fetchJour = async () => {
        if(events){
          const jourData = await fetch("/journal", {
            method:"GET",
            headers:{
              "postDate":date.toDateString(),
              "userid":localStorage.getItem("userid")
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

  // need to find way to filter events before getting here
  // look at notes in App.js 15-20

  

  const backToSub = () => {
    setDisable(false);
    setButton("Submit");
  }
  //post and put journal
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
          "userid":localStorage.getItem("userid")
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
            "userid":localStorage.getItem("userid")
          }
        })
        journalContent = await add.json();
      }
    }
    setPosted(journalContent[0]["content"]);
    setDisable(true);
    setButton("Edit");
  }

  // console.log("🍎",todayEvent)
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const read = new FileReader();
      const { current } = imgUp; //access imgUp.current
      current.file = file;
      // console.log(current)
      read.onload = e => {
        current.src = e.target.result;
      };
      read.readAsDataURL(file);
    }
  };
  const sendImg = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("image",file)
    const data = await fetch("/api/img", {
      method:"POST",
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
  }


  return (
    <>
    <div className='top-day'>
      <div className='temp'>
          <Link to="/month" className='add'>{date.toLocaleString('default', { month: 'long' })}</Link>
      </div>
      {
        (todayEvent && todayEvent.length<3) ? 
        <button className='my-button sub-ed add' onClick={(e) => setAddMode(true)}>Add Event +</button>
        :<div></div>
      }
    </div>
      <DayEvent 
        clickDate={date.toDateString()} 
        events={events}
        setEvents={setEvents} 
        todayEvent={todayEvent} 
        setTodayEvent={setTodayEvent}
        typeOpt={typeOpt}
        addMode={addMode}
        setAddMode={setAddMode}
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
              <textarea className='journal-field' 
                type="text"
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
                <input type="submit" value={button} className='my-button sub-ed' onClick={journal}/>
                :<button className='my-button sub-ed' onClick={backToSub}>{button}</button>
              }
              
          </form>
          <div className='imageUpload'>
            <input 
              type="file" 
              accept="image/*" 
              ref={imgUpField}
              onChange={handleImageUpload}
              // multiple = {false} 
              style={{
                display: "none"
              }}
            />
            <form action='/'>
              <button className='imgUp' onClick={()=>imgUpField.current.click()}>Upload Image</button>
              <img ref={imgUp} className="image"/>
            </form>
          </div>
        </div>
    </div>
    
    </>
  )
}

export default DayJournal;