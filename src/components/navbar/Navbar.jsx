import React, { useEffect } from "react";
import "../../main.css";
import img from "../../assets/img/P.svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../stores/reducers/user/usersSlice";
import User from "./User";

const Navbar = () => {
  const location = useLocation();
  const { validated, data_user } = useSelector(user);

  console.log(location);
  switch (location.pathname) {
    case "/login":
      return null;
    case "/register":
      return null;
    default:
      return (
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid my-2 px-4">
            <a className="navbar-brand" href="#">
              <img src={img} alt="Brand-Logo" />
            </a>
            <div className="d-flex">
              <div className="user-mobile">
                <User />
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <label className="toggler-line" htmlFor="check">
                    <input type="checkbox" id="check" />
                    <span></span>
                    <span></span>
                    <span></span>
                  </label>
                </span>
              </button>
            </div>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={"/destinasi"}
                  >
                    Destinasi Wisata
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href="artikel.html"
                    to={"/artikel"}
                  >
                    Artikel Wisata
                  </Link>
                </li>
                {validated === true && (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to={"/posting/wisata"}
                      >
                        Posting Wisata
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to={"/posting/artikel"}
                      >
                        Posting Artikel
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="user-not-mobile">
              <User />
            </div>
          </div>
        </nav>
      );
  }
};

export default Navbar;
