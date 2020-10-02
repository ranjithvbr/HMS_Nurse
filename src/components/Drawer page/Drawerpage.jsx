import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import dashboard from "../../Images/dashboard.svg";
import Button from "@material-ui/core/Button";
import nursehired from "../../Images/nursehired.svg";
import idlenurse from "../../Images/idlenurse.svg";
import nurseonleave from "../../Images/nurseonleave.svg";
import cancelledappointments from "../../Images/cancelledappointments.svg";
import deals from "../../Images/deals.svg";
import availability from "../../Images/availability.svg";
import advertisebooking from "../../Images/advertisebooking.svg";
import managenurse from "../../Images/managenurse.svg";
import revenue from "../../Images/revenue.svg";
import profile from "../../Images/profile.svg";
import CustomerHistory from "../../Images/CustomerHistory.svg";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Dashboard from "../Nurse_dashboard/Nurse_dash_master";
import NursebookedHeader from "../NurseHired/NursebookedHeader";
import IdlenurseHeader from "../IdleNurse/IdlenurseHeader";
import AvailabilityMaster from "../Availability/AvailabilityMaster";
import TotalleaveHeader from "../NurseLeave/TotalleaveHeader";
import NurseserviceCancellation from "../CancelledAppointments/NurseServiceCancellationHeader";
import AdvertisementMaster from "../AdvertisementBooking/AdvertisementMaster";
import DealsMaster from "../Deals/DealsMaster";
import Revenue from "../Revenue/RevenueMaster";
import ManageNurse from "../ManageNurse/index";
import CancelPayment from "../CancelPayment/CancelPayment";
import PaymentReceived from "../PaymentReceived/PaymentReceived";
import ProfileComp from "../Profilepage/Profilepage";
import CustomerHistoryMaster from "../CustomerHistory/index";
import Axios from "axios";
import {apiurl} from '../../App'
import {notification} from 'antd';



import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import Login from "../Login/Login";

const drawerWidth = 260;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
var today = new Date();

var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })

class MiniDrawer extends React.Component {
 
  state = {
    open: false,
    viewmodal: false,
    ProfileData:[],
    date: date,
    time: time,
    current_location:""
  };
  componentDidMount(){
    this.ProfileGetApi()
    this.setState({
      current_location: window.location.href
    },() => console.log("sfdshfjsdhfjsdhfsdf", this.state.current_location))
  }

