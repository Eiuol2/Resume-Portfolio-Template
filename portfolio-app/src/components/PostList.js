import React, { Component } from "react"
import { Axios } from "axios"

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      users: [],
      isloading: false,
    }
  }

  componentDidMount() {
    this.setState((pre) => ({
      isloading: true,
    }))
    Promise.all([Axios.get("/posts")])
      .then((data) => {
        this.setState((pre) => ({
          isloading: false,
        }))
        this.setState({ ...this.state.posts, posts: data[0].data.posts })
      })
      .catch((e) => {
        this.setState((pre) => ({
          isloading: false,
        }))
      })
  }

  render() {
    let fetchedposts
    if (this.state.posts) {
      fetchedposts = this.state.posts.map((post, index) => (
        <ShowPost key={index} {...post} {...index} />
      ))
    }

    return (
      <div>
        <div className="container hero">
          <div className="row align-items-center text-center text-md-left">
            <div className="col-lg-4">
              <h1 className="mb-3 display-3">Share your cool projects here!</h1>
              <p>Login or Register</p>
            </div>
            {/* <div className="col-lg-8">
              <img src={img1} className="img-fluid" alt="img" />
            </div> */}
          </div>
        </div>
        <div className="container hero py-5">
          <div className="row">
            <div className="col-md-8 col-xs-12">
              <div className="row">{fetchedposts}</div>
            </div>

            {/* <div className="col-md-4 col-xs-12 pl-4">
              <h3 className="mb-4"> Popular Writers</h3>
              <hr></hr>
              {allUsers}
            </div> */}
          </div>
        </div>

        {/* <div className="container loading">{isLoading}</div> */}
      </div>
    )
  }
}

export default PostList
