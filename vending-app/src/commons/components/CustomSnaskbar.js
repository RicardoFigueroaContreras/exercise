
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {styles} from './../themes/AppTheme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {closeSnaskbar} from '../../vendingmachine/actions/VendingMachineAction';
import ErrorIcon from '@material-ui/icons/Error';

class CustomSnackbar extends Component {


    state = {
        vertical: 'top',
        horizontal: 'center',
    };

    handleCloseSnackBar = () =>{
        this.props.closeSnaskbar();
    }

    render() {

        const { classes } = this.props;

        return(
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}               
                key={`${this.state.vertical},${this.state.horizontal}`}
                open={this.props.snaskbar.open}
                onClose={this.handleCloseSnackBar}
                autoHideDuration={6000}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
            >
                <SnackbarContent
                    className={this.props.snaskbar.type === 'success'? classes.successSnaskBar : classes.errorSnaskBar}
                    aria-describedby="client-snackbar"
                    message={
                        this.props.snaskbar.buttonFlag === 'success'? (
                        <span id="client-snackbar" className={classes.message}>
                          <CheckCircleIcon />
                          {this.props.snaskbar.message}
                        </span>):
                        (
                        <span id="client-snackbar" className={classes.message}>
                          <ErrorIcon />
                          {this.props.snaskbar.message}
                        </span>
                        )
                      }
                    action={
                        this.props.snaskbar.buttonFlag === true ?(
                        <Button onClick={this.handleCloseSubmit} color="primary" autoFocus>
                            Give us Feedback
                        </Button>) : (<span></span>)
                      }
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        snaskbar: state.vendingMachine.SnackBarFlag,
    };
  };
  
const actions = {
    closeSnaskbar
};

const customSnackbar = withStyles(styles)(CustomSnackbar);
export default connect(mapStateToProps,actions)(customSnackbar);

