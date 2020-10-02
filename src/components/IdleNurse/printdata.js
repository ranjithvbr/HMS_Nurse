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
              <td>{printdata.age}</td>
              <td>{printdata.experience}</td>
              <td>{printdata.Nationality}</td>
              <td>{printdata.idlesince}</td>
              <td>{printdata.noofdays}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Idle Nurses</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Nurse Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Nationality</th>
            <th>Idle Since</th>
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