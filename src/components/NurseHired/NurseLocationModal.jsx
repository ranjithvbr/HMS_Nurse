import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Map from "./Map";

class NurseLocationModal extends Component {
  render() {
    return (
      <div>
        <Grid container style={{ padding: "0px" }}>
          <Grid
            item
            sm={12}
            md={3}
            style={{ backgroundColor: "dimgrey", color: "white" }}
          >
            <div
              style={{
                fontSize: "16px",
                marginTop: "60px",
                marginLeft: "10px"
              }}
            >
              <div>ABIDA</div>
              <div>29 Years / Female</div>
              <div>Saudi</div>
              <div>5 Years Experience</div>
              <div>+965 22000001</div>
            </div>
          </Grid>
          <Grid item sm={12} md={9}>
            <Map />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NurseLocationModal;
