import React, { Component } from "react";
import { Grid } from "@material-ui/core";
// import doctor from '../../Images/doctor.jpg'
import { Icon } from "antd";
import { TextField, Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Trainer_viewWrapped from "./passresetmodal";
import { TiTick } from "react-icons/ti";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./Nurse_passreset.css";
import OM from "../../Images/Logo.png";
import Pass_Reset from "../../Images/pass_reset.png";

export default class Nurse_login extends Component {
  state = {
    password: "",
    showPassword: false,
    opening: false
  };
  handleClickopen = () => {
    this.setState({ opening: true });
  };
  handleClose = () => {
    this.setState({ opening: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    return (
      <div>
        <Grid container className="nurse_login_grid">
          <Grid className="Login_image_grid" items sm={12} md={7}>
            <div className="nurse_login_image_wrap">
              <img className="nurse_login_image" src={Pass_Reset} />
            </div>
            {/* <text className="transformed_text">NURSE COMPANY</text> */}
          </Grid>
          <Grid className="nurse_login_contents" item sm={12} md={5}>
            <img className="One_Mom_logo_passreset" src={OM} />
            <div className="nurse_login_wrap">
              <text className="welcome_text">RESET PASSWORD</text>
              {/* <div className="nurse_email_div">
                <TextField
                  className="nurse_input_email"
                  label="EMAIL"
                  margin="normal"
                />
                <Icon className="nurse_email_icon" type="mail" theme="filled" />{" "}
              </div> */}
              <div className="nurse_pass_div">
                <FormControl className="nurse_input_pass">
                  <InputLabel htmlFor="adornment-password">
                    NEW PASSWORD
                  </InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          className="pass_eye_button"
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="nurse_pass_div">
                <FormControl className="nurse_input_pass">
                  <InputLabel htmlFor="adornment-password">
                    CONFIRM PASSWORD
                  </InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                        //       className="pass_eye_button"
                        //       aria-label="Toggle password visibility"
                        //       onClick={this.handleClickShowPassword}
                        >
                          <TiTick className="reset-tickmark" />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="nurse_login_button_div">
                <Button
                  className="nurse_login_button"
                  onClick={this.handleClickopen}
                >
                  Submit
                </Button>
              </div>
              <div className="nurse_forgot_pass">
                <a className="forget">Cancel</a>
              </div>
              <div></div>
            </div>
          </Grid>
        </Grid>
        {/* <Trainer_viewWrapped
          open={this.state.opening}
          onClose={this.handleClose}
        /> */}
        <Modalcomp
          visible={this.state.opening}
          closemodal={this.handleClose}
          title={"Success"}
          className="addrooms_title"
        >
          <h4>Your password has been changed successfully</h4>
        </Modalcomp>
      </div>
    );
  }
}
