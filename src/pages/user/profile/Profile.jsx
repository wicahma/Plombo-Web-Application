import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import MainSection from "../../../components/profile/MainSection";

export class Profile extends Component {
  render() {
    return (
      <div className="container-md uNavbar mt-4">
        <MainSection />
        <Outlet />
      </div>
    );
  }
}

export default Profile;
