import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";

import Availability from "./Availability";

class RevenueMaster extends Component {
  render() {
    return (
      <Paper>
        <div className="title_dashboard">
          <div className="title_header">AVAILABILITY</div>
        </div>
        <Availability />
      </Paper>
    );
  }
}

export default RevenueMaster;
