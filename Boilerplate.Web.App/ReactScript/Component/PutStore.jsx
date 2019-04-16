// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form
} from "semantic-ui-react";

export default class PutStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.editdata.sid,
        name: this.props.editdata.sname,
        address: this.props.editdata.saddress,
        page: this.props.editdatapage,
        nameError: false,
        addressError: false,
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

  handleClose = () => this.setState(
    { modalOpen: false, 
      complete: false, 
      nameError: false,
      addressError: false,      
      formError: false, 
      errorMessage: 'Please complete all required fields.' }, 
      ()=>this.props.loadstorepage(this.state.page,this.props.size));
      
  handleOpen = () => this.setState({ modalOpen: true });

  submitEditStoreForm = () => {

    let nameerror = false;
    let addresserror = false;

    if (this.state.name === '') { alert ("Name cannot be empty, hence resetting to original"),
      this.setState({nameError: true,  name: this.props.editdata.sname })
      nameerror = true
    } else {
      this.setState({nameError: false})
      nameerror = false
    }
    if (this.state.address === '') {alert ("Address cannot be empty, hence resetting to original"),
      this.setState({addressError: true, address: this.props.editdata.saddress})
      addresserror = true
    } else {
      this.setState({addressError: false})
      addresserror = false
    }

    if (nameerror || addresserror) {
      this.setState({formError: true})
      return
    } else {
      this.setState({formError: false})
    }


    let Storeupdt = {
      sid: this.state.id,
      sname: this.state.name,
      saddress: this.state.address,
  }
  
  fetch("/Stores/EditStore", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Storeupdt)
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
        <Modal.Header>Update Store</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <Modal.Description>
            <Form error={this.state.formError}>
                <Form.Field>
                  <Form.Input required={true} value={this.state.name}  onChange={(e) => this.setState({name: e.target.value})} label='Name' placeholder="Name..." error={this.state.nameError}/>
                </Form.Field>
              <Form.Field>
                <Form.Input required={true} value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} label='Address' placeholder='City, State/Province, Country...' error={this.state.addressError}/>
              </Form.Field>
            </Form>
          </Modal.Description>
          : 
            <div className='modal-complete'>
              <p>Store details have been updated successfully.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content="Update" onClick={this.submitEditStoreForm} />
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

