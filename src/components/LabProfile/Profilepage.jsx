import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Profilepage.css";
import { MdEmail } from "react-icons/md";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Modalcomp from "./ProfileModal";
const styles = {};
export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div className="profile_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <Grid container className="total">
            <Grid item xs={12} md={5}>
              <div className="profile_imageuser_container">
                <div className="profile_imageuser_div">
                  <img className="profile_imageuser" src={Trainee} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="addprofile_gridcontainer">
              <div className="profile_nursecontainer">
                <div className="icon_edit">
                  <EditIcon className="icon" onClick={this.open} />
                </div>
                <div style={{ padding: "20px" }}>
                  <h1 className="profile_detail">Abdul Khaafid</h1>
                  <div className="age_details">
                    <h5>
                      <MdLocationOn className="icon_groups" />
                    </h5>
                    <p className="profile_text">Jabriya...</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <MdLocalPhone className="icon_groups" />
                    </h5>
                    <p className="profile_text">+965 220000001</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <MdEmail className="icon_groups" />
                    </h5>
                    <p className="profile_text">+965 220000001</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <IoIosGlobe className="icon_groups" />
                    </h5>
                    <p className="profile_text">
                      Airdox Medical service.com.kw
                    </p>
                  </div>
                  {/* <div>
                    <p className="area_services">Area Services</p>
                  </div>
                  <div style={{ height: "40px" }}>
                    <div className="areaservice_container">
                      <p>Hawally</p>
                      <p className="border_para"></p>
                      <p>kubarak AI-K</p>
                      <p className="border_para"></p>
                      <p>Hawally</p>
                    </div>
                  </div> */}
                  <Divider />
                </div>
              </div>
            </Grid>
          </Grid>
        </Dialog>
        <Modalcomp open={this.state.view} onClose={this.onclose} />
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);
