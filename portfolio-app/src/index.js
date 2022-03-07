import React from "react"
import ReactDOM from "react-dom"
import MyApp from "./MyApp"
import "./styling/index.css"
import { BrowserRouter } from "react-router-dom"

//import * as serviceWorker from "./serviceWorker"
import axios from "axios"

import "bootstrap/dist/css/bootstrap.css"

import "jquery/dist/jquery.js"
setInterval(async () => {
  axios
    .get("http://localhost:3000/api/test")
    .then((data) => {
      console.log(data)
    })
    .catch((e) => {
      console.log(e.response)
    })
}, 60 * 1000)

axios.defaults.baseURL = "http://localhost:3000/api"
let userData = JSON.parse(localStorage.getItem("userData"))
let token
if (userData) {
  token = userData.token
}

//axios.defaults.headers.common['Authorization'] = {'Authorization': `Bearer ${token}`};
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.request.use(
  (request) => {
    //    console.log(request)

    // Edit request config
    return request
  },
  (error) => {
    //  console.log(error);
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    //console.log(response);
    return response
  },
  (error) => {
    console.log(error.response)
    return Promise.reject(error)
  }
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyApp />
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
)
