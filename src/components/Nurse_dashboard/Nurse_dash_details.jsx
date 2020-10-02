
import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./Nurse_dash_details.css";
import Button from "@material-ui/core/Button";
import dateFormat from "dateformat";
import { NavLink } from "react-router-dom";
import Nurse_view from './Nurse_view'
const current_date = dateFormat(new Date(), "dd mmm yyyy");
class DashboardTable extends React.Component {
  state = {
    openview: false,
    viewdata:"",
    EditData:"",
    EditData:[],  //suriya i/p

  };

  createData = parameter => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data,id) => {
  // alert(id)
    if (data === "view") {
      this.setState({ openview: true,
        // EditData:this.props.ViewData.find(val=>val.NurseId === id)   //divya i/p
        EditData:this.props.ViewData[id]   //suriya i/p
       });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview:false, editopen: false });
  };


  render() {
    return (
      <div>
        <div className="nurse_dash_sidehead">
          <text className="todays_appointments_text">
            <b>Today's Appointments</b>
          </text>
          {current_date}
        </div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "nursename", label: "Nurse Name" },
            { id: "dutyhours", label: "Duty Hours" },
            { id: "totalmonths", label: "Total Months" },
            { id: "costpermonth", label: "Cost/Month(KWD)" },
            { id: "totalcost", label: "Total Cost(KWD)" },
            { id: "", label: "Action" }
          ]}
          rowdata={this.props.TableData}
          props_loading={this.props.props_loading}
          tableicon_align={" "}
          DeleteIcon="close"
          EditIcon="close"
          HistoryIcon="close"
          GrandTotal="close"
          modelopen={(e,id) => this.modelopen(e,id)}
        />

        <div className="page_button_container">
          <div>
            <Button
              component={NavLink}
              to="/Home/availability"
              className="lab_dash_bottom_buttons lab_dash_bottom1"
            >
              Availability Calendar
            </Button>
            <Button
              component={NavLink}
              to="/Home/customerhistory"
              className="lab_dash_bottom_buttons lab_dash_bottom2"
            >
              Customer History
            </Button>
            <Button
              component={NavLink}
              to="/Home/advertisement"
              className="lab_dash_bottom_buttons lab_dash_bottom3"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>
        {/* <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={e => this.closemodal(e)}
        >

        </Modalcomp> */}
        <Nurse_view open={this.state.openview} onClose={this.closemodal}
        ViewData={this.state.EditData}

        />
        {/* <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp> */}
      </div>
    );
  }
}

export default DashboardTable;