import React from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
const FormJsx = ({
    handleSubmit,
    title,
    handleChange,
    errors,
    description,
    handleOptionsChange,
    createOption,
    deleteOption,
    buttonValue,
    options

}) => {

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input
                        name='title'
                        id='title'
                        value={title}
                        placeholder='Title'
                        onChange={handleChange}
                        invalid={errors.title ? true : false}
                    />
                    {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for='description'>Title</Label>
                    <Input
                        type='textarea'
                        name='description'
                        id='description'
                        value={description}
                        placeholder='Description'
                        onChange={handleChange}
                        invalid={errors.description ? true : false}
                    />
                    {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label>
                        Enter Options
                       <span
                            style={{
                                padding: '10px',
                                marginLeft: '30px',
                                background: 'green',
                                borderRadius: '5px',
                                color: '#fff',
                                cursor: 'pointer'


                            }}
                            onClick={createOption}
                        >
                            Add Option
                       </span>
                    </Label>
                    {
                        options.map((opt, index) => (
                            <div className='d-flex, my-2' key={opt.id}>
                                <Input
                                    value={opt.value}
                                    onChange={(e) => handleOptionsChange(e, index)}
                                    invalid={
                                        errors.options && errors.options[index] ? true : false
                                    }
                                />
                                <Button
                                    color='danger'
                                   
                                    className='my-3'
                                    onClick={() => deleteOption(index)}
                                    disabled = {options.length<=2}
                                >
                                    Delete{}

                                    </Button>
                            </div>
                        ))
                    }
                </FormGroup>
                <Button color='success'  type='submit'>
                    {buttonValue}
                </Button>
            </Form>
        </div>
    );
}

export default FormJsx;
