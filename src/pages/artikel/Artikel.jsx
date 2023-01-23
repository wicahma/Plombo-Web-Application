import React, { Component } from "react";
import AnotherArticles from "../../components/artikel/AnotherArticles";
import NewestArticles from "../../components/artikel/NewestArticles";
import Breadcrumb from "../../components/Breadcrumb";

class Artikel extends Component {
  render() {
    return (
      <div className="container-fluid uNavbar">
        <Breadcrumb pages={[{ name: "Artikel" }]} />
        <div className="mx-5">
          <NewestArticles />
          <AnotherArticles />
        </div>
      </div>
    );
  }
}

export default Artikel;
