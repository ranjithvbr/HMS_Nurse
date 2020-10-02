import React, { Component } from "react";
import { Select } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import Moment from "react-moment";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "antd/dist/antd.css";
import Totalleavetable from "./TotalleaveTable";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";

class TotalleaveHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr"
    };
  }

  render() {
    return (
      <div>
        <Paper>
          <Totalleavetable />
        </Paper>
      </div>
    );
  }
}
export default TotalleaveHeader;
