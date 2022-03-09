import React, { Component } from "react"
import axios from "axios"
import { Card } from "react-bootstrap"
import "../styling/box.css"

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
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

  render() {
    const renderCard = (res, index) => {
      return (
        <Card style={{ width: "18rem" }} key={index} className="box">
          <Card.Img variant="top" src="holder.js/100px180" src={res.content} />
          <Card.Body>
            <Card.Title>{res.title}</Card.Title>
            <Card.Text>{res.description}</Card.Text>
          </Card.Body>
        </Card>
      )
    }
    return <div className="grid">{this.state.posts.map(renderCard)}</div>
  }
}

export default PostsList
