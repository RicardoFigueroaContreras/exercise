import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {getMachineConfig, setAmountPaid, getDrinks} from '../actions/VendingMachineAction';

const QUARTER = 0.25;
const DOLLAR = 1.00;

class MoneyView extends React.Component {

    
    componentDidMount () {
        this.props.getMachineConfig(1);
        this.props.getDrinks(1);
    }

    submitOnClick = () => {

    };
    
    submitOnQuarterClick = () =>{
        this.props.setAmountPaid(QUARTER);
        this.props.history.push('/drinks');
    };

    submitOnDollarClick = () =>{
        this.props.setAmountPaid(DOLLAR);
        this.props.history.push('/drinks');
    };

    renderMoneyView(){

        return(
            <Paper>
                <div> 
                    <React.Fragment>
                        <Container maxWidth="sm">
                            <Grid container justify="center" spacing={3}>

                                <Grid item xs={8}>
                                    <Typography variant="h4">
                                        Welcome!!!
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">
                                        Please enter money to start
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" onClick={this.submitOnQuarterClick}>
                                        Quarter
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    {this.props.machineConfig.allowDollar===true?
                                    (
                                        <Button variant="contained" color="primary" onClick={this.submitOnDollarClick}>Dollar $1</Button>
                                    ):(
                                        <Button variant="contained" color="primary" onClick={this.submitOnDollarClick} disabled>Dollar $1</Button>
                                    )} 
                                    
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                
                                <Grid item xs={10}>                                    
                                    <Typography variant="h8">
                                    * Something went wrong with your purchase?
                                    </Typography>
                                    <Button color="primary" onClick={this.submitOnClick}>
                                        Click Here!!
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
            </Paper>    
        )
    }

    render(){
        return (
            <div>{this.renderMoneyView()}</div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.vendingMachine);
    return {
        machineConfig: state.vendingMachine.MachineConfig,
    };
  };
  
const actions = {
    getMachineConfig,
    setAmountPaid,
    getDrinks
};

export default connect(mapStateToProps,actions)(MoneyView);

