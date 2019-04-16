// ./src/common/main.component.jsx
import React, { Component } from "react";
import PutProduct from "./PutProduct.jsx";
import DeleteProduct from "./DeleteProduct.jsx";
import CreateProduct from "./CreateProduct.jsx";
import {Table, Button, Label, Dropdown, Container} from "semantic-ui-react";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Products: [],
      size : 1
    };
  }

  componentDidMount() {
    this.fetchProduct(1,this.state.size);
  }
  

  fetchProduct = (page,size) => {
    fetch(`/Products/GetProductJson/?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            products: result
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
    const { error, isLoaded, products } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Container>
            <CreateProduct loadproductpage={this.fetchProduct} size={this.state.size} />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.items.map(product => (
                  <Table.Row key={product.pid}>
                    <Table.Cell>{product.pid}</Table.Cell>
                    <Table.Cell>{product.pname}</Table.Cell>
                    <Table.Cell>{product.price}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <PutProduct editdata={product} editdatapage={products.metaData.pageNumber} loadproductpage={this.fetchProduct} size={this.state.size}/>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <DeleteProduct deletedata={product} deletedatapage={products.metaData.pageNumber} loadproductpage={this.fetchProduct} size={this.state.size}/>
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
                      this.fetchProduct(1,value)}}
                    />
                    <Button
                      content="PREV"
                      icon labelPosition="left"
                      icon='left arrow'                      
                      onClick={() =>
                        this.fetchProduct(this.state.products.metaData.pageNumber - 1,
                         this.state.size)
                      }
                      disabled={!products.metaData.hasPreviousPage}
                    />
                    --
                    <Label color='blue'>
                    {products.metaData.pageNumber}/
                    {products.metaData.pageCount}
                    </Label>
                     --
                    <Button
                      content="NEXT"                      
                      icon labelPosition="right"
                      icon='right arrow'
                      onClick={() =>
                        this.fetchProduct(
                         this.state.products.metaData.pageNumber + 1, this.state.size
                        )
                      }
                      disabled={!products.metaData.hasNextPage}
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
