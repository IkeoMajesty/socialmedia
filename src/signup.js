import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Singup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            password: "",
            email: "",
            error: false,
        };

        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ ...this.state,  [event.target.name]: event.target.value });
    }

    signup() {
        axios
            .post("/welcome", {
              
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            })
            .then(data => {
                // console.log(data);
                if (data.data) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.error && <div className="error">try again</div>}
                <div className="all-inputs">
                    <h3>Sign Up</h3>
                    <input
                        className="input-signup"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        className="input-signup"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
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
                        <button className="btn bg-success text-white mr-4" onClick={this.signup}>
              Register
                        </button>
                        <Link className="btn bg-warning text-white" to="/login">
              Log in
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
