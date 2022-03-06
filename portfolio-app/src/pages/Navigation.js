import { Navbar, Nav, Container } from "react-bootstrap"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
class Navigation extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="sm"
        fixed="top"
        className="bg-light justify-content-between"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              Resumix
              {/* <img src={my_image} alt='my alt text' className='profile-header'/> */}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/resume">
                <Nav.Link>Resume</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/projects" activeClassName="selectedMenuItem">
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile" activeClassName="selectedMenuItem">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register" activeClassName="selectedMenuItem">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login" activeClassName="selectedMenuItem">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              {/* <Navbar.Text>
                <Title />
              </Navbar.Text> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  //   render() {
  //     return (
  //       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //         <Link className="navbar-brand" to="/">
  //           {" "}
  //           Resumix{" "}
  //         </Link>
  //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //           <ul className="navbar-nav ml-auto">
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/">
  //                 Home
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/resume">
  //                 Resume
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/projects">
  //                 Projects
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/profile">
  //                 Profile
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/register">
  //                 Register
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/login">
  //                 Login
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav>
  //     )
  //   
}

export default Navigation