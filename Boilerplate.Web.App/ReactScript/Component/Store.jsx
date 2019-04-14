// ./src/common/main.component.jsx
import React, { Component } from "react";
import PutStore from "./PutStore.jsx";
import DeleteStore from "./DeleteStore.jsx";
import CreateStore from "./CreateStore.jsx";
import {Table, Button, Label, Dropdown, Container} from "semantic-ui-react";

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Stores: [],
      size : 1
    };
  }

  componentDidMount() {
    this.fetchStore(1,this.state.size);
  }
  

  fetchStore = (page,size) => {
    fetch(`/Stores/GetStoreJson/?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            stores: result
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
    const { error, isLoaded, stores } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Container>
            <CreateStore loadstorepage={this.fetchStore} size={this.state.size} />
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
                {stores.items.map(store => (
                  <Table.Row key={store.sid}>
                    <Table.Cell>{store.sid}</Table.Cell>
                    <Table.Cell>{store.sname}</Table.Cell>
                    <Table.Cell>{store.saddress}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <PutStore editdata={store} editdatapage={stores.metaData.pageNumber} loadstorepage={this.fetchStore} size={this.state.size}/>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <DeleteStore deletedata={store} deletedatapage={stores.metaData.pageNumber} loadstorepage={this.fetchStore} size={this.state.size}/>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5" textAlign="center">
                    <Dropdown 
                    as={Button}
                    color='teal'
                    floating    
                    options={listoptions}
                    value={this.state.size}
                    onChange={(e,{value}) => {
                      this.setState({size:value});
                      this.fetchStore(1,value)}}
                    />
                    <Button
                      content="PREV"
                      icon labelPosition="left"
                      icon='left arrow'
                      color='olive'
                      onClick={() =>
                        this.fetchStore(this.state.stores.metaData.pageNumber - 1,
                         this.state.value                        )
                      }
                      disabled={!stores.metaData.hasPreviousPage}
                    />
                    --
                    <Label color='orange'>
                    {stores.metaData.pageNumber}/
                    {stores.metaData.pageCount}
                    </Label>
                     --
                    <Button
                      content="NEXT"
                      color='olive'
                      icon labelPosition="right"
                      icon='right arrow'
                      onClick={() =>
                        this.fetchStore(
                         this.state.stores.metaData.pageNumber + 1, this.state.size
                        )
                      }
                      disabled={!stores.metaData.hasNextPage}
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
