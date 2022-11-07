import React from "react";
import { Alert } from "reactstrap";

const AlertPopUp = (props) => {
  return (
    <Alert
      color={props?.alert.color}
      isOpen={props?.alert.open}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        height: "55px",
        maxWidth: "60%",
      }}
      toggle={props?.toggleAlert}
      fade={true}
    >
      <span className={`text-dark`}>{props?.alert.message}</span>
    </Alert>
  );
};

export default AlertPopUp;
