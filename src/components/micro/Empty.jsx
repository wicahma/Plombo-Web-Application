import React from "react";
import empty from "../../assets/img/empty.svg";
const Empty = (props) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img src={empty} alt="empty" className="empty-image" />
      <p>Kosong</p>
    </div>
  );
};

export default Empty;
