import { useState } from "react";
import React from "react";
import NoteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(() =>
    localStorage.getItem("token") ? true : false
  );
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const navigate = useNavigate();

  const handleAddNote = async (e, title, description, tag) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/notes/addnote",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
            body: JSON.stringify({
              title: title,
              description: description,
              tag: tag,
            }),
          }
        );

        if (response.status === 200) {
          console.log("Note Created Successfully");
          // window.location.reload();
          handleFetchAllNotes();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please Login before saving any note");
      navigate("/Login");
    }
  };

  const handleEditNote = async (
    e,
    updatedTitle,
    updatedDescription,
    updatedTag,
    id
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            tag: updatedTag,
          }),
        }
      );

      if (response.status === 200) {
        handleFetchAllNotes();
        window.location.reload();
      }
    } catch (error) {
      console.error("An Error has occurred. Please Try again");
    }
  };

  const handleFetchAllNotes = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteNote = async (e, id) => {
    e.preventDefault();

    try {
      console.log(id);
      const response = await fetch(
        `http://127.0.0.1:5000/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );

      if (response.status === 200) {
        handleFetchAllNotes();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.authToken) {
        setUser(true);
        setAuthToken(json.authToken);
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else if (json.error === "Please enter correct credentials") {
        alert("Enter correct credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    setUser(false);
    navigate("/Login");
    localStorage.removeItem("token");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        setUser(true);
        setAuthToken(json.authToken);
        navigate("/");
      } else if (json.message === "User already exists with this email") {
        alert("User Already exists with this email.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  let value = {
    notes: notes,
    user: user,
    handleFetchAllNotes: handleFetchAllNotes,
    handleAddNote: handleAddNote,
    handleEditNote: handleEditNote,
    handleDeleteNote: handleDeleteNote,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    handleSignup: handleSignup,
  };

  return (
    <NoteContext.Provider value={value}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
