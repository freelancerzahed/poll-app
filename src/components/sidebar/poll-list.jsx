import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const PollList = (props) => {
    if (props.polls.length == 0) {
        return <h1>There is no poll</h1>
    }
    return (
        <div>
            <ListGroup>
                {props.polls.map(poll => (
                    <ListGroupItem
                    key={poll.id}
                    onClick={() => props.selectPoll(poll.id)}
                    style = {{cursor:'pointer'}}
                    >
                     {
                        poll.title.length>30? poll.title.substr(0,30)+'...' :poll.title
                     }
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default PollList;
