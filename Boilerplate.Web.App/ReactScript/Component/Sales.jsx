// ./src/common/main.component.jsx
import React, { Component } from "react";
import PutSales from "./PutSales.jsx";
import DeleteSales from "./DeleteSales.jsx";
import CreateSales from "./CreateSales.jsx";
import {Table, Button, Label, Dropdown, Container} from "semantic-ui-react";

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sales: [],
      size : 1
    };
  }

  componentDidMount() {
    this.fetchSales(1,this.state.size);
  }
  

  fetchSales = (page,size) => {
    fetch(`/ProductSolds/GetSalesJson/?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            sales: result
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
    const { error, isLoaded, sales } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Container>
            <CreateSales loadsalespage={this.fetchSales} size={this.state.size} />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Customer</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Store</Table.HeaderCell>
                  <Table.HeaderCell>Date Sold</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sales.items.map(sale => (
                  <Table.Row key={sale.id}>                    
                    <Table.Cell>{sale.customerName}</Table.Cell>
                    <Table.Cell>{sale.productName}</Table.Cell>
                    <Table.Cell>{sale.storeName}</Table.Cell>
                    <Table.Cell>{sale.dateSold}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <PutSales editdata={sale}  editdatapage={sales.metaData.pageNumber} loadsalespage={this.fetchSales} size={this.state.size}/>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <DeleteSales deletedata={sale}  deletedatapage={sales.metaData.pageNumber} loadsalespage={this.fetchSales} size={this.state.size}/>
                    </Table.Cell>                    
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6" textAlign="center">
                    <Dropdown 
                    as={Button}                    
                    floating    
                    options={listoptions}
                    value={this.state.size}
                    onChange={(e,{value}) => {
                      this.setState({size:value});
                      this.fetchSales(1,value)}}
                    />
                    <Button
                      content="PREV"
                      icon labelPosition="left"
                      icon='left arrow'
                      onClick={() =>
                        this.fetchSales(this.state.sales.metaData.pageNumber - 1,
                         this.state.size)
                      }
                      disabled={!sales.metaData.hasPreviousPage}
                    />
                    --
                    <Label color = 'blue'>
                    {sales.metaData.pageNumber}/
                    {sales.metaData.pageCount}
                    </Label>
                     --
                    <Button
                      content="NEXT"
                      icon labelPosition="right"
                      icon='right arrow'
                      onClick={() =>
                        this.fetchSales(
                         this.state.sales.metaData.pageNumber + 1, this.state.size
                        )
                      }
                      disabled={!sales.metaData.hasNextPage}
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
