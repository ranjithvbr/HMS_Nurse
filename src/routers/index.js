import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Drawerpage from "../components/Drawer page/Drawerpage";
import Nurse_dash_master from "../components/Nurse_dashboard/Nurse_dash_master";
import Nurse_login from "../components/Nurse_login/Nurse_login";
import Nurse_pass from "../components/Nurse_pass/Nurse_pass";
import Nurse_BookingMaster from "../components/Nurse_Booking/Nurse_BookingMaster";
import UserEngageMaster from "../components/User Engagement/UserEngageMaster";
import TotalnurseDashboard from "../components/ManageNurse/TotalnurseDashboard";
import NursebookedHeader from "../components/NurseHired/NursebookedHeader";
import TotalleaveHeader from "../components/NurseLeave/TotalleaveHeader";
import passreset from "../components/Nurse_passreset/Nurse_passreset";
import IdlenurseHeader from "../components/IdleNurse/IdlenurseHeader";
import CustomerHistoryHeader from "../components/CustomerHistory/CustomerHistoryHeader";
  import NurseserviceCancellation from "../components/CancelledAppointments/NurseServiceCancellationHeader";
import Revenue from "../components/Revenue/RevenueMaster";
import AvailabilityMaster from "../components/Availability/AvailabilityMaster";
import AdvertisementMaster from "../components/AdvertisementBooking/AdvertisementMaster";
import DealsMaster from "../components/Deals/DealsMaster";
import CancelPayment from "../components/CancelPayment/CancelPayment";
import PaymentReceived from "../components/PaymentReceived/PaymentReceived";
import calender from "../calender";
import WorkFlow from "../components/WorkFlow/WorkFlow";
const AppRouter = () => (
  <BrowserRouter>
    <Drawerpage>
      <Switch>
        <Route path="/dashboard" component={Nurse_dash_master} exact />
        <Route path="/login" component={Nurse_login} exact />
        <Route path="/forgotpassword" component={Nurse_pass} />
        <Route path="/managenurse" component={TotalnurseDashboard} />
        <Route path="/nursehired" component={NursebookedHeader} />
        <Route path="/nurseleave" component={TotalleaveHeader} />
        <Route path="/userengage" component={UserEngageMaster} />
        <Route path="/totalbooking" component={Nurse_BookingMaster} />
        <Route path="/cancelledappointments"component={NurseserviceCancellation}/>
        <Route path="/passreset" component={passreset} />
        <Route path="/idlenurse" component={IdlenurseHeader} />
        <Route path="/customerhistory" component={CustomerHistoryHeader} />
        <Route path="/revenuenew" component={Revenue} />
        <Route path="/availability" component={AvailabilityMaster} />
        <Route path="/advertisement" component={AdvertisementMaster} />
        <Route path="/deals" component={DealsMaster} />
        <Route path="/cal" component={calender} />
        <Route path="/cancelpayment" component={CancelPayment} />
        <Route path="/paymentreceived" component={PaymentReceived} />
        <Route path="/workflow" component={WorkFlow} />
      </Switch>
    </Drawerpage>
  </BrowserRouter>
);

export default AppRouter;
