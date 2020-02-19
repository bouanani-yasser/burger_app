import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <strong key={igKey}>
                <li >
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
                </strong> );
        } );

    return (
        <Aux>
            <h3>Your Order</h3>
            <hr/>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <hr/>
            <h3>Burder price : {props.price}$</h3>
            <hr/>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType = "Success" clicked={props.continue}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;