import React, { useEffect } from "react";
import "../../stores/store";
import {
  artikel,
  getDataAPI as getDataAPIArtikel,
} from "../../stores/reducers/artikel/artikelAPI";
import {
  destinasi,
  getDataAPI as getDataAPIWisata,
} from "../../stores/reducers/destinasi/destinasiAPI";
import { useSelector } from "react-redux";
import { user } from "../../stores/reducers/user/usersSlice";
import Empty from "../micro/Empty";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckData = (props) => {
  const navigate = useNavigate();
  const { data_user } = useSelector(user);
  const [checker, setChecker] = React.useState(false);
  const { unvalidated_data_destinasi } = useSelector(destinasi);
  const { unvalidated_data_artikel } = useSelector(artikel);

  useEffect(() => {
    getDataAPIArtikel(
      `artikels/unverified/${data_user._id}`,
      "unvalidated_data_artikel"
    );
    getDataAPIWisata(
      `wisatas/unverified/${data_user._id}`,
      "unvalidated_data_destinasi"
    );
  }, [data_user, checker]);

  // useEffect(() => {
  //   console.group("CheckData");
  //   console.log(unvalidated_data_destinasi);
  //   console.log(unvalidated_data_artikel);
  //   console.groupEnd();
  // }, [unvalidated_data_destinasi, unvalidated_data_artikel]);

  const handleValidateData = (idArtikel, idUser, type) => {
    axios
      .put(`${process.env.REACT_APP_API}/${type}/${idArtikel}&${idUser}`, {
        verified: true,
      })
      .then((_) => setChecker(checker ? false : true))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>CheckData</h2>
      <div>
        <h4>Artikel</h4>
        {unvalidated_data_artikel !== null &&
        unvalidated_data_artikel.length > 0 ? (
          unvalidated_data_artikel.map((data, index) => {
            return (
              <div className="card-artikel-admin">
                <h2>A-{index + 1}</h2>
                <div className="row inner-card-artikel-admin">
                  <div
                    className="col-sm-10 d-flex flex-column artikel-admin-img"
                    style={{
                      backgroundImage: `url(https://drive.google.com/uc?export=view&id=${data.gambar})`,
                    }}
                  >
                    <div className="artikel-admin-info">
                      <h5>{data.judul}</h5>
                      <p>{data.uploaderID.nama}</p>
                    </div>
                  </div>
                  <div className="col-sm-2 d-flex align-items-center justify-content-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/artikel/read/${data._id}&${data.judul}`)
                      }
                      className="btn btn-inspect"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleValidateData(
                          data._id,
                          data.uploaderID._id,
                          "artikel"
                        )
                      }
                      className="btn btn-validate"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty msg="Anda tidak memiliki Artikel yang harus divalidasi." />
        )}
      </div>
      <div>
        <h4>Wisata</h4>
        {unvalidated_data_destinasi !== null &&
        unvalidated_data_destinasi.length > 0 ? (
          unvalidated_data_destinasi.map((data, index) => {
            return (
              <div className="card-wisata-admin">
                <h2>W-{index + 1}</h2>
                <div className="row inner-card-wisata-admin">
                  <div
                    className="col-sm-10 d-flex flex-column wisata-admin-img"
                    style={{
                      backgroundImage: `url(https://drive.google.com/uc?export=view&id=${data.gambar})`,
                    }}
                  >
                    <div className="wisata-admin-info">
                      <h5>{data.namaTempat}</h5>
                      <p>{data.uploaderID.nama}</p>
                    </div>
                  </div>
                  <div className="col-sm-2 d-flex align-items-center justify-content-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/destinasi/read/${data._id}&${data.namaTempat}`
                        )
                      }
                      className="btn btn-inspect"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleValidateData(
                          data._id,
                          data.uploaderID._id,
                          "wisata"
                        )
                      }
                      className="btn btn-validate"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty msg="Anda tidak memiliki Wisata yang harus divalidasi." />
        )}
      </div>
    </div>
  );
};

export default CheckData;
