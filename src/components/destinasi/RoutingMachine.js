import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "lrm-graphhopper";

// leaflet-routing-collapse-btn

const createRoutineMachineLayer = ({ lat, lng, rute, ruteDesc }) => {
  const rutes = rute.map((data, i) => {
    const lat = data.split(",")[0];
    const lng = data.split(",")[1];
    return L.routing.waypoint(L.latLng(lat, lng), ruteDesc[i]);
  });
  console.log({ rutes });
  // console.log({ rute });
  // console.log(L.latLng(lat, lng));
  const instance = L.Routing.control({
    waypoints: rutes,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    createMarker: function (i, wp, nWps) {
      console.log({ i, wp, nWps });
      return L.marker(wp.latLng).bindPopup(`Rute ${i + 1} : ${wp.name.namaTempat} | ${wp.name.lokasi}`);
    },
    collapsible: true,
    show: false,
    autoRoute: true,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    // router: L.Routing.graphHopper("28d49564-c820-42a4-991c-a7f590c13863", {
    //   urlParameters: {
    //     vehicle: "car",
    //     algorithm: "alternative_route",
    //     "ch.disable": true,
    //   },
    // }),
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
