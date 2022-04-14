import React from "react";
import FileUpload from "../fileupload";

function Resume() {
  return (
    <div>
      <main>
        <h1> My Resume </h1>
        <p> This is the page that will display your resume </p>
      </main>
      <div className="pdf">
        <FileUpload />
      </div>
    </div>
  );
}

export default Resume;
