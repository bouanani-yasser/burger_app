import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerColrols from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICE = {
    'salad' : 0.2,
    'bacon' : 0.7,
    'cheese': 0.4,
    'meat'  : 1.2
}

class BurgerBuilder extends Component{

    state ={
        ingredient :{
            'salad' : 0,
            'bacon' : 0,
            'cheese': 0,
            'meat'  : 0,
        },
        total : 4,
        purchase : false,
        purchasing : false
    }


    updatePurchase = (ing) =>{

        let sum = Object.keys(ing).map(igkey=>{
            return ing[igkey];
        }).reduce((sum,el)=>{
            return sum +el;
        },0);
        this.setState({purchase : sum > 0});
    }

    purchaseHandler = ()=>{
        this.setState({purchasing : true})
    }
    purchaseCancelHandler = ()=>{
        this.setState({purchasing : false})
    }
    purchaseContinueHandler = ()=>{
        alert('Thanks for your order')
        this.purchaseCancelHandler();
    }


    addIngredientHandler = (type) =>  {

        let ing_val = this.state.ingredient[type] + 1;

        let new_ing = {...this.state.ingredient};
        new_ing[type] = ing_val;
        let price = this.state.total + INGREDIENT_PRICE[type];

        this.setState({total : price,ingredient : new_ing});
        this.updatePurchase(new_ing);
    }


    removeIngredientHandler = (type) =>  {
        if(this.state.ingredient[type] <= 0){
            return;
        }

        let ing_val = this.state.ingredient[type] - 1;

        let new_ing = {...this.state.ingredient};
        new_ing[type] = ing_val;
        
        let price = this.state.total - INGREDIENT_PRICE[type];

        this.setState({total : price,ingredient : new_ing});
        this.updatePurchase(new_ing);
        
    }

    render(){
        let desableInfo = {...this.state.ingredient};

        for (let key in desableInfo){
            desableInfo[key] = desableInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked = {this.purchaseCancelHandler}>
                <OrderSummary 
                price = {this.state.total.toFixed(2)}
                ingredients = {this.state.ingredient}
                cancel ={this.purchaseCancelHandler}
                continue = {this.purchaseContinueHandler}
                />
                </Modal>
                <Burger ingredient = {this.state.ingredient}></Burger>
                <BurgerColrols 
                    ingredient = {this.state.ingredient} 
                    add = {this.addIngredientHandler}
                    remove = {this.removeIngredientHandler}
                    desableInfo = {desableInfo}
                    price = {this.state.total.toFixed(2)}
                    purchase = {this.state.purchase}
                    purchasing = {this.purchaseHandler}
                    
                />               
            </Aux>
        );

    }
}

export default BurgerBuilder;