import React from "react";
import A from "../Button/A";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex align-items-center justify-content-center flex-column">
            <div className="dev-info">
              Developed by <A to="https://github.com/sanoofp" text="@sanoofp" />
            </div>
            <A to="https://github.com/sanoofp/nodejs-mcq" text="Contribute to this Project" />
          </div>
        </div>
      </div>
    </div>
  );
}