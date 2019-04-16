// ./src/common/main.component.jsx
import React, { Component } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

export default class PutSales extends Component {
  constructor(props) {
     super(props);
    this.state = {
      salesid:props.editdata.id,
      customer: props.editdata.customerId,
      store: props.editdata.storeId,
      product: props.editdata.productId,
      date: props.editdata.dateSold,
      customerError: false,
      storeError: false,
      productError: false,
      dateError: false,      
      formError: false,
      errorMessage: "Please complete all required fields.",
      complete: false,
      modalOpen: false,
      error: null,
      isLoaded: false,
      salesdata: []
    };
  }

  handleClose = () =>
    this.setState(
      {
        modalOpen: false,
        complete: false,
        errorMessage: "Please complete all required fields.",
        customerError: false,
        storeError: false,
        productError: false,
        dateError: false,
        formError: false
      },
      () => this.props.loadsalespage(1, this.props.size)
    );
  handleOpen = () =>
    this.setState({ modalOpen: true }, () => this.getSalesDetails());
  successCallback = () => {
    this.setState({
      complete: true
    });
  };

  submitEditSaleForm = () => {
    let cerror = false;
    let serror = false;
    let perror = false;
    let derror = false;

    if (this.state.customer === "") {
      this.setState({ customerError: true });
      cerror = true;    
    } else {
      this.setState({ customerError: false });
      cerror = false;
    }
    if (this.state.store === "") {
      this.setState({ storeError: true });
      serror = true;
    } else {
      this.setState({ storeError: false });
      serror = false;
    }
    if (this.state.product === "") {
      this.setState({ productError: true });
      perror = true;
    } else {
      this.setState({ productError: false });
      perror = false;
    }
    if (this.state.date === "") { alert("Date cannot be empty, hence resetting to original")
      this.setState({ dateError: true,date: this.props.editdata.dateSold });
      derror = true;
    } else {
      this.setState({ dateError: false });
      derror = false;
    }

    if (cerror || serror || perror || derror) {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }

    let EditSaledata = {
      Id:this.state.salesid,
      CustomerId: this.state.customer,
      StoreId: this.state.store,
      ProductId:this.state.product,
      DateSold:this.state.date
    };

    fetch("/ProductSolds/EditSale", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(EditSaledata)
    })
      .then(res => res.json())
      .then(body => {
        console.log(body);
      })
      .then(() => {
        this.successCallback();
      });
  };

  getSalesDetails = () => {
    fetch("/ProductSolds/GetDropdownJson")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            salesdata: result
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
    return (
      <div>
        <Modal
          trigger={
            <Button onClick={this.handleOpen} color="blue">
              Edit Sale
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon={true}
        >
          <Modal.Header>Edit a Sale</Modal.Header>
          <Modal.Content>
            {!this.state.complete ? (
              <Modal.Description>
                <Form error={this.state.formError}>
                  <Form.Field>
                    <Form.Input
                      value={this.state.date}
                      onChange={e => this.setState({ date: e.target.value })}
                      label="DateSold"
                      placeholder="Date"
                      type="date"
                    />
                  </Form.Field>
                  <Form.Select
                    fluid
                    label="Customer"                  
                    search
                    selection
                    value={this.state.customer}
                    options={this.state.salesdata.customer}
                    placeholder="Customer"
                    onChange={(e, {value}) =>{           
                      this.setState({ customer: value })}}
                  />
                  <Form.Select
                    fluid
                    label="Store"
                    search
                    selection
                    value={this.state.store}
                    options={this.state.salesdata.store}
                    placeholder="Store"
                    onChange={(e, {value}) =>{       
                      this.setState({ store: value })}}

                  />
                  <Form.Select
                    fluid
                    label="Product"
                    search
                    selection
                    value={this.state.product}
                    options={this.state.salesdata.product}
                    placeholder="Product"
                    onChange={(e, {value}) =>{ 
                      this.setState({ product: value })}}

                  />
                </Form>
              </Modal.Description>
            ) : (
              <div>
                <p>Sales has been updated successfully</p>
              </div>
            )}
          </Modal.Content>
          {!this.state.complete ? (
            <Modal.Actions>
              <Button color="black" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Update"
                onClick={() => this.submitEditSaleForm()}
              />
            </Modal.Actions>
          ) : null}
          {this.state.formError ? (
            <div>
              <p>{this.state.errorMessage}</p>
            </div>
          ) : null}
        </Modal>
      </div>
    );
  }
}
