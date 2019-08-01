import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login() {
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        if (res.data) {
          location.replace("/");
        } else {
          console.log("else in axios in login");
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div className="all-inputs mt-5">
        {this.state.error && <div className="error">try again</div>}
        <h3>Log In</h3>
        <input
          className="input-signup"
          name="email"
          placeholder="Username"
          onChange={this.handleChange}
        />
        <input
          className="input-signup"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <div className="mt-4"> 
          <button className="btn bg-success text-white mr-4" onClick={this.login}>
            Sign In
          </button>
          <Link className="btn bg-warning text-white" to="/">
            Register
          </Link>
        </div>
      </div>
    );
  }
}
