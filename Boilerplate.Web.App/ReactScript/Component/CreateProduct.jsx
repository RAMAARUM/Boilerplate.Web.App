// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0.0,
      nameError: false,
      priceError: false,
      formError: false,
      errorMessage: "Please complete all required fields.",
      complete: false,
      modalOpen: false
    };
  }

 
  handleClose = () => this.setState({ modalOpen: false, complete: false, errorMessage:" ", name:"", price:0.0,nameError: false, priceError: false,formError: false}, ()=>this.props.loadproductpage(1,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });
  successCallback = () => {
    this.setState({
      complete: true
    });    
  };

  submitCreateProductForm = () => {
    let nerror = false;
    let perror = false;

    if (this.state.name === "") {
      this.setState({ nameError: true });
      nerror = true;
    } else {
      this.setState({ nameError: false });
      nerror = false;
    }
    if (this.state.price === 0.0) {
      this.setState({ priceError: true });
      perror = true;
    } else {
      this.setState({ priceError: false });
      perror = false;
    }

    if (nerror || perror)
    {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }

    let Productdata = {
      pname: this.state.name,
      price: this.state.price
    };  

    fetch("/Products/CreateProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Productdata)
    }).then(res => res.json()).then((body) => {
        console.log(body);
      }).then(()=>{this.successCallback();})    
  }

  render() {
    return (
      <div>
      <Modal
        trigger={
          <Button onClick={this.handleOpen}  color="blue">
            New Product
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
      >
        <Modal.Header>Add a new Product</Modal.Header>
        <Modal.Content>
          {!this.state.complete ? (
            <Modal.Description>
              <Form error={this.state.formError}>                
                  <Form.Field>
                    <Form.Input
                      required={true}
                      onChange={e => this.setState({ name: e.target.value })}
                      label="Name"
                      placeholder="Name..."
                     error={this.state.nameError}
                     //error={this.state.nameError ? (<div> <p> Name should not be blank </p></div>) : null }
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      required={true}
                      onChange={e => this.setState({ price: e.target.value })}
                      label="Price"
                      error={this.state.priceError}
                    />
                  </Form.Field>
              
              </Form>
            </Modal.Description>
          ) : (
            <div>
              <p>
              Product has been created successfully
              </p>
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
              content="Create"
              onClick={() => this.submitCreateProductForm()}
            />
          </Modal.Actions>
        ) : null}
        {this.state.formError ? (
          <div>
            <p>
              {this.state.errorMessage}
            </p>
            </div>)
            : null}
        </Modal>
        
        </div>
    );
  }
}
