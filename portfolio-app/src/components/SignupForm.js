import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

function SignupForm(props) {
  const [user, setUser] = useState({
    username: "",
    pwd: "",
  })

  const history = useHistory()

  const [message, setMsg] = useState("")

  function submitForm() {
    makeSignupCall(user).then((response) => {
      if (response && response.status === 200) {
        const token = response.data
        setUser({ username: "", pwd: "" })
        setMsg("")
        props.setToken(token)
        // once sign up, then go to home page
        history("/")
      } else {
        console.log(response)
        setMsg("Invalid signup credentials!")
      }
    })
  }

  async function makeSignupCall(user) {
    try {
      const response = await axios.post("http://localhost:5016/signup", user)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <form>
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={(event) => setUser({ ...user, username: event.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="pwd"
        id="pwd"
        value={user.pwd}
        onChange={(event) => setUser({ ...user, pwd: event.target.value })}
      />
      <input type="button" value="Submit" onClick={submitForm} />
      <i> {message} </i>
    </form>
  )
}

export default SignupForm