  generateAlert = (description) => {
    notification.success({
      // message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  

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

  

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  logoutClick = () => {
    window.localStorage.clear();
    window.location.assign('/?/nursemodule')
    this.props.onClose()
  }
  active_box = () => {
    this.setState({current_location:window.location.href},() => console.log("sfkjhdsfljkldhsfk",this.state.current_location))
  }
  render() {
    const { classes, theme, children, onClose, selectedValue } = this.props;

    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              {/* <div className="hamburger_icon"> */}
              <IconButton
                
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              {/* </div> */}
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle variant="my_style" id="dropdown-basic">
                    My Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                  {this.state.ProfileData.map((val)=>{
               return(
                    <div className="dropdown-img">
                    {/* <NavLink activeClassName="active" to="/Home/profilepage"> */}
                   
                      <img
                      
                        className="Avatar"
                        alt="avatar-missing"
                        src={val.vendor_filename}
                      />
             
                      {/* </NavLink> */}
                      
                     
                    </div>
                    )})}
                    {this.state.ProfileData.map((val)=>{
               return(
                    <div className="name_email">
                      <NavLink activeClassName="active" to="/Home/profilepage">
                   <div className="username" style={{color:'black',textDecoration:'none'}}>{val.vendor_name}</div>
                   </NavLink>
                   <NavLink activeClassName="active" to="/Home/profilepage">

                   <div style={{color:'grey',textDecoration:'none'}}>{val.vendor_email}</div>
                   </NavLink>
                   </div>
               )})}
                    <Divider />
                    <div className="profile_logout_butt">
                    <NavLink activeClassName="active" to="/Home/profilepage">
                      <p>Profile</p>
                      </NavLink>
                      {/* <Button
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                        onClick={this.logoutclick}
                      >
                        Logout
                      </Button> */}
                      <a
                        component={NavLink}
                        href="/nursemodule/?/"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                      </a>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                  <large className="date">{this.state.date}{` `}{this.state.time}</large>
                  </div>
                </div>
              </div>
              {this.state.ProfileData.map((val)=>{
               return(
              // <NavLink activeClassName="active" to="/Home/profilepage">
              <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={val.vendor_filename}
                // onClick={this.viewmodalOpen}
                className={classes.avatar}
              />
              // </NavLink>
               )})}
              
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>

            <MenuList className="appbar_sideicons" onClick={this.active_box}>
              <MenuItem component={Link} to="/Home/dashboard" className={`${this.state.current_location.includes("/dashboard" || "/dashboard") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={dashboard} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/nursehired" className={`${this.state.current_location.includes("/nursehired") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={nursehired} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Total Nurses Hired" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/idlenurse" className={`${this.state.current_location.includes("/idlenurse") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={idlenurse} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Idle Nurses" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/availability" className={`${this.state.current_location.includes("/availability") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={availability} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Availability" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/nurseleave" className={`${this.state.current_location.includes("/nurseleave") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={nurseonleave} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Nurses On Leave/Block" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/cancelledappointments" className={`${this.state.current_location.includes("/cancelledappointments") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancelledappointments} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancelled Appointments" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/advertisement" className={`${this.state.current_location.includes("/advertisement") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={advertisebooking} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/deals" className={`${this.state.current_location.includes("/deals") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={deals} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/revenue" className={`${this.state.current_location.includes("/revenue") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={revenue} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/managenurse" className={`${this.state.current_location.includes("/managenurse") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={managenurse} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Nurses" />
              </MenuItem>
              <MenuItem
                component={Link} to="/Home/profilepage" className={`${this.state.current_location.includes("/profilepage") && "active_text_heading"}`}
                onClick={this.viewmodalOpen}
              >
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={profile} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem component={Link} to="/Home/customerhistory" className={`${this.state.current_location.includes("/customerhistory") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={CustomerHistory} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Customer History" />
              </MenuItem>
            </MenuList>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            
            <Route
              path={`${this.props.match.path}/dashboard`}
              component={Dashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/nursehired`}
              component={NursebookedHeader}
              exact
            />
            <Route
              path={`${this.props.match.path}/idlenurse`}
              component={IdlenurseHeader}
              exact
            />
            <Route
              path={`${this.props.match.path}/availability`}
              component={AvailabilityMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/nurseleave`}
              component={TotalleaveHeader}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelledappointments`}
              component={NurseserviceCancellation}
              exact
            />
            <Route
              path={`${this.props.match.path}/advertisement`}
              // component={AdvertisementMaster}
              render={(props) => <AdvertisementMaster {...props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/deals`}
              component={DealsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/revenue`}
              component={Revenue}
              exact
            />
            <Route
              path={`${this.props.match.path}/managenurse`}
              component={ManageNurse}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelpayment`}
              component={CancelPayment}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentreceived`}
              component={PaymentReceived}
              exact
            />
            <Route
              path={`${this.props.match.path}/profilepage`}
              component={ProfileComp}
              exact
            />
            <Route
              path={`${this.props.match.path}/customerhistory`}
              component={CustomerHistoryMaster}
              exact
            />

            <div>
              {children}
              {/* <Profilepage
                open={this.state.viewmodal}
                onClose={this.viewmodalClose}
              /> */}
            </div>
          </main>
        </div>
      </div>
    );
  }
}


MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};


export default withStyles(styles, { withTheme: true })(MiniDrawer);
