import React, { useState } from "react"

function Form(props) {
  const [person, setPerson] = useState({
    user: "",
    text: "",
  })


  function handleChange(event) {
    const { name, value } = event.target
    if (name === "text") setPerson({ user: person["user"], text: value })
    else setPerson({ user: value, text: person["text"] })
  }

  function submitForm() {
    props.handleSubmit(person)
    setPerson({ user: "", text: "" })
  }

  return (
    <form>
      <embed src={"http://localhost:5016/pdfs/annotations.pdf"} type="application/pdf"></embed>
      <label htmlFor="user">User</label>
      <input
        type="text"
        name="user"
        _id="user"
        value={person.user}
        onChange={handleChange}
      />
      <label htmlFor="Text">Text</label>
      <input
        type="text"
        name="text"
        _id="text"
        value={person.text}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  )
}

export default Form
