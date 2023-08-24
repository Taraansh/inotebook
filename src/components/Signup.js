import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Signup() {
    const {handleSignup} = useContext(noteContext)

  return (
    <div>
      <form onSubmit={(e) => handleSignup(e)}>
        <h2>Signup</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
          Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            autoComplete="name"
            required
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            autoComplete="email"
            required
            placeholder="Email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Password"
            autoComplete="current-password"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
