import React, { useState, useEffect } from "react"
import axios from "axios"
import Profile from "./Profile"
import Navigation from "./Navigation"
import "bootstrap/dist/css/bootstrap.min.css"
import FileUpload from "./fileupload"

import "./styling/MyApp.css"
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"
import Projects from "./components/Projects"
import Home from "./components/Home"
import Resume from "./components/Resume"

function MyApp() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/home"} className="nav-link">
                  Resumix
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
              <Nav>
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/resume"} className="nav-link">
                    Resume
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/posts-list"} className="nav-link">
                    Projects
                  </Link>
                </Nav>
                {/* <Nav>
                  <Link to={"/create-post"} className="nav-link">
                    Profile
                  </Link>
                </Nav> */}
                <Nav>
                  <Link to={"/create-post"} className="nav-link">
                    Create Post
                  </Link>
                </Nav>
                {/* <Nav>
                  <Link to={"/posts-list"} className="nav-link">
                    Posts List
                  </Link>
                </Nav> */}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <CreatePost {...props} />}
                  />
                  <Route
                    exact
                    path="/home"
                    component={(props) => <Home {...props} />}
                  />
                  <Route
                    exact
                    path="/resume"
                    component={(props) => <Resume {...props} />}
                  />
                  <Route
                    exact
                    path="/create-post"
                    component={(props) => <CreatePost {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-post/:id"
                    component={(props) => <EditPost {...props} />}
                  />
                  <Route
                    exact
                    path="/posts-list"
                    component={(props) => <Projects {...props} />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}

export default MyApp
