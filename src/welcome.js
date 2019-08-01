import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

export default function Welcome() {
    return (
        <div>
      
            <h2 className="welcome" />

            <HashRouter>
                <div>
                    <Route exact path="/" component={Signup} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
