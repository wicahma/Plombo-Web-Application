import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ pages }, ...rest) => {
  const { pathname } = useLocation();
  return (
    <div
      className={`row ${pathname.includes("&") ? "breadcrumb-destinasi" : ""}`}
      aria-label="breadcrumb"
    >
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}>Home</Link>
        </li>
        {pages !== undefined &&
          pages.map((page, index) => {
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={page.to}>
                {page.name}
                </Link>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
