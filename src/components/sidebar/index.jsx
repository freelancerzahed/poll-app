import React, { Component } from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import PollForm from '../poll-form';
import PollList from './poll-list';

class Sidebar extends Component {
    state = {
        openModal:false,
    }
    toggleModal = () => {
this.setState({openModal:!this.state.openModal})
    }
    
    render() {
        return (
            <div>
                <h1>This is Sidebar</h1>
                <div className="d-flex mb-3">
                    <Input
                        type='search'
                        placeholder='Search'
                        value={this.props.searchTerm}
                        onChange={(e) => this.props.handleSearch(e.target.value)}
                    />
                    <Button
                        color='success'
                        className='ml-2'
                        onClick={this.toggleModal}
                        style={{ cursor: 'pointer' }}

                    >
                        New
                 </Button>

                </div>

                <hr>
                </hr>
                <PollList
                    polls={this.props.polls}
                    selectPoll={this.props.selectPoll}

                />
                    
      <Modal  toggle={this.toggleModal} isOpen ={this.state.openModal} unmountOnClose={true}>
        <ModalHeader toggle={this.toggleModal}>Add new Poll</ModalHeader>
        <ModalBody>
         <PollForm
         submit = {this.props.addNewPoll}
         />
        </ModalBody>
       
      </Modal>


            </div>
        );
    }
}

export default Sidebar;
