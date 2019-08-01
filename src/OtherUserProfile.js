import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import App from "./app.js";
import ProfilePic from "./profilepic";
import FriendButton from "./friendrequest";

export default class OtherUserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const oppId = this.props.match.params.id;
    axios
      .get("/api-user-id/" + oppId)
      .then(res => {
        // console.log("result ..: ", result.data);
        if (res.data == "false") {
          this.props.history.push("/");
          return;
        } else {
          this.setState({
            id: res.data.id,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            bio: res.data.bio,
            image: res.data.image,
          });
        }
      })
      .catch(err => {
        console.log("err in : ", err);
      });
  }

  render() {
    return (
      <div>
        <ProfilePic image={this.state.image} />

        <p> 
          <b>User Name:</b> {this.state.firstname} {this.state.lastname}
        </p>
        <p className="mb-3">
          <b>Biography:</b> {this.state.bio}
        </p>
        <FriendButton oppId={this.props.match.params.id} />
      </div>
    );
  }
}

// if user1 path = user1 => redirect to profile (  this.props.history.push('/');  )
