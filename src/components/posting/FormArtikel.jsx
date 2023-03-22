import HtmlToReactParser from "html-react-parser";
import React, { useRef } from "react";
import { useState } from "react";
import EditorComponent from "../../components/Editor";
import "react-quill/dist/quill.snow.css";
import PreviewUpload from "../artikel/PreviewUpload";
import { useSelector } from "react-redux";
import { user } from "../../stores/reducers/user/usersSlice";
import {
  sendDataAPI,
  artikel as dataArtikel,
} from "../../stores/reducers/artikel/artikelAPI";
import Loading from "../micro/Loading";

const FormArtikel = (props) => {
  const maxDesc = 10;
  const { data_user } = useSelector(user);
  const { loading, result } = useSelector(dataArtikel);
  const [artikel, setArtikel] = useState({
    deskripsi: "",
    gambar: "",
    jenisWisata: "",
    judul: "",
  });
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");
  const input_gambar = useRef();
  const parsed = new HtmlToReactParser(
    artikel === undefined || artikel.deskripsi === undefined
      ? ""
      : artikel.deskripsi
  );

  const handleOnChange = (e) => {
    setError("");
    if (e.target.id === "gambar")
      return setArtikel({
        ...artikel,
        gambar: {
          data: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0]),
        },
      });
    setArtikel({ ...artikel, [e.target.id]: e.target.value });
  };

  const handleDelete = (e) => {
    input_gambar.current.value = "";
    setArtikel({ ...artikel, gambar: "" });
  };

  const checkValidity = () => {
    if (
      artikel.judul === "" ||
      artikel.jenisWisata === "" ||
      artikel.deskripsi === "" ||
      artikel.deskripsi === "<p><br></p>" ||
      artikel.gambar === ""
    ) {
      setError("Isi semua form");
      return false;
    } else if (validation === false) {
      setError("Ceklis pengecekan form");
      return false;
    }
    return true;
  };

  const handleSendArtikel = () => {
    console.log(artikel);
    if (checkValidity()) {
      const formData = new FormData();
      formData.append("judul", artikel.judul);
      formData.append("jenisWisata", artikel.jenisWisata);
      formData.append("deskripsi", artikel.deskripsi);
      formData.append("gambar", artikel.gambar.data);
      formData.append("id_user", data_user._id);
      sendDataAPI("artikel", formData);
    }
  };

  return (
    <div>
      <Loading loading={loading} />
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
          <EditorComponent
            value={(e) =>
              handleOnChange({ target: { id: "deskripsi", value: e } })
            }
            maxDesc={maxDesc}
          />
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
            image={
              artikel === undefined ||
              artikel.gambar === undefined ||
              artikel.gambar.preview
            }
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
        <div className="row mx-2 justify-content-between">
          <div className="form-check col-sm-6 mb-3">
            <input
              type="checkbox"
              onChange={(e) => setValidation(e.target.checked)}
              className="form-check-input"
              id="validate"
            />
            <label className="form-check-label" htmlFor="validate">
              Sudah benar semua?
            </label>
          </div>
          <div className="col-sm-6 error-container">
            {error && <p className="error-posting">{error}</p>}
          </div>
        </div>
        <div className="col-sm-12 mb-2 d-flex justify-content-end">
          <button
            type="button"
            onClick={() => handleSendArtikel()}
            className="ms-auto btn btn-primary"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArtikel;
