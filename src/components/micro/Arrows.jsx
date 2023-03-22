import React from "react";
const Arrows = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div
      className={`arrow-group ${`${currentSlide === 0 ? "display-none" : ""}`}`}
    >
      <div className="" onClick={() => previous()}>
        <div>
          <i className="bi bi-caret-left-fill"></i>
        </div>
      </div>
      <div className="" onClick={() => next()}>
        <div>
          <i className="bi bi-caret-right-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Arrows;
