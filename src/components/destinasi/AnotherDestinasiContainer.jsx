import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  destinasi,
  getDataAPI,
} from "../../stores/reducers/destinasi/destinasiAPI";
import AirTerjunDest from "./AirTerjunDest";
import GunungDest from "./GunungDest";
import Lainnya from "./Lainnya";
import MomumentDest from "./MomumentDest";
import PantaiDest from "./PantaiDest";

const AnotherDestinasiContainer = (props) => {
  const { all_data_destinasi } = useSelector(destinasi);

  useEffect(() => {
    getDataAPI("wisatas", "all_data_destinasi");
  }, []);

  return (
    <div className="row artRow mt-5">
      <h1>Another Destination</h1>
      <div className="row mt-3 p-0 m-0 popDes">
        <PantaiDest
          dataPantai={
            all_data_destinasi === null
              ? []
              : all_data_destinasi.filter(
                  (data) => data.jenisWisata === "Pantai"
                )
          }
        />
        <GunungDest
          dataGunung={
            all_data_destinasi === null
              ? []
              : all_data_destinasi.filter(
                  (data) => data.jenisWisata === "Gunung/Bukit"
                )
          }
        />
        <MomumentDest
          dataMonumen={
            all_data_destinasi === null
              ? []
              : all_data_destinasi.filter(
                  (data) => data.jenisWisata === "Tempat Bersejarah"
                )
          }
        />
        <AirTerjunDest
          dataAirTerjun={
            all_data_destinasi === null
              ? []
              : all_data_destinasi.filter(
                  (data) => data.jenisWisata === "Air Terjun"
                )
          }
        />
        <Lainnya
          dataLainnya={
            all_data_destinasi === null
              ? []
              : all_data_destinasi.filter(
                  (data) => data.jenisWisata === "Lainnya"
                )
          }
        />
      </div>
    </div>
  );
};

export default AnotherDestinasiContainer;
