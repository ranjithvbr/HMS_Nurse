import React, { Component } from "react";
import { Grid } from "@material-ui/core";
// import doctor from '../../Images/doctor.jpg'
import { Icon } from "antd";
import { TextField, Button } from "@material-ui/core";
import "./Nurse_pass.css";
import OM from "../../Images/Logo.png";
import Nurse_Login from "../../Images/nurse_login.png";

export default class Nurse_pass extends Component {
  render() {
    return (
      <div>
        <Grid container className="nurse_login_container">
          <Grid className="Login_image_grid" items sm={12} md={7}>
            <div className="nurse_login_image_wrap">
              <img className="nurse_login_image" src={Nurse_Login} />
            </div>
            <text className="transformed_text">NURSE COMPANY</text>
          </Grid>
          <Grid className="nurse_login_contents" item sm={12} md={5}>
            <img className="One_Mom_logo_forgotpass" src={OM} />
            <div className="nurse_login_wrap">
              <text className="welcome_text">REQUEST NEW PASSWORD</text>
              <div className="nurse_email_div">
                <TextField
                  className="nurse_input_email"
                  label="EMAIL"
                  margin="normal"
                />
                <Icon className="nurse_email_icon" type="mail" theme="filled" />{" "}
              </div>

              <div className="nurse_login_button_div">
                <Button className="nurse_login_button">Submit</Button>
              </div>
              <div className="nurse_cancel">
                {" "}
                <a className="cancel">Cancel</a>
              </div>
              <div></div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
