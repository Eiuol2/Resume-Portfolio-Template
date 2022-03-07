
   
import Axios from 'axios'
import React, { Component } from 'react'



export class PostList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            users: [],
            isloading: false
        }

    }

    componentDidMount() {
        this.setState(pre => ({
            isloading: true
        }))
        Promise.all([
            Axios.get('/posts'),
        ]).then(data => {
            this.setState(pre => ({
                isloading: false
            }))
            this.setState({ ...this.state.posts, posts: data[0].data.posts });
        })
            .catch(e => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
    }
  

}