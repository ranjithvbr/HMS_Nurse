import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import NurseServiceCancellationTable from "./NurseServiceCancellationTable";

class NurseServiceCancellationHeader extends Component {
  render() {
    const { Search } = Input;
    return (
      <div>
         <Paper>
          <NurseServiceCancellationTable />
        </Paper>
      </div>
    );
  }
}
export default NurseServiceCancellationHeader;
