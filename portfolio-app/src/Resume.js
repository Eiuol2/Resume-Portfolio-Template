import React from "react"
import { Routes, Route, Link } from "react-router-dom"

function Resume() {
  return (
    <div>
      <main>
        <h1> My Resume </h1>
        <p> This is the page that will display your resume </p>
      </main>
      <nav>
        <Link to="/profile"> Profile </Link>
        <Link to="/"> Home </Link>
        <Link to="/projects"> Projects </Link>
      </nav>
    </div>
  )
}

export default Resume
