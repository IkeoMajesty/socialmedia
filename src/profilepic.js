import React from "react";
import { HashRouter, Route } from "react-router-dom";
import App from "./app";

export default function ProfilePic(props) {
  const image =
    props.image ||
    "https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275";
  return <img title="Change Avatar" className="profilepic pic" onClick={props.clickHandler} src={image} />;
}
