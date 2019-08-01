import axios from "./axios";
import React from "react";
import ProfilePic from "./profilepic.js";
import Uploadimage from "./uploadimage";
import OtherUserProfile from "./OtherUserProfile";
import FriendButton from "./friendrequest";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import Biography from "./biography.js";
import UserProfile from "./userprofile";
import { initSocket } from "./socket";
import OnlineUsers from "./onlineUsers.js";
import Friends from "./friends.js";
import Chat from "./chat.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      imgUrl: "",
      bio: "",
      uploaderIsVisible: false
    };
    this.showUploader = this.showUploader.bind(this);
    this.hideUploader = this.hideUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setBiography = this.setBiography.bind(this);
  }

  componentDidMount() {
    axios
      .get("/user")
      .then(({ data }) => {
        this.setState({
          ...data
        });
      })
      .catch(err => {
        console.log("err in componentDidMount: ", err);
      });
  }

  setBiography(bio) {
    this.setState({
      bio: bio
    });
  }

  setImage(image) {
    console.log("words");
    this.setState({
      image: image,
      uploaderIsVisible: false
    });
  }

  showUploader() {
    this.setState({ uploaderIsVisible: true });
  }

  hideUploader() {
    this.setState({
      uploaderIsVisible: false
    });
  }

  render() {
    if (!this.state.id) {
      return (
        <img src="https://s3.amazonaws.com/spicedling/Qp5-JQcO8OSoBnaD09_6TRtPmjJPm8AY.png" />
      );
    }
    return (
      <div>
        <BrowserRouter>
          <div>
            <nav
              id="navbar-example3"
              class=" navbar navbar-light nav-pills fixed-top navbar-expand-lg"
            >
              <a className="navbar-brand" href="/">
                <img
                  alt="logo"
                  width="100"
                  height="100"
                  src="https://cdn.shopify.com/s/files/1/1038/1798/products/Customizable-Foil-Logo-Mockup-by-Anthony-Boyd-Graphics-5-1024x768.jpg?v=1525177841"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto mr-5">
                  <li className="nav-item">
                    <Link className="nav-link" to="/Online">
                      Online users{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Your profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Friends">
                      Friends{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Chat">
                      Chat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      {" "}
                      Log out
                    </a>
                  </li>
                  <div className="profilepic mb-sm-2">
                    <ProfilePic
                      image={this.state.image}
                      clickHandler={this.showUploader}
                    />
                  </div>
                </ul>
              </div>
            </nav>
            <div className="container">
              <Route
                exact
                path="/"
                render={props => (
                  <UserProfile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    id={this.state.id}
                    bio={this.state.bio}
                    image={this.state.image}
                    clickHandler={this.showUploader}
                    setBio={this.setBiography}
                  />
                )}
              />
              <Route
                exact
                path="/user/:id"
                render={props => (
                  <OtherUserProfile
                    {...props}
                    currentUserId={this.state.id}
                    key={props.match.url}
                  />
                )}
              />
              <Route exact path="/friends" component={Friends} />
              <Route exact path="/online" component={OnlineUsers} />
              <Route exact path="/chat" component={Chat} />
            </div>
          </div>
        </BrowserRouter>

        {this.state.uploaderIsVisible && (
          <Uploadimage
            setImage={this.setImage}
            hideUploader={this.hideUploader}
          />
        )}
      </div>
    );
  }
}
