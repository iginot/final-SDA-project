import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FileApi from "../../api/FileApi";

class ProfilePic extends Component {
  state = {
    selectedFile: null,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile
      // this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);

    FileApi.uploadImage(formData);
    window.location.reload();
  };

  onFileDownload = () => {
    FileApi.getImage();
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h6>File Details:</h6>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h5>Upload Image</h5>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default ProfilePic;
