import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import TotalnurseTable from "./TotalnurseTable";
import Paper from "@material-ui/core/Paper";
import Plus from "../../Images/plus.png";
import Nurse_form from "./Nurse_form";
import { Input, Tooltip, Button } from "antd";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import { apiurl } from "../../App";
import Axios from 'axios';
import dateFormat from 'dateformat';

import back from "../../Images/rightarrow.svg";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import Tablecomponent from "../../helpers/TableComponent/TableComp";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class NurseHistoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tableData: [],
            search: null,
            props_loading: true,
            fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
            toDate: dateFormat(new Date(), "yyyy-mm-dd")
        };
    }

    componentDidMount() {
        this.getTableData();
    }

    // get table data
    getTableData = () => {
        var self = this
        Axios({
            method: 'POST', //get api
            url: apiurl + 'Nurse/getnursehistory',
            data: {
                nursevendorId: 5,
                nurseId: this.props.nurseId, // prop coming from index.js
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                period: "Day"
            }
        })
            .then((response) => {
                console.log(response, "res")
                var tableData = [];
                response.data.data.map((val) => {
                    tableData.push({
                        customer: val.PatientName,
                        age: val.patientage,
                        gender: val.gender,
                        workingHours: val.working_hours + ' Hrs',
                        startDate: dateFormat(val.from_date, "yyyy-mm-dd"),
                        endDate: dateFormat(val.to_date, "yyyy-mm-dd"),
                        designedDuty: val.Dutiesofnurse.map(val => val.duties).toString(),
                        designedDutyTable: val.Dutiesofnurse,
                        phoneNumber: val.phone_no,
                        address: val.address != "undefined" ? val.address : "-",
                        nurseName:val.Nursename,
                        id: val.nurseId
                    })
                    console.log(val.id, "yyyyyyy")
                })
                self.setState({
                    tableData: tableData,
                    props_loading: false,
                    totalData: response.data.data
                })
                self.setState({})
            })
            .catch((error) => {
                // alert(JSON.stringify(error))
            })
    }

    openmodal = () => {
        this.setState({ open: true });
    };
    onclosemodal = () => {
        this.setState({ open: false });
    };
    searchChange = (e) => {
        this.setState({
            search: e.target.value
        })
        this.setState({})
    }

    getRangeDate = (item) => {
        console.log(item, "checking Date")
        this.setState({
            fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
            toDate: dateFormat(item[0].endDate, "yyyy-mm-dd")
        }, () => this.getTableData())
    }

    generatepdf = () => {
        const doc = new jsPDF("a3")
        var bodydata = []
        this.state.tableData.map((data, index) => {
            bodydata.push([index + 1, data.customer, data.age, data.gender, data.workingHours, data.startDate, data.endDate, data.designedDuty, data.phoneNumber, data.address])
        })
        doc.autoTable({
            beforePageContent: function (data) {
                doc.text("Nurse Customer History", 15, 23); // 15,13 for css
            },
            margin: { top: 30 },
            showHead: "everyPage",
            theme: "grid",
            head: [['S.No', 'Customer', 'Age', 'Gender', 'Working Hours','Start Date', 'End Date', 'Designed Duty', 'Phone Number', 'Address']],
            body: bodydata,
        })

        doc.save('Nurse_Customer_History.pdf')

    }


    render() {
        const { Search } = Input;
        const searchData = []
        this.state.tableData.filter((data, index) => {
            if (this.state.search === null)
                searchData.push({
                    customer: data.customer,
                    age: data.age,
                    gender: data.gender,
                    workingHours: data.workingHours,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    designedDutyTable: data.designedDutyTable.map(val => val.duties).toString().length > 25 ? <Tooltip placement="top" title={data.designedDutyTable.map(val => val.duties).toString()}>
                        <span>{data.designedDutyTable.map(val => val.duties).toString().substring(0, 25)+"..."}</span>
                    </Tooltip> : data.designedDutyTable.map(val => val.duties).toString(),
                    phoneNumber: data.phoneNumber,
                    address: data.address != null && data.address.length > 25 ? <Tooltip placement="top" title={data.address}>
                        <span>{data.address.substring(0, 25)+'...'}</span>
                    </Tooltip> : data.address,
                    id: data.nurseId
                })
            else if (data.customer !== null &&
                data.customer.toLowerCase().includes(this.state.search.toLowerCase())
                || data.age !== null && data.age.toString().includes(this.state.search.toString())
                || data.gender !== null && data.gender.toLowerCase().includes(this.state.search.toLowerCase())
                || data.workingHours !== null && data.workingHours.toLowerCase().includes(this.state.search.toLowerCase())
                || data.startDate !== null && data.startDate.toString().includes(this.state.search.toString())
                || data.endDate !== null && data.endDate.toString().includes(this.state.search.toString())
                || data.designedDuty != null && data.designedDuty.toLowerCase().includes(this.state.search.toLowerCase())
                || data.phoneNumber != null && data.phoneNumber.toString().includes(this.state.search.toString())
                || data.address != null && data.address.toLowerCase().includes(this.state.search.toLowerCase())

            ) {
                console.log(data, "datadata")
                searchData.push({
                    customer: data.customer,
                    age: data.age,
                    gender: data.gender,
                    workingHours: data.workingHours,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    designedDutyTable: data.designedDutyTable.map(val => val.duties).toString().length > 20 ? <Tooltip placement="top" title={data.designedDutyTable.map(val => val.duties).toString()}>
                        <span>{data.designedDutyTable.map(val => val.duties).toString().substring(0, 20)+"..."}</span>
                    </Tooltip> : data.designedDutyTable.map(val => val.duties).toString(),
                    phoneNumber: data.phoneNumber,
                    address: data.address != null && data.address.length > 20 ? <Tooltip placement="top" title={data.address}>
                        <span>{data.address.substring(0, 20)+'...'}</span>
                    </Tooltip> : data.address,
                    id: data.nurseId
                })
            }
        })

        // EXCEL FUNCTION
        var multiDataSetbody = []
        this.state.tableData.map((xldata, index) => {
            if (index % 2 !== 0) {
                multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
                { value: xldata.customer },
                { value: xldata.age },
                { value: xldata.gender },
                { value: xldata.workingHours },
                { value: xldata.startDate },
                { value: xldata.endDate },
                { value: xldata.designedDuty },
                { value: xldata.phoneNumber },
                { value: xldata.address }
                ])
            } else {
                multiDataSetbody.push([
                    { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.age, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.gender, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.workingHours, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.startDate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.endDate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.designedDuty, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.phoneNumber, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
                    { value: xldata.address, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } }
                ])
            }
        })
        const multiDataSet = [
            {
                columns: [
                    { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Age", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Gender", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Working Hours", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Start Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "End Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Designed Duty", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Phone Number", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                    { title: "Address", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
                ],
                data: multiDataSetbody
            }
        ];

        return (
            <div>
                <div className="title_dashboard">
                    <div className="title_header">
                        <span style={{cursor:'pointer',display:'inline-block',marginRight:'15px'}} onClick={() => this.props.backToNurseTable()}>
                            <ReactSVG src={back}/>
                        </span>
                        <span className="mr-4">Nurse History</span>
                        <span style={{color:"#ad9d9d",fontSize:"13px",marginRight:"12px"}}>Nurse Name</span>
                        <span>{this.state.tableData.length > 0 && this.state.tableData[0].nurseName}</span>
                    </div>
                    <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
                        {/* <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} /> */}
                        <Search
                            placeholder="Search"
                            onChange={(e) => this.searchChange(e)}
                            style={{ width: 150 }}
                            className="mr-2 ml-2"
                        />
                        <div className="icon_head">
                            <ReactSVG src={pdf} style={{marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                                style={{ marginRight: "15px", marginLeft: "15px" }} />
                            <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                                <ExcelSheet dataSet={multiDataSet} name="Nurse History Details" />
                            </ExcelFile>
                            <ReactToPrint
                                trigger={() => <ReactSVG src={print} />}
                                content={() => this.componentRef}
                            />
                        </div>
                        <div style={{ display: "none" }}>
                            <PrintData printtableData={this.state.tableData}
                                ref={el => (this.componentRef = el)} />
                        </div>
                    </div>
                </div>
                <Tablecomponent
                    heading={[
                        { id: "", label: "S.No" },
                        { id: "customer", label: "Customer" },
                        { id: "age", label: "Age" },
                        { id: "gender", label: "Gender" },
                        { id: "workingHours", label: "Working Hours" },
                        { id: "startDate", label: "Start Date" },
                        { id: "endDate", label: "End Date" },
                        { id: "designedDutyTable", label: "Designed Duty" },
                        { id: "phoneNumber", label: "Phone Number" },
                        { id: "address", label: "Address" },
                    ]}
                    rowdata={searchData}
                    tableicon_align={"cell_eye"}
                    deleteopen={this.deleteopen}
                    modelopen={(e, id) => this.modelopen(e, id)}
                    props_loading={false}
                    actionclose={"close"}
                    VisibilityIcon={"close"}
                    EditIcon={"close"}
                    LocationOnIcon={"close"}
                    HistoryIcon={"close"}
                    DeleteIcon={"close"}
                />
            </div>
        );
    }
}
export default NurseHistoryTable;
