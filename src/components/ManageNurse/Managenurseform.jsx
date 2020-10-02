import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./Managenurseform.css";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NotfoundIcon from "../../Images/NotFound.svg"
import Swiper from 'react-id-swiper';
import dateFormat from 'dateformat';

export default class Uploadform extends Component {
  state = {
    history_data_store: [],
  };
  componentWillReceiveProps() {
    this.setState({
      history_data_store: this.props.history_data_store
    })
  }


  render() {
    const params = {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // },
      // renderPrevButton: () => <button className="swiper-button-prev">Prev</button>,
      // renderNextButton: () => <button className="swiper-button-next">Next</button>,
    }
    // const params = {
    //   direction: 'vertical',
    //   slidesPerView: 'auto',
    //   freeMode: true,
    //   scrollbar: {
    //     el: '.swiper-scrollbar'
    //   },
    //   mousewheel: true
    // }


    const { history_data_store } = this.state
    // var val=this.props.history_data_store
    console.log(this.props.history_data_store, "props_chkkk")
    return (
      <>
        <div className="row nurseHistoryWidth">
          {
            this.props.history_data_store && this.props.history_data_store.map((val) => {
              return (
                <>
                  <div className="col-md-4">
                    <img src={val.profileImage} className="card-profile" />
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2>
                        <b>
                          {/* ABIDA */}
                          {val.nurseName}
                        </b>
                      </h2>
                      <div style={{ fontSize: "15px" }}>
                        <p >{val.age} Years/{val.gender === 1 ? "Male" : "Female"}</p>
                        <p>
                          {/* Jabriya... */}
                          {val.address}
                        </p>
                        <p>
                          {val.experience} Years Experience
                </p>
                        <p>
                          {/* +965 22000001 */}
                          {val.mobileNo}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
        {/* <Swiper {...params}>
         

        </Swiper> */}

        <div className="row"> {/* ROw start */}
          {
            this.props.history_data_store[0] && this.props.history_data_store[0].patientHistory.map((cust_history) => {
              return (
                <div className={this.props.history_data_store[0].patientHistory.length < 3 ? "col-md-6 nurseCardSpace" : "col-md-4 nurseCardSpace"}>
                  <div>
                    <div className="Card-par-nurse">
                      <Card>
                        <div className="container">
                          <div className="avatar">
                            <img src={cust_history.profileImage} className="card-img" alt="not avail" />
                          </div>
                        </div>
                        <button className="btn btn-success hrsbtn hrsBtnNurse">{cust_history.workingHours} Hrs</button>

                        <div className="modal-text">
                          <h5>
                            {cust_history.name}
                          </h5>
                          <p className="customer-txt">{cust_history.age} Years/{cust_history.gender}</p>
                          <p className="customer-txt">
                            {/* Jabriya... */}
                            {cust_history.address}
                          </p>
                          <p className="customer-txt">
                            {/* +965 22000001 */}
                            {cust_history.phone_no}
                          </p>
                        </div>
                        <div className="modal-date">
                          <div>
                            <p className="customer-txt">Start Date</p>
                            <p className="customer-txt">{dateFormat(cust_history.startDate, "dd mmm yyyy")}</p>
                          </div>

                          <div>
                            <p className="customer-txt">End Date</p>
                            <p className="customer-txt">{dateFormat(cust_history.endDate, "dd mmm yyyy")}</p>
                          </div>
                        </div>
                        <Divider className="mb-0" />
                        <div className="curstomerservice">
                          <p className="customer-txt">
                            {cust_history.duties}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>{/* ROw End */}



      </>
    );
  }
}
