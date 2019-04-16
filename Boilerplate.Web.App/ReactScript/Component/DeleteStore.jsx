// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
} from "semantic-ui-react";

export default class DeleteSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.deletedata.sid,
        name: this.props.deletedata.sname,
        address: this.props.deletedata.saddress,
        page:this.props.deletedatapage,
        complete: false,
        modalOpen: false
      };
    }

    

  successCallback = () => {
    this.setState({
      complete: true
    })};
  handleClose = () => this.setState({ modalOpen: false, complete: false}, ()=>this.props.loadstorepage(this.state.page,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });

  submitDeleteStoreForm = () => {
    let Storedel = {
      sid: this.state.id,
      sname: this.state.name,
      saddress: this.state.address,
  }
  
  fetch("/Stores/DeleteStore", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Storedel)
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
        <Modal.Header>Delete Store</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <p>
            Are you sure ?
          </p>
          : 
            <div className='modal-complete'>
              <p>Store has been deleted successfuly.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='black'  onClick={this.handleClose}>Cancel</Button>
          <Button color='red'  negative icon='remove' labelPosition='right' content="Delete" onClick={this.submitDeleteStoreForm} />
        </Modal.Actions>
        : null }
      </Modal>
    )
  }
}
  

