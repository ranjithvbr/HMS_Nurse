import React, { Component } from "react";
import Nursepage from "./Nurse_dash_page";
import Paper from "@material-ui/core/Paper";

export default class Nurse_dash_master extends Component {
  render() {
    return (
      <div>
        <Paper>
          <div className="title_dashboard">
            <div className="title_header"> NURSE DASHBOARD</div>
          </div>
          <Nursepage />
        </Paper>
      </div>
    );
  }
}
