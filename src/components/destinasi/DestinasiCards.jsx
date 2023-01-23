import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import sgtPojok from "../../assets/img/sgtPojok.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

const DestinasiCards = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://picsum.photos/800/800?random=${props.img}`;
    imgLoader.onload = () => setImage(imgLoader.src);
  }, []);

  return (
    <Link
      to={`/destinasi/read/another destinasi`}
      className="col-md-4 p-3 col-sm-12 col-lg-3 "
    >
      <div className="card p-0">
        {image !== null ? (
          <div className="card-img">
            <img src={image} alt="" className="img-inside" />
            <div className="inner-card-desc">
              <h3 className="mb-3 mt-1">
                {props.judul || (
                  <Skeleton baseColor="#d5dfe8" highlightColor="#f0f6fc" />
                )}
              </h3>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-geo-alt card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.lokasi || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (300 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-currency-dollar card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.biaya || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (300 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-star card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.rating || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (300 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-img">
            <div className="inner-card-desc">
              <h3 className="mb-3 mt-1">
                {props.judul || (
                  <Skeleton baseColor="#d5dfe8" highlightColor="#f0f6fc" />
                )}
              </h3>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-geo-alt card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.lokasi || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (260 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-currency-dollar card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.biaya || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (300 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
              <div className="row flex-wrap w-100 mx-0 mb-2">
                <i className="bi bi-star card-icon px-2"></i>
                <p className="col p-0 m-0">
                  {props.rating || (
                    <Skeleton
                      baseColor="#d5dfe8"
                      highlightColor="#f0f6fc"
                      width={Math.floor(Math.random() * (300 - 20)) + 20}
                    />
                  )}
                </p>
              </div>
            </div>
            <Skeleton
              className="card-img-skeleton"
              baseColor="#d5dfe8"
              highlightColor="#f0f6fc"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default DestinasiCards;
