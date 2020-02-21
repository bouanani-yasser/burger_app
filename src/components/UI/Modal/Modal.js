import React, {Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Model extends Component {

    componentDidUpdate(){
        console.log("Model has updated")
    }

    //for performance
    shouldComponentUpdate(nextProps,nextState){

        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    };

    render(){
        return(
            <Aux>
                <Backdrop show = {this.props.show} clicked = {this.props.clicked}/>
                <div
                style = {{
                    transform : this.props.show? 'translateY(-10vh)' : 'translateY(-100vh)',
                    opacity : this.props.show? '1' : '0'
                }}
                className={classes.Modal}>
                {this.props.children}
                </div>
            </Aux>
            );
    };
};

export default Model;