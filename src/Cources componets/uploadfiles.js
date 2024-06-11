import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import DeleteIcon from '@mui/icons-material/Delete';
import './Uploaded.css'; // Import CSS file for styling
import { Button } from "@material-ui/core";
import axios from "axios";

const fileTypes = ["XLSX"];

export default function Uploaded() {
  const [files, setFiles] = useState([]);

  const handleChange = (newFiles) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    console.log(FormData);

    axios.post("https://mostafasallam.pythonanywhere.com/upload_file", formData)
      .then((response) => {
        
        console.log(response.data);

        // Handle success
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        // Handle error
      });
  };

  return (
    <div className="uploaded-container">
      <h1>Drag & Drop Files</h1>
      <FileUploader 
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <h2>Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <span className="file-name">{file.name}</span>
            <button className="delete-button" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
    </div>
  );
}
