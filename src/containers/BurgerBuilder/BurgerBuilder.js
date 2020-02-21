import React ,{Component} from 'react';

import axios from '../../axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerColrols from '../../components/Burger/BurgerControls/BurgerControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErroHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    'salad' : 0.2,
    'bacon' : 0.7,
    'cheese': 0.4,
    'meat'  : 1.2
}

class BurgerBuilder extends Component{

    state ={
        ingredient :null,
        total : 4,
        purchase : false,
        purchasing : false,
        loading : false,
        error : false

    }


    componentDidMount(){
        axios.get('ingredients.json')
             .then(res =>{
                 this.setState({ingredient : res.data})
             })
             .catch(err => {
                 this.setState({error : true});
             })
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

        this.setState({loading : true});
        const data = {
            name : 'hichem',
            burger_ingredient : this.state.ingredient,
            price : this.state.total.toFixed(2)
        };
        axios.post('Orders.json',data)
             .then(res =>{
                 console.log(res);
                 this.setState({loading : false,purchasing : false});
                 
             })
             .catch(err =>{
                 console.log(err);
                 this.setState({loading : false,purchasing : false});
                
             });
             
       

        
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

        let content =this.state.error?
        <h1 style = {{textAlign : "center" , color : "red"}}> someting went wrong </h1> 
        :  <Spinner/> ;
        let orderSummary = null;
        
        if(this.state.ingredient){
            content = (<Aux>
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
            </Aux>);

            orderSummary =  <OrderSummary 
            price = {this.state.total.toFixed(2)}
            ingredients = {this.state.ingredient}
            cancel ={this.purchaseCancelHandler}
            continue = {this.purchaseContinueHandler}
            />
        }
        
        if(this.state.loading){orderSummary = <Spinner/>}

        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {content}   
            </Aux>
        );

    }
}

export default withErroHandler( BurgerBuilder ,axios);