import React from 'react';
import classes from './BurgerControl.css';

const burgerControl = (props)=>{
    return (

        <div className = {classes.BuildControl}>
            <label className = {classes.Label}>{props.type}</label>
            <button 
            className = {classes.More}
            onClick = {props.addIng}
            >more</button>
            <button 
            className = {classes.Less}
            onClick = {props.removeIng}
            disabled = {props.disabled}
            >less</button>
        </div>

    );
}


export default burgerControl;