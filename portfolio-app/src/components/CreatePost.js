import axios from "axios"
import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const creatPostbutton = <Button
                          variant="danger"
                          size="lg"
                          block="block"
                          type="submit"
                          className="mt-4"
                        >
                        Create Post                        </Button>

class CreatePost extends Component {
  constructor(props) {
    super(props)

    this.onChangePostTitle = this.onChangePostTitle.bind(this)
    this.onChangePostDescription = this.onChangePostDescription.bind(this)
    this.onChangeContent = this.onChangeContent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      title: "",
      description: "",
      content: "",
    }
  }

  onChangePostTitle(e) {
    this.setState({ title: e.target.value })
  }
  onChangePostDescription(e) {
    this.setState({ description: e.target.value })
  }
  onChangeContent(e) {
    this.setState({ content: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const postObject = {
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
    }
    axios
      .post("http://localhost:5016/posts/create-post", postObject)
      .then((res) => console.log(res.data))
    this.setState({ title: "", description: "", content: "" })
  }

  render() {
    return (
      <div class="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title of Post</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={this.state.title}
              onChange={this.onChangePostTitle}
            />
          </Form.Group>
          <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description of post here..."
              value={this.state.description}
              onChange={this.onChangePostDescription}
            />
          </Form.Group>
          <Form.Group controlId="Content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={this.state.content}
              onChange={this.onChangeContent}
            />
          </Form.Group>

          <Link to="/create-post">
            {creatPostbutton}
          </Link>
         
          {/* <Button
            variant="danger"
            size="lg"
            block="block"
            type="submit"
            className="mt-4"
          >
            Create Post
          </Button> */}
        </Form>
      </div>
    )
  }
}

export default CreatePost
