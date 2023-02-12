import React, { useEffect } from "react";
import HtmlToReactParser from "html-react-parser";
import sgtPojok from "../../assets/img/sgtPojok.svg";
// import roundedFooter from "../../assets/img/rounded-footer.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Empty from "../micro/Empty";
import Loading from "../micro/Loading";
import { user } from "../../stores/reducers/user/usersSlice";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Skeleton from "react-loading-skeleton";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const useGetDestinasiAPI = (id) => {
  const [dataDestinasi, setDataDestinasi] = React.useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}wisata/${id}`)
      .then((res) => {
        setDataDestinasi(res.data);
        console.log(res.data);
      })
      .catch((_) => setDataDestinasi(false));
  }, [id]);
  return dataDestinasi;
};

const ReadDestinasi = (props) => {
  const { namaDestinasi, idDestinasi } = useParams();
  const [image, setImage] = React.useState(null);
  const { data_user } = useSelector(user);
  const dataDestinasi = useGetDestinasiAPI(idDestinasi);
  const [deskripsi, setDeskripsi] = React.useState(null);
  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://drive.google.com/uc?export=view&id=${
      dataDestinasi !== null && dataDestinasi.gambar
    }`;
    imgLoader.onload = () => setImage(imgLoader.src);
    dataDestinasi !== false &&
      setDeskripsi(
        new HtmlToReactParser(
          dataDestinasi === null ? "" : dataDestinasi.deskripsi
        )
      );
  }, [dataDestinasi]);

  switch (dataDestinasi) {
    case null:
      return <Loading loading={true} />;
    case false:
      return <Empty msg="Destinasi wisata yang anda tuju tidak ada." />;
    default:
      if (
        dataDestinasi.verified ||
        (data_user !== null &&
          (dataDestinasi.uploaderID._id === data_user._id ||
            data_user.type === "admin"))
      ) {
        return (
          <div className="m-auto p-0  ">
            <div className="row detailDestinasi px-5 pb-5">
              <div className="row justify-content-between m-0 p-0">
                <div className="col-md-8 m-title ps-0">
                  <h1 className="p-0 m-0">{namaDestinasi}</h1>
                  <p>By: {dataDestinasi.uploaderID.nama}</p>

                  <div className="garis-border position-relative p-3">
                    <img
                      className="position-absolute top-0 end-0"
                      style={{ transform: "rotate(90deg)" }}
                      src={sgtPojok}
                      alt="segitiga-pojok"
                    />
                    <img
                      className="position-absolute start-0 bottom-0"
                      style={{ transform: "rotate(-90deg)" }}
                      src={sgtPojok}
                      alt="segitiga-pojok"
                    />
                    <div>
                      {!dataDestinasi.verified && data_user.type === "user" && (
                        <div className="validation-msg">
                          <h4>
                            Destinasi Wisata ini belum tervalidasi, hanya anda
                            dan Admin Plombo yang dapat melihat halaman ini.
                          </h4>
                        </div>
                      )}
                      {image === null ? (
                        <Skeleton
                          width={"100%"}
                          height={"400px"}
                          baseColor="#d5dfe8"
                          highlightColor="#f0f6fc"
                          style={{ borderRadius: "15px", marginBottom: "1rem" }}
                        />
                      ) : (
                        <img
                          src={image}
                          alt="gambar-wisata"
                          className="image-read-destinasi"
                        />
                      )}
                      <h5>Lokasi: {dataDestinasi.lokasi}</h5>
                      <h5>Jenis Wisata: {dataDestinasi.jenisWisata}</h5>
                      <h5>Biaya Masuk: {dataDestinasi.biaya}</h5>
                      <h5>
                        Waktu Tempuh ke Lokasi: {dataDestinasi.waktuTempuh} Jam
                      </h5>
                      <h5>Rating: {dataDestinasi.rating} dari 5</h5>
                    </div>
                  </div>
                </div>
                <div className="col m-right pe-0 garis-border gambar-lokasi">
                  <MapContainer
                    center={[
                      dataDestinasi.lokasiGIS.split(",")[0],
                      dataDestinasi.lokasiGIS.split(",")[1],
                    ]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="gambar-destinasi"
                  >
                    {/* <InnerMap /> */}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[
                        dataDestinasi.lokasiGIS.split(",")[0],
                        dataDestinasi.lokasiGIS.split(",")[1],
                      ]}
                      draggable={false}
                    >
                      <Popup>{dataDestinasi.lokasi}</Popup>
                    </Marker>
                  </MapContainer>

                  <div className="lokasi position-relative">
                    <img
                      className="position-absolute end-0 top-0"
                      style={{ transform: "rotate(90deg)", width: "20px" }}
                      src={sgtPojok}
                      alt={"segitiga-pojok"}
                    />
                    <h2>Location</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid panel-pilihan">
              <div className="row pilihan position-relative">
                <p className="teks-pilihan">Deskripsi Wisata</p>
              </div>
              <div className="row px-5 teks-article">{deskripsi}</div>
            </div>
          </div>
        );
      } else {
        return (
          <h1>
            Destinasi Wisata ini belum tervalidasi, silahkan kunjungi halaman
            ini beberapa jam kedepan.
          </h1>
        );
      }
  }
};

export default ReadDestinasi;
