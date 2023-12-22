import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function Notes() {
  const { notes, handleFetchAllNotes, handleEditNote, handleDeleteNote } =
    useContext(noteContext);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [tag, setTag] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState(null);
  const [updatedTag, setUpdatedTag] = useState(null);
  const [noteId, setNoteId] = useState(null);
  const ref = useRef(null);
  const updateNote = (e, note) => {
    e.preventDefault();
    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag);
    setNoteId(note._id);
    ref.current.click();
  };

  const clearEditFields = (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setTag("");
    setNoteId("");
  };

  useEffect(() => {
    handleFetchAllNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="row my-2">
        {notes.length > 0 && (
          <>
            <h2>Your Tasks</h2>
            {notes.map((note, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="card my-2">
                    <div className="card-body">
                      <h4 className="card-title">{note.title}</h4>
                      <h6 className="card-title">{note.tag}</h6>
                      <p className="card-text">{note.description}</p>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="currentColor"
                          className="bi bi-trash mx-1"
                          viewBox="0 0 16 16"
                          onClick={(e) => {
                            handleDeleteNote(e, note._id);
                          }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="currentColor"
                          className="bi bi-pencil-square mx-1"
                          viewBox="0 0 16 16"
                          onClick={(e) => {
                            updateNote(e, note);
                          }}
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form
              className="my-1"
              onSubmit={(e) => {
                handleEditNote(
                  e,
                  updatedTitle,
                  updatedDescription,
                  updatedTag,
                  noteId
                );
                clearEditFields(e);
              }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edit_title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit_title"
                    name="edit_title"
                    placeholder="Title"
                    defaultValue={title}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit_tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit_tag"
                    name="edit_tag"
                    placeholder="Tag"
                    defaultValue={tag || ""}
                    onChange={(e) => setUpdatedTag(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit_description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edit_description"
                    name="edit_description"
                    rows="3"
                    defaultValue={description || ""}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="Submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
