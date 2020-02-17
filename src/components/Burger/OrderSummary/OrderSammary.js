import React from 'react';

const orderSammary = (props) =>{

    const ing = Object.keys(props.ingredient).map((igkey)=>{
        return (
        <li key={igkey}>{igkey} : {props.ingredient[igkey]}</li>
        );
    });

    return(
    <div>
        <p> You deleciase burder with this ingredient !!</p>
        {ing}
        <p>are you sure you wanna go with that?</p>
    </div>);


};


export default orderSammary;