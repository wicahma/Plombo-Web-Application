import React from "react";
import DestinasiCards from "./DestinasiCards";

const MomumentDest = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 mt-3">
        <div className="dest-header">
          <h3>Tempat Bersejarah</h3>
        </div>
      </div>
      {props.dataMonumen === undefined ? (
        <DestinasiCards />
      ) : props.dataMonumen.length === 0 ? (
        <DestinasiCards />
      ) : (
        props.dataMonumen.map((data) => {
          return (
            <DestinasiCards
              key={data._id}
              id={data._id}
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

export default MomumentDest;
