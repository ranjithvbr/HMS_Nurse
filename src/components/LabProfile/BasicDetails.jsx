import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
// import './PharmacyEntryMaster'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./BasicDetails.css";
import { Tag, Input, Icon } from "antd";
export default class BasicDetails extends React.Component {
  constructor() {
    super();
    this.state = { nmae: ""};
  }

  log = e => {
    console.log(e);
  };
  render() {
    return (
      <div className="basic_detailsmodal">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className="basic_address_details">
              <Labelbox 
              type="text" 
              labelname="Address"
              value="Jabriya"
               />
              <Labelbox
                type="text"
                labelname="Contact Person"
                value="Hamad Addallah Hassan"
              />
              <Labelbox
                type="text"
                labelname="Website"
                value="www.kuwaittourism.com"
              />
              {/* <Labelbox type="text" labelname="Pincode"/> */}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="basic_address_details">
              <Labelbox type="number" labelname="Mobile Number" />
              <Labelbox type="text" labelname="Email Id" value="tec@tec.kw" />
              {/* <Labelbox type="select" value="Hawaly" labelname="Area Service" /> */}
              {/* <div className="tag_closeicons_container">
                <div>
                  <Tag closable className="tag_closeicons" onClose={this.log}>
                    Mubarak AI-Kabeer
                  </Tag>
                </div>
                <div>
                  <Tag closable className="tag_closeicons" onClose={this.log}>
                    AI-Farwaniya
                  </Tag>
                </div>
              </div>
              <div className="tag_closeicons_container">
                <div>
                  <Tag closable className="tag_closeicons" onClose={this.log}>
                    Mubarak AI-Kabeer
                  </Tag>
                </div>
                <div>
                  <Tag closable className="tag_closeicons" onClose={this.log}>
                    AI-Farwaniya
                  </Tag>
                </div> */}
              {/* </div> */}
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="userbuttons_container">
              <div>
                <div>
                  <Button
                    className="usercancel_button"
                    variant="contained"
                    onClick={() => this.props.handleClickClose(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <div>
                <div>
                  <Button
                    className="userupload_button"
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </div>
    );
  }
}
