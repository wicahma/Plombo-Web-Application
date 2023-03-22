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
import PulauDest from "./PulauDest";

const AnotherDestinasiContainer = (props) => {
  const { validated_data_destinasi } = useSelector(destinasi);

  useEffect(() => {
    getDataAPI("wisatas", "validated_data_destinasi");
  }, []);

  return (
    <div className="row artRow mt-5">
      <h1>Another Destination</h1>
      <div className="row mt-3 p-0 m-0 popDes">
        <PantaiDest
          dataPantai={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Pantai"
                )
          }
        />
        <GunungDest
          dataGunung={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Gunung/Bukit"
                )
          }
        />
        <MomumentDest
          dataMonumen={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Tempat Bersejarah"
                )
          }
        />
        <AirTerjunDest
          dataAirTerjun={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Air Terjun"
                )
          }
        />
        <PulauDest
          dataPulau={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Pulau"
                )
          }
        />
        <Lainnya
          dataLainnya={
            validated_data_destinasi === null
              ? []
              : validated_data_destinasi.filter(
                  (data) => data.jenisWisata === "Lainnya"
                )
          }
        />
      </div>
    </div>
  );
};

export default AnotherDestinasiContainer;
