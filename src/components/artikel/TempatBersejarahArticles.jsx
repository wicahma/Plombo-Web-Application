import React from "react";
import OtherArticles from "./OtherArticles";

const TempatBersejarahArticles = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 my-3">
        <div className="artikel-header">
          <h3>Tempat Bersejarah</h3>
        </div>
      </div>
      {props.dataTempat === undefined ? (
        <OtherArticles />
      ) : props.dataTempat.length === 0 ? null : (
        props.dataTempat.map((data) => {
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

export default TempatBersejarahArticles;
