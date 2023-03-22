import HtmlToReactParser from "html-react-parser";
import "../../stores/store";
import React, { useEffect, useState } from "react";
import sgtPojokWhite from "../../assets/img/sgtPojok-white.svg";
import roundedFooter from "../../assets/img/rounded-footer.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Loading from "../micro/Loading";
import Empty from "../micro/Empty";
import { useSelector } from "react-redux";
import { user } from "../../stores/reducers/user/usersSlice";

const useGetDataArtikel = (id) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}artikel/${id}`)
      .then((res) => setData(res.data))
      .catch((_) => setData(false));
  }, [id]);
  return data;
};

const ReadArtikel = (props) => {
  const { idArtikel } = useParams();
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [newestDay, setNewestDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [time, setTime] = useState(null);
  const [image, setImage] = useState(null);
  const dataArtikel = useGetDataArtikel(idArtikel);
  const [deskripsi, setDeskripsi] = useState(null);

  const { data_user } = useSelector(user);

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://drive.google.com/uc?export=view&id=${
      dataArtikel !== null && dataArtikel.gambar
    }`;
    imgLoader.onload = () => setImage(imgLoader.src);
    dataArtikel !== null &&
      setTime(new Date(dataArtikel.createdAt).toLocaleTimeString("id-ID"));
    dataArtikel !== null &&
      setDate(new Date(dataArtikel.createdAt).toLocaleDateString("id-ID"));
    dataArtikel !== null && setDay(new Date(dataArtikel.createdAt).getDay());
    setDeskripsi(
      new HtmlToReactParser(dataArtikel === null ? "" : dataArtikel.deskripsi)
    );
  }, [dataArtikel]);

  useEffect(() => {
    switch (day) {
      case 0:
        setNewestDay("Minggu");
        break;
      case 1:
        setNewestDay("Senin");
        break;
      case 2:
        setNewestDay("Selasa");
        break;
      case 3:
        setNewestDay("Rabu");
        break;
      case 4:
        setNewestDay("Kamis");
        break;
      case 5:
        setNewestDay("Jumat");
        break;
      case 6:
        setNewestDay("Sabtu");
        break;
      default:
        break;
    }
  }, [day]);

  useEffect(() => {
    if (date !== null) {
      console.log(date.split("/")[1]);
      switch (date.split("/")[1]) {
        case "0":
          setMonth("Januari");
          break;
        case "1":
          setMonth("Februari");
          break;
        case "2":
          setMonth("Maret");
          break;
        case "3":
          setMonth("April");
          break;
        case "4":
          setMonth("Mei");
          break;
        case "5":
          setMonth("Juni");
          break;
        case "6":
          setMonth("Juli");
          break;
        case "7":
          setMonth("Agustus");
          break;
        case "8":
          setMonth("September");
          break;
        case "9":
          setMonth("Oktober");
          break;
        case "10":
          setMonth("November");
          break;
        case "11":
          setMonth("Desember");
          break;
        default:
          break;
      }
    }
  }, [date]);

  switch (dataArtikel) {
    case null:
      return <Loading loading={true} />;
    case false:
      return <Empty msg="Artikel wisata yang anda tuju tidak ada." />;
    default:
      if (
        dataArtikel.verified ||
        (data_user !== null &&
          (dataArtikel.uploaderID._id === data_user._id ||
            data_user.type === "admin"))
      ) {
        return (
          <div className="row img-article m-auto mt-3">
            {image === null ? (
              <Skeleton
                baseColor="#d5dfe8"
                highlightColor="#f0f6fc"
                className="gambar-article"
              />
            ) : (
              <img
                src={image}
                className="gambar-article"
                alt="Gambar artikel"
              />
            )}
            <div className="col isi-article">
              <div className="row header-article">
                {!dataArtikel.verified && data_user.type === "user" && (
                  <div className="validation-msg">
                    <h4>
                      Artikel ini belum tervalidasi, hanya anda dan Admin Plombo
                      yang dapat melihat artikel ini.
                    </h4>
                  </div>
                )}
                <h1 className="judul-artikel mb-5 p-0">{dataArtikel.judul}</h1>
                <div className="header-desc d-flex flex-row justify-content-between mt-3 p-0">
                  <p className="m-0">{dataArtikel.uploaderID.nama}</p>
                  <p className="m-0">
                    {newestDay !== null && newestDay},{" "}
                    {date !== null &&
                      month !== null &&
                      `${date.split("/")[0]} ${month} ${
                        date.split("/")[2]
                      }`}{" "}
                    |{" "}
                    {time !== null &&
                      time.split(".")[0] + " : " + time.split(".")[1]}
                  </p>
                </div>
              </div>

              <div className="row read-article pt-4">
                <div className="col-md-8 px-0 teks-article">{deskripsi}</div>
                <div className="col-md-4 p-0">
                  <div className="latest-article">
                    <h3 className="position-relative ">
                      Latest Article
                      <img
                        src={roundedFooter}
                        className="position-absolute end-0 top-50 translate-middle-y"
                        alt=""
                      />
                    </h3>
                    <div className="list-article p-2 position-relative">
                      <img
                        src={sgtPojokWhite}
                        className="position-absolute bottom-0 end-0"
                        style={{ width: "20px" }}
                        alt=""
                      />
                      <div className="row px-2">
                        <div className="row mx-0 my-2">
                          <div
                            className="col-3"
                            style={{ backgroundColor: "var(--dark-solid)" }}
                          ></div>
                          <div className="col-9 pe-0">
                            <h6 className="la-judul">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h6>
                            <p className="la-desc m-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit...
                            </p>
                            <p className="p-0 m-0 la-time">
                              Rabu, 12 Agustus 2022 | 12:45 WIB
                            </p>
                          </div>
                        </div>

                        <div className="row mx-0 my-2">
                          <div
                            className="col-3"
                            style={{ backgroundColor: "var(--dark-solid)" }}
                          ></div>
                          <div className="col-9 pe-0">
                            <h6 className="la-judul">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h6>
                            <p className="la-desc m-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit...
                            </p>
                            <p className="p-0 m-0 la-time">
                              Rabu, 12 Agustus 2022 | 12:45 WIB
                            </p>
                          </div>
                        </div>

                        <div className="row mx-0 my-2">
                          <div
                            className="col-3"
                            style={{ backgroundColor: "var(--dark-solid)" }}
                          ></div>
                          <div className="col-9 pe-0">
                            <h6 className="la-judul">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h6>
                            <p className="la-desc m-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit...
                            </p>
                            <p className="p-0 m-0 la-time">
                              Rabu, 12 Agustus 2022 | 12:45 WIB
                            </p>
                          </div>
                        </div>

                        <div className="row mx-0 my-2">
                          <div
                            className="col-3"
                            style={{ backgroundColor: "var(--dark-solid)" }}
                          ></div>
                          <div className="col-9 pe-0">
                            <h6 className="la-judul">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </h6>
                            <p className="la-desc m-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit...
                            </p>
                            <p className="p-0 m-0 la-time">
                              Rabu, 12 Agustus 2022 | 12:45 WIB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <h1>
            Artikel ini belum tervalidasi, silahkan kunjungi Artikel ini
            beberapa jam kedepan.
          </h1>
        );
      }
  }
};

export default ReadArtikel;
