import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
        };
        // This binding is necessary to make `this` work in the callback
        // this.handleItemClick = this.handleItemClick.bind(this);

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state
        return (
            <Menu>
                <Menu.Item as={Link} to='customer'
                    name='customer'
                    active={activeItem === 'customer'}
                    onClick={this.handleItemClick}
                > Customer
                    </Menu.Item>

                <Menu.Item as={Link} to='product'
                    name='product'
                    active={activeItem === 'product'}
                    onClick={this.handleItemClick}
                > Product
                </Menu.Item>

                <Menu.Item as={Link} to='store'
                    name='store'
                    active={activeItem === 'store'}
                    onClick={this.handleItemClick}
                > Store
                </Menu.Item>

                <Menu.Item as={Link} to='sales'
                    name='sales'
                    active={activeItem === 'sales'}
                    onClick={this.handleItemClick}
                > Sales
                </Menu.Item>
            </Menu>

        );
    }
}