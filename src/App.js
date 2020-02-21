import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {

  state = {
    show : true
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState({show : false})
    },3000)
  }

  render(){
  return (
    <Layout>
      {this.state.show?<BurgerBuilder></BurgerBuilder> : null}
    </Layout>
  );
  }
}

export default App;
