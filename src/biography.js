import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Biography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftBio: false,
      bio: " "
    };

    this.uploadBio = this.uploadBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
  }

  handleChange(e) {
    this.setState({
      bio: e.target.value
    });
  }

  showTextarea() {
    this.setState({
      draftBio: true
    });
  }

  hideTextarea() {
    this.setState({
      draftBio: false
    });
  }

  uploadBio() {
    axios
      .post("/usersbio", {
        bio: this.state.bio
      })
      .then(result => {
        this.setState({
          draftBio: false
        });
        this.props.setBio(result.data.bio);
      });
  }

  render() {
    if (this.state.draftBio) {
      return (
        <div className="mt-4">
          <p><b>Biography: </b>{this.state.bio}</p>
          <textarea
            className="bio-textarea"
            defaultValue={this.props.bio}
            onChange={this.handleChange}
          />
          <button className="btn text-white bg-success mx-4" onClick={this.uploadBio}>
            Save
          </button>
          <button className="btn text-white bg-warning" onClick={this.hideTextarea}>
            Cancel
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.props.bio}</p>
          <button className="btn bg-success text-white" onClick={this.showTextarea}>
            Edit Bio
          </button>
        </div>
      );
    }
  }
}
