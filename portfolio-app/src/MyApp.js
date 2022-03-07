import React, { useState, useEffect } from "react"
import Table from "./Table"
import Form from "./Form"
import axios from "axios"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home"
import Projects from "./Projects"
import Resume from "./Resume"
import Profile from "./Profile"
import Navigation from "./Navigation"
import "bootstrap/dist/css/bootstrap.min.css"
import './pdf.css'
import FileUpload from "./fileupload"

import CreatePost from "./Component/PostCreate"
import PostList from "./Component/PostList"
import SinglePost from "./Component/SinglePost"


function MyApp() {
  const [characters, setCharacters] = useState([])

  async function removeOneCharacter(index) {
    makeDeleteCall(index).then((result) => {
      if (result && result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        })
        setCharacters(updated)
      }
    })
  }

  async function makeDeleteCall(index) {
    try {
      const response = await axios.delete(
        "http://localhost:5016/resume/" + characters[index]._id
      )
      return response
    } catch (error) {
      //We are not handling errors, just logging into the console
      console.log(error)
      return false
    }
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 200)
        setCharacters([...characters, result.data])
    })
  }

  // uses axios to make the GET request which will return the data which we'll use to mount our table of characters on the frontend
  async function fetchAll() {
    try {
      // await only works inside async functions
      const response = await axios.get("http://localhost:5016/resume")
      return response.data.texts
    } catch (error) {
      //We are not handling errors, just logging into the console
      console.log(error)
      return false
    }
  }

  // calling axios.post and passing the JSON object (person) that will
  // go into the body of the post request.
  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:5016/resume", person)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //this hook is only called when the MyApp component first mounts so that we only fetch
  //the data once to build the table the 1st time. to do this, pass [] as an argument!
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result)
    })
  }, [characters])

  return (
    <div className="App">
      <div className="navbar">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="resume" element={<Resume />} />
        </Routes>
      </div>
      {/* <div className="table">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div> */}
    </div>
  )
}

//makes component available to be imported into other modules
export default MyApp


