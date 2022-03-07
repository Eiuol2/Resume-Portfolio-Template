import Axios from 'axios'
import React, { Component } from 'react'


export class SinglePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            singlePost: {},
            error: {
                message: '',
                code: ''
            },
            isloading: false,
            show: false
        }

    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {

        this.setState(pre => ({
            isloading: true
        }))
        let id = this.props.match.params.id
        Axios.get('/posts/' + id).then(res => {
            this.setState({ ...this.state.singlePost, singlePost: res.data, isloading: false });
            return Axios.get("/profile/bycreator/" + res.data.creator)
        }).then(data => {
            this.setState({ ...this.state.singlePost, user: data.data.profile, isloading: false });
        }).catch(e => {
                this.setState({
                    isloading: false,
                    error: {
                        ...this.state.error, message: e.response.data.message,
                        code: e.response.status
                    }
                });
            })

    }


    deletePost=(id)=>{
        this.setState(pre => ({
            isloading: true
        }))
       Axios.delete("/posts/"+id).then(data=>{
        this.setState(pre => ({
            isloading: false
        }))
        this.props.history.push('/mypost')
       })
       .catch(e=>{
        this.setState({
            isloading: false,
            error: {
                ...this.state.error, message: e.response.data.message,
                code: e.response.status
            }
        });
       })
    }


}

export default SinglePost