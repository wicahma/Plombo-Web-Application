import React, { useEffect } from "react";
import store from "../../stores/store";
import { artikel, getDataAPI } from "../../stores/reducers/artikel/artikelAPI";
import AirTerjunArticles from "./AirTerjunArticles";
import GunungArticles from "./GunungArticles";
import Lainnya from "./Lainnya";
import PantaiArticles from "./PantaiArticles";
import PulauArticles from "./PulauArticles";
import TempatBersejarahArticles from "./TempatBersejarahArticles";
import { useSelector } from "react-redux";

const AnotherArticles = (props) => {
  const { all_data_artikel } = useSelector(artikel);

  useEffect(() => {
    getDataAPI("artikels", "all_data_artikel");
  }, []);
  return (
    <div className="row artRow mt-5">
      <h1>Another Destination</h1>
      <div className="row mt-3 p-0 m-0 popDes">
        <PantaiArticles
          dataPantai={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter(
                  (data) => data.jenisWisata === "Pantai"
                )
          }
        />
        <AirTerjunArticles
          dataAirTerjun={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter(
                  (data) => data.jenisWisata === "Air Terjun"
                )
          }
        />
        <GunungArticles
          dataGunung={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter(
                  (data) => data.jenisWisata === "Gunung/Bukit"
                )
          }
        />
        <PulauArticles
          dataPulau={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter((data) => data.jenisWisata === "Pulau")
          }
        />
        <TempatBersejarahArticles
          dataTempat={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter(
                  (data) => data.jenisWisata === "Tempat Bersejarah"
                )
          }
        />
        <Lainnya
          dataLainnya={
            all_data_artikel === null
              ? []
              : all_data_artikel.filter(
                  (data) => data.jenisWisata === "Lainnya"
                )
          }
        />
      </div>
    </div>
  );
};

export default AnotherArticles;
