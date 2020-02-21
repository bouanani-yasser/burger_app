import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedElement,axios) =>{

    return class extends Component{

        constructor (){
            super();
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error : null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res=>res,err =>{
                this.setState({error : err});
            });

        }

        // thats for cleaning the axios configuration in case use another root
        componentWillUnmount(){
            console.log("unmount sucssusful",this.reqInterceptor,this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        state = {
            error : null
        }

        //that's not work since the error has happend before the component Mount method
        
        // componentDidMount(){
        //     axios.interceptors.request.use(req =>{
        //         this.setState({error : null});
        //         return req;
        //     });

        //     axios.interceptors.response.use(res=>res,err =>{
        //         this.setState({error : err});
        //     });
        // }


        errorConfirmHnadler = () =>{
            this.setState({error : null})
        }
        render(){

            return (<Aux>

                    <Modal show = {this.state.error} clicked = {this.errorConfirmHnadler }>
                        {this.state.error ?this.state.error.message : null}
                    </Modal>
                    <WrappedElement {...this.props}/>

            </Aux>);
    };
};
}
export default withErrorHandler;