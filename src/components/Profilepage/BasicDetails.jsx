
import React, { Component } from "react";
import { Select,Upload } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
// import './PharmacyEntryMaster'
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./BasicDetails.css";
import ValidationLibrary from '../../helpers/validationfunction';
import { message,notification} from "antd";
import Axios from "axios";
import {apiurl} from '../../App'

export default class BasicDetails extends React.Component {
  state={
    open:"",
    Address:"",
    editId:"",
    ProfileEditData: {
      'Address': {
        'value': '',
        validation: [{ 'name': 'required'},{'name':'address'}],
        error: null,
        errmsg: null
      },
      'Contact': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'Website': {
        'value': '',
        validation: [{ 'name': 'required' },{'name':'webUrl'}],
        error: null,
        errmsg: null
      },
      'Mobile': {
        'value': '',
        validation: [{ 'name': 'required' },{'name':'mobileHms'}],
        error: null,
        errmsg: null
      },
      'Email': {
        'value': '',
        validation: [{ 'name': 'required' },{'name':'email'}],
        error: null,
        errmsg: null
      }
    }
  }
  handleClose=()=>
  { 
    this.props.closemodal()
  } 
  componentDidMount(){
    const {EditData,EditOpen}=this.props
    console.log("ghgj",EditData)
    if(EditOpen===true){
      // this.state.editId=EditData[0].vendorId
    this.state.ProfileEditData.Address.value=EditData[0].vendor_address
    this.state.ProfileEditData.Contact.value=EditData[0].vendor_contact
    this.state.ProfileEditData.Website.value=EditData[0].vendor_website 
    this.state.ProfileEditData.Mobile.value=EditData[0].vendor_contact_mobile   
    this.state.ProfileEditData.Email.value=EditData[0].vendor_contact_email 
    }
    this.setState({})
    
  }
    changeDynamic = (data, key) => {
      var ProfileEdit = this.state.ProfileEditData;
      var errorcheck = ValidationLibrary.checkValidation(data, ProfileEdit[key].validation);
      ProfileEdit[key].value = data;
      ProfileEdit[key].error = !errorcheck.state;
      ProfileEdit[key].errmsg = errorcheck.msg;
      this.setState({ ProfileEdit });
    }
    checkValidation = () => {
      var Profile = this.state.ProfileEditData;
      var ProfileKeys = Object.keys(Profile);
      for (var i in ProfileKeys) {
        var errorcheck = ValidationLibrary.checkValidation(Profile[ProfileKeys[i]].value, Profile[ProfileKeys[i]].validation);
        Profile[ProfileKeys[i]].error = !errorcheck.state;
        Profile[ProfileKeys[i]].errmsg = errorcheck.msg;
      }
      var filtererr = ProfileKeys.filter((obj) =>
      Profile[obj].error == true);
      if (filtererr.length > 0) {
        this.setState({ error: true })
      } else {
        this.setState({ error: false })
        this.EditProfileApi()
      }
      this.setState({ Profile })
    }
    Notification = (description) => {
      notification.success({
          description,
          onClick: () => {
            console.log('Clicked!');
          },
        });
    }
    EditProfileApi=()=>{

      var formData = new FormData()
      if (this.props.imageChanged === true) {

          for (let i in this.props.Image) {
              formData.append('uploadFile', this.props.Image[i].originFileObj)
              console.log("formdafdsfsdf", this.props.Image[i].originFileObj)
          }

      }else{
          formData.append('uploadFile', '')
      }
      formData.set('address', this.state.ProfileEditData.Address.value)
      formData.set('mobile', this.state.ProfileEditData.Mobile.value)
      formData.set('email', this.state.ProfileEditData.Email.value)
      formData.set('website', this.state.ProfileEditData.Website.value)
      formData.set('contact', this.state.ProfileEditData.Contact.value)
      formData.set('modifiedby', 1)
      formData.set('nursevendorId', this.props.EditId)
      Axios({
        method: 'POST',
        url: apiurl + "Nurse/editNursevendorprofile",
        data:formData
         
    }).then((response) => {
      console.log("response",response)
      // window.location.reload(false)
     this.props.ProfileGetApi()
     this.Notification("Profile Updated successfully ")
    }).catch((error) => {
        
    })
    this.props.closemodal()
    }

  render() {
  
    return (
      <div className="basic_detailsmodal">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className="basic_address_details">
              <Labelbox type="text" 
                labelname="Address"
                changeData={(data) => this.changeDynamic(data, 'Address')}
                value={this.state.ProfileEditData.Address.value}
                error={this.state.ProfileEditData.Address.error}
                errmsg={this.state.ProfileEditData.Address.errmsg}
              />
              <Labelbox
                type="text"
                labelname="Contact Person"
                changeData={(data) => this.changeDynamic(data, 'Contact')}
                value={this.state.ProfileEditData.Contact.value}
                error={this.state.ProfileEditData.Contact.error}
                errmsg={this.state.ProfileEditData.Contact.errmsg}
              />
              <Labelbox
                type="text"
                labelname="Website"
                changeData={(data) => this.changeDynamic(data, 'Website')}
                value={this.state.ProfileEditData.Website.value}
                error={this.state.ProfileEditData.Website.error}
                errmsg={this.state.ProfileEditData.Website.errmsg}
              />
              {/* <Labelbox type="text" labelname="Pincode"/> */}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="basic_address_details">
              <Labelbox type="number"
                labelname="Mobile Number"
                changeData={(data) => this.changeDynamic(data, 'Mobile')}
                value={this.state.ProfileEditData.Mobile.value}
                error={this.state.ProfileEditData.Mobile.error}
                errmsg={this.state.ProfileEditData.Mobile.errmsg}
              />
              <Labelbox type="text" 
                labelname="Email Id" 
                changeData={(data) => this.changeDynamic(data, 'Email')}
                value={this.state.ProfileEditData.Email.value}
                error={this.state.ProfileEditData.Email.error}
                errmsg={this.state.ProfileEditData.Email.errmsg}
               />
           
            </div>
          </Grid>
          <Grid item xs={12} md={12} className="profile_cont">
          <Button className="profile_Cancel"  onClick={() => this.props.closemodal(false)}>Cancel</Button>
            <Button
              className="profile_Submit"
              onClick={this.checkValidation}
              // onClick={this.changeDynamic}
            >
             Update
            </Button>
            {/* <i class="fa fa-upload" aria-hidden="true"></i> */}
            
            </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </div>
    );
  }
}
