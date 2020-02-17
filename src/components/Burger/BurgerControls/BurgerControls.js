import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.css'


const burgerControls =(props) =>{

  let controls = Object.keys(props.ingredient).map((igkey,index) =>{
    return(

        <BurgerControl 
        key = {index}
        addIng = {() =>props.add(igkey)}  
        removeIng = {() =>props.remove(igkey)}  
        type ={igkey}
        disabled = {props.desableInfo[igkey]}
        />        
    );
    });

  return  <div className = {classes.BuildControls} >
                <p>Current Price :<strong>{props.price}</strong> </p>
                {controls}
                <button 
                onClick = {props.purchasing}
                disabled = {!props.purchase} 
                className = {classes.OrderButton}>
                ORDER</button>
            </div>;

}

export default burgerControls;