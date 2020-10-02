import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
  render() {
    console.log(this.props.printTableData, "printTableData")
    if(this.props.DetailedHistory === false){
      var printBodyData = this.props.printTableData.map((printdata, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{printdata.customer}</td>
            <td>{printdata.nursename}</td>
            <td>{printdata.gender}</td>
            <td>{printdata.age}</td>
          </tr>
        )
      })
  
    }else{
      var printBodyData = this.props.printTableData.map((printdata, index) => {
        return (
          
          <tr>
            <td>{index + 1}</td>
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
    }
    
    return (
      <>
        {
          this.props.DetailedHistory === false ? <div className="printtabledata">
            <div className="printDataTitle">Uploaded Details</div>
            <table>
              <thead>
                <th>S.No</th>
                <th>Customer</th>
                <th>Nurse Name</th>
                <th>Gender</th>
                <th>Age</th>
              </thead>
              <tbody>
                {printBodyData}
              </tbody>
            </table>
          </div>
            :
            <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
              <table>
                <thead>
                  <th>S.No</th>
                  <th>Nurse Name</th>
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
        }
      </>

    );
  }
}