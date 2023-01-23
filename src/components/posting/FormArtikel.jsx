import HtmlToReactParser from "html-react-parser";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import EditorComponent from "../../components/Editor";
import "react-quill/dist/quill.snow.css";
import PreviewUpload from "../artikel/PreviewUpload";
import { useSelector } from "react-redux";
import { user } from "../../stores/reducers/user/usersSlice";

const FormArtikel = (props) => {
  const maxDesc = 20;
  const { data_user } = useSelector(user);
  const [artikel, setArtikel] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState();
  const input_gambar = useRef();
  const parsed = new HtmlToReactParser(deskripsi);

  const handleOnChange = (e) => {
    if (e.target.id === "gambar")
      return setGambar({
        data: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      });
    setArtikel({ ...artikel, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    console.group("Artikel");
    console.log("gambar", gambar);
    console.log("artikel", artikel);
    console.log("deskripsi", deskripsi);
    console.groupEnd();
  }, [artikel, gambar, deskripsi]);

  const handleDelete = (e) => {
    input_gambar.current.value = "";
    setGambar(undefined);
  };
  return (
    <div>
      <h1>Posting Artikel</h1>
      <form className="mx-auto inner-form row">
        <div className="col-sm-6 mb-3">
          <label htmlFor="judul" className="form-label">
            Judul Artikel
          </label>
          <input
            type="text"
            onChange={(e) => handleOnChange(e)}
            className="form-control"
            id="judul"
          />
        </div>

        <div className="col-sm-6 mb-1">
          <label htmlFor="jenisWisata" className="form-label">
            Jenis Wisata
          </label>
          <select
            defaultValue={""}
            className="form-select form-control"
            name="jenisWisata"
            id="jenisWisata"
            required
            onChange={(e) => handleOnChange(e)}
          >
            <option value="" disabled>
              None
            </option>
            <option value="Pantai">Pantai</option>
            <option value="Gunung/Bukit">Gunung/Bukit</option>
            <option value="Pulau">Pulau</option>
            <option value="Air Terjun">Air terjun</option>
            <option value="Tempat Bersejarah">Tempat bersejarah</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="col-sm-12 mb-2">
          <label htmlFor="deskripsi" className="form-label">
            Deskripsi
          </label>
          <EditorComponent value={(e) => setDeskripsi(e)} maxDesc={maxDesc} />
        </div>

        <div class="input-group col-sm-12 mb-5">
          <input
            ref={input_gambar}
            type="file"
            class="form-control"
            accept="image/*"
            onChange={(e) => handleOnChange(e)}
            id="gambar"
          />
          <label
            class="input-group-text"
            onClick={(e) => handleDelete(e)}
            for=""
          >
            Hapus gambar
          </label>
        </div>

        <div className="w-100 article-preview">
          <h2 className="preview-label">Preview</h2>
          <PreviewUpload
            deskripsi={parsed}
            image={gambar === undefined ? "" : gambar.preview}
            title={artikel === undefined ? "Tampilan judul" : artikel.judul}
            jenisWisata={
              artikel === undefined
                ? "Tampilan jenis Wisata"
                : artikel.jenisWisata
            }
            uploader={
              data_user === undefined ? "Tampilan uploader" : data_user.nama
            }
          />
        </div>

        <div className="form-check col-sm-12 mb-3 ms-3">
          <input type="checkbox" className="form-check-input" id="validate" />
          <label className="form-check-label" htmlFor="validate">
            Sudah benar semua?
          </label>
        </div>
        <div className="col-sm-12 mb-2 d-flex justify-content-end">
          <button type="submit" className=" ms-auto  btn btn-primary">
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArtikel;
