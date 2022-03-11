 import React from "react"
 import FileUpload from "./fileupload"
 import { Parser } from 'html-to-react'

 const rawHtml = `<!DOCTYPE html>
 <html>
 
 <head>
     <meta charset="utf-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <title>Upload Files</title>
     <meta name="viewport" content="width=device-width, initial-scale=1">
 </head>
 
 <body>
 
     <form action="/upload" method="POST" enctype="multipart/form-data">
         <input type="text" name="name" placeholder="File Name.." /><br />
         <input type="file" name="uploadedFile" /> <br /> <br />
         <input type="submit" value="Upload File" />
     </form>
 
     <form action="/download" method="GET">
         <input type="submit" value="Download File" />
     </form>
 </body>
 
 </html>`


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
   )
 }

 export default Resume
