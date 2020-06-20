import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./bootstrap";

import App from "./pages/App";

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
