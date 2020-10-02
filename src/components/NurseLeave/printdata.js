import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
              <td>{index+1}</td>
              <td>{printdata.nursename}</td>
              <td>{printdata.gender}</td>
              <td>{printdata.experience}</td>
              <td>{printdata.Nationality}</td>
              <td>{printdata.status}</td>
              <td>{printdata.fromdate}</td>
              <td>{printdata.todate}</td>
              <td>{printdata.noofdays}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Nurses On Leave/Block</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Nurse Name</th>
            <th>Gender</th>
            <th>Experience</th>
            <th>Nationality</th>
            <th>Status</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No of days</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }