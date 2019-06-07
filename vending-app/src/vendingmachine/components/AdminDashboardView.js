import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {getStockSummary, putMachine} from '../actions/DashboardAction';
import {getMachineConfig} from '../actions/VendingMachineAction';

  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

class AdminDashboardView extends React.Component {

    state = {
        value: 0,
        allowDollar: this.props.machineConfig.allowDollar
    };

    componentDidMount () {
      this.props.getMachineConfig(1);
      this.props.getStockSummary(1);
    }

    submitOnClick = () =>{
        this.props.history.push('/drinks');
    };

    handleChange = (event, newValue) =>{
        this.setState({value: newValue});
    };

    handleCheckboxChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    saveSettings = () =>{

      var machine = Object.assign({}, this.props.machineConfig);
      machine.allowDollar = this.state.allowDollar;
      
      this.props.putMachine(machine);

    };
    
    renderSalesReview(){
        return (
          <div>
          <AppBar position="static" color="default">
            <Toolbar >

              &nbsp;
              <Button variant="contained" color="primary" >
                Search
              </Button>
            </Toolbar>
          </AppBar>
          <Divider variant="inset" />
          <Divider variant="inset" />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Soda</TableCell>
                  <TableCell align="right">Min Stock</TableCell>
                  <TableCell align="right">Max Stock</TableCell>
                  <TableCell align="right">Current Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.props.stockSummaryList.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.brand}
                      </TableCell>
                      <TableCell align="right">{row.minStock}</TableCell>
                      <TableCell align="right">{row.maxStock}</TableCell>
                      <TableCell align="right">{row.currentStock}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
        );
    }

    renderStockManagment(){
      return (
        <div>
          <AppBar position="static" color="default">
            <Toolbar >
              <Button variant="outlined" color="primary" >
                Update Min/Max
              </Button>
              &nbsp;
              <Button variant="outlined" color="primary" >
                Replenish Order(to Max Stock)
              </Button>
            </Toolbar>
          </AppBar>
          <Divider variant="inset" />
          <Divider variant="inset" />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Soda</TableCell>
                  <TableCell align="right">Min Stock</TableCell>
                  <TableCell align="right">Max Stock</TableCell>
                  <TableCell align="right">Current Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.props.stockSummaryList.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.brand}
                      </TableCell>
                      <TableCell align="right">{row.minStock}</TableCell>
                      <TableCell align="right">{row.maxStock}</TableCell>
                      <TableCell align="right">{row.currentStock}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
  }
  renderSettings(){
    return (
    <AppBar position="static" color="default">
      <Toolbar >
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.allowDollar}
              onChange={this.handleCheckboxChange('allowDollar')}
              value="allowDollar"
              color="primary"
            />
          }
          label="Accept $1 "
        />
        &nbsp;
        <Button variant="contained" color="primary" onClick={this.saveSettings}>
          SAVE
        </Button>
      </Toolbar>
    </AppBar>
    );
  }
    render(){
        return (
            <div>            
                <div>
                <AppBar position="static" color="default">
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    >
                    <Tab label="Sales Review" />
                    <Tab label="Stock Managment" />
                    <Tab label="Purchase Errors" disabled />
                    <Tab label="Feedback" disabled/>
                    <Tab label="Settings" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <TabContainer>{}</TabContainer>}
                {this.state.value === 1 && <TabContainer>{this.renderStockManagment()}</TabContainer>}
                {this.state.value === 2 && <TabContainer>Purchase Errors</TabContainer>}
                {this.state.value === 3 && <TabContainer>Feedback</TabContainer>}
                {this.state.value === 4 && <TabContainer>{this.renderSettings()}</TabContainer>}
                </div>
            </div>
        );
    }



}

const mapStateToProps = state => {
    return {
        stockSummaryList: state.dashboard.StockSummary, 
        machineConfig: state.vendingMachine.MachineConfig,
    };
  };
  
const actions = {
  getStockSummary,
  putMachine,
  getMachineConfig
};

export default connect(mapStateToProps,actions)(AdminDashboardView);