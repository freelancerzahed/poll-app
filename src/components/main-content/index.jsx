import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import PollForm from '../poll-form';
import Opiniouns from './opiniouns';
import ParticipateForm from './participate-form';

class MainContent extends Component {
    state = {
        openModal: false,

    }

    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }
    render() {
        const { poll, getOpinion, updatePoll, deletePoll,findOpinioun,filterOpiniouns } = this.props
       if( Object.keys(poll).length==0){
return(
    <h1>There is no poll</h1>
)
       }
        return (
            <div>
                <h1>{poll.title}</h1>
                <p>{poll.description}</p>
               
               
                <br />
                <ParticipateForm
                    poll={poll}
                    getOpinion={getOpinion}
                    toggleModal={this.toggleModal}
                    deletePoll={deletePoll}


                /> 
                <Opiniouns
                
                poll = {poll}
                findOpinioun = {findOpinioun}
                filterOpiniouns = {filterOpiniouns}
                toggleModal={this.toggleModal}
                />
                {/* poll update modal */}
                <Modal  
                isOpen={this.state.openModal}
                toggle={this.toggleModal}
                unmountOnClose = {true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                        poll = {poll}
                        submit = {updatePoll}
                        isUpdate = {true}
                        buttonValue = 'Update Poll'
                        />
                        </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default MainContent;
