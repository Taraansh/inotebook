import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

export default function Navbar() {
  const location = useLocation();
  const {user, handleLogout} = useContext(noteContext)

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {!user ? (
              <>
                <Link
                  to="/Login"
                  role="button"
                  className="btn btn-primary mx-1"
                >
                  Login
                </Link>
                <Link
                  to="/Signup"
                  role="button"
                  className="btn btn-primary mx-1"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary mx-1">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
