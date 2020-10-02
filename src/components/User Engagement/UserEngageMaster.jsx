import React, { Component } from "react";
import "./UserEngageMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import UserView from "./UserView";
import UserEngageTable from "./UserEngageTable";
import Plus from "../../Images/plus.png";
import Paper from "@material-ui/core/Paper";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
class UserEngageMaster extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }
  viewmodal = () => {
    this.setState({ open: true });
  };
  viewmodalClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { Option } = Select;
    return (
      <div className="user_engage_dashboard_master">
        <div className="dashboardborder_box">
          <p className="dashboard">User Engagement</p>
          <img src={Plus} onClick={this.viewmodal} />
        </div>
        <Paper>{/* <UserEngageTable/> */}</Paper>
        <Modalcomp
          visible={this.state.open}
          closemodal={this.viewmodalClose}
          title="Media Uploads"
        >
          <UserView />
        </Modalcomp>
      </div>
    );
  }
}
export default UserEngageMaster;
