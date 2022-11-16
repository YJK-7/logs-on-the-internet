import { useState, useEffect, useRef } from 'react';
import "../style/DayImage.css"

const ImageUp = ({ date, posted }) => {
  const [preview, setPreView] = useState("");
  const [imgFromDB, setImgFromDB] = useState({});
  // const [imgId, setImgId] = useState("");
  const imgUpField = useRef(null);
  const day = date.toDateString();
  // console.log(posted);

  //fetch image from db
  useEffect(() => {
    console.log("🍎")
    const fetchImg = async () => {
      try {
        const getImg = await fetch("/get-img", {
          method: "GET",
          headers:{
            "day":day,
            "userid":localStorage.getItem("userid")
          }
        })
        const loadImg = await getImg.json();
        // console.log(loadImg);

        if(loadImg){
          console.log("🇰🇷",loadImg)
          setImgFromDB(loadImg[0])
        }
      } catch (error) {
        console.log("empty");
      }
      
    }
    fetchImg()
    .catch(console.error);
  },[])

  const handleImageUpload = (e) => {
    e.preventDefault();//prevent a page refresh on form submit in React
    if(posted) {
      const [file] = e.target.files;
      previewFile(file);
    } else if (!posted) {
      alert("Please post a journal first")
    } 
  };

  const previewFile = (file) => {
    const read = new FileReader();
    read.readAsDataURL(file);

    read.onloadend = () => {
      setPreView(read.result);
    };
  }

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if(!preview) return;
    uploadImage(preview);
  }

  const uploadImage = async (base64) => {
    try {
      const newImg = await fetch("/api/img-up", {
        method: "POST",
        body: JSON.stringify({data:base64}),
        headers:{
          'Content-Type': 'application/json',
          "day":day,
          "userid":localStorage.getItem("userid")
        }
      })
      const dbImg = await newImg.json();
      console.log(dbImg);
      setImgFromDB(dbImg[0]);
      setPreView("");
    } catch (error) {
      console.log("💖")
      console.error(error);
    }
 
  }

  // const deleteImg = async () => {
  //   try {
  //     const delImg = await fetch("/api/img-del",{
  //       method:"POST",
  //       headers:{

  //       }
  //     })
  //   } catch (error) {
      
  //   }
  // }

  return (
    <>
      <form onSubmit={handleImageSubmit} className="imageUpload">
        <button 
          className='imgUp' 
          onClick={(e)=>{
            e.preventDefault(); 
            imgUpField.current.click();
          }}
        >
            {
              (imgFromDB && Object.keys(imgFromDB).length !== 0) ? 
              "Edit Image"
              :"Upload Image"
            }
        </button>
        <input 
          type="file" 
          accept="image/*" 
          ref={imgUpField}
          onChange={handleImageUpload} 
          style={{
            display: "none"
          }}
        />
        
        {preview && (
          <>
            <p className='preview'>Preview</p>
            <img src={preview} className="image"/>
            <button className='imgUp' type="submit" >Submit</button>
          </>
        )}
        {
          (imgFromDB && Object.keys(imgFromDB).length !== 0) && (
            <>
              <img src={imgFromDB["secure_url"]} className="image done"/>
              {/* <button className='imgUp' type="submit" >Delete</button>  */}
            </>
          )
        }
       
      </form>
    </>
  )

};

export default ImageUp;