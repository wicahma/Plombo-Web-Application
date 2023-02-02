import React from "react";
import EditorComponent from "../../components/Editor";

const FormWisata = (props) => {
  const maps = {
    center: {
      lat: -6.1753924,
      lng: 106.8249641,
    },
    zoom: 11,
  };

  return (
    <div>
      <h1>Posting Wisata</h1>
      <form className="mx-auto inner-form row">
        <div className="col-sm-12 mb-3">
          <label htmlFor="judul" className="form-label">
            Nama Tempat Wisata
          </label>
          <input type="text" className="form-control" id="judul" />
        </div>
        <div className="col-sm-4 mb-1">
          <label htmlFor="biaya" className="form-label">
            Biaya Masuk
          </label>
          <input type="number" className="form-control" id="biaya" />
        </div>

        <div className="col-sm-4 mb-1">
          <label htmlFor="Rating" className="form-label">
            rating
          </label>
          <input
            type="number"
            max={5}
            min={1}
            className="form-control"
            id="Rating"
          />
        </div>

        <div className="col-sm-4 mb-1">
          <label htmlFor="tempuh" className="form-label">
            Perkiraan Waktu Tempuh
          </label>
          <input
            aria-describedby="tempuhHelp"
            step={"1"}
            type="number"
            max={12}
            min={1}
            className="form-control"
            id="tempuh"
          />
          <div id="tempuhHelp" className="form-text">
            <p className="m-0">Masukkan perkiraan waktu dalam jam</p>
          </div>
        </div>
        <div className="col-sm-12">
          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
        </div>
        <div className="col-sm-12 mb-3">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi
          </label>
          <EditorComponent />
        </div>

        <div className="col-sm-12 mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="validate" />
          <label className="form-check-label" htmlFor="validate">
            Sudah benar semua?
          </label>
        </div>
        <div className="col-sm-3">
          <button type="submit" className=" ms-auto  btn btn-primary">
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormWisata;
