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
        salesid:props.deletedata.id,
        customer: props.deletedata.customerId,
        store: props.deletedata.storeId,
        product: props.deletedata.productId,
        date: props.deletedata.dateSold,
        page:this.props.deletedatapage,
        complete: false,
        modalOpen: false
      };
    }

    

  successCallback = () => {
    this.setState({
      complete: true
    })};
  handleClose = () => this.setState({ modalOpen: false, complete: false}, ()=>this.props.loadsalespage(this.state.page,this.props.size));
  handleOpen = () => this.setState({ modalOpen: true });

  submitDeleteSaleForm = () => {  
      let EditSaledata = {
        Id:this.state.salesid,
        CustomerId: this.state.customer,
        StoreId: this.state.store,
        ProductId:this.state.product,
        DateSold:this.state.date
      };
  
      let DelSaledata = {
        Id:this.state.salesid,
        CustomerId: this.state.customer,
        StoreId: this.state.store,
        ProductId:this.state.product,
        DateSold:this.state.date}

  
  fetch("/ProductSolds/DeleteSale", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body: JSON.stringify(DelSaledata)
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
        <Modal.Header>Delete Sale</Modal.Header>
        <Modal.Content>
          {!this.state.complete ?
          <p>
            Are you sure ?
          </p>
          : 
            <div className='modal-complete'>
              <p>Sale has been deleted successfuly.</p>
            </div>
          }
        </Modal.Content>
        {!this.state.complete ?
        <Modal.Actions>
          <Button color='black'  onClick={this.handleClose}>Cancel</Button>
          <Button color='red'  negative icon='remove' labelPosition='right' content="Delete" onClick={this.submitDeleteSaleForm} />
        </Modal.Actions>
        : null }
      </Modal>
    )
  }
}
  

