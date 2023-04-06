import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import store from "../../stores/store";
import {
  destinasi,
  getDataAPI,
} from "../../stores/reducers/destinasi/destinasiAPI";

import L from "leaflet";
import { useLocation } from "react-router-dom";
import RoutingMachine from "../../components/destinasi/RoutingMachine";
import { useSelector } from "react-redux";
delete L.Icon.Default.prototype._getIconUrl;

const DestinasiMap = (props) => {
  const { lat, lng, lokasi, nama } = useLocation().state;
  const { validated_data_destinasi } = useSelector(destinasi);

  const [dataDestinasi, setDataDestinasi] = useState([]);
  const [ruteDesc, setRuteDesc] = useState([]);
  const [rute, setRute] = useState([]);
  const [addrute, setAddrute] = useState(false);
  const [activateRute, setActivateRute] = useState(true);

  const addRute = (data) => {
    setDataDestinasi((prev) =>
      prev.filter((item) => item.lokasi !== data.lokasi)
    );
    setRute((prev) => [...prev, data.lokasiGIS]);
    setRuteDesc((prev) => [...prev, data]);
  };

  const removeRute = (data, index) => {
    if (index <= 1) return;
    setDataDestinasi((prev) => [...prev, data]);
    setRute((prev) => prev.filter((item) => item !== data.lokasiGIS));
    setRuteDesc((prev) => prev.filter((item) => item.lokasi !== data.lokasi));
  };

  useEffect(() => {
    setTimeout(() => {
      setActivateRute(false);
    }, 1000);
  }, [activateRute]);

  useEffect(() => {
    getDataAPI("wisatas", "validated_data_destinasi");
    console.log({ lat, lng, lokasi, nama });
    return () => {
      setRute((prev) => [...prev, "-8.796554,116.121363", `${lat},${lng}`]);
      setRuteDesc((prev) => [
        ...prev,
        { lokasi: "Titik awal", namaTempat: "Lokasi kamu" },
        { lokasi: lokasi, namaTempat: nama },
      ]);
    };
  }, [lat, lng, lokasi, nama]);

  useEffect(() => {
    validated_data_destinasi &&
      setDataDestinasi(
        validated_data_destinasi.filter(
          (item) =>
            item.lokasiGIS !== `${lat},${lng}` && item.namaTempat !== nama
        )
      );
  }, [validated_data_destinasi, lat, lng, nama]);

  // useEffect(() => {
  //   console.group("DestinasiMap");
  //   console.log({ dataDestinasi });
  //   console.log({ rute });
  //   console.log({ ruteDesc });
  //   console.groupEnd();
  // }, [dataDestinasi, rute, ruteDesc]);

  return (
    <div className="main-map-container">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className={`${addrute && "select-route-opened"} select-route`}>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => setAddrute(!addrute)}
              className="btn-select-route"
            >
              Lihat Rute
            </button>
            <button
              onClick={() => setActivateRute(!activateRute)}
              className={`${!addrute ? "d-none" : "d-block"} btn-select-route`}
            >
              Buat Rute
            </button>
          </div>
          <div className={`${addrute ? "d-flex" : "d-none"}`}>
            <div className="p-2 list-wisata">
              <h4>List Wisata</h4>
              {dataDestinasi &&
                dataDestinasi.map((destinasi, i) => {
                  return (
                    <div
                      onClick={() => {
                        addRute(destinasi);
                      }}
                      key={i}
                      className="destinasi-item"
                    >
                      <div>
                        <h6>
                          {destinasi.namaTempat.slice(0, 30)}
                          {destinasi.namaTempat.length > 30 && "..."}
                        </h6>
                        <p>
                          {destinasi.lokasi.slice(0, 50)}
                          {destinasi.lokasi.length > 50 && "..."}
                        </p>
                      </div>
                      <div className="add-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="p-2 list-wisata">
              <h4>Rute Wisata</h4>
              {ruteDesc &&
                ruteDesc.map((destinasi, i) => {
                  return (
                    <div
                      onClick={() => removeRute(destinasi, i)}
                      key={i}
                      className="destinasi-item"
                    >
                      <div>
                        <h6>
                          {destinasi.namaTempat.slice(0, 30)}
                          {destinasi.namaTempat.length > 30 && "..."}
                        </h6>
                        <p>
                          {destinasi.lokasi.slice(0, 50)}
                          {destinasi.lokasi.length > 50 && "..."}
                        </p>
                      </div>
                      {i > 1 && (
                        <div className="add-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {rute && ruteDesc && !activateRute && (
          <RoutingMachine rute={rute} ruteDesc={ruteDesc} />
        )}
      </MapContainer>
    </div>
  );
};

export default DestinasiMap;
