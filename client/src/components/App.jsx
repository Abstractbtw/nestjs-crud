import React, {useState, useEffect} from 'react'
import './app.css'
import AddNote from "./Popups/AddNote"
import UpdateNote from "./Popups/UpdateNote"
import Confirmation from "./Popups/Confirmation"

const {getNotes} = require("../service/service")

function App() {

  const [notes, setNotes] = useState([])

  const [showConfirm, setShowConfirm] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const [updateId, setUpdateId] = useState(null)
  const [updateTitle, setUpdateTitle] = useState(null)
  const [updateDesc, setUpdateDesc] = useState(null)

  function handleClick (ind, title, desc){
    setUpdateId(ind)
    setUpdateTitle(title)
    setUpdateDesc(desc)
  }

  useEffect(() => {
    getNotes().then((res) => setNotes(res.data))
  }, [])

  return (
    <div>

      <UpdateNote trigger={showUpdate} setTrigger={setShowUpdate} ind={updateId} notetitle={updateTitle} notedesc={updateDesc}/>

      <Confirmation trigger={showConfirm} setTrigger={setShowConfirm}/>      

      <AddNote trigger={showAdd} setTrigger={setShowAdd} />
      
      <div className="container">
        <h1>Notes application</h1>

        <div style={{borderBottom: "2px solid black"}}></div>

        <h2> Notes </h2>

        <br/> 
        <button className="main_button" onClick={() => (setShowAdd(true))}>Add note</button>
        <br/> 

        <br/>
        <div style={{borderBottom: "2px solid black"}}></div>

        <div className="subjects">
          <table className="w3-table w3-striped">
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td />
              </tr>
              <tr style={{borderBottom: "2px solid lightgrey"}}></tr>
            </thead>
            <tbody>
              {notes.map(note => (
                <tr>
                  <td>{note.title}</td>
                  <td>{note.description}</td>
                  <td style={{textAlign: "right"}}>
                    <button className="table_button" onClick={() => (setShowConfirm(true), sessionStorage.setItem("deleteId", note.id))}>delete</button>
                    <button className="table_button" onClick={() => (handleClick(note.id, note.title, note.description), setShowUpdate(true))}>update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default App