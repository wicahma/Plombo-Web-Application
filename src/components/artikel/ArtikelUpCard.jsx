import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation } from "react-router-dom";
import sgtPojok from "../../assets/img/sgtPojok.svg";

const ArtikelUpCard = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imgLoader = new Image();
    imgLoader.src = `https://drive.google.com/uc?export=view&id=${props.img}`;
    imgLoader.onload = () => setImage(imgLoader.src);
  }, []);
  return (
    <div className="">
      <div className="card p-0">
        <Link
          to={`/artikel/read/${props.id}&${props.judul}`}
          className="p-0 m-0"
        >
          {image !== null ? (
            <div
              className="card-img d-flex mb-3"
              style={{
                backgroundImage: `url(${image})`,
                backgroundColor: `var(--hitam)`,
              }}
            >
              <p className="align-self-end p-0 ms-3 m-0 px-3 popup-read ">
                Read me
              </p>
            </div>
          ) : (
            <Skeleton
              className="card-img d-flex mb-3"
              baseColor="#d5dfe8"
              highlightColor="#f0f6fc"
            />
          )}
          <div className="card-desc py-1 pb-0 position-relative">
            <img
              className="position-absolute bottom-0 end-0"
              style={{ transform: "rotate(180deg)" }}
              src={sgtPojok}
              alt="sgtPojok"
            />
            <h5 className="fs-4 fw-bolder">
              {props.judul || (
                <Skeleton
                  baseColor="#d5dfe8"
                  highlightColor="#f0f6fc"
                  width={Math.floor(Math.random() * (300 - 20)) + 20}
                />
              )}
            </h5>
          </div>
          <div className="card-footer p-0 m-0 d-flex justify-content-between bg-transparent">
            <p className="m-0">
              {props.uploader || (
                <Skeleton
                  baseColor="#d5dfe8"
                  highlightColor="#f0f6fc"
                  width={Math.floor(Math.random() * (300 - 20)) + 20}
                />
              )}
            </p>
            <p>
              {props.updatedAt !== undefined ? (
                props.updatedAt.slice(0,-14)
              ) : (
                <Skeleton
                  baseColor="#d5dfe8"
                  highlightColor="#f0f6fc"
                  width={Math.floor(Math.random() * (300 - 20)) + 20}
                />
              )}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArtikelUpCard;
