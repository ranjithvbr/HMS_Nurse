import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Divider from '@material-ui/core/Divider';
import './DayCheckbox.css'
import CloseIcon from '@material-ui/icons/Close';
import Labelbox from '../../helpers/labelbox/labelbox';
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default  class CheckboxLabels extends React.Component{
constructor(props){
  super(props)
  this.state=
{
    checkedA:false,checkedB: false,checkedC: false,checkedD: false,checkedE: false,checkedF: false,checkedG: false,
    time:false,showtimepicker:false,timeout:false,choosetime:false
  };
}

   handleChange = name=>event=> {
     console.log([name])
     if(this.state.time===false)(
    this.setState({ checkedA:true,
      checkedB: true,
      checkedC: true,
      checkedD: true,
      checkedE: true,
      checkedF: true,
      checkedG: true,
      time:true, 
    }))

    if(!this.state.time===false)(
    this.setState({ checkedA:false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: false,
      checkedF: false,
      checkedG: false,
      time:false, 
    }))
  };
  handleChangebox =name => event => {
    this.setState({ ...this.state, [name]: event.target.checked});
    this.handleChange(this.label);
  };
  timepickershow=()=>
  {
    this.setState({showtimepicker:!this.state.showtimepicker})
  }
  timepickerclose=()=>
  {
    this.setState({timeout:!this.state.timeout})
  }

 render()
 {
  const { label,onClose } = this.props;
  var checkbox=(
    <div>
         <div className="label_timepicker_container">{this.state.showtimepicker==false?<div className="timepicker_container"><Labelbox type="timepicker" className="start_time"/> 
         <p className="time-">-</p>
         <Labelbox type="timepicker"/>
         <CloseIcon className="close_days"/>
         </div>
         :""}
         </div>
         <div><a className="addmore_hours" onClick={this.timepickershow}>Add more hours</a></div>
         </div>
  )
  return (
    <div>
      <div className="select_timepicker">
    <FormControlLabel
    control={<Checkbox checked={this.state.time} onChange={this.handleChange('time')}value="time"/>}label="Select All Days" />
    {this.state.time==true?
    <div className="timepicker_container">
        <Labelbox type="timepicker" className="start_time"/> 
        <p className="time-">-</p>
        <Labelbox type="timepicker" />
    </div>
    :""}
    </div>
    <Divider className="checkbox_divider"/>  
    <FormGroup col className="form_checkbox"> 
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangebox('checkedA')} value={label}/>}label="Friday" />
               {this.state.checkedA==true?
              
                 <div>{checkbox}</div>
              :""}
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedB}onChange={this.handleChangebox('checkedB')}value="checkedB"/>}label="Saturday" />
         {this.state.checkedB==true?<div>{checkbox}</div>:""}
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedC}onChange={this.handleChangebox('checkedC')}value="checkedC"/>}label="Sunday" />
         {this.state.checkedC==true?<div>{checkbox}</div>:""}
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedD}onChange={this.handleChangebox('checkedD')}value="checkedD"/>}label="Monday" />
         {this.state.checkedD==true?<div>{checkbox}</div>:""}
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedE}onChange={this.handleChangebox('checkedE')}value="checkedE"/>}label="Tuesday" />  
         {this.state.checkedE==true?<div>{checkbox}</div>:""} 
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedF}onChange={this.handleChangebox('checkedF')}value="checkedF"/>}label="Wednesday" />   
         {this.state.checkedF==true?<div>{checkbox}</div>:""}
       <FormControlLabel
        control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedG}onChange={this.handleChangebox('checkedG')}value="checkedG"/>}label="Thursday" />   
      <p>{this.props.selectedtime}</p>
         {this.state.checkedG==true?<div>{checkbox}</div>:""}       
    </FormGroup>
    </div>
  );
}
}
