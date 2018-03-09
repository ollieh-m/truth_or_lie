import PropTypes from 'prop-types';
import Vote from './Vote';
import React from 'react';
import WebSocketsService from '../services/WebSocketsService';

export default class TruthOrLie extends React.Component {
  static propTypes = {
    proposition: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      proposition: this.props.proposition
    };

    this.websockets = new WebSocketsService();
    this.setupWebsockets();
  }

  setupWebsockets = () => {
    this.websockets.subscribe(update => {
      if(update.type === 'restart'){
        this.updateProposition(update.proposition.truth_or_lie)
      };
    })
  }

  // we want to hold statement, result, results, vote - to be updated through an API service (for refresh option) or websocket service
  // update state here by defining callbacks used in API service
  // the constructor needs to get the API service to subscribe to websockets straight away
  // use these three bits of state in three different subcomponents

  updateProposition = (proposition) => {
    this.setState({
      ...this.state,
      vote: null,
      proposition: proposition
    })
  }

  updateVote = (vote) => {
    this.setState({
      ...this.state,
      vote: vote
    })
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.proposition}!
        </h3>
        <Vote onUpdate={this.updateVote} vote={this.state.vote} />
      </div>
    );
  }
}
