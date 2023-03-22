import React, { Component } from "react";
import "../../main.css";
import Breadcrumb from "../../components/Breadcrumb";
import MostDestinasiContainer from "../../components/destinasi/MostDestinasiContainer";
import AnotherDestinasiContainer from "../../components/destinasi/AnotherDestinasiContainer";

class Destinasi extends Component {
  render() {
    return (
      <div className="container-fluid uNavbar">
        <Breadcrumb pages={[{ name: "Destinasi Wisata" }]} />
        <div className="mx-5">
          <MostDestinasiContainer />
          <AnotherDestinasiContainer />
        </div>
      </div>
    );
  }
}

export default Destinasi;
