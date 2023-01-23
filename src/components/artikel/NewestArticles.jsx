import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import store from "../../stores/store";
import Arrows from "../micro/Arrows";
import ArtikelDownCard from "./ArtikelDownCard";
import ArtikelUpCard from "./ArtikelUpCard";
import { user } from "../../stores/reducers/user/usersSlice";
import { useSelector } from "react-redux";
import { artikel, getDataAPI } from "../../stores/reducers/artikel/artikelAPI";

const NewestArticles = (props) => {
  const users = useSelector(user);
  const { newest_data_artikel } = useSelector(artikel);

  useEffect(() => {
    getDataAPI("artikel/newest-artikel", "newest_data_artikel");
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
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
            Newest Article <br />
            by Plombo
          </h1>
        </div>
        <div className="col m-right pe-0">
          <h4 className="s-title">With Tons of Article</h4>
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
          containerClass="position-static"
          itemClass="mx-3"
          arrows={false}
          customButtonGroup={<Arrows />}
        >
          {newest_data_artikel !== null ? (
            newest_data_artikel.map((data, i) => {
              return i % 2 === 0 ? (
                <ArtikelUpCard
                  key={data._id}
                  id={data._id}
                  img={data.gambar}
                  judul={data.judul}
                  deskripsi={data.deskripsi}
                  uploader={data.uploaderID.nama}
                  updatedAt={data.createdAt}
                />
              ) : (
                <ArtikelDownCard
                  key={data._id}
                  id={data._id}
                  img={data.gambar}
                  judul={data.judul}
                  deskripsi={data.deskripsi}
                  uploader={data.uploaderID.nama}
                  updatedAt={data.createdAt}
                />
              );
            })
          ) : (
            <>
              <ArtikelDownCard />
              <ArtikelUpCard />
              <ArtikelDownCard />
              <ArtikelUpCard />
              <ArtikelDownCard />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default NewestArticles;
