import React from "react";
import { useParams } from "react-router-dom";
import "../../stores/store";
import ReadArtikel from "../../components/artikel/ReadArtikel";
import Breadcrumb from "../../components/Breadcrumb";

const ArtikelRead = (props) => {
  const { namaArtikel } = useParams();

  return (
    <div className="mt-4">
      <div className="container-sm">
        <Breadcrumb
          pages={[
            { name: "Artikel", to: "/artikel" },
            { name: namaArtikel.slice(0, 20) + "..." },
          ]}
        />
        <ReadArtikel />
      </div>
    </div>
  );
};

export default ArtikelRead;
