import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import IdlenurseTable from "./IdlenurseTable";
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
  handleopen = () => {
    this.setState({ view: true });
  };
  handleclose = () => {
    this.setState({ view: false });
  };

  render() {
    return (
      <Paper>
        <IdlenurseTable />
      </Paper>
    );
  }
}
export default NursebookedHeader;
