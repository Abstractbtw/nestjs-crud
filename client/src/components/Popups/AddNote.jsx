import React, {useState, useEffect} from 'react'
import './Popup.css'
import {addnote} from '../../controllers/controller'

function AddSubject(props) {
  const [Title, setTitle] = useState("")
  const [Desc, setDesc] = useState("")

  const [data, setData] = useState([])

  useEffect(function () {
    fetch(`${process.env.REACT_APP_API_URL}/notes`)
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

  const [checkTitle, setCheckTitle] = useState(false)

  function checkInput(){
    let includes = 0
    data.map(notes => {
      if(notes.title === Title){
        includes = 1
      }
    })
    if(includes === 1){
      setCheckTitle(true)
    }
    else{
      addnote(Title, Desc)
      document.location.reload()
    }
  }

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Add note</h2>
        <p className="graytext">Enter information</p>
        <input type="text" placeholder="Note title" value={Title} onChange={(event) => (setTitle(event.target.value))}/>
        <input type="text" placeholder="Note description" value={Desc} onChange={(event) => (setDesc(event.target.value))}/>

        {checkTitle ? (
          <div style={{position: "absolute"}} className="error_text">Note {Title} already exists</div>
        ):("")}

        { (Title.replace(/\s/g, "").length && Desc.replace(/\s/g, "").length) ? (
          <button className="mainbutton" onClick={() => (checkInput())}>Submit</button>
        ):(
          <button className="disabled_mainbutton" disabled>Submit</button>
        )} 

        <button style={{marginLeft: "10px"}} className="mainbutton" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default AddSubject
