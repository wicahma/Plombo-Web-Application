import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import CardValidation from "../micro/CardValidation";

const DestinasiCards = (props) => {
  const [image, setImage] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://drive.google.com/uc?export=view&id=${props.img}`;
    imgLoader.onload = () => setImage(imgLoader.src);
  }, [props.img]);

  return (
    <Link
      to={`/destinasi/read/${props.id}&${props.judul}`}
      className="col-md-4 p-3 col-sm-12 col-lg-3 "
    >
      <div className="card p-0">
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
                    width={Math.floor(Math.random() * (200 - 20)) + 20}
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
                    width={Math.floor(Math.random() * (200 - 20)) + 20}
                  />
                )}
              </p>
            </div>
          </div>
          {image !== null ? (
            <img src={image} alt="" className="img-inside" />
          ) : (
            <Skeleton
              className="card-img-skeleton"
              baseColor="#d5dfe8"
              highlightColor="#f0f6fc"
            />
          )}
          {pathname.includes("profile") && (
            <CardValidation validation={props.verified} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinasiCards;
