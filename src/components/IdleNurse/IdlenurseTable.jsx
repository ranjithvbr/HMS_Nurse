import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./IdlenurseTable.css";
import Axios from "axios";
import { apiurl } from "../../App";
import Moment from "react-moment";
import print from "../../Images/print.svg";
// import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import { Select } from "antd";
import  ReactSVG  from 'react-svg';
import IdlenurseTable from "./IdlenurseTable";
import Paper from "@material-ui/core/Paper"; 
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import pdf from "../../Images/pdf.svg";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import ReactExport from 'react-data-export';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import dateformat from 'dateformat';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
var moment = require('moment');
var dateFormat = require('dateformat');
var now = new Date();
var current_day = dateFormat(now, "yyyy-mm-dd");

class DashboardTable extends React.Component {
  state = {
    openview: false,
    tabledatas:[],
    search:null,
    props_loading:true,
    wk_Mn_Yr_Full_Data: [],
    spinner: false,
  };
  createData = parameter => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};
    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
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
  // SEARCH FUNCTION
  searchChange = (e) =>{
this.setState({
  search : e.target.value
})
this.setState({})
  }
  componentWillMount = () =>{
    this.getmethod()
  }

  getmethod=(rangeday)=>{

    this.setState({
      props_loading:true,
    })
    Axios({
      method: 'post',
      url: apiurl + "Nurse/getnurseidle",
      data: {
        nursevendorId:5,
        fromDate: dateformat(new Date(), "yyyy-mm-dd"),
        toDate:dateformat(new Date(), "yyyy-mm-dd"),
        period:"Day",
      }
  })
  .then((response) => {
      console.log(response.data.data,"response_check_nurseidle_table")
      var tabledatas=[];
      response.data.data && response.data.data.map((val,index) =>{
      console.log(moment(val.nurseIdledetails[0].IdleSince).format("DD MMM YYYY"),"idlesince")
      console.log(val.nurseIdledetails[0].Noofdays,"idlesince")

        tabledatas.push({nursename:val.Nursename,gender:val.gender == 1 ?"Male" : "Female",
        age:val.age,experience:val.experience,Nationality:val.nationalityName,
        idlesince:moment(val.nurseIdledetails[0].IdleSince).format('DD MMM YYYY'),
        noofdays:val.nurseIdledetails[0].Noofdays,id:val.id})
      })
      this.setState({
        tabledatas:tabledatas,
        props_loading:false,
      })
  })
  }


  // Date range picker function

  dayReport=(data)=>{
      console.log(data,"date_range")
      var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
      var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
    this.setState({ spinner:true })
    var self = this
    console.log(startdate ,"start_date_chk")
    Axios({
            method: 'post',
            url: apiurl + 'Nurse/getnurseidle',
            data: {
            "nursevendorId":"5",
            "fromDate":startdate,
            "toDate":enddate,
            "period":"Day",
      }
    })
    .then((response) => {
      // alert("getvalue")
      console.log(response,"responseresponse")

      var tabledatas = [];
      var tableDatafull = [];
      response.data.data && response.data.data.map((val,index) =>{
        console.log(val,"text_valdata")
        tabledatas.push({nursename:val.Nursename,gender:val.gender == 1 ?"Male" : "Female",age:val.age,experience:val.experience,Nationality:val.nationalityName,
                 idlesince:moment(val.nurseIdledetails[0].IdleSince).format("DD MMM YYYY"),noofdays:val.nurseIdledetails[0].Noofdays,id:val.id
            })
             tableDatafull.push(val)
        })
        this.setState({
          tabledatas:tabledatas,
          wk_Mn_Yr_Full_Data: tableDatafull,
          props_loading:false,
          spinner:false
      })
      console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
      console.log(startdate,"itemdaterange")
  })
  }

  
  // PDF FUNCTION
  generatepdf=()=>{
    if(this.state.tabledatas.length === 0){
      alert("Table data is empty")
    }
    else{
      // alert("ee")
    const doc = new jsPDF("a3")
    var bodydata  = []
    this.state.tabledatas.map((data,index)=>{
      bodydata.push([index+1,data.nursename,data.gender,data.age,data.experience,data.Nationality,data.idlesince,data.noofdays])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Idle Nurses", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Nurse Name', 'Gender','Age','Experience','Nationality','Idle Since','No of days']],
      body:bodydata,
    })
     
    doc.save('IdleNurses.pdf')
    
  }}
  // PRINT FUNCTION
  generateprint=()=>{
    this.setState({
      printComOpen:true
    })
  }
  render() {
    const { Option } = Select;

    // SEARCH FUNCTION
    const { Search } = Input;
    const Tabledatas = this.state.tabledatas.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search === null)
        return data
        else if (data.nursename!== null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.age!= null && data.age.toString().includes(this.state.search.toString()))
        || (data.experience!= null && data.experience.toString().includes(this.state.search.toString()))
        || (data.Nationality!= null && data.Nationality.toLowerCase().includes(this.state.search.toString()))
        || (data.idlesince!= null && data.idlesince.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.noofdays!= null && data.noofdays.toString().includes(this.state.search.toString()))
        ) {
          return data
      }   
    }) 
    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tabledatas.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.nursename},
        {value:xldata.gender},
        {value:xldata.age},
        {value:xldata.experience},
        {value:xldata.Nationality},
        {value:xldata.idlesince},
        {value:xldata.noofdays}])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.gender,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.age,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.experience,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.Nationality,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.idlesince,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.noofdays,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}}])
      }
    })
    const multiDataSet = [
      {
          columns: [
        {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Gender", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},  
        {title: "Age", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Nationality", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Experience", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Idle Since", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "No of days", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <div>
        <div className="title_dashboard">
          <p className="title_header">IDLE NURSES </p>
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
             {this.state.tabledatas.length===0 ? <ReactSVG src={excel} style={{ marginRight: "15px" }} /> :
            <ExcelFile filename={"IdleNurses"} element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
              <ExcelSheet dataSet={multiDataSet} name="Idle Nurses"/>
            </ExcelFile>
            }
              <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <PrintData printTableData={this.state.tabledatas}
                 ref={el => (this.componentRef = el)}/>
              </div>
          </div>
          </div>
        </div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "nursename", label: "Nurse Name" },
            { id: "gender", label: "Gender" },
            { id: "age", label: "Age" },
            { id: "experience", label: "Experience" },
            { id: "Nationality", label: "Nationality" },
            { id: "idlesince", label: "Idle Since" },
            { id: "noofdays", label: "No of days" }
            // { id: "", label: "Action" }
          ]}
        
          //   tableicon_align={"cell_eye"}
          rowdata={Tabledatas.length ===  0 ? []: Tabledatas}
          modelopen={e => this.modelopen(e)}
          props_loading={this.state.props_loading}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
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
export default DashboardTable;

