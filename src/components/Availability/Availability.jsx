import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import dateFormat from 'dateformat';
import Calender from "./Calendar";
import { Select, notification } from 'antd';
import Axios from 'axios';
import { apiurl } from '../../App';


import "./Availability.css";


const { Option } = Select;

export default class Availability extends Component {


  constructor(props) {
    super(props)
    this.state = {
      nurseNames: [],
      fromdate: new Date(),
      todate: new Date(),
      nurseId: "",
      nurseId_cal:"1",
      nurseavaliable:false,
    }
  }



  nurseNames = () => {
    Axios({
      method: "POST",
      url: apiurl + "Nurse/getnurse",
      data: { nursevendorId: "5" }
    }).then((response) => {

      this.setState({ nurseNames: response.data.data })
    }).catch((err) => {

    })
  }

  componentWillMount() {
    this.nurseNames()
  }

  getNurseNames = () => {
    let nurses = [];
    for (let i = 0; i < this.state.nurseNames.length; i++) {
      nurses.push(<Option key={i + 1} value={this.state.nurseNames[i].NurseId}>{this.state.nurseNames[i].name}</Option>)
    }

    return nurses;
  }


  storeDate = (data, key) => {
    if (key === "fromdate") {
      this.setState({ fromdate: data, Selectrequired: false })
    }

    if (key === "todate") {
      this.setState({ todate: data, Selectrequired: false })
    }
  }


  LeaveorBlock = (endPoint) => {
    if (!this.state.selectsettrue) {
      this.setState({ Selectrequired: true })
    }
    else if(new Date(this.state.fromdate) > new Date(this.state.todate) ||  new Date(this.state.fromdate) === new Date(this.state.todate)){
    } else {
      var data = {
        "nurseId": this.state.nurseId,
        "from_date": dateFormat(new Date(this.state.fromdate),"yyyy-mm-dd"),
        "to_date": dateFormat(new Date(this.state.todate),"yyyy-mm-dd"),
        "nursevendorId": "5" 
      }

      // dateFormat(new Date(this.state.fromdate),"yyyy-mm-dd"),

      console.log("sadfkjsdhfkjshdfkj", data)
      Axios({
        method: "POST",
        url: apiurl + `Nurse/${endPoint}`,
        data: data
      }).then((response) => {
        //  alert(response.data.msg)
         notification.info({
          description:response.data.msg,
            placement:"topRight",
        });
        this.setState({nurseavaliable:true})
        
      }).catch((err) => {

      })
    }
  }

  getRangeData = (data) => {

    console.log(data, "getRangeData")
    if (data.enddate === null) {

      this.setState({ fromdate: data.startdate })
    } else {
      if (data.startdate < data.enddate) {

        this.setState({ fromdate: data.startdate, todate: data.enddate })
      } else {
        this.setState({ fromdate: data.enddate, todate: data.startdate })
      }
    }
  }



  storeNurse = (data) => {
    console.log(data,"dataattttt")
    this.setState({ nurseId: data, Selectrequired: false, selectsettrue: true ,nurseavaliable:true})
  }
  render() {
    var errorstate = new Date(this.state.fromdate) > new Date(this.state.todate) ||  new Date(this.state.fromdate) === new Date(this.state.todate) 
    console.log(this.state.fromdate,"fromdate")
    console.log(this.state.todate,"fromdate")

    return (
      <div>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Calender getDate={(data) => this.getRangeData(data)} nurseavaliablefalse={()=>this.setState({nurseavaliable:false})} nurseavaliable={this.state.nurseavaliable} nurseId={this.state.nurseId} />
          </Grid>
          <Grid item sm={12} md={6}>
            <div style={{ padding: "20px" }} className="opacity_letter_availability">

              {/* <Select style={{ width: "100%",marginBottom:"15px" }} onChange={(data) => this.storeNurse(data)} ></Select> */}
              <Select style={{ width: "100%",marginBottom:"15px" }} onChange={(data) => this.storeNurse(data)} placeholder="Nurses name"> 
                {this.getNurseNames()}
                
              </Select>
              <div className="errormsgAvailability">{this.state.Selectrequired && "Field Required"}</div>
              <div
                className="avail_date_picker"
                style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}
              >
                <Labelbox type="datepicker" labelname="From Date" value={this.state.fromdate} changeData={(data) => this.storeDate(data, "fromdate")} minDate={new Date()}/>
                <Labelbox type="datepicker" labelname="To Date" value={this.state.todate} changeData={(data) => this.storeDate(data, "todate")} errmsg={"ToDate Should Be Greater Than FromDate"} error={errorstate} minDate={new Date()}/>

              </div>
              <div className="avail_button">
                <div>
                  <button type="button" class="btn btn-primary btn-lg leave_btn" onClick={() => this.LeaveorBlock("insertnurseleavedate")}>Leave</button>
                </div>
                <div>
                  <button type="button" class="btn btn-primary btn-lg block_btn" onClick={() => this.LeaveorBlock("Blocknursedate")}>Block</button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
