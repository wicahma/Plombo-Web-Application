import React from "react";
import Empty from "../micro/Empty";
import ArtikelDownCard from "./ArtikelDownCard";
import OtherArticles from "./OtherArticles";

const PantaiArticles = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 my-3">
        <div className="artikel-header">
          <h3>Pantai</h3>
        </div>
      </div>
      {props.dataPantai === undefined ? (
        <OtherArticles />
      ) : props.dataPantai.length === 0 ? <Empty msg="Belum ada Artikel tentang Pantai" /> : (
        props.dataPantai.map((data) => {
          return (
            <OtherArticles
              key={data._id}
              id={data._id}
              uploader={data.uploaderID.nama}
              updatedAt={data.updatedAt}
              judul={data.judul}
              img={data.gambar}
            />
          );
        })
      )}
    </div>
  );
};

export default PantaiArticles;
