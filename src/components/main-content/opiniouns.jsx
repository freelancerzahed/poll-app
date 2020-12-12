import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const Opiniouns = (props) => {


    return (
        <div>

            {
                props.poll.options.map(option => (
                    <Button className='my-3 ml-3' color='success'
                        onClick={() => props.findOpinioun(option.id, props.poll)}
                    >
                        {option.value}

                    </Button>
                ))

            }

            {props.filterOpiniouns.length > 0 ? (
                <ListGroup>
                    {props.filterOpiniouns.map(opinion => (
                        <ListGroupItem>
                            {opinion.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            ) : ''}

        </div>
    );
}

export default Opiniouns;