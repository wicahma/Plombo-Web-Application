import React from "react";
import Empty from "../micro/Empty";
import DestinasiCards from "./DestinasiCards";

const PulauDest = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 mt-3">
        <div className="dest-header">
          <h3>Pulau</h3>
        </div>
      </div>
      {props.dataPulau === undefined ? (
        <DestinasiCards />
      ) : props.dataPulau.length === 0 ? (
        <Empty msg="Belum ada Destinasi tentang Air Terjun" />
      ) : (
        props.dataPulau.map((data) => {
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

export default PulauDest;
