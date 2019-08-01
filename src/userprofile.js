import React from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";
import Biography from "./biography";

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile">
        <h4>
          <div><b>First Name:</b> {this.props.firstname}</div>
          <div><b>Last Name:</b> {this.props.lastname}</div>
        </h4>
        <ProfilePic
          className="user"
          image={this.props.image}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          id={this.props.id}
          clickHandler={this.props.showUploader}
        />
        <div className="biography">
          <Biography bio={this.props.bio} setBio={this.props.setBio} />
        </div>
      </div>
    );
  }
}
