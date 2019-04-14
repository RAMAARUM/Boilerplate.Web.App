// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

export default class CreateCust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      nameError: false,
      addressError: false,
      formError: false,
      errorMessage: "Please complete all required fields.",
      complete: false,
      modalOpen: false
    };
  }

 
  handleClose = () => this.setState({ modalOpen: false, complete: false, errorMessage:" ", name:"", address:"",nameError: false, addressError: false,formError: false}, ()=>this.props.loadcustpage(1,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });
  successCallback = () => {
    this.setState({
      complete: true
    });    
  };

  submitCreateCustForm = () => {
    let nerror = false;
    let aerror = false;

    if (this.state.name === "") {
      this.setState({ nameError: true });
      nerror = true;
      alert("name:"+ nerror);
    } else {
      this.setState({ nameError: false });
      nerror = false;
    }
    if (this.state.address === "") {
      this.setState({ addressError: true });
      aerror = true;
      alert("address:"+ aerror);
    } else {
      this.setState({ addressError: false });
      aerror = false;
    }

    if (nerror || aerror)
    {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }

    let Custdata = {
      name: this.state.name,
      address: this.state.address
    };  

    fetch("/Customers/CreateCustomer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Custdata)
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
            New Customer
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
      >
        <Modal.Header>Add a new Customer</Modal.Header>
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
                      onChange={e => this.setState({ address: e.target.value })}
                      label="Address"
                      placeholder="City, State/Province, Country..."
                      error={this.state.addressError}
                    />
                  </Form.Field>
              
              </Form>
            </Modal.Description>
          ) : (
            <div>
              <p>
                Customer has been created successfully
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
              onClick={() => this.submitCreateCustForm()}
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
