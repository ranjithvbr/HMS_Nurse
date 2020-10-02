import React from 'react';
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Checkbox from '@material-ui/core/Checkbox';
import './UserView.css';
import Button from '@material-ui/core/Button';
export default class UserView extends React.Component{
    render()
    {
        return(
            <div className="User_viewnurse">
                <Grid container spacing={4}>
                     <Grid item xs={12} md={6}>
                          <Labelbox type="text" labelname="Media Title"/>
                     </Grid>
                     <Grid item xs={12} md={6}>
                          <Labelbox type="text" labelname="Media Title"/>
                     </Grid>
                     <Grid item xs={12} md={12}>
                     <Labelbox type="text" labelname="Media Title"/>
                     </Grid>
                     <Grid item xs={12} md={12} className="checkbox_container">
                      <Checkbox className="checkbox"/>
                     </Grid>
                     <Grid item xs={12} md={12}>
                      <div className="user_buttons_container">
                          <div style={{width:"12%"}}><Button variant="contained" className="cancel_button">Cancel</Button></div>
                          <div><Button variant="contained" className="Upload_button" color="primary">Upload</Button></div>
                      </div>
                     </Grid>
                </Grid>
            </div>
        )
    }
}