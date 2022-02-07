import React from "react"

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>User</th>
        <th>Text</th>
        <th>ID</th>

        <th>Remove</th>
      </tr>
    </thead>
  )
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.user}</td>
        <td>{row.text}</td>
        <td>{row._id}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  )
}

export default Table
