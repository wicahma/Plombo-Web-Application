import React from "react";

const PreviewUpload = (props) => {
  return (
    <>
      <div
        className="row img-article-preview m-auto mt-3"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundColor: "var(--hitam-hover)",
        }}
      ></div>
      <div className="col-sm-12 isi-article-preview">
        <div className="row header-article-preview">
          <h1 className="judul-artikel-preview p-0">{props.title}</h1>
          <p className="mb-5 p-0">WISATA - {props.jenisWisata}</p>
          <div className="header-desc d-flex flex-row justify-content-between mt-3 p-0">
            <p className="m-0">{props.uploader}</p>
            <p className="m-0">
              Selasa, 31 Mei 2022 | 08:59 WIB {props.date} | {props.time}
            </p>
          </div>
        </div>

        <div className="row read-article pt-4">
          <div className="col-md-12 px-0 teks-article">{props.deskripsi}</div>
        </div>
      </div>
    </>
  );
};

export default PreviewUpload;
