import React from "react"
import { Routes, Route, Link } from "react-router-dom"

function Profile() {
  return (
    <div>
      <main>
        <h1> My Profile </h1>
        <p>
          {" "}
          This is the profile page. It will include profile photo, about me,
          major, etc
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/resume"> Resume </Link>
        <Link to="/projects"> Projects </Link>
      </nav>
    </div>
  )
}

export default Profile
