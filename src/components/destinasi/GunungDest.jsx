import React from "react";
import Empty from "../micro/Empty";
import DestinasiCards from "./DestinasiCards";

const GunungDest = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 mt-3">
        <div className="dest-header">
          <h3>Gunung / Bukit</h3>
        </div>
      </div>
      {props.dataGunung === undefined ? (
        <DestinasiCards />
      ) : props.dataGunung.length === 0 ? <Empty msg="Belum ada Destinasi tentang Gunung" /> : (
        props.dataGunung.map((data) => {
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

export default GunungDest;
