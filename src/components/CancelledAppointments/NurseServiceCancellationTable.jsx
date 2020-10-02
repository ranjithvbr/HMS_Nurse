import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./NurseServiceCancellationTable.css";
import Axios from "axios";
import { apiurl } from "../../App";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from "@material-ui/core/Paper";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import ReactExport from 'react-data-export';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import { Input } from "antd";
import dateformat from 'dateformat';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
var dateFormat = require('dateformat');
var now = new Date();
var current_day = dateFormat(now, "yyyy-mm-dd")
var moment = require('moment');
class NurseServiceCancellationTable extends React.Component {
  state = {
    openview: false,
    tabledata:[],
    search :null,
    props_loading:true,
    wk_Mn_Yr_Full_Data: [],
    spinner: false,
  };
  modelopen = data => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  searchChange=(e)=>{
    this.setState({
      search:e.target.value
    })
    this.setState({})
  }
  // PDF FUNCTION
  generatepdf=()=>{
    if(this.state.tabledata.length === 0){
      alert("Table data is empty")
    }
    else{
      // alert("ee")
    const doc = new jsPDF("a3")
    var bodydata  = []
    this.state.tabledata.map((data,index)=>{
      bodydata.push([index+1,data.customer,data.nursename,data.noofmonths,data.cancellleddate,data.time])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Cancelled Appointments", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer', 'Nurse Name','No Of Months','Cancelled Date','Time']],
      body:bodydata,
    })
    doc.save('CancelledAppointments.pdf')
  }}
  componentDidMount =() =>{
    this.getmethod()
  }
  
  getmethod=(rangeday)=>{
    function formatTimeShow(h_24) {
      
      var h = Number(h_24.substring(0, 2)) % 12;
      if (h === 0) h = 12;
      return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }
    this.setState({
      props_loading:true
    })
    Axios({
      method: 'post',
      url: apiurl + 'Nurse/getnursecancelappointment',
      data: {
        nursevendorId:5,
        fromDate: dateformat(new Date(), "yyyy-mm-dd"),
        toDate:dateformat(new Date(), "yyyy-mm-dd"),
        period:"Day",
      }
  })
  .then((response) => {
    console.log(response,"checki_res")
      var tabledata = [];
      response.data.data && response.data.data.map((val) =>{
        console.log(val,"text_valdata")
        tabledata.push({customer:val.PatientName,nursename:val.Nursename,noofmonths:val.Noofmonth,
                        cancellleddate:moment(val.CancelDate).format("DD MMM YYYY"),
                        time:formatTimeShow(val.CancelTime),
                        // fromdate:moment(val.from_date).format("DD MMM YYYY"),
                        id:val.id})
        })
        this.setState({
          tabledata:tabledata,
          props_loading:false
      })
  })
  }
  // DATE RANGE PICKER FUNCTION
  dayReport=(data)=>{
  function formatTimeShow(h_24) {
    
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
}
  console.log(data,"itemdaterange")
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    var enddate = dateformat(data[0].endDate,"yyyy-mm-dd")
  this.setState({ spinner: true })
  var self = this
  Axios({
          method: 'post',
          url: apiurl + 'Nurse/getnursecancelappointment',
          data: {
            "nursevendorId":"5",
            "fromDate":startdate,
            "toDate":enddate,
            "period":"Day",
    }
  })
  .then((response) => {
    var tabledata = [];
    var tableDatafull = [];
    response.data.data && response.data.data.map((val,index) =>{
      console.log(val,"text_valdata")
      tabledata.push({customer:val.PatientName,nursename:val.Nursename,noofmonths:val.Noofmonth,
        cancellleddate:moment(val.CancelDate).format("DD MMM YYYY"),time:formatTimeShow(val.CancelTime),id:index
          })
           tableDatafull.push(val)
      })
      this.setState({
        tabledata:tabledata,
        wk_Mn_Yr_Full_Data: tableDatafull,
        props_loading:false,
        spinner:false
    })
    console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
})
}
// PRINT FUNCTION
generateprint=()=>{
  this.setState({
    printComOpen:true
  })
}
  render() {
    const { Search } = Input;
    const Tabledatas = this.state.tabledata.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search=== null)
        return data
        else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.nursename != null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.noofmonths != null && data.noofmonths.toString().includes(this.state.search.toString()))
        || (data.cancellleddate != null && data.cancellleddate.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.time != null && data.time.toString().includes(this.state.search.toString()))
        ) {
          return data
      }   
    }) 
     // EXCEL FUNCTION
     var multiDataSetbody = []
     this.state.tabledata.map((xldata,index)=>{
       if(index%2!==0){
         multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
         {value:xldata.customer},
         {value:xldata.nursename},
         {value:xldata.noofmonths},
         {value:xldata.cancellleddate},
         {value:xldata.time},])
       }else{
       multiDataSetbody.push([
         {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         {value:xldata.noofmonths,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         {value:xldata.cancellleddate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         {value:xldata.time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},])
       }
     })
     const multiDataSet = [
       {
           columns: [
         {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
         {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
         {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
         {title: "No Of Months", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},   
         {title: "Cancelled Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
         {title: "Time",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
           ],
           data: multiDataSetbody      
       }
   ];
    return (
      <div>
         <Paper>
        <div className="title_dashboard">
          <p className="title_header">CANCELLED APPOINTMENTS </p>
          <div style={{ fontSize: "16px" ,display:"flex",alignItems:"center"}}>
          <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
            <Search
              placeholder="search"
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              onChange={(e)=>this.searchChange(e)}
            />
              <div className="icon_head">
              <ReactSVG src={pdf}
            onClick={this.generatepdf}
            style={{marginRight:"15px",marginLeft:"15px"}}/>
            {this.state.tabledata.length===0 ? <ReactSVG src={excel} style={{ marginRight: "15px" }} /> :
            <ExcelFile filename={"CancelledAppointments"} element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
              <ExcelSheet dataSet={multiDataSet} name="Cancelled Appointments"/>
            </ExcelFile>
             }
              <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <PrintData printTableData={this.state.tabledata}
                 ref={el => (this.componentRef = el)}/>
              </div>
          </div>
          </div>
        </div>
        </Paper>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "nursename", label: "Nurse Name" },
            { id: "noofmonths", label: "No Of Months" },
            { id: "cancellleddate", label: "Cancelled Date" },
            { id: "time", label: "Time" }
          ]}
          rowdata={Tabledatas.length ===  0 ? []: Tabledatas}
          props_loading={this.state.props_loading}
          DeleteIcon="close"
          EditIcon="close"
          VisibilityIcon="close"
          modelopen={e => this.modelopen(e)}
          HistoryIcon="close"
          LocationOnIcon="close"
        />
        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}
export default NurseServiceCancellationTable;





