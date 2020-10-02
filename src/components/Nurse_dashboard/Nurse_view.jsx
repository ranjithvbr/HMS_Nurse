import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./Nurse_view.css";
import CloseIcon from '@material-ui/icons/Close';
import dateformat from 'dateformat';
import No_image_available from "../../Images/No_image_available.svg"

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cancel: null,
      view:false,
      ViewData:"",
      Cost:"",
      Duties:"",
      see:true,
    };
  }
  viewAddress =()=>{
    console.log(this.state.see,"seeee")
    // alert("dot_open")
    // alert(this.state.see)
    this.setState({
      see:!this.state.see,
    })
    console.log(this.setState.see,"see_check")
    // alert(this.state.see)
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open=()=>
  {
    this.setState({view:true})
 
  }
  onclose=()=>
  {
    this.setState({view:false})
  }
 
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    var ViewData=this.props.ViewData
    console.log(this.props.ViewData,"testingg")
    // console.log(this.props.ViewData.map((val)=>val),"viewdata")

    return (
      <div className="doctor_popup_details">
        <Dialog className="dialog_nurse_eyeview" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <div className="close_icon">
                <CloseIcon  onClick={this.props.onClose}/>
                </div>
      <div>
        <Grid container className="nurse_view_grid_container">
          <>
          <Grid item className="nurse_view_image_grid" xs={12} md={3}>
            <div className="nurse_view_image_wrap">
              <div className="nurse_view_image_childdiv">
                <img
                  className="nurse_view_image"
                  src={ViewData && ViewData.profile_name?ViewData.profile_name:No_image_available}
                  alt="This IMG format is not supporting"
                  style={{ height: "100" }}
                />{" "}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="nurse_view_wrap_container">
              <div className="nurse_view_name_timecontainer">
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_name">
                    {/* Mortal */}
                    {ViewData && ViewData.Nursename}
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_age">
              {/* 29years */}
              {ViewData && ViewData.age} Years/{ViewData && ViewData.gender==1?"Male":"Female"}
                  </text>
                </div>
                {/* <div className="nurse_view_name_wrap">
                  <text className="nurse_view_country">
                    Saudi
                  </text>
                </div> */}
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* 3 Years experience */}
                    {ViewData && ViewData.experience} Years Experience
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* +965 22000001 */}
                    {ViewData && ViewData.mobileno}
                  </text>
                </div>
              </div>
              <div className="dutytime_container">
                <p className="time-inhours">
                  {/* 8 Hrs */}
                  {ViewData && ViewData.working_hours} Hrs
                </p>
              </div>
            </div>
            <div className="nurse_divider_container">
              <div className="nurse_divider_1px"></div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_name">
                {/* Abdul Rahman */}
                {ViewData && ViewData.PatientName}
              </text>
            </div>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_address">
                {/* 6623 Western Ring Rd, */}
                {/* {ViewData && ViewData.address} */}
                <label className="road_dot" onClick={this.viewAddress}>...</label>
                {this.state.see === false ?
                        <div className="address_edit">
                          {this.props.ViewData.address?this.props.ViewData.address:"----"}
                          {/* <p>2-79</p>
                          <p>ABC Street</p>
                          <p>D NAGAR</p> */}
                        </div> :null }
              </text>
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Start Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Dec 2019 */}
                {dateformat(ViewData && ViewData.from_date,"dd mmm yyyy")}
                </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">End Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Feb 2020 */}
                {dateformat(ViewData && ViewData.to_date,"dd mmm yyyy")}
              </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">No.Of Months</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 1 */}
                {ViewData && ViewData.Noofmonth}
              </label>{" "}
            </div>
            <>
            {/* {val && val[0].CostofMonth.map((cost_month)=>{
            return( */}
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Cost/Month</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 400 KWD */}
                {ViewData.CostofMonth && ViewData.CostofMonth[0] && ViewData.CostofMonth[0].CostofMonth} KWD
              </label>{" "}
            </div>
             {/* )})} */}
             </>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Total Cost</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 400 KWD */}
                {ViewData && ViewData.amount} KWD
              </label>{" "}
            </div>
          </Grid>

          <Grid item xs={12} md={6} className="generalduties_details_container">
            <div className="generalduties_details">
              <h4 className="general_head">General Duties</h4>  
              <text className="genaeral_details">
              {ViewData && ViewData.skills}
              </text>

              <h4 className="general_head">Designed Duties</h4>
              {ViewData && ViewData.Dutiesofnurse&&ViewData.Dutiesofnurse.map((duty)=>{
                return(
              <text className="genaeral_details">
                {duty.duties}
                <br />
              </text>
               )})}
              <div className="nurse_view_cancelbutton">
                <Button
                  variant="outlined"
                  className="nurse_modelcancel"
                  color="secondary"
                  onClick={this.props.onClose}
                >
                  Close
                </Button>
              </div>
            </div>
            
          </Grid>
          </>
        </Grid>
      </div>
      </Dialog>
           
      </div>
    );
  }
}

