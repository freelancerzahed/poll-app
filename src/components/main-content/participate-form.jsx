import React, { Component } from 'react';
import { Button, CustomInput, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'

class ParticipateForm extends Component {

    state = {
        name: '',
        selectedOption: '',
        errors: {}
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        const { errors, isValide } = this.validte();
        if (isValide) {
            this.props.getOpinion({
                pollId: this.props.poll.id,
                name: this.state.name,
                selectedOption: this.state.selectedOption
            })
            event.target.reset()
            this.setState({
                name: '',
                selectedOption: '',
                errors: {}
            })
        } else {

            this.setState({ errors })
        }
    }

    validte = () => {

        const errors = {}
        if (!this.state.name) {
            errors.name = 'Please provide a name'
        } else if (this.state.name.length > 20) {
            errors.name = 'name is too long'
        }
        if (!this.state.selectedOption) {
            errors.selectedOption = 'please select a option'
        }
        return {
            errors,
            isValide: Object.keys(errors).length == 0
        }
    }
    render() {

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div className='d-flex'>
                        <h4>Options</h4>
                        <Button
                            color='warning'
                            type='button'
                            className='ml-auto'
                            onClick={this.props.toggleModal}
                        >
                            Edit
                        </Button>
                        <Button
                            type='button'
                            className='ml-auto'
                            onClick={() => this.props.deletePoll(this.props.poll.id)}
                        >
                            Delete
                        </Button>
                    </div>
                    {
                        this.props.poll.options.map(opt => (
                            <FormGroup className='my-2' key={opt.id}>
                                <Label className='d-flex'>
                                    <CustomInput
                                        type='radio'
                                        id={opt.id}
                                        name='selectedOption'
                                        value={opt.id}
                                        onChange={this.handleChange}
                                        invalid={this.state.errors.selectedOption ? true : false}
                                    />
                                    {opt.value}
                                    <span
                                        style={{
                                            padding: '5px 10px',
                                            background: 'green',
                                            borderRadius: '5px',
                                            color: 'white'
                                        }}
                                        className='ml-auto'
                                    >
                                        {opt.vote}
                                    </span>
                                    <span>
                                        {
                                            this.props.poll.totalVote > 0 ? (
                                                (100 * opt.vote) / this.props.poll.totalVote
                                            ).toFixed(2) : 0
                                        }
                                        %
                                    </span>
                                </Label>


                            </FormGroup>

                        )

                        )

                    }
                    <FormGroup>
                        <Label>
                            <h3>Enter your Nmae</h3>
                        </Label>
                        <Input
                            name='name'
                            placeholder='md zahed'
                            value={this.state.name}
                            onChange={this.handleChange}
                            invalid={this.state.errors.name ? true : false}
                        />
                        {this.state.errors.name && <FormFeedback>{this.state.errors.name}</FormFeedback>}
                    </FormGroup>
                    <Button
                        type='submit'

                    >
                        Submit your opinion
                    </Button>
                </Form>
            </div>
        );
    }
}

export default ParticipateForm;
