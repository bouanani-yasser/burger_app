import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer : false})
    }
    sideDrawerToggledHandler = ()=>{
       // this.setState({showSideDrawer : !this.state.showSideDrawer}) 
       //!* when the state depend the prev state you should use a method*!

       this.setState((prevState) =>{
           return{showSideDrawer : !prevState.showSideDrawer}
       }
      )
    }

    
    
    render(){

    return(
        <Aux>
            <Toolbar open = {this.sideDrawerClosedHandler} toggleDrawer={this.sideDrawerToggledHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>

        </Aux>
    );
   };
};

export default Layout;