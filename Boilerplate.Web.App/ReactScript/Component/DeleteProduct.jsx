// ./src/common/main.component.jsx
import React, { Component } from "react";
import {
  Modal,
  Button,
} from "semantic-ui-react";

export default class DeleteProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.deletedata.pid,
        name: this.props.deletedata.pname,
        price: this.props.deletedata.price,
        page:this.props.deletedatapage,
        complete: false,
        modalOpen: false
      };
    }

    

  successCallback = () => {
    this.setState({
      complete: true
    })};
  handleClose = () => this.setState({ modalOpen: false, complete: false, id: this.props.deletedata.pid, name: this.props.deletedata.pname, price: this.props.deletedata.price, page:this.props.deletedatapage }, ()=>this.props.loadproductpage(this.state.page,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });

  submitDeleteProductForm = () => {
    let Productdel = {
      pid: this.state.id,
      pname: this.state.name,
      price: this.state.price,
  }
  
  fetch("/Products/DeleteProduct", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Productdel)
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
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <p>
            Are you sure ?
          </p>
          : 
            <div className='modal-complete'>
              <p>Product has been deleted successfuly.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='black'  onClick={this.handleClose}>Cancel</Button>
          <Button color='red'  negative icon='remove' labelPosition='right' content="Delete" onClick={this.submitDeleteProductForm} />
        </Modal.Actions>
        : null }
      </Modal>
    )
  }
}
  

