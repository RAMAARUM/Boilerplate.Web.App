// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
} from "semantic-ui-react";

export default class DeleteCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.deletedata.id,
        name: this.props.deletedata.name,
        address: this.props.deletedata.address,
        page:this.props.deletedatapage,
        complete: false,
        modalOpen: false
      };
    }

    

  successCallback = () => {
    this.setState({
      complete: true
    })};
  handleClose = () => this.setState({ modalOpen: false, complete: false }, ()=>this.props.loadcustpage(this.state.page,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });

  submitDeleteCustForm = () => {
    let Custdel = {
      Id: this.state.id,
      Name: this.state.name,
      address: this.state.address,
  }
  
  fetch("/Customers/DeleteCustomer", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Custdel)
  })
    .then(res => res.json())
    .then(function(body) {
      console.log(body)})
    .then(()=>{this.successCallback();}) 
 }

  render() {
    return(
      <Modal
        trigger={<Button onClick={this.handleOpen} icon='delete' color='red' content='DELETE'/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
      >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <p>
            Are you sure ?
          </p>
          : 
            <div className='modal-complete'>
              <p>Customer has been deleted successfuly.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='black'  onClick={this.handleClose}>Cancel</Button>
          <Button color='red'  negative icon='remove' labelPosition='right' content="Delete" onClick={this.submitDeleteCustForm} />
        </Modal.Actions>
        : null }
      </Modal>
    )
  }
}
  

