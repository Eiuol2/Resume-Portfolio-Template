import React, { Component } from "react"
import axios from "axios"
import { Button, Card } from "react-bootstrap"
import "../styling/box.css"
import { Link } from "react-router-dom"
import CardHeader from "react-bootstrap/esm/CardHeader"

const addProjects = <Button className="add-projects">Add New Project</Button>

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
    this.deletePost = this.deletePost.bind(this)
  }
  componentDidMount() {
    axios
      .get("http://localhost:5016/posts/")
      .then((res) => {
        this.setState({
          posts: res.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deletePost() {
    // error rn: don't know how to get the right id for the post??
    console.log("id is: " + this.props._id)
    axios
      .delete("http://localhost:5016/posts/delete-post/" + this.props._id)
      .then((res) => {
        console.log("Post successfully deleted!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const renderCard = (res, index) => {
      return (
        <Card style={{ width: "18rem" }} key={index} className="box">
          <Card.Img variant="top" src="holder.js/100px180" src={res.content} />
          <Card.Body>
            <Card.Title>{res.title}</Card.Title>
            <Card.Text>{res.description}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Link className="edit-link" to={"/edit-post/" + res._id}>
              Edit
            </Link>
            <Button onClick={this.deletePost} size="sm" variant="danger">
              Delete
            </Button>
          </Card.Footer>
        </Card>
      )
    }
    return(
      <>
      <Link to="/create-post">
        {addProjects}
      </Link>
      <div className="grid">{this.state.posts.map(renderCard)}</div>
      </>
    )
  }
}

export default Projects
