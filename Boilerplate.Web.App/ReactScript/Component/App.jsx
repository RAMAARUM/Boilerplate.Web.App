// ./src/common/main.component.jsx
import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import Customer from './Customer.jsx';
import Product from './Product.jsx';
import Store from './Store.jsx';
import Sales from './Sales.jsx';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

export default class App extends Component {
    
  

    componentDidMount() {


            }

    render() {
        return (
            <div>
            <Router >
            <div className="app">
                <NavBar />                
                <Route exact path="/customer" component={Customer} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/store" component={Store} />
                <Route exact path="/sales" component={Sales} />
            </div>
            </Router >
               
                </div>
        );
             }
         
}