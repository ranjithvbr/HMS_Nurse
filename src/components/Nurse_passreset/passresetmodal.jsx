import React from "react";

import Dialog from "@material-ui/core/Dialog";

import { withStyles } from "@material-ui/core/styles";

const styles = {};
export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  render() {
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div className="trainee_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <p>hi</p>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);
