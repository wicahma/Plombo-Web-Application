import React from "react";
import DestinasiCards from "./DestinasiCards";

const PantaiDest = (props) => {
  console.log("data paintai", props.dataPantai);
  return (
    <div className="row">
      <div className="col-sm-12 mt-3">
        <div className="dest-header">
          <h3>Pantai</h3>
        </div>
      </div>
      {props.dataPantai === undefined ? (
        <DestinasiCards />
      ) : props.dataPantai.length === 0 ? (
        <DestinasiCards />
      ) : (
        props.dataPantai.map((data) => {
          return (
            <DestinasiCards
              key={data._id}
              img={data.gambar}
              judul={data.namaTempat}
              lokasi={data.lokasi}
              biaya={data.biaya}
              rating={data.rating}
            />
          );
        })
      )}
    </div>
  );
};

export default PantaiDest;
