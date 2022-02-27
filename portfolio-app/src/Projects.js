import React from "react"
import { Routes, Route, Link } from "react-router-dom"

function Projects() {
  return (
    <div>
      <main>
        <h1> My Projects </h1>
        <p> This is the page that will showcase your projects. </p>
      </main>
      <nav>
        <Link to="/profile">My Profile</Link>
        <Link to="/">Home</Link>
        <Link to="/resume">Resume</Link>
      </nav>
    </div>
  )
}

export default Projects
