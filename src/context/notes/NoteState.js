import { useState } from "react";
import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "64dce01bcf703a04ca55d917",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-16T14:41:31.357Z",
      "__v": 0
    },
    {
      "_id": "64df75bb328a56e04b7be268",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-18T13:44:27.630Z",
      "__v": 0
    },
    {
      "_id": "64df75bb328a56e04b7be268",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-18T13:44:27.630Z",
      "__v": 0
    },
    {
      "_id": "64df75bb328a56e04b7be268",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-18T13:44:27.630Z",
      "__v": 0
    },
    {
      "_id": "64df75bb328a56e04b7be268",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-18T13:44:27.630Z",
      "__v": 0
    },
    {
      "_id": "64df75bb328a56e04b7be268",
      "user": "64af966f462059b0e5f7a8d0",
      "title": "My title",
      "description": "My description",
      "tag": "Personal",
      "date": "2023-08-18T13:44:27.630Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
