import React, { Component } from 'react'
import shortid from 'shortid';
import FormJsx from './poll-form'
const defaultOption = [

    { id: shortid.generate(), value: '', vote: 0 },
    { id: shortid.generate(), value: '', vote: 0 },

]

class PollForm extends Component {
    state = {
        title: '',
        description: '',
        options: defaultOption,
        errors: {}
    }
    componentDidMount() {
        const { poll } = this.props;
        if (poll && Object.keys(poll).length > 0) {
            this.setState({
                title: poll.title,
                description: poll.description,
                options: poll.options
            })
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleOptionsChange = (event, index) => {
        const options = [...this.state.options]
        options[index].value = event.target.value
        this.setState({ options })
    }
    createOption = () => {
        const { options } = this.state
        if (options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            })
            this.setState(
                {
                    options
                }
            )
        } else {
            alert(`you can max 5 options`)
        }
    }
    deleteOption = index => {
        const { options } = this.state;
        if (options.length > 2) {
            options.splice(index, 1);
            this.setState({ options });
        }

    }

    handleSubmit = event => {
       
        event.preventDefault()
        const { isValid, errors } = this.validate()
        if (isValid) {
            const { title, description, options } = this.state;
            const poll = {
                title, description, options
            }
            if (this.props.isUpdate) {
                poll.id = this.props.poll.id;
                this.props.submit(poll)
              

            }else{
                this.props.submit(poll)
                event.target.reset();
                this.setState({
                    title: '',
                    description: '',
                    options: defaultOption,
                    errors: {}
                })
              
            }
           
        } else {
            this.setState({ errors })
        }
       
    }
    validate = () => {
        const errors = {}
        const { title, description, options } = this.state;
        if (!title) {
            errors.title = 'Please provite a title !';
        } else if (title.length < 20) {
            errors.title = "Title is so short"
        } else if (title.length > 100) {
            errors.title = 'Title is too long'
        }
        if (!description) {
            errors.description = 'Please provite a description !';
        } else if (description.length < 100) {
            errors.description = 'Description is so short'
        } else if (description.length > 1000) {
            errors.description = "description is too long"
        }
        const optionErrors = [];
        options.forEach((opt, index) => {
            if (!opt.value) {
                optionErrors[index] = 'Option text empty'
            } else if (opt.length > 100) {
                optionErrors[index] = 'Option text is too long'
            }
        })
        if (optionErrors.length > 0) {
            errors.options = optionErrors
        }
        return { errors, isValid: Object.keys(errors).length == 0 }
    }
    render() {
        const { title, description, options, errors } = this.state
        return (
            <div>
                <FormJsx
                    title={title}
                    description={description}
                    options={options}
                    errors={errors}
                    handleChange={this.handleChange}
                    handleOptionsChange={this.handleOptionsChange}
                    createOption={this.createOption}
                    buttonValue={this.props.buttonValue || 'Create New Poll'}
                    deleteOption={this.deleteOption}
                    handleSubmit={this.handleSubmit}

                />
            </div>
        )
    }
}
export default PollForm