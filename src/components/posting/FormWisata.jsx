import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorComponent from "../../components/Editor";
import {
  destinasi as dataDestinasi,
  sendDataAPI,
} from "../../stores/reducers/destinasi/destinasiAPI";
import { user } from "../../stores/reducers/user/usersSlice";
import Loading from "../micro/Loading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const FormWisata = (props) => {
  const [center, setCenter] = useState({ lat: -8.575177, lng: 116.342296 });
  const mapRef = useRef();
  const maxDesc = 10;
  const input_gambar = useRef();
  const { data_user } = useSelector(user);
  const { loading } = useSelector(dataDestinasi);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState(false);

  const [wisata, setWisata] = useState({
    deskripsi: "",
    gambar: "",
    jenisWisata: "",
    judul: "",
    biaya: "",
    rating: "",
    waktuTempuh: "",
    lokasiGIS: "",
    lokasi: "",
  });

  const handleOnChange = (e) => {
    setError("");
    if (e.target.id === "gambar")
      return setWisata({
        ...wisata,
        gambar: {
          data: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0]),
        },
      });
    setWisata({ ...wisata, [e.target.id]: e.target.value });
  };

  const handleDelete = (e) => {
    input_gambar.current.value = "";
    setWisata({ ...wisata, gambar: "" });
  };

  const checkValidity = () => {
    if (
      wisata.judul === "" ||
      wisata.jenisWisata === "" ||
      wisata.deskripsi === "" ||
      wisata.deskripsi === "<p><br></p>" ||
      wisata.gambar === "" ||
      wisata.biaya === "" ||
      wisata.rating === "" ||
      wisata.waktuTempuh === "" ||
      wisata.lokasiGIS === "" ||
      wisata.lokasi === ""
    ) {
      setError("Isi semua form");
      return false;
    } else if (validation === false) {
      setError("Ceklis pengecekan form");
      return false;
    }
    return true;
  };

  const handleSendWisata = () => {
    console.log(wisata);
    if (checkValidity()) {
      const formData = new FormData();
      formData.append("judul", wisata.judul);
      formData.append("jenisWisata", wisata.jenisWisata);
      formData.append("deskripsi", wisata.deskripsi);
      formData.append("biaya", wisata.biaya);
      formData.append("rating", wisata.rating);
      formData.append("waktuTempuh", wisata.waktuTempuh);
      formData.append("gambar", wisata.gambar.data);
      formData.append("lokasi", wisata.lokasi);
      formData.append("lokasiGIS", wisata.lokasiGIS);

      sendDataAPI(`wisata/${data_user._id}`, formData);
    }
  };

  useEffect(() => {
    console.log(wisata);
  }, [wisata]);

  return (
    <div>
      <Loading loading={loading} />
      <h1>Posting Wisata</h1>
      <form className="mx-auto inner-form row">
        <div className="col-sm-9 mb-3">
          <label htmlFor="judul" className="form-label">
            Nama Tempat Wisata
          </label>
          <input
            type="text"
            onChange={(e) => handleOnChange(e)}
            className="form-control"
            id="judul"
          />
        </div>
        <div className="col-sm-3 mb-1">
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
        <div className="col-sm-4 mb-1">
          <label htmlFor="biaya" className="form-label">
            Biaya Masuk
          </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            id="biaya"
          />
        </div>

        <div className="col-sm-4 mb-1">
          <label htmlFor="rating" className="form-label">
            rating
          </label>
          <input
            type="number"
            max={5}
            min={1}
            className="form-control"
            id="rating"
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="col-sm-4 mb-1">
          <label htmlFor="waktuTempuh" className="form-label">
            Perkiraan Waktu Tempuh
          </label>
          <input
            aria-describedby="tempuhHelp"
            step={"1"}
            type="number"
            max={12}
            min={1}
            onChange={(e) => handleOnChange(e)}
            className="form-control"
            id="waktuTempuh"
          />
          <div id="tempuhHelp" className="form-text">
            <p className="m-0">Masukkan perkiraan waktu dalam jam</p>
          </div>
        </div>

        <div className="col-sm-12 ">
          <label htmlFor="lokasiGIS" className="form-label">
            Lokasi GIS
          </label>
          <div
            className="map-container"
            onClick={() => {
              setCenter(mapRef.current.getCenter());
              handleOnChange({
                target: {
                  id: "lokasiGIS",
                  value: [
                    mapRef.current.getCenter().lat,
                    mapRef.current.getCenter().lng,
                  ],
                },
              });
            }}
          >
            <MapContainer
              center={center}
              zoom={9.5}
              scrollWheelZoom={true}
              ref={mapRef}
              className="map"
            >
              {/* <InnerMap /> */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center} draggable={true}>
                <Popup>
                  <h3>Lokasi</h3>
                  <h6>Latitude: {center.lat}</h6>
                  <h6>Longtitude: {center.lng}</h6>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          {/* <textarea
            name="lokasiGIS"
            className="form-control"
            id="lokasiGIS"
            cols="30"
            onChange={(e) => handleOnChange(e)}
            rows="2"
          ></textarea> */}
        </div>

        <div className="col-sm-12">
          <label htmlFor="lokasi" className="form-label">
            Alamat
          </label>
          <textarea
            name="lokasi"
            className="form-control"
            id="lokasi"
            cols="30"
            onChange={(e) => handleOnChange(e)}
            rows="10"
          ></textarea>
        </div>

        <div className="col-sm-12 mb-3">
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

        <div className="input-group col-sm-12 mb-5">
          <input
            ref={input_gambar}
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => handleOnChange(e)}
            id="gambar"
          />
          <label
            className="input-group-text"
            onClick={(e) => handleDelete(e)}
            htmlFor=""
          >
            Hapus gambar
          </label>
        </div>

        <div className="col-sm-12 mb-3 form-check">
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
        <div className="col-sm-6">
          <button
            type="button"
            onClick={() => handleSendWisata()}
            className=" ms-auto  btn btn-primary"
          >
            Kirim
          </button>
        </div>
        <div className="col-sm-6 error-container">
          {error && <p className="error-posting">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default FormWisata;
