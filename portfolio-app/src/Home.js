import React from "react"
import { Routes, Route, Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <main>
        <h1> Welcome to Resumix! </h1>
        <p> This is the homepage. description goes here...</p>
      </main>
      <nav>
        <Link to="/profile"> Profile </Link>
        <Link to="/resume"> Resume </Link>
        <Link to="/projects"> Projects </Link>
      </nav>
    </div>
  )
}

export default Home
