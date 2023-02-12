import React, { useEffect } from "react";
import "../../stores/store";
import { useSelector } from "react-redux";
import {
  artikel,
  getDataAPI as getDataAPIArtikel,
} from "../../stores/reducers/artikel/artikelAPI";
import {
  destinasi,
  getDataAPI as getDataAPIWisata,
} from "../../stores/reducers/destinasi/destinasiAPI";
import { user } from "../../stores/reducers/user/usersSlice";
import OtherArticles from "../artikel/OtherArticles";
import DestinasiCards from "../destinasi/DestinasiCards";
import Empty from "../micro/Empty";


const MyProfile = (props) => {
  const { data_user } = useSelector(user);
  const { user_data_destinasi } = useSelector(destinasi);
  const { user_data_artikel } = useSelector(artikel);

  useEffect(() => {
    getDataAPIArtikel(`artikels/user/${data_user._id}`, "user_data_artikel");
    getDataAPIWisata(`wisatas/user/${data_user._id}`, "user_data_destinasi");
  }, [data_user]);
  return (
    <>
      <div className="profile-content">
        <h3>My Artikel</h3>
        <div className="row">
          {user_data_artikel === null ? (
            <OtherArticles />
          ) : user_data_artikel.length === 0 ? (
            <Empty msg="Anda belum membuat Artikel" />
          ) : (
            user_data_artikel.map((data) => {
              return (
                <OtherArticles
                  key={data._id}
                  id={data._id}
                  uploader={data.uploaderID.nama}
                  updatedAt={data.updatedAt}
                  judul={data.judul}
                  deskripsi={data.deskripsi}
                  img={data.gambar}
                  verified={data.verified}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="profile-content">
        <h3>My Destinasi</h3>
        <div className="row">
          {user_data_destinasi === null ? (
            <DestinasiCards />
          ) : user_data_destinasi.length === 0 ? (
            <Empty msg="Anda belum membuat Destinasi Wisata" />
          ) : (
            user_data_destinasi.map((data) => {
              return (
                <DestinasiCards
                  key={data._id}
                  id={data._id}
                  img={data.gambar}
                  judul={data.namaTempat}
                  lokasi={data.lokasi}
                  biaya={data.biaya}
                  rating={data.rating}
                  verified={data.verified}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
