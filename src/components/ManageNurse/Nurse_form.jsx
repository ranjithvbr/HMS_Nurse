import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./Nurse_form.css";
import { Upload, message } from "antd";
import "antd/dist/antd.css";
import ValidationLibrary from '../../helpers/validationfunction';
import Axios from 'axios';
import { apiurl } from "../../App";
import Checkbox from '@material-ui/core/Checkbox';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class Nurse_form extends Component {
  state = {
    imageChanged: false,
    nurseActive: false,
    loading: false,
    modal: false,
    modalclose: false,
    imageUrl: '',
    imageData: [],
    nationality: [],
    gender: [
      {
        id: 1,
        value: 'Male'
      },
      {
        id: 2,
        value: 'Female'
      }
    ],
    manageNurse: {
      'name': {
        'value': '',
        validation: [{ 'name': 'required'}],
        error: null,
        errmsg: null
      },
      'dob': {
        'value': '',
        validation:'',
        error: null,
        errmsg: null
      },
      'experience': {
        'value': '',
        validation: [{ 'name': 'required'},{"name":'alphaNumaricOnly'},{"name":"custommaxLength","params":"2"}],
        error: null,
        errmsg: null
      },
      'gender': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'nationality': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'mobile_number': {
        'value': '',
        validation: [{ 'name': 'custommobile'}],
        error: null,
        errmsg: null
      },
      'qualification': {
        'value': '',
        validation: [{ 'name': '' }],
        error: null,
        errmsg: null
      },
      'cost_per_month_8hrs': {
        'value': '',
        validation: [{'name':"custommaxLength","params":"20" ,'name': 'required'}],
        error: null,
        errmsg: null
      },
      'cost_per_month_12hrs': {
        'value': '',
        validation: [{'name':"custommaxLength","params":"20", 'name': 'required'}],
        error: null,
        errmsg: null
      },
      'a_ddress':{
        'value': '',
        validation: [{ 'name': '' }],
        error: null,
        errmsg: null
      },
      'E_mail':{
        'value': '',
        validation: [{ 'name': 'email' }],
        error: null,
        errmsg: null
      },
      'language': {
        'value': '',
        validation: [{ 'name': '' }],
        error: null,
        errmsg: null
      },
      'skills': {
        'value': '',
        validation: [{ 'name': '' }],
        error: null,
        errmsg: null
      },
    }
  };

  componentWillMount() {
    console.log(this.props, "asdfjklasdfjaskldj")
    this.getNationality();
    const { editData, editopenModal } = this.props;
    if (editopenModal === true) {
      this.state.imageUrl = editData.profile_image
      this.state.manageNurse.name.value = editData.name
      this.state.manageNurse.dob.value = editData.dob
      this.state.manageNurse.experience.value = editData.experience
      this.state.manageNurse.gender.value =editData.gender
      this.state.manageNurse.nationality.value = editData.nationality_id
      this.state.manageNurse.mobile_number.value = editData.mobileno
      this.state.manageNurse.cost_per_month_8hrs.value = editData.cost_eight_hours
      this.state.manageNurse.cost_per_month_12hrs.value = editData.cost_twelve_hours
      this.state.manageNurse.language.value = editData.language
      this.state.manageNurse.qualification.value = editData.qualification
      this.state.manageNurse.E_mail.value=editData.email
      this.state.manageNurse.a_ddress.value=editData.address
      this.state.manageNurse.skills.value = editData.skills
      this.state.nurseActive = editData.is_active === 1 ? true : false
    }
    this.setState({})
  }

  componentWillReceiveProps() {
    console.log(this.props, "asdfjklasdfjaskldj")
  }
  nurseActiveCheck = (e) => {
    this.setState({
      nurseActive: e.target.checked
    }, () => console.log(this.state.nurseActive, "nurseActive"))
  }
  getNationality = () => {
    Axios({
      method: 'GET',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      url: apiurl + 'getNationality'
    }).then((response) => {
      this.setState({
        nationality: response.data.data
      })
    })
  }
  changeDynamic = (data, key) => {
    var manageNurse = this.state.manageNurse;
    var errorcheck = ValidationLibrary.checkValidation(data, manageNurse[key].validation);
    manageNurse[key].value = data;
    manageNurse[key].error = !errorcheck.state;
    manageNurse[key].errmsg = errorcheck.msg;
    this.setState({ manageNurse });
  }
  // VALIDATION
  checkValidation = () => {
    var manageNurse = this.state.manageNurse;
    var manageNurseKeys = Object.keys(manageNurse);
    // console.log(manageNurseKeys);
    for (var i in manageNurseKeys) {
      var errorcheck = ValidationLibrary.checkValidation(manageNurse[manageNurseKeys[i]].value, manageNurse[manageNurseKeys[i]].validation);
      // console.log(errorcheck);
      manageNurse[manageNurseKeys[i]].error = !errorcheck.state;
      manageNurse[manageNurseKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = manageNurseKeys.filter((obj) =>
      manageNurse[obj].error === true);
    // console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.onSubmitData()
    }
    this.setState({ manageNurse })
  }

  onSubmitData = () => {
    this.manageNurse()
    this.props.closemodal()
  }

  manageNurse = () => {
    console.log("Checking FIle Url", this.state.imageUrl)
    var formData = new FormData();
    if (this.state.imageChanged === true) {
      for (var i in this.state.imageData) {
        formData.append('imageArray', this.state.imageData[i].originFileObj)
      }
    }
     else {
      formData.append('imageArray', '')
    }
    console.log(formData, "formdata_chkk")
    // formData.set("mediatype", this.props.editopenModal === true ? this.props.editData.media_type : this.state.fileType.split("/")[0]);
    formData.set("name", this.state.manageNurse.name.value);
    formData.set("dob", this.state.manageNurse.dob.value);
    formData.set("experience", this.state.manageNurse.experience.value);
    formData.set("gender", this.state.manageNurse.gender.value);
    formData.set("mobileno", this.state.manageNurse.mobile_number.value);
    formData.set("nationalityId", this.state.manageNurse.nationality.value);
    formData.set("costeighthours", this.state.manageNurse.cost_per_month_8hrs.value);
    formData.set("costTwelvehours", this.state.manageNurse.cost_per_month_12hrs.value);
    formData.set("skills", this.state.manageNurse.skills.value);
    formData.set("language", this.state.manageNurse.language.value);
    formData.set("qualification", this.state.manageNurse.qualification.value);
    formData.set("email",this.state.manageNurse.E_mail.value);
    formData.set("address",this.state.manageNurse.a_ddress.value);
    formData.set("is_active", this.state.nurseActive === true ? 1 : 0);
    formData.set("vendorId", 5);
    formData.set("createdby", 19);
    if (this.props.editopenModal===false) {
      this.insertNurse(formData) // Add Api
    }
    if (this.props.editopenModal === true && this.state.imageChanged === true) {
      formData.set("id", this.props.editData.nurseId)
      this.updateNurseDetails(formData)  // Update Api with image Call
    }
    if (this.props.editopenModal === true && this.state.imageChanged === false) {
      this.nurseDataWithoutImage()
    }
  }

  // POST API FOR ADD MEDIA
  insertNurse = (formData) => {
    var self = this
    Axios({
      method: 'POST',
      url: apiurl + 'insertNurse',
      data:
        formData
    }).then((response) => {
      console.log(response, "post_check_response")
      message.success('Nurse Added Successfully');
      self.props.getTableData();
    }).catch((error) => {
      // alert(JSON.stringify(error))
    })
  }

  // for put api
  updateNurseDetails = (nurseData) => {
    var self = this
    Axios({
      method: 'POST',
      url: apiurl + 'editNurseInfo',
      data:
        nurseData
    })
      .then((response) => {
        console.log(response, "response_checkingg")
        message.success('Nurse Details Updated Successfully');
        self.props.getTableData();
      }).catch((error) => {
        // alert(JSON.stringify(error))
      })
    this.props.getTableData(); // Props from TotalNurseTable.jsx

  }

  nurseDataWithoutImage = () => {
    var nurseData = {
      id: this.props.editData.nurseId,
      imageArray: "",
      name: this.state.manageNurse.name.value,
      dob: this.state.manageNurse.dob.value,
      experience: this.state.manageNurse.experience.value,
      gender: this.state.manageNurse.gender.value,
      mobileno: this.state.manageNurse.mobile_number.value,
      nationalityId: this.state.manageNurse.nationality.value,
      costeighthours: this.state.manageNurse.cost_per_month_8hrs.value,
      costTwelvehours: this.state.manageNurse.cost_per_month_12hrs.value,
      skills: this.state.manageNurse.skills.value,
      language: this.state.manageNurse.language.value,
      email:this.state.manageNurse.E_mail.value,
      address:this.state.manageNurse.a_ddress.value,
      qualification: this.state.manageNurse.qualification.value,
      is_active: this.state.nurseActive === true ? 1 : 0,
      vendorId: 5,
      modifiedby: 19
    }
    this.updateNurseDetails(nurseData) // Update Api without image Call
  }


  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.setState({
        imageData: info
      }, () => console.log("sdfdsfsdhfjhsdfhsdfd", this.state.imageData))
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          // imageData: info,
          loading: false,
          imageChanged: true
        })
      );
    }
  };

  data = (date, dateString) => {
    console.log(date, dateString);
  };
  onclose = () => {
    this.setState({ modalclose: !this.state.modalclose });
  };


  render() {
    console.log(this.state, "sdfasdfaa");
    const uploadButton = (
      <div>
        <div className="upload-icon">
          <i class="fa fa-user-plus"></i>
        </div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="users-form">
        <Grid
          container
          className="Users-gridcontainer"
          // xs={12}
          // md={12}
          spacing={2}
          style={{ marginTop: "0px", width: "100%" }}
        >
          <Grid items xs={4} md={4} className="items_container">
            <div className="User-inputs">
              <Labelbox
                type="text"
                labelname="Name"
                changeData={(data) => this.changeDynamic(data, 'name')}
                value={this.state.manageNurse.name.value}
                error={this.state.manageNurse.name.error}
                errmsg={this.state.manageNurse.name.errmsg}
              />
            </div>
            <div className="nurse_details_nation gender_edit">
              <div style={{ width: "47%" }}>
                <Labelbox
                  type="select"
                  labelname="Gender"
                  valuelabel={'value'}
                  valuebind={"value"}
                  dropdown={this.state.gender}
                  changeData={(data) => this.changeDynamic(data, 'gender')}
                  value={this.state.manageNurse.gender.value}
                  error={this.state.manageNurse.gender.error}
                  errmsg={this.state.manageNurse.gender.errmsg}
                />
              </div>
            <div style={{ width: "47%" }}>
                <Labelbox
                  type="select"
                  labelname="Nationality"
                  valuelabel={'nationality'}
                  valuebind={"id"}
                  dropdown={this.state.nationality}
                  changeData={(data) => this.changeDynamic(data, 'nationality')}
                  value={this.state.manageNurse.nationality.value}
                  error={this.state.manageNurse.nationality.error}
                  errmsg={this.state.manageNurse.nationality.errmsg}
                />
              </div>
            </div>
            <div className="duty_hourmain_container">
              <div className="duty_hour_container">
                <h6 className="duty_header">Duty Hours(8 Hours)</h6>

                <div style={{ width: "50%" }}>
                  <Labelbox
                    type="number"
                    labelname="Cost (Per Month)"
                    changeData={(data) => this.changeDynamic(data, 'cost_per_month_8hrs')}
                    value={this.state.manageNurse.cost_per_month_8hrs.value}
                    error={this.state.manageNurse.cost_per_month_8hrs.error}
                    errmsg={this.state.manageNurse.cost_per_month_8hrs.errmsg}
                  />
                </div>

              </div>
              <div className="divider_border"></div>
              <div className="duty_hour_container">
                <h6 className="duty_header">Duty Hours(12 Hours)</h6>

                <div style={{ width: "50%" }}>
                  <Labelbox
                    type="number"
                    labelname="Cost (Per Month)"
                    changeData={(data) => this.changeDynamic(data, 'cost_per_month_12hrs')}
                    value={this.state.manageNurse.cost_per_month_12hrs.value}
                    error={this.state.manageNurse.cost_per_month_12hrs.error}
                    errmsg={this.state.manageNurse.cost_per_month_12hrs.errmsg}
                  />
                </div>

              </div>
            </div>
          </Grid>
          <Grid items md={1} />
          <Grid items xs={4} md={4} className="items_container">
            <div className="nurse_details_nation">
              <div style={{ width: "50%" }}>
                <Labelbox
                  type="datepicker"
                  className="user_datepicker"
                  labelname="Date Of Birth"
                  value={this.state.manageNurse.dob.value}
                  changeData={(data) => this.changeDynamic(data, 'dob')}
                  error={this.state.manageNurse.dob.error}
                  errmsg={this.state.manageNurse.dob.errmsg}
                  disableFuture={true}
                  blockDate={new Date()}
                />
              </div>
              <div style={{ width: "47%" }}>
                <Labelbox
                  type="text"
                  labelname="Qualification"
                  value={this.state.manageNurse.qualification.value}
                  changeData={(data) => this.changeDynamic(data, 'qualification')}
                  error={this.state.manageNurse.qualification.error}
                  errmsg={this.state.manageNurse.qualification.errmsg}
                />
              </div>
            </div>
            <div className="nurse_details_nation">
              <div style={{ width: "47%" }}>
                <Labelbox
                  type="number"
                  labelname="Mobile Number"
                  changeData={(data) => this.changeDynamic(data, 'mobile_number')}
                  value={this.state.manageNurse.mobile_number.value}
                  error={this.state.manageNurse.mobile_number.error}
                  errmsg={this.state.manageNurse.mobile_number.errmsg}
                />
              </div>
              <div style={{ width: "47%" }}>
                <Labelbox
                  type="text"
                  labelname="Email"
                  changeData={(data) => this.changeDynamic(data, 'E_mail')}
                  value={this.state.manageNurse.E_mail.value}
                  error={this.state.manageNurse.E_mail.error}
                  errmsg={this.state.manageNurse.E_mail.errmsg}
                />
              </div>
              </div>
              <div className="nurse_details_nation">
              <div style={{ width: "47%" }}>
                <Labelbox
                  type="number"
                  maxLength="2"
                  labelname="Experience"
                  changeData={(data) => this.changeDynamic(data, 'experience')}
                  value={this.state.manageNurse.experience.value}
                  error={this.state.manageNurse.experience.error}
                  errmsg={this.state.manageNurse.experience.errmsg}
              
                />
              </div>
              <div style={{ width: "47%" }}>
                <Labelbox
                  value="Cultural Awareness,Professionalism"
                  type="text"
                  labelname="Languages"
                  changeData={(data) => this.changeDynamic(data, 'language')}
                  value={this.state.manageNurse.language.value}
                  error={this.state.manageNurse.language.error}
                  errmsg={this.state.manageNurse.language.errmsg}
                />
              </div>
            </div>
             <div className="nurse_details_nation">
            <div style={{ width: "100%" }} className="skills">
              <Labelbox
                // value="Cultural Awareness,Professionalism"
                type="text"
                labelname="Skills"
                changeData={(data) => this.changeDynamic(data, 'skills')}
                value={this.state.manageNurse.skills.value}
                error={this.state.manageNurse.skills.error}
                errmsg={this.state.manageNurse.skills.errmsg}
              />
            </div>
            </div>
          </Grid>
          <Grid items xs={4} md={3} className="items_container mt-5">
            <div className="User-upload-container">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader user-avatar-upload"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                 {/* {this.state.imageChanged ===true? */}
                  <img
                    src={imageUrl}
                    className="upload-img-circle"
                    alt="avatar"
                    style={{ width: "100%",height:'123px' }}
                  />
                  
{/*                 
                   : uploadButton
                 } */}
              </Upload>
              <div className="chkbox_text_edit">
                <div>
                  <span className="manage_active_font">Active</span>

                </div>

                <Checkbox checked={this.state.nurseActive} onChange={(e) => this.nurseActiveCheck(e)} />
              </div>
              <div style={{ width: "100%" },{marginTop:"15px"}} className="skills">
              <Labelbox
                type="text"
                labelname="Address"
                changeData={(data) => this.changeDynamic(data, 'a_ddress')}
                value={this.state.manageNurse.a_ddress.value}
                error={this.state.manageNurse.a_ddress.error}
                errmsg={this.state.manageNurse.a_ddress.errmsg}
              />
            </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={8} md={8} className="buttons_container">
          <div className="cancel-create-button1">
            <div className="cancel-create-button2">
              <Button className="Usergrp-Cancel" onClick={() => this.props.closemodal()}>
                Cancel
              </Button>
              <Button className="Usergrp-Create" onClick={this.checkValidation}>
                {
                  this.props.editopenModal === true ? "Update" : "Create"
                }
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}
