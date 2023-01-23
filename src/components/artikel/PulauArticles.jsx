import React from "react";
import OtherArticles from "./OtherArticles";

const PulauArticles = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 my-3">
        <div className="artikel-header">
          <h3>Pulau</h3>
        </div>
      </div>
      {props.dataPulau === undefined ? (
        <OtherArticles />
      ) : props.dataPulau.length === 0 ? null : (
        props.dataPulau.map((data) => {
          return (
            <OtherArticles
              key={data._id}
              id={data._id}
              uploader={data.uploaderID.nama}
              updatedAt={data.updatedAt}
              judul={data.judul}
              deskripsi={data.deskripsi}
              img={data.gambar}
            />
          );
        })
      )}
    </div>
  );
};

export default PulauArticles;
