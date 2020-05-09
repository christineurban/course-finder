import React from "react";
import ReactDOM from "react-dom";

import CourseFinder from "./CourseFinder";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CourseFinder />
  </React.StrictMode>,
  rootElement
);
