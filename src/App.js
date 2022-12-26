import "./App.css";
import React, { useState } from "react";

function App() {
  // Declare state variables
  const [notes, setNotes] = useState([]); // list of notes
  const [formValues, setFormValues] = useState({ title: "", note: "" }); // form values
  const [editing, setEditing] = useState(false); // flag for editing a note

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.title || formValues.note) {
      setNotes([...notes, formValues]); // add new note to list of notes
      setFormValues({ title: "", note: "" }); // reset form values
    }
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  // Function to handle "Edit" button click
  const handleEdit = (index) => {
    setEditing(true);
    setFormValues({ ...notes[index], index });
  };

  // Function to handle "Update" button click
  const handleUpdate = (index) => {
    setNotes(
      notes.map((note, i) => {
        if (i === index) {
          return {
            title: formValues.title || note.title,
            note: formValues.note || note.note,
          };
        }
        return note;
      })
    );
    setFormValues({ title: "", note: "" });
    setEditing(false);
  };

  // Function to handle "Delete" button click
  const handleDelete = (index) => {
    setNotes(notes.filter((note, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>NoteWorthy</h1>
      {/* Form to add/edit a note */}
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="title"
          placeholder="Title"
          value={formValues.title}
          onChange={handleChange}
          onKeyDown={(e) => e.keyCode === 13 && e.preventDefault()}
          rows="1"
        />
        <br />
        <textarea
          name="note"
          id="note"
          placeholder="Note"
          value={formValues.note}
          onChange={handleChange}
          rows="5"
          cols="20"
        />
        <br />
        {editing ? (
          <button
            className="editUpdate"
            type="button"
            onClick={() => handleUpdate(formValues.index)}
          >
            Update
          </button>
        ) : (
          <button type="submit">Save</button>
        )}
      </form>
      {/* List of notes */}
      <ul class="notesView">
        {notes.map((note, index) => (
          <ul key={index}>
            <b>{note.title.toUpperCase()}</b>
            <br />
            <p> {note.note}</p>
            <br />
            <button
              className="editUpdate"
              type="button"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            &nbsp;
            <button
              className="delete"
              type="button"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default App;
