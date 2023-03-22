import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = (props) => {
  return (
    <div className={`loading-layer ${!props.loading && "d-none"}`}>
      <div className="loading">
        <HashLoader
          cssOverride={{
            margin: "auto",
            filter: "drop-shadow(-.5rem -.5rem 1rem var(--dark-solid))",
          }}
          color={"#fff"}
        />
        <h3 className="mt-3">Loading.</h3>
      </div>
    </div>
  );
};

export default Loading;
