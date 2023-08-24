import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

export default function Home() {
  const { handleAddNote, user } = useContext(noteContext);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [tag, setTag] = useState(null);

  return (
    <div>
      <div className="my-2">
        <h2>Add a Note</h2>
        <form
          className="my-1"
          onSubmit={(e) => handleAddNote(e, title, description, tag)}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"
              required
              minLength={3}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              minLength={3}
              required
              placeholder="Tag"
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              required
              minLength={5}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      {user && <Notes />}
    </div>
  );
}
