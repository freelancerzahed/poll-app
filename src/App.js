import logo from './logo.svg';
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'reactstrap';
import MainContent from './components/main-content';
import Sidebar from './components/sidebar';
import demipoll from './components/data/polls';
import shortid from 'shortid'

class App extends React.Component {
  state = {
    polls: [],
    searchTerm: '',
    selectedPoll: {},
    filterOpiniouns: []
  }
  componentDidMount() {
    this.setState({
      polls: demipoll
    })
  }

  addNewPoll = poll => {
    poll.id = shortid.generate();
    poll.createdat = new Date();
    poll.totalVote = 0;
    poll.opinions = []
    this.setState({
      polls: this.state.polls.concat(poll)
    })
  }
  updatePoll = updatedPoll => {
    const polls = [...this.state.polls]
    const poll = polls.find(p => p.id == updatedPoll.id)
    poll.title = updatedPoll.title;
    poll.description = updatedPoll.description;
    poll.opinions = updatedPoll.opinions;
  }
  deletePoll = pollId => {
    const polls = this.state.polls.filter(p => p.id !== pollId);
    this.setState({ polls, selectedPoll: {} });
  }
  selectPoll = pollId => {
    const poll = this.state.polls.find(p => p.id == pollId)
    this.setState({ selectedPoll: poll })
  }
  handleSearch = (value) => {
this.setState({
  searchTerm:value
})
  }
  performSearch = () => {
    return this.state.polls.filter(poll => poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
}
  getOpinion = (response) => {
    const { polls } = this.state;
    const poll = polls.find(p => p.id == response.pollId)
    const option = poll.options.find(opt => opt.id == response.selectedOption)
    poll.totalVote++;
    option.vote++;
    const opinion = {
      id: shortid.generate(),
      name: response.name,
      selectedOption: response.selectedOption,

    }
    poll.opiniouns.push(opinion)
    this.setState({ polls })
  }
  findOpinioun = (optionId,poll)=>{

  const findOpiniounsName = poll.opiniouns.filter(opinioun=>opinioun.selectedOption==optionId)
  this.setState({
    filterOpiniouns:findOpiniounsName
  })
  }
  render() {
    const polls = this.performSearch()
    const {filterOpiniouns} = this.state
    return (
      <div>
        <Container className='my-5'>
          <Row>
            <Col md={4}>
              <Sidebar
            
                polls={polls}
                searchTerm={this.state.searchTerm}
                handleSearch={this.handleSearch}
                selectPoll={this.selectPoll}
                addNewPoll={this.addNewPoll}
              />
            </Col>
            <Col md={8}>
              <MainContent
                poll={this.state.selectedPoll}
                updatePoll={this.updatePoll}
                getOpinion={this.getOpinion}
                deletePoll={this.deletePoll}
                findOpinioun ={this.findOpinioun}
                filterOpiniouns ={filterOpiniouns}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
