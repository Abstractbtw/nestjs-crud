import React, {useState, useEffect} from 'react'
import './Popup.css'
import {updatenote} from '../../controllers/controller.js'

const {getNotes} = require("../../service/service")

function UpdateSubject(props) {
  const [Title, setTitle] = useState("1")
  const [Desc, setDesc] = useState("1")

  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes().then((res) => setNotes(res.data))
  }, [])

  const [checkTitle, setCheckTitle] = useState(false)

  function checkNote(){
    let includes = 0
    notes.map(note => {
      if(note.title === Title){
        includes = 1
      }
    })
    if(includes === 1){
      setCheckTitle(true)
    }
    else{
      updatenote(props.ind, document.getElementById("Title").value, document.getElementById("Desc").value)
      document.location.reload()
    }
  }

  return (props.trigger) ? (
    <div className="update">
      <div className="update_subject">
        <h2>Update Note</h2>
        <p className="graytext">Enter new information</p>
        <input defaultValue={props.notetitle} type="text" id="Title" placeholder="Note title" onChange={(event) => (setTitle(event.target.value), setCheckTitle(false))}/>
        <input  defaultValue={props.notedesc} type="text" id="Desc" placeholder="Note description" onChange={(event) => setDesc(event.target.value)}/>

        {checkTitle ? (
          <div style={{position: "absolute"}} className="error_text">Note {Title} already exists</div>
        ):("")}

        {(Title.replace(/\s/g, "").length && Desc.replace(/\s/g, "").length) ? (
          <button className="mainbutton" onClick={() => (checkNote())}>Update</button>
        ):(
          <button className="disabled_mainbutton" disabled>Update</button>
        )}
        <button style={{marginLeft: "10px"}} className="mainbutton" onClick={() => props.setTrigger(false)}>Back</button>
      </div>
    </div>
  ) : ""
}

export default UpdateSubject
