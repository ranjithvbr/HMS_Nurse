import React from "react";
import "./PrintData.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printtableData,"printTableData")

            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.customer}</td>
                  <td>{printdata.age}</td>
                  <td>{printdata.gender}</td>
                  <td>{printdata.workingHours}</td>
                  <td>{printdata.startDate}</td>
                  <td>{printdata.endDate}</td>
                  <td>{printdata.designedDuty}</td>
                  <td>{printdata.phoneNumber}</td>
                  <td>{printdata.address}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Nurse Customer History</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Working Hours</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Designed Duty</th>
            <th>Phone Number</th>
            <th>Address</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }