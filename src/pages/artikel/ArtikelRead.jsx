import React from "react";
import { useParams } from "react-router-dom";
import rounded_footer from "../../assets/img/rounded-footer.svg";
import svgPojok from "../../assets/img/sgtPojok-white.svg";
import images from "../../assets/img/pantai.png";
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
