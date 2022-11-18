import '../style/MonthDayViewColor.css';
import { SketchPicker } from 'react-color';
import { useState, useEffect, useRef, createRef } from 'react';

const MonthDayViewColor = ({ eventOptions, setEventOptions, updateColor }) => {
  const [collapse ,setCollapse] = useState(true)
  const [colorPicker, setColorPicker] = useState(false)
  const [eventColor, setEventColor ] = useState("")
  const [chosenColor, setChosenColor ] = useState()
  const [currentSpan, setCurrentSpan ] = useState()

  const eventTypeRef = useRef([]);
  function createRefs(){
    if(eventOptions.length !== 0){
      eventTypeRef.current = eventOptions.map((element, i) => eventTypeRef.current[i] ?? createRef());
    }  
  }
  createRefs();

  useEffect(()=>{
    if(eventOptions && updateColor){
      const elements = updateColor.map((ev) => {
        let i = (ev.id) - (updateColor[0]["id"]);
        let color = ev.hex_code;
        return (
        <div key={ev.id} style={{display:"flex", alignItems:"center", gap:"7px"}}>
          <span 
            className='color-chosen' 
            style={{background:color}}
            ref={eventTypeRef.current[i]}
            id={ev.id}
            onClick={(e) => {
              e.preventDefault()
              setCurrentSpan(eventTypeRef.current[i].current)
              setChosenColor(color);
              if(!colorPicker)setColorPicker(!colorPicker);
            }}
          >
          </span>
          <label>
            {ev.event_type.replace(ev.event_type[0],ev.event_type[0].toUpperCase())}
          </label>
        </div>)
      });
      // 
      setEventColor(elements);
    };
  },[eventOptions,updateColor])

  const change = async () => {
    const hexAndId = eventTypeRef.current.map(element => {
      const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
      return {
        eventTypeId:(element.current.id),
        hex:rgb2hex(element.current.style.background),
      }
    });
    const postColor = await fetch("/event-type", {
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
        userid: localStorage.getItem("userid"),
      },
      body:JSON.stringify({data:hexAndId})
      
    })
    const newColors = await postColor.json();
    setEventOptions(newColors);
    setColorPicker(!colorPicker);
    setCollapse(!collapse);
  }

  
  return  (
    <div className='day-wrap nav'>
      <div className='day-title-bar nav'style={{
          borderBottom:(collapse ? "none" : "0.15em solid var(--secondary)")
        }}>
        <button className='deco-circle left nav' onClick={()=>setCollapse(!collapse)}></button>
        <h2 className='title nav'>Event Colors</h2>
      </div>
      <div className='day-content nav' style={{
        display:(collapse ? "none" : "flex"),
        }}
      >
        {eventColor}
          
      { 
        colorPicker?
      <div>
        <div className='color-pick'>
        <SketchPicker 
            color={chosenColor}
            onChangeComplete={(color) => {
              currentSpan.style.background = color.hex;
              setChosenColor(color.hex);
            }}
            presetColors={['#7dae9b', '#8abfe8', '#7b78b8', '#cc889d', '#f5c5a0', '#5c7998','#FFFFFF','#000000']}
          />
        </div>
        <div className='idk'>
          <button type='button'  className='logout nav' onClick={(e) => {
                e.preventDefault()
                setColorPicker(!colorPicker);
                setCollapse(!collapse);
              }}>
              Close
            </button>
            <button type='button' className='logout nav' onClick={change}>Save Color</button>
          </div>
        </div>
        : ""  
      }
      </div>
    </div>
  )
};

export default MonthDayViewColor;