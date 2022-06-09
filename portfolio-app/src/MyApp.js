import React, { useState, useEffect } from "react"
import axios from "axios"
import Home from "./Home"
import Projects from "./Projects"
import Resume from "./Resume"
import Profile from "./Profile"
import Navigation from "./Navigation"
import "bootstrap/dist/css/bootstrap.min.css"
import FileUpload from "./fileupload"

import "./styling/MyApp.css"
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"
import PostsList from "./components/PostsList"

function MyApp() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-post"} className="nav-link">
                  Resumix
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-post"} className="nav-link">
                    Create Post
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/posts-list"} className="nav-link">
                    Posts List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/resume"} className="nav-link">
                    Resume
                  </Link>
                </Nav>


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
                    component={(props) => <PostsList {...props} />}
                  />
                  <Route
                    exact
                    path="/resume"
                    component={(props) => <Resume {...props} />}
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
