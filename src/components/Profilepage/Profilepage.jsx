
import React, { Component } from "react";
import { Select,Upload,message,Spin} from "antd";
import "antd/dist/antd.css";
import './Profilepage.css'
import Paper from "@material-ui/core/Paper";
// import Calendar from './Calendar';
import Grid from "@material-ui/core/Grid";
import { TiLocation } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Trainee from "../../Images/11.jpg";
import BasicDetails from "./BasicDetails"
import Divider from "@material-ui/core/Divider";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {  MdLocationOn, MdLocalPhone,MdEmail } from "react-icons/md";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Axios from "axios";
import {apiurl} from '../../App'
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      open:false,
      Image:"",
      imagedata:[],
      imageChanged:false,
      ProfileData:[],
      props_loading:true
    };
  }
  handleopen=(id)=>
  {
    this.setState({
    editid:id,
    open:true,
    })
  }
  handleClose=()=>
  {
    this.setState({open:false})
  }
  open = ()=> {
      this.setState({open:true})
  }
  handleClickClose=()=>
  {
    this.setState({open:false})
  }
  Cancel=()=>
  {
    this.setState({open:false})   
    console.log(this.state.open)  
  }
  
  ProfileGetApi=()=>{
    var self=this
    Axios({
      method: 'POST',
      url:apiurl + "Nurse/getnursevendorprofile",
      data:{
        "nursevendorId":"5"
      },
  }).then((response) => {
    var ProfileData=[]
    console.log(response,"getdetails")
    ProfileData=response.data.data
    this.setState({
      ProfileData,
      imageUrl:response.data.data[0].vendor_filename,
      props_loading:false
    }) 
    
  }).catch((error) => {
      })
  }
  
  componentDidMount(){
    this.ProfileGetApi()
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        imagedata: info
      }, () => console.log("sdfdsfsdhfjhsdfhsdfd", this.state.imagedata))
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          // Image:imageUrl,
          loading: false,
          imageChanged:true,
        },() => console.log("divya",this.state.Image)),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <div className="upload-icon"><i class="fa fa-user-plus"></i></div>
      </div>
    );
   const { imageUrl } = this.state; 
    const { classes, onClose, selectedValue, ...other } = this.props;
    

    return (
      <div className="deal_listcreatead">
         <Paper className="profile_background">
       <div className="profileback_first">PROFILE</div>
         
           
             <div className="profilepaper_container">
            
              <Paper className={this.state.props_loading===true?"profile_backchange":"profilebackground"}>
              <Spin className="profile_spinner_align" spinning={this.state.props_loading}>
                <div className="total">
              {this.state.ProfileData.map((val)=>{
               return(
              <Grid container>
                
            
            <Grid item xs={12} md={5}>
              <div className="profile_imageuser_container">
                <div className="profile_imageuser_div">
                  <img className="profile_imageuser" src={val.vendor_filename}/>
                  
                </div>
              </div>
            </Grid>
            
            <Grid item xs={12} md={7} className="addprofile_gridcontainer">
              <div className="profile_nursecontainer">
                <div className="icon_edit">
                  <EditIcon className="icon" onClick={()=>this.handleopen(val.VendorId)} onClose={this.props.handleClose}/>
                </div>
                <div style={{ padding: "20px" }}>
               <h1 className="profile_detail">{val.vendor_contact}</h1>
                  <div className="age_details">
                    <h5>
                      <MdLocationOn className="icon_groups" />
                    </h5>
               <p className="profile_text">{val.vendor_address}</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <MdLocalPhone className="icon_groups" />
                    </h5>
               <p className="profile_text">{val.vendor_contact_mobile}</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <MdEmail className="icon_groups"/>
                    </h5>
               <p className="profile_text">{val.vendor_contact_email}</p>
                  </div>
                  <div className="age_details">
                    <h5>
                      <IoIosGlobe className="icon_groups" />
                    </h5>
                    <p className="profile_text">
                      {val.vendor_website}
                    </p>
                  </div>
                  <Divider />
                </div>
              </div>
            </Grid>
          </Grid>
          )
        })}
        </div>
        </Spin>
          </Paper>
        
              </div>
          </Paper>
          <div className="prof_edit">
          <Modalcomp visible={this.state.open}  closemodal={ this.handleClose}
           title={<div className="pro_headers">
              <div className="profile_container">
                 <div className="profile_imagediv"> 
                 <div className="User-upload-container">
                   <Upload
        name="avatar"
        // listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
         <div className="pic_align"><AddAPhotoIcon className="add_icon"/></div> 
          {imageUrl &&
         <img src={imageUrl} className="upload-img-circle" alt="avatar" />
          }
      </Upload>
      </div>
      </div>
      </div>
          <div className="basic_head">Basic Details</div> </div>
             } >
          <BasicDetails  
          Image={this.state.imagedata} 
          EditData={this.state.ProfileData}
          EditOpen={this.state.open}
          closemodal={ this.handleClose}
          EditId={this.state.editid}
          ProfileGetApi={this.ProfileGetApi}
          // Image={this.state.Image}
          imageChanged={this.state.imageChanged}
          />
          </Modalcomp>
          </div>
          </div> 
    );
  }
}

export default ProfileComp;
