import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "lrm-graphhopper";

const createRoutineMachineLayer = ({ lat, lng }) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(-8.796554, 116.121363), L.latLng(lat, lng)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
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
