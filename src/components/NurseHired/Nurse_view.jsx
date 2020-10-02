import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import No_image_available from "../../Images/No_image_available.svg"
import CloseIcon from '@material-ui/icons/Close';
import dateformat from 'dateformat';

import "./Nurse_view.css";

const styles = {};

export default class Nurse_view extends Component {
  state = {
    OpenViewData:[],
    see:true,
  };
  
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  onclose=()=>
  {
    this.setState({view:false})
  }

  UNSAFE_componentWillReceiveProps(newprops){
    this.setState({
      viewdata:newprops.OpenViewData
    })
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

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    // const {propsval}=this.props
    //   const {val} = propsval ? propsval.OpenViewData : ""
    //   console.log(val,"props_open_viewdata_checking")

    // const val=this.props.OpenViewData
    var val=this.props.OpenViewData
    console.log(val,"val_checkkk")
      console.log(val.CostofMonth&&val.CostofMonth[0],"props_open_viewdata_checking")
      console.log(val.Dutiesofnurse&&val.Dutiesofnurse,"dutied_array")


 
    return (
      <Dialog className="dialog_nurse_eyeview" onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <div className="close_icon">
                <CloseIcon  onClick={this.props.onClose}/>
                </div>
      <div>
        <Grid container className="nurse_view_grid_container">
          <>
        {/* {this.props.OpenViewData.map((val)=>{
          console.log(val,"val_chkk")
              return(  */}
                {/* <>  */}
          <Grid item className="nurse_view_image_grid" xs={12} md={3}>
            <div className="nurse_view_image_wrap">
              <div className="nurse_view_image_childdiv">
                <img
                  className="nurse_view_image"
                  src={val&&val.profile_name?val.profile_name:No_image_available}
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
                    {val&&val.Nursename}
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_age">
              {/* 29years */}
              {val&&val.age} Years/{val&&val.nurseGender==1?"Male":"Female"}
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
                    {val&&val.nurseExperience} Years Experience
                  </text>
                </div>
                <div className="nurse_view_name_wrap">
                  <text className="nurse_view_experience">
                    {/* +965 22000001 */}
                    {val&&val.mobileno}
                  </text>
                </div>
              </div>
              <div className="dutytime_container">
                <p className="time-inhours">
                  {/* 8 Hrs */}
                  {val && val.working_hours} Hrs
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
                {val&&val.PatientName}
              </text>
            </div>
            <div className="nurse_view_name_wrap">
              <text className="nurse_view_address">
                {/* 6623 Western Ring Rd, */}
                {/* {val&&val.address}
                <label className="road_dot">...</label> */}
                <label className="road_dot" onClick={this.viewAddress}>...</label>
                {this.state.see === false ?
                        <div className="address_edit">
                          {this.props.val && val.address?this.props.val && val.address:"----"}
                          {/* <p>2-79</p>
                          <p>ABC Street</p>
                          <p>D NAGAR</p> */}
                        </div>:null}
              </text>
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">Start Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Dec 2019 */}
                {dateformat(val&&val.from_date,"dd mmm yyyy")}
                </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">End Date</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 20 Feb 2020 */}
                {dateformat(val&&val.to_date,"dd mmm yyyy")}
              </label>{" "}
            </div>
            <div className="nurse_view_subheader">
              {" "}
              <label className="nurse_view_qualitiy">No.Of Months</label>
              <label className="nurse_view_colon">:</label>
              <label className="nurse_view_values">
                {/* 1 */}
                {val&&val.Noofmonth}
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
                {val.CostofMonth && val.CostofMonth[0].CostofMonth} KWD
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
                {val&&val.amount} KWD
              </label>{" "}
            </div>
          </Grid>

          <Grid item xs={12} md={6} className="generalduties_details_container">
            <div className="generalduties_details">
              <h4 className="general_head">General Duties</h4>  
              <text className="genaeral_details">
                {val&&val.skills}
              </text>

              <h4 className="general_head">Designed Duties</h4>
              {val&&val.Dutiesofnurse&&val.Dutiesofnurse.map((duty)=>{
                return(
              <text className="genaeral_details">
                {duty && duty.duties}
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
          {/* </> */}
          {/* // )} */}
          {/* // )} */}
          </>
        </Grid>
      </div>
      </Dialog>
    );
  }
}

const Nurse_viewWrapped = withStyles(styles)(Nurse_view);
