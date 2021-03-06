// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

export default class PutProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: props.editdata.pid,
        name: props.editdata.pname,
        price: props.editdata.price,
        page: props.editdatapage,
        nameError: false,
        priceError: false,
        formError: false,
        errorMessage: 'Please complete all required fields.',
        complete: false,
        modalOpen: false
      };
    }    

  successCallback = () => {
    this.setState({
      complete: true
    })
  };

  handleClose = () => this.setState({ modalOpen: false,
     complete: false,
     errorMessage:'Please complete all required fields.', 
     nameError: false, 
     priceError: false,
     formError: false,
     page: this.state.page
     }, 
      ()=> this.props.loadproductpage(this.state.page,this.props.size)
     );
  handleOpen = () => this.setState({ modalOpen: true });

  submitEditProductForm = () => {

    let nameerror = false;
    let priceerror = false;

    if (this.state.name === '') {alert ("Name cannot be empty, hence resetting to original"),
      this.setState({nameError: true,name: this.props.editdata.pname })
      nameerror = true
    } else {
      this.setState({nameError: false})
      nameerror = false
    }
    if (this.state.price === '') {alert ("Price cannot be empty, hence resetting to original"),
      this.setState({priceError: true, price: this.props.editdata.price })
      priceerror = true
    } else {
      this.setState({priceError: false})
      priceerror = false
    }

    if (nameerror || priceerror) {
      this.setState({formError: true})
      return
    } else {
      this.setState({formError: false})
    }


    let Productupdt = {
      pid: this.state.id,
      pname: this.state.name,
      Price: this.state.price,
  }
  
  fetch("/Products/EditProduct", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Productupdt)
  })
    .then(res => res.json())
    .then(function(body) {
      console.log(body)})
    .then(()=>{this.successCallback();}) 
} 

  render() {
    return(
      <Modal
        trigger={<Button  onClick={this.handleOpen} icon='edit' color='yellow' content='Edit'/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
      >
        <Modal.Header>Update Product</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <Modal.Description>
            <Form error={this.state.formError}>
                <Form.Field>
                  <Form.Input required={true} value={this.state.name}  onChange={(e) => this.setState({name: e.target.value})} label='Name' placeholder="Name..." error={this.state.nameError}/>
                </Form.Field>
              <Form.Field>
                <Form.Input required={true} value={this.state.price} onChange={(e) => this.setState({price: e.target.value})} label='Price' placeholder='0' error={this.state.priceError}/>
              </Form.Field>
            </Form>
          </Modal.Description>
          : 
            <div className='modal-complete'>
              <p>Product details have been updated successfully.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content="Update" onClick={this.submitEditProductForm} />
        </Modal.Actions>
        : null }
        {this.state.formError ? (
          <div>
            <p>
              {this.state.errorMessage}
            </p>
            </div>)
            : null}
      </Modal>
    )
}
} 

