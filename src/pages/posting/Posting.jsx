import React, { Component } from "react";
import { Outlet } from "react-router-dom";

class Posting extends Component {
  render() {
    return (
      <div className="container-sm container-posting mt-5">
        <Outlet/>
      </div>
    );
  }
}

export default Posting;
