import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ReadDestinasi from "../../components/destinasi/ReadDestinasi";

const DestinasiRead = () => {
  const { namaDestinasi, idDestinasi } = useParams();
  return (
    <div className="container-md uNavbar">
      <Breadcrumb
        pages={[
          { name: "Destinasi", to: "/destinasi" },
          { name: namaDestinasi.slice(0,20) + "..." },
        ]}
      />
      <ReadDestinasi />
    </div>
  );
};

export default DestinasiRead;
