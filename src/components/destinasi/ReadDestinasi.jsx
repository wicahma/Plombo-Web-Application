import React, { useEffect } from "react";
import sgtPojok from "../../assets/img/sgtPojok.svg";
import roundedFooter from "../../assets/img/rounded-footer.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

const useGetDestinasiAPI = (id) => {
  const [dataDestinasi, setDataDestinasi] = React.useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/wisata/${id}`)
      .then((res) => {
        setDataDestinasi(res.data);
        console.log(res.data);
      })
      .catch((_) => setDataDestinasi(false));
  }, []);
  return dataDestinasi;
};

const ReadDestinasi = (props) => {
  const { namaDestinasi, idDestinasi } = useParams();
  const dataDestinasi = useGetDestinasiAPI(idDestinasi);
  switch (dataDestinasi) {
    case null:
      return <div>Loading</div>;
    case false:
      return <div>Not Found</div>;
    default:
      return (
        <div className="m-auto p-0  ">
          <div className="row detailDestinasi px-5 pb-5">
            <div className="row justify-content-between m-0 p-0">
              <div className="col-md-8 m-title ps-0">
                <h1 className="p-0 m-0">{dataDestinasi.namaTempat}</h1>
                <p>By: {dataDestinasi.uploaderID.nama}</p>

                <div className="garis-border position-relative p-3">
                  <img
                    className="position-absolute top-0 end-0"
                    style={{ transform: "rotate(90deg)" }}
                    src={sgtPojok}
                  />
                  <img
                    className="position-absolute start-0 bottom-0"
                    style={{ transform: "rotate(-90deg)" }}
                    src={sgtPojok}
                  />
                  <div>
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
                <div className="gambar-destinasi">
                  <img src="Assets/img/pantai.png" alt="" />
                </div>
                <div className="lokasi position-relative">
                  <img
                    className="position-absolute end-0 top-0"
                    style={{ transform: "rotate(90deg)", width: "20px" }}
                    src={sgtPojok}
                  />

                  <h2>Location</h2>
                  <img src="Assets/img/peta.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid panel-pilihan">
            <div className="row pilihan position-relative">
              <p className="teks-pilihan">Deskripsi Wisata</p>
            </div>
            <div className="row px-5">{dataDestinasi.deskripsi}</div>
          </div>
        </div>
      );
  }
};

export default ReadDestinasi;
