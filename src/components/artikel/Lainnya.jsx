import React from "react";
import Empty from "../micro/Empty";
import OtherArticles from "./OtherArticles";

const Lainnya = (props) => {
  return (
    <div className="row">
      <div className="col-sm-12 my-3">
        <div className="artikel-header">
          <h3>Lainnya</h3>
        </div>
      </div>
      {props.dataLainnya === undefined ? (
        <OtherArticles />
      ) : props.dataLainnya.length === 0 ? <Empty msg="Belum ada Artikel tentang lainnya" /> : (
        props.dataLainnya.map((data) => {
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

export default Lainnya;
