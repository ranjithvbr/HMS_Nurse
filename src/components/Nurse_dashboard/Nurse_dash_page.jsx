import React, { Component } from "react";
import { Paper, Card, Divider } from "@material-ui/core";
import "./Nurse_dash_page.css";
import { NavLink } from "react-router-dom";
import Nursedetails from "./Nurse_dash_details";
import { apiurl } from "../../App";
import Axios from 'axios'
var dateFormat = require('dateformat');


class Nurse_dash_page extends Component {
  state={
   cancel:"",
   managenurse:"",
   nursehired:"",
   nurseidle:"",
   nurseleave:"",
   revenue:"",
   TableData:[],
   ViewData:"",
   CostofMonth:"",
   Duties:[],
   props_loading:true
  }
  componentWillMount(){
   this.AppointmentGetData()
  }
  AppointmentGetData=()=>{
    var self=this
    Axios({
      method:"post",
      url:apiurl  + "Nurse/nurseDashboard",
      data:{
        "nursevendorId":"5",
        "today_date":dateFormat(new Date(), "yyyy-mm-dd")
      }
    }).then((response)=>{
      if(response.data.data &&response.data.data[0]){
      const ApiData=response.data.data[0].dashboard
      // const Data=
    
      var TableData=[]
      var CostofMonth=[]
      console.log(response,"responseee")
    //  response.data.data[0].CostofMonth[0].map((val)=>{
    //   CostofMonth.push({CostofMonth:val.CostofMonth,id:val.nurseId})
    //  })

      response.data.data[0].today_appointments.map((val,index)=>{
          TableData.push({customername:val.PatientName,nursename:val.Nursename,dutyhours:val.working_hours,
                         months:val.Noofmonth,
                         costofmonth:val.CostofMonth && val.CostofMonth[0].CostofMonth,
                         totalcost:val.amount,      
                         id:index       
                        })
      })
      self.setState({
        cancel:ApiData.cancel_count,
        nursehired:ApiData.nursehired,
        nurseidle:ApiData.nurseidle,
        nurseleave:ApiData.nurseleave,
        managenurse:ApiData.managenurse,
        revenue:ApiData.nursetotalrevenue,
        TableData,
        ViewData:response.data.data[0].today_appointments,
        props_loading:false
      })
      console.log("response_data",this.state.ViewData)
    }
    })    
  }

  render() {
    return (
      <div className="VendorDetailsDiv">
        <Paper className="paper">
          <div className="nurse_dashboard_buttons_wrap">
            <Card
              component={NavLink}
              to="/Home/nursehired" 
              className="nurse_button1 nurse_button_common_styles"
            >
              <p className="nurse_button_text"> Total Hired</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.nursehired}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/idlenurse"
              className="nurse_button2 nurse_button_common_styles"
            >
              <p className="nurse_button_text">Total Idle</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.nurseidle}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/nurseleave"
              className="nurse_button5 nurse_button_common_styles"
            >
              <p className="nurse_button_text">Total on Leave/Block</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.nurseleave}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/cancelledappointments"
              className="nurse_button6 nurse_button_common_styles"
            >
              <p className="nurse_button_text">Total Cancelled</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.cancel}</p>
              </div>
            </Card>

            <Card
              component={NavLink}
              to="/Home/managenurse"
              className="nurse_button4 nurse_button_common_styles"
            >
              <p className="nurse_button_text">Manage Nurses</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.managenurse?this.state.managenurse:0}</p>
              </div>
            </Card>
            <Card
              component={NavLink}
              to="/Home/revenue"
              className="nurse_button3 nurse_button_common_styles"
            >
              <p className="nurse_button_text">Revenue (KWD)</p>
              <div className="divider_container">
                <div className="divider_1px"></div>
              </div>
              <div className="nurse_dash_numeric_wrap">
    <p className="nurse_dash_numeric_value">{this.state.revenue?this.state.revenue:0}</p>
              </div>
            </Card>
          </div>
          <Nursedetails
          TableData={this.state.TableData}
          AppointmentGetData={this.AppointmentGetData} 
          props_loading={this.state.props_loading}
          ViewData={this.state.ViewData}
          CostofMonth={this.state.CostofMonth}
          />
        </Paper>
      </div>
    );
  }
}

export default Nurse_dash_page;
