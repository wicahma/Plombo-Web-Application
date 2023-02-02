import React from "react";

const CardValidation = (props) => {
  return (
    <div
      className="validation-card text-center"
      style={{
        backdropFilter: !props.validation && "blur(10px)",
        backgroundColor: !props.validation && "#ff000058",
      }}
    >
      {!props.validation && <p>Unverified</p>}
    </div>
  );
};

export default CardValidation;
