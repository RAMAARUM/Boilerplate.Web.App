// ./src/common/main.component.jsx
import React, { Component } from "react";
import PutCustomer from "./PutCustomer.jsx";
import DeleteCustomer from "./DeleteCustomer.jsx";
import CreateCust from "./CreateCust.jsx";
import {Table, Button, Label, Dropdown, Container} from "semantic-ui-react";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      customers: [],
      size : 1
    };
  }

  componentDidMount() {
    this.fetchCustomer(1,this.state.size);
  }
  

  fetchCustomer = (page,size) => {
    fetch(`/Customers/GetCustomerJson/?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            customers: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const listoptions = [
      { key: '1', value: 1, text: '1' },
      { key: '2', value: 2, text: '2' },
      { key: '3', value: 3, text: '3' },
      { key: '4', value: 4, text: '4' },
      { key: '5', value: 5, text: '5' },
    ]
    const { error, isLoaded, customers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Container>
            <CreateCust loadcustpage={this.fetchCustomer} size={this.state.size} />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {customers.items.map(customer => (
                  <Table.Row key={customer.id}>
                    <Table.Cell>{customer.id}</Table.Cell>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>{customer.address}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <PutCustomer editdata={customer} editdatapage={customers.metaData.pageNumber} loadcustpage={this.fetchCustomer} size={this.state.size}/>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <DeleteCustomer deletedata={customer} deletedatapage={customers.metaData.pageNumber} loadcustpage={this.fetchCustomer} size={this.state.size}/>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5" textAlign="center">
                    <Dropdown 
                    as={Button}                   
                    floating    
                    options={listoptions}
                    value={this.state.size}
                    onChange={(e,{value}) => {
                      this.setState({size:value});
                      this.fetchCustomer(1,value)}}
                    />
                    <Button
                      content="PREV"
                      icon labelPosition="left"
                      icon='left arrow'                      
                      onClick={() =>
                        this.fetchCustomer(this.state.customers.metaData.pageNumber - 1,
                         this.state.size)
                      }
                      disabled={!customers.metaData.hasPreviousPage}
                    />
                    --
                    <Label color='blue'>
                    {customers.metaData.pageNumber}/
                    {customers.metaData.pageCount}
                    </Label>
                     --
                    <Button
                      content="NEXT"                      
                      icon labelPosition="right"
                      icon='right arrow'
                      onClick={() =>
                        this.fetchCustomer(
                         this.state.customers.metaData.pageNumber + 1, this.state.size
                        )
                      }
                      disabled={!customers.metaData.hasNextPage}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Container>
        </div>
      );
    }
  }
}
