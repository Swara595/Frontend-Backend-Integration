import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [notes, setNotes] = useState([])

  /**jab bhi aap state variable ko change karte ho to vo bar bar
   * render hota hai, usse bar bar render hone se bachane ke 
   * liye useEffect use krte hai
   */

  /** app component jitni baar bhi render ho, useEffect ke andar
   * jo bhi likha hoga, vo sirf ek time hi run hoga
   */

  function fetchNotes() {
    axios.get("https://backend-1-5r3c.onrender.com/api/notes")  // ← fixed URL
      .then(res => {
        setNotes(res.data.notes)
      })

  }
  useEffect(() => {
    fetchNotes()
  }, [])  // ← empty array means "run only once on mount"

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value)

    axios.post("https://backend-1-5r3c.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data)
        fetchNotes() /**if u dont call fetchNotes() you will have to reload the page 
        again and again and then you will see the new note */
      })
  }

  function handleDeleteNote(noteId) {
    axios.delete(`https://backend-1-5r3c.onrender.com/api/notes/${noteId}`)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })

  }

  function handleModifyNote(noteId) {
    const newDescription = prompt("Enter new description")
    axios.patch(`https://backend-1-5r3c.onrender.com/api/notes/${noteId}`, {
      description: newDescription
    })
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }


  return (
    <>

      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" />
        <input name="description" type="text" placeholder="Description" />
        <button type="submit">Create Note</button>
      </form>
      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
              <button onClick={() => handleModifyNote(note._id)}>Modify</button>
            </div>

          })
        }

      </div>
    </>
  )
}

export default App
