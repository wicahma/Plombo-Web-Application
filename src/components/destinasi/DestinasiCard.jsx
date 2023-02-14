import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import sgtPojok from "../../assets/img/sgtPojok.svg";

const DestinasiCard = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://drive.google.com/uc?export=view&id=${props.img}`;
    imgLoader.onload = () => setImage(imgLoader.src);
  }, [props.img]);
  return (
    <Link
      to={`/destinasi/read/${props.id}&${props.judul}`}
      className="col-md-12 destinasi-card-wrapper"
    >
      <div className="card p-0">
        {image !== null ? (
          <div
            className="card-img"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ) : (
          <Skeleton
            className="card-img-skeleton"
            baseColor="#d5dfe8"
            highlightColor="#f0f6fc"
          />
        )}
        <div className="card-desc mt-3 py-1 pb-4 position-relative">
          <img
            className="position-absolute top-0 end-0"
            style={{ transform: `rotate(90deg)` }}
            src={sgtPojok}
          />
          <img
            className="position-absolute bottom-0 start-0"
            style={{ transform: `rotate(-90deg)` }}
            src={sgtPojok}
          />
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
              /5
            </p>
          </div>
          <p className="read-me">Read me</p>
        </div>
      </div>
    </Link>
  );
};

export default DestinasiCard;
