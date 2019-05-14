import React from "react";
import Navigation from "../navigation";
import User from "../user";
const UserPage = props => {
  return (
    <React.Fragment>
      <div className="header-result">
        <div className="container">
          <Navigation />
        </div>
      </div>
      <div className="main-result">
        <div className="container">
          <User data={props.data} startSearch={props.startSearch} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
