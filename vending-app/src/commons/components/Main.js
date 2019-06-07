
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { menuListItems } from './Menu';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {styles} from './../themes/AppTheme';
import Router from './Router';
import CustomSnackbar from './CustomSnaskbar'


class Layout extends Component {

    state = {
        open: true,
    };
    
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleCloseSnackBar = () =>{
        this.props.closeSnaskbar();
    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position="absolute"
                className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(
                            classes.menuButton,
                            this.state.open && classes.menuButtonHidden,
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                  }}
                open={this.state.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{menuListItems}</List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Router />
            </main>
            <CustomSnackbar/>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Layout);
