import React from "react";
import DestinasiCards from "./DestinasiCards";

const Lainnya = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 mt-3">
        <div className="dest-header">
          <h3>Lainnya</h3>
        </div>
      </div>
      {props.dataLainnya === undefined ? (
        <DestinasiCards />
      ) : props.dataLainnya.length === 0 ? null : (
        props.dataLainnya.map((data) => {
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

export default Lainnya;
