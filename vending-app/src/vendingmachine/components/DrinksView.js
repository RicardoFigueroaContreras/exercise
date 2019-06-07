import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import {DrinksStyles} from '../../commons/themes/AppTheme';
import {setSelectedDrink, saveSale, showSnaskbar} from '../actions/VendingMachineAction';

class DrinksView extends React.Component {

    state = {
        drinkSelected: null,
        openCancel: false,
        openSubmit: false,
    }

    handleDrinkChange = (drink) => {  
        this.setState({drinkSelected: drink});
    };

    handleClickCancel = () => {
        this.setState({openCancel: true});
    };
    
    handleCloseCancel = () => {
        this.setState({openCancel: false});
    };

    handleYesCancelAction = () => {
        this.setState({openCancel: false});
        this.props.history.push('/money');
    };

    handleClickSubmit = () => {
        this.props.setSelectedDrink(this.state.drinkSelected);
        //this.setState({openSubmit: true});
        this.props.history.push('/money');
        var sale = {
          machineId: this.props.machine.id,
          productId: this.state.drinkSelected.id,
          amountPaid: this.props.amountPaid
        };
        this.props.saveSale(sale);
        this.props.showSnaskbar({open: true, message: ' success!!, Want a free soda?', type: 'success',buttonFlag: true});
    };
    
    handleCloseSubmit = () => {
        this.setState({openSubmit: false});
    };

    handleNewSubmit = () => {
        this.setState({openSubmit: false});
        this.props.history.push('/money');
    };

    renderCancelDialog () {
        return (
            <div>
              <Dialog
                open={this.state.openCancel}
                onClose={this.handleCloseCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Cancel: This action will give you the money back, would you like to proceed?"}</DialogTitle>
                <DialogActions>
                  <Button onClick={this.handleCloseCancel} color="primary">
                    No
                  </Button>
                  <Button onClick={this.handleYesCancelAction} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }

    renderSubmitDialog () {
        return (
            <div>
              <Dialog
                open={this.state.openSubmit}
                onClose={this.handleCloseSubmit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Thank you for buying, come back soon!!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Want a free soda?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleNewSubmit} color="primary">
                    Close
                  </Button>
                  <Button onClick={this.handleCloseSubmit} color="primary" autoFocus>
                    Give us Feedback
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }

    returnDrinks (){
      const { classes } = this.props;
      var width = '30%';
      return (
        <div className={classes.root}>
        {this.props.drinkList.map(drink => (
          <ButtonBase
            focusRipple
            key={drink.id}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={event => this.handleDrinkChange(drink)}
            style={{
              width: width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(/img/${drink.imgName})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {drink.brand}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
      );
    }

    render(){

        return(
            <div>
            {this.renderCancelDialog()}
            {this.renderSubmitDialog()}
            <Paper>
                <div> 
                    <React.Fragment>
                        <Container maxWidth="lg">
                            <Grid container justify="center" spacing={3}>

                                <Grid item xs={8}>
                                    <Typography variant="h4">
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h4">
                                        {this.state.drinkSelected === null? 
                                            (<span>Select your Soda</span>): 
                                            (<span>Drink Selected: {this.state.drinkSelected.brand}</span>)}                                        
                                    </Typography>
                                </Grid>

                                <Grid item xs={8}>
                                    {this.returnDrinks()}
                                </Grid>
                                
                                <Grid item xs={10}>                                    
                                    <Button variant="contained" color="primary" onClick={this.handleClickSubmit}>
                                        Submit
                                    </Button>&nbsp;
                                    <Button variant="contained" color="primary" onClick={this.handleClickCancel}>
                                        cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
            </Paper>
            </div> 
        )
    }

}

const mapStateToProps = state => {
  console.log(state.vendingMachine);
    return {
      drinkList: state.vendingMachine.Drinks,
      machine: state.vendingMachine.MachineConfig,
      amountPaid: state.vendingMachine.AmountPaid
    };
  };
  
const actions = {
  setSelectedDrink,
  saveSale,
  showSnaskbar
};

const styleView = withStyles(DrinksStyles)(DrinksView);
export default connect(mapStateToProps,actions)(styleView);
