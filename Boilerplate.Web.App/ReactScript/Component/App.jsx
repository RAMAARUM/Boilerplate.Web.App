// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { Table, Modal, Container, Button, Checkbox, Form, Header, Menu, Image } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import Customer from './Customer.jsx';
import Product from './Product.jsx';
import Store from './Store.jsx';
import CreateCust from './CreateCust.jsx';
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
                <Route exact path="/" component={Customer} />
                <Route exact path="/customer" component={Customer} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/store" component={Store} />
                <Route exact path="/sales" component={Store} />
            </div>
            </Router >
               
                </div>
        );
             }
         
}