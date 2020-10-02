import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import "./CustomerHistoryTable.css";
import Axios from "axios";
import { apiurl } from "../../App";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import excel from "../../Images/excel.svg";
import ReactExport from 'react-data-export';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import  ReactSVG  from 'react-svg';
import { Input } from "antd"; 
import dateformat from 'dateformat';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class CustomerHistoryTable extends React.Component {
  state = {
    openview: false,
    tabledata:[],
    OpenViewData:[],
    getTableData:[],
    search:null,
    totalValue:"",
    props_loading:true,
    spinner: false,
  };

  componentWillReceiveProps() {
    console.log(this.props, "sdfasdfa")
   
  }

  createData = parameter => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data,id) => {
    // alert(id,"id_chk")
    if (data === "view") {
      var OpenViewData = this.state.totalValue.filter((OpenViewData)=>{
        console.log(OpenViewData,"store_data_check")
         return OpenViewData.PatientId===id
      })
      this.setState({ 
        openview: true, 
        OpenViewData:OpenViewData
       });
       console.log(OpenViewData,"openviewdata_checking")
       this.props.DetailedCustomerHistory(id); //prop comming from index.js
    }

  };
  searchChange = (e) =>{
    this.setState({
      search:e.target.value
    })
    this.setState({})
      }
  closemodal = () => {
    this.setState({ openview: false, });
  };

  componentDidMount(){
    this.getTableData()
    // this.ViewTableData()
  }

  getTableData =(rangeday) =>{
    var self = this
    Axios({
      method: 'post',
      url: apiurl + 'Nurse/getCustomerDetails',
      data: {
        nursevendorId:5,
      }
  })
    .then((response) => {
      console.log(response,"response_check_cancel_table")
      var tabledata = [];
      console.log(response.data.data,"nursename_check")
      response.data.data.map((val) =>{
        console.log(val,"text_valdata")
        tabledata.push({customer:val.Customername,nursename:val.Nursename,gender:val.gender,age:val.patientage,
                      id:val.CustomerId})
        })
        this.setState({
          tabledata:tabledata,
          props_loading:false,
          totalValue:response.data.data,
      })
      console.log(this.state.tabledata,"table_data_nurse")
  }).catch((error) => {
      // alert(JSON.stringify(error))
  })
  // console.log("deletedetails", details)
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
      bodydata.push([index+1,data.customer,data.nursename,data.gender,data.age])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Uploaded Details", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer','Nurse Name','Gender','Age',]],
      body:bodydata,
    })
     
    doc.save('UploadDetails.pdf')
    
  }
}
  // PRINT FUNCTION
  generateprint=()=>{
    this.setState({
      printComOpen:true
    })
  }

  render() {
    console.log(this.props,"myprops")

    const { Search } = Input;
    const Tabledatas = this.state.tabledata.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search === null)
        return data
        else if (data.customer!== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.nursename!= null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.age!= null && data.age.toString().includes(this.state.search.toString()))
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
        {value:xldata.gender},
        {value:xldata.age},])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.gender,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.age,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},])
      }
    })
    const multiDataSet = [
      {
          columns: [
        {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},  
        {title: "Gender", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Age",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <>
      <div className="title_dashboard">
      <p className="title_header">CUSTOMER HISTORY </p>
      <div style={{ fontSize: "16px" ,display:"flex",alignItems:"center"}}>
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
        <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
          <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
        </ExcelFile>
        }
        <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <PrintData printTableData={this.state.tabledata} DetailedHistory={false}
                 ref={el => (this.componentRef = el)}/>
              </div>
      </div>
      </div>
    </div>
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "nursename", label: "Nurse Name" },
            { id: "gender", label: "Gender" },
            { id: "age", label: "Age" },
            { id: "", label: "Action" }
          ]}
          
          rowdata={Tabledatas.length ===  0 ? []: Tabledatas}
          props_loading={this.state.props_loading}
          DeleteIcon="close"
          EditIcon="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          HistoryIcon="close"
          LocationOnIcon="close"
        />
      </div>
      </>
    );
  }
}
export default CustomerHistoryTable;



