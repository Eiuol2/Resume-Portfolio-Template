import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styling/box.css";





class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.cookies.auth_token}` },
    }
    axios
      .get("http://localhost:5016/posts/", config)
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  
  async delFunc(index) {
      console.log("inside delFunc")
      const post = this.state.posts[index];
        const config = {
          headers: { Authorization: `Bearer ${this.props.cookies.auth_token}` },
        }
      const response = await axios.delete("http://localhost:5016/posts/delete-post/" + post._id, config);
      if (response && response.status == 204) {
        console.log("in response");
        const updated = this.state.posts.filter((p, i) => {
          return i !== index;
        })
        this.setState({posts:updated});

      }
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
          <Button onClick={ () => this.delFunc(index)}> Delete </Button>
        </Card>
      );
    };
    return (
      <>
        <Button>Add New Project</Button>
        <div className="grid">{this.state.posts.map(renderCard)}</div>
      </>
    );
  }
}

export default PostsList;
