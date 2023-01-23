import React, { useEffect, useState } from "react";
import DestinasiCard from "./DestinasiCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Arrows from "../micro/Arrows";
import store from "../../stores/store";
import { useSelector } from "react-redux";
import {
  destinasi,
  getDataAPI,
} from "../../stores/reducers/destinasi/destinasiAPI";

const MostDestinasiContainer = (props) => {
  const { newest_data_destinasi } = useSelector(destinasi);

  useEffect(() => {
    getDataAPI("wisata-newest", "newest_data_destinasi");
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="row artRow">
      <div className="row t-head justify-content-between m-0 p-0">
        <div className="col m-title ps-3">
          <h1>
            Newest Destination by <br />
            Plombo
          </h1>
        </div>
        <div className="col m-right pe-0">
          <h4 className="s-title">With Tons of Destination</h4>
          <p className="ps-3 ms-3 s-desc h-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin
          </p>
        </div>
      </div>
      <div className="popDes pt-4 pb-5 m-0 justify-content-between position-relative">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          swipeable
          draggable
          ssr
          infinite
          keyBoardControl
          autoPlay
          centerMode
          containerClass="justify-content-between position-static"
          itemClass="mx-3"
          arrows={false}
          customButtonGroup={<Arrows />}
        >
          {newest_data_destinasi !== null &&
            newest_data_destinasi.map((data) => {
              return (
                <DestinasiCard
                  key={data._id}
                  id={data._id}
                  img={data.gambar}
                  judul={data.namaTempat}
                  lokasi={data.lokasi}
                  biaya={data.biaya}
                  rating={data.rating}
                />
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default MostDestinasiContainer;
