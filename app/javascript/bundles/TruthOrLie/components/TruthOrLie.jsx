import PropTypes from 'prop-types';
import Vote from './Vote';
import Result from './Result';
import Proposition from './Proposition';
import Countdown from './Countdown';
import React from 'react';
import WebSocketsService from '../services/WebSocketsService';

export default class TruthOrLie extends React.Component {
  static propTypes = {
    proposition: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      proposition: (this.props.proposition || "Please wait a moment...")
    };

    this.websockets = new WebSocketsService();
    this.setupWebsockets();
  }

  setupWebsockets = () => {
    this.websockets.subscribe(update => {
      if(update.type === 'restart'){
        this.updateProposition(update.proposition.truth_or_lie);
      } else if(update.type === 'reveal'){
        update.display = true
        this.updateResult(update);
        this.updateCountdown(update.next_reveal);
      };
    })
  }

  updateProposition = (proposition) => {
    this.setState({
      ...this.state,
      vote: null,
      result: null,
      proposition: proposition
    })
  }

  updateResult = (result) => {
    this.setState({
      ...this.state,
      result: result
    })
  }

  updateVote = (vote) => {
    this.setState({
      ...this.state,
      vote: vote
    })
  }

  updateCountdown = (next_reveal) => {
    if (next_reveal) {
      this.setState({
        ...this.state,
        next_reveal: next_reveal
      })
    }
  }

  render() {
    return (
      <div>
        <Proposition proposition={this.state.proposition} />
        <div className="fixedBottom container-fluid">
          <Vote onUpdate={this.updateVote} vote={this.state.vote} />
          <Countdown next_reveal={this.state.next_reveal} />
        </div>
        <Result onUpdate={this.updateResult} result={this.state.result} />
      </div>
    );
  }
}
