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
              <td>{printdata.customer}</td>
              <td>{printdata.experience}</td>
              <td>{printdata.fromdate}</td>
              <td>{printdata.todate}</td>
              <td>{printdata.totalcost}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Total Nurses Hired</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Nurse Name</th>
            <th>Customer</th>
            <th>Experience</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Total Cost(KWD)</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }