import React, { Component } from "react";
import { Select } from "antd";
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import NursebookedTable from "./NursebookedTable";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


class NursebookedHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: false,
      date: "rrr"
    };
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;

    return (
      <Paper>
        {/* <div className="title_dashboard">
          <div className="title_header">TOTAL NURSES HIRED</div>
          <div style={{ fontSize: "16px",display:"flex",alignItems:"center" }}>
            <ButtonGroup className="clinic_group_details" size="small" aria-label="small outlined button group">
              <Button className="clinic_details">This Week</Button>
              <Button className="clinic_details">This Month</Button>
              <Button className="clinic_details">This Year</Button>
            </ButtonGroup>
            <Moment format="DD-MMM-YYYY" className="mr-2 ml-2"></Moment>
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <div className="icon_head">
            <ReactSVG src={pdf} style={{marginRight:"15px",marginLeft:"15px"}}/>
            <ReactSVG src={excel} style={{marginRight:"15px"}}/>
            <ReactSVG src={print}  />
          </div>
          </div>
        </div> */}

        {/* <Paper> */}
          <NursebookedTable />
        {/* </Paper> */}
      </Paper>
    );
  }
}
export default NursebookedHeader;
