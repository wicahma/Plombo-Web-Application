import React, { useEffect } from "react";
import "../../stores/store";
import { artikel, getDataAPI } from "../../stores/reducers/artikel/artikelAPI";
import AirTerjunArticles from "./AirTerjunArticles";
import GunungArticles from "./GunungArticles";
import Lainnya from "./Lainnya";
import PantaiArticles from "./PantaiArticles";
import PulauArticles from "./PulauArticles";
import TempatBersejarahArticles from "./TempatBersejarahArticles";
import { useSelector } from "react-redux";

const AnotherArticles = (props) => {
  const { validated_data_artikel } = useSelector(artikel);

  useEffect(() => {
    getDataAPI("artikels", "validated_data_artikel");
  }, []);
  return (
    <div className="row artRow mt-5">
      <h1>Another Destination</h1>
      <div className="row mt-3 p-0 m-0 popDes">
        <PantaiArticles
          dataPantai={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Pantai"
                )
          }
        />
        <AirTerjunArticles
          dataAirTerjun={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Air Terjun"
                )
          }
        />
        <GunungArticles
          dataGunung={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Gunung/Bukit"
                )
          }
        />
        <PulauArticles
          dataPulau={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Pulau"
                )
          }
        />
        <TempatBersejarahArticles
          dataTempat={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Tempat Bersejarah"
                )
          }
        />
        <Lainnya
          dataLainnya={
            validated_data_artikel === null
              ? []
              : validated_data_artikel.filter(
                  (data) => data.jenisWisata === "Lainnya"
                )
          }
        />
      </div>
    </div>
  );
};

export default AnotherArticles;
