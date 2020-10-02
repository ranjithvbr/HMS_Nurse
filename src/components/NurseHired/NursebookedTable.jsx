import React from "react";
import { Select } from "antd";
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import  ReactSVG  from 'react-svg';
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./NursebookedTable.css";
import Nurseview from "./Nurse_view";
import NurseLocationModal from "./NurseLocationModal";
import Axios from "axios";
import { apiurl } from "../../App";
import dateFormat from 'dateformat';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactExport from 'react-data-export';
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import dateformat from 'dateformat';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
var moment = require('moment');

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class NursebookedTable extends React.Component {
  state = {
    openview: false,
    search:null,
    props_loading:true,
    tabledata:[],
    totalValue:"",
    OpenViewData:[],
    spinner: false,
  };
 
  modelopen = (data,id) => {
    if (data === "view") {
      // alert(id)
      // var OpenViewData = this.state.totalValue.filter((OpenViewData)=>{
      //   console.log(OpenViewData,"store_data_check")
      //    return OpenViewData.NurseId===id})
      this.setState({
         openview: true,
         OpenViewData:this.state.totalValue[id]
         });
         console.log(this.state.totalValue[id],"id_chkk")
    } else if (data === "edit") {
      this.setState({ editopen: true });
    } else if (data === "location") {
      this.setState({ locationopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false, locationopen: false });
  };
  searchChange = (e) =>{
    this.setState({
      search : e.target.value
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
          bodydata.push([index+1,data.nursename,data.customer,data.experience,data.fromdate,data.todate,data.totalcost])
        })
        doc.autoTable({
          beforePageContent: function(data) {
            doc.text("Total Nurses Hired", 15, 23); // 15,13 for css
            },
          margin: { top: 30 },
          showHead:"everyPage",
          theme:"grid",
          head: [['S.No', 'Nurse Name', 'Customer','Experience','From Date','To Date','Total Cost(KWD)']],
          body:bodydata,
        })
         
        doc.save('TotalNursesHired.pdf')
      }
    }
      // PRINT FUNCTION
      generateprint=()=>{
        this.setState({
          printComOpen:true
        })
      }
    // API FUNC
    componentDidMount=()=>{
      this.GetApiFunction()
    }
    GetApiFunction=()=>{
      var tabledata=[];
      Axios({
        method: 'post',
        url: apiurl + "Nurse/getnursehired",
        data: {
          nursevendorId:5,
          fromDate: dateformat(new Date(), "yyyy-mm-dd"),
          toDate:dateformat(new Date(), "yyyy-mm-dd"),
          period:"Day",
        }
    })
    .then((response) => {
      console.log(response.data.data,"response_chk")
      response.data.data.map((val,index)=>{
        console.log(tabledata,"table_data_chk")
        tabledata.push({nursename:val.Nursename,customer:val.PatientName,experience:val.nurseExperience,
                       fromdate:moment(val.from_date).format('DD MMM YYYY'),
                       todate:moment(val.to_date,).format('DD MMM YYYY'),
                       totalcost:val.amount,id:index})
      })
        this.setState({
          tabledata:tabledata,
          totalValue:response.data.data,
          props_loading:false,
          // spinner:false
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
      console.log(data,"data_test")
        var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
        var enddate = dateformat(data[0].endDate,"yyyy-mm-dd")
      this.setState({ spinner: true })
      var self = this
      Axios({
              method: 'post',
              url: apiurl + 'Nurse/getnursehired',
              data: {
                "nursevendorId":"5",
                "fromDate":startdate,
                "toDate":enddate,
                "period":"Day"
        }
      })
      .then((response) => {
        var tabledata = [];
        var tableDatafull = [];
        response.data.data.map((val,index) =>{
          console.log(val,"text_valdata")
          tabledata.push({nursename:val.Nursename,customer:val.PatientName,experience:val.nurseExperience,
            fromdate:moment(val.from_date).format('DD MMM YYYY'),
            todate:moment(val.to_date,).format('DD MMM YYYY'),
            totalcost:val.amount,id:index
              })
               tableDatafull.push(val)
          })
          this.setState({
            tabledata:tabledata,
            wk_Mn_Yr_Full_Data:tableDatafull,
            props_loading:false,
            spinner:false,
            totalValue:tableDatafull
            
        })
        console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
    })
    }
  
  render() {
    const { Option } = Select;

    //SERACH FUNCTION
    const { Search } = Input;
    const Tabledatas = this.state.tabledata.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.search === null)
        return data
        else if (data.nursename!== null && data.nursename.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.customer!= null && data.customer.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.experience!= null && data.experience.toString().includes(this.state.search.toString()))
        || (data.fromdate!= null && data.fromdate.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.todate!= null && data.todate.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.totalcost!= null && data.totalcost.toString().includes(this.state.search.toString()))
        ) {
          return data
      }   
    }) 

    //EXCEL FUNCTION

    var multiDataSetbody = []
    this.state.tabledata.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.nursename},
        {value:xldata.customer},
        {value:xldata.experience},
        {value:xldata.fromdate},
        {value:xldata.todate},
        {value:xldata.totalcost}])
      }else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.nursename,style: {fill: {patternType: "solid", fgColor: {rgb:"e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.experience,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.fromdate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.todate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.totalcost,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}}])
      }
    })
    const multiDataSet = [
      {
          columns: [
        {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Nurse Name", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
        {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
        {title: "Experience", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "From Date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "To Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
        {title: "Total Cost(KWD)", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <>
      <div className="title_dashboard">
      <div className="title_header">TOTAL NURSES HIRED</div>
      <div style={{ fontSize: "16px",display:"flex",alignItems:"center" }}>
      <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
        <Search
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{ width: 150 }}
          className="mr-2 ml-2"
          onChange={(e)=>this.searchChange(e)}
        />
        <div className="icon_head">
        <ReactSVG src={pdf} 
          onClick={this.generatepdf} 
          style={{marginRight:"15px",
          marginLeft:"15px"}}
        />
        {this.state.tabledata.length===0 ? <ReactSVG src={excel} style={{ marginRight: "15px" }} /> :
        <ExcelFile filename={"TotalNursesHired"} element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
          <ExcelSheet dataSet={multiDataSet} name="Total Nurses Hired" />
        </ExcelFile>
        }
        <ReactToPrint
          trigger={() => <ReactSVG src={print} />}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintData 
            printTableData={this.state.tabledata} 
            ref={el => (this.componentRef = el)}/>
          </div>
      </div>
      </div>
    </div>
      <div>
       
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "nursename", label: "Nurse Name" },
            { id: "customer", label: "Customer" },
            { id: "experience", label: "Experience" },
            { id: "fromdate", label: "From Date" },
            { id: "todate", label: "To Date" },
            { id: "totalcost", label: "Total Cost(KWD)" },
            { id: "", label: "Action" }
          ]}
         
          // tableicon_align={"cell_eye"}
          rowdata={Tabledatas.length ===  0 ? []: Tabledatas}
          // rowdata={this.tabledata && this.tabledata}
          // rowdata={[]}
          // rowdata={this.state.tabledata}
          props_loading={this.state.props_loading}
          DeleteIcon="close"
          EditIcon="close"
          HistoryIcon="close"
          GrandTotal="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          // LocationOnIcon="close"
        />
          <Nurseview open={this.state.openview} OpenViewData={this.state.OpenViewData} onClose={this.closemodal} />
        <Modalcomp
          visible={this.state.locationopen}
          title={"Nurse Tracking"}
          closemodal={e => this.closemodal(e)}
          // xswidth={"xs"}
        >
          <NurseLocationModal />
        </Modalcomp>
      </div>
      </>
    );
  }
}
export default NursebookedTable;