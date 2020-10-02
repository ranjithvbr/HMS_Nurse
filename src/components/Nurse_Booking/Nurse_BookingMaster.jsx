import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Nurse_BookingMaster.css";
import Nurse_BookingDetails from "./Nurse_BookingDetails";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

export default class Nurse_BookingMaster extends Component {
  render() {
    return (
      <div className="uploadmaster">
        <div className="uploadsmasterheader">
          <Grid container>
            <Grid items xs={6} md={6}>
              <div className="titlebooked">Total Booked</div>
            </Grid>
          </Grid>
        </div>
        {/* <Nurse_BookingDetails/> */}
      </div>
    );
  }
}
