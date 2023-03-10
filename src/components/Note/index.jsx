import React, { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Icons } from "../AddNote/styled";
import NoteList from "../NoteList";
import { Container } from "./styled";

export const Note = () => {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const addNoteHandler = (note) => {
    setNotes((prev) => [...prev, note]);
    // console.log(note);
  };

  const deleteHandler = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateNote = (updateNote) => {
    setNotes((prev) =>
      prev.map((notes) =>
        notes.id === updateNote.id
          ? {
              ...notes,
              // id: updateNote.id,
              id: Date.now(),
              title: updateNote.title,
              todos: updateNote.todos,
              todos1: updateNote.todos1,
              todos2: updateNote.todos2,
              date: updateNote.date,
              completed: updateNote.completed,
            }
          : notes
      )
    );
  };

  const enterEditMode = ({
    id,
    title,
    todos,
    todos1,
    todos2,
    date,
    completed,
  }) => {
    setEditedTask({ id, title, todos, todos1, todos2, date, completed });
    setIsEditing(true);
  };

  return (
    <Container>
      <h1>Note page </h1>
      <Icons.AddBtn size="3.2em" onClick={() => setShow(true)} />
      <NoteList
        notes={notes}
        addNoteHandler={addNoteHandler}
        deleteHandler={deleteHandler}
        show={show}
        onClose={() => setShow(false)}
        isEditing={isEditing}
        onOpenEdit={() => setIsEditing(true)}
        onCloseEdit={() => setIsEditing(false)}
        enterEditMode={enterEditMode}
        editedTask={editedTask}
        updateNote={updateNote}
      />
    </Container>
  );
};

export default Note;
