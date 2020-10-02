import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Managenursemodal.css";
import { MdLocationOn, MdLocalPhone } from "react-icons/md";
import {MdEmail } from "react-icons/md";
import CloseIcon from '@material-ui/icons/Close';
import No_image_available from "../../Images/No_image_available.svg"

const styles = {};

export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  componentDidMount() {
    console.log(this.props.viewData, "sdfasdfasfdas")
  }

  render() {
    console.log(this.props.viewData, "data_chk")

    const styles = "";
    const { viewData, classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        
        <div className="manage_nurse_popup_details">

          <div className="manage_nurse_close_icon">
            <CloseIcon style={{ fontSize: "20px" }} onClick={this.props.onClose} />
          </div>
          {
            viewData != undefined &&
            <Grid container className="total">
              <Grid item xs={12} md={5}>
                <div className="manage_nurse_image_container">
                  <div className="manage_nurse_image_div">
                    {/* <img className="manage_nurse_image" src={viewData.profile_image} /> */}
                    <img
                  className="manage_nurse_image"
                  src={viewData.profile_image?viewData.profile_image:No_image_available}
                  alt="This IMG format is not supporting"
                  style={{ height: "100" }}
                />{" "}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7} className="addmanage_nurse_gridcontainer">
                <div>
                  {/* <div className="icon_edit">
                  <EditIcon className="icon" />
                </div> */}
                  <div>
                    <h1 className="manage_nurse_detail">
              
                      <h1>{viewData.name}</h1>
                      <p className="nurse_name_edit">{viewData.qualification}</p>
                      <p className="exp_text_edit">Exp - {viewData.experience} Years</p>
                    </h1>
                    <div className="age_details">
                      <h5>
                        <MdLocationOn className="location_icon" />
                      </h5>
                      <p className="manage_nurse_text">
                        {/* PO Box 2, safari 13001,Kuwait City,Kuwait -54541 */}
                        {viewData.address}
                  </p>
                    </div>
                    <div className="age_details">
                      <h5>
                        <MdLocalPhone className="call_icon"/>
                      </h5>
                      <p className="manage_nurse_text">{viewData.mobileno}</p>
                    </div>
                    <div className="age_details">
                      <h5>
                        <MdEmail className="globe_icon" />
                      </h5>
                      <p className="manage_nurse_text">
                        {/* Abida123@gmail.com */}
                        {viewData.email}
                      </p>
                    </div>
                    <div>
                      <h4 className="working_hour">
                        <b>Personal Details</b>
                      </h4>
                    </div>
                    <div className="nurse_working_detail">
                      <h4 className="nurse_working_hour_detail mr-2">Gender</h4>

                      <p className="working_time_detail">{this.props.viewData.gender == 1 ? "Male" : "Female"}</p>
                    </div>
                    <div>
                      <div className="nurse_working_detail">
                        <h4 className="nurse_working_hour_detail mr-2">Date Of Birth</h4>
                        <p className="working_time_detail">{viewData.dob}</p>
                      </div>
                    </div>
                    <div>
                      <div className="nurse_working_detail">
                        <h4 className="nurse_working_hour_detail mr-2">Nationality</h4>

                        <p className="working_time_detail">{this.props.viewData.nationality_id == 1 ? "SaudiArabian" : "American"}</p>
                      </div>
                    </div>
                    <div>
                      <div className="nurse_working_detail">
                        <h4 className="nurse_working_hour_detail mr-2">Language</h4>

                        <p className="working_time_detail">{viewData.language}</p>
                      </div>
                    </div>
                    <div>
                      <div className="nurse_working_detail">
                        <h4 className="nurse_working_hour_detail">Skills</h4>

                        <p className="working_time_detail">
                          {viewData.skills}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <div className="nurse_modal_button">
                    <div>
                      {/* <button type="button" class="btn-nurse btn-success"> */}
                      <div className="eight_hrs_edit">
                        <p className="eight_text">8 Hrs</p>
                        </div>
                  {/* </button> */}
                      <p className="cost_edit">Cost/Month (KWD)</p>
                      <p className="btn_text">{viewData.cost_eight_hours}</p>
                    </div>
                    <div>
                      {/* <button type="button" class="btn-nurse btn-success"> */}
                      <div className="eight_hrs_edit">
                        <p className="eight_text">12 Hrs</p>
                        </div>
                  {/* </button> */}
                      <p className="cost_edit">Cost/Month (KWD)</p>
                      <p className="btn_text">{viewData.cost_twelve_hours}</p>
                    </div>
                  </div>
                </div>

                {/* <div className="package_container">
                <div className="package_details_container">
                  <div className="package_details">
                    <div className="package_details_list">
                      <p>Contacct Person Mobile Number</p>
                    </div>
                  </div>
                  <div>
                    <p>+956 22001110</p>
                  </div>
                </div>
              </div> */}

                {/* <div className="package_cancel_details">
                <Button
                  className="package-cancel_button"
                  onClick={this.props.onClose}
                >
                  Cancel
                </Button>
              </div> */}
              </Grid>
            </Grid>
          }
        </div>
         
      </Dialog>

    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);

// export default function SimpleDialogDemo(props) {
//   const [open, setOpen] = React.useState(props);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = value => {
//     setOpen(false);

//   };

//   return (
//     <div>

//       <SimpleDialog  open={open} onClose={handleClose}>

//       </SimpleDialog>
//     </div>
//   );
// }



