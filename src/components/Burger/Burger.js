import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props)=>{

        let ingredient = Object.keys(props.ingredient).map(igkey=>{
            
            return  [...Array(props.ingredient[igkey])].map((_,index)=>{
                return  <BurgerIngredient key = {igkey +index} type = {igkey}/>
            });
        })
        .reduce((arr,el)=>{
        
            return arr.concat(el);
        
        },[]);   

        if (ingredient.length===0){
            ingredient = <p>Plese start put ingredients</p>
        }
    return(

        <div className={classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {ingredient}
            <BurgerIngredient type = "bread-bottom"/>
        </div>

    );
}

export default burger;