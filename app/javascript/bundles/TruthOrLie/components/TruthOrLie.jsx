import PropTypes from 'prop-types';
import Vote from './Vote';
import Result from './Result';
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
        this.updateProposition(update.proposition.truth_or_lie);
      } else if(update.type === 'reveal'){
        update.display = true
        this.updateResult(update);
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

  render() {
    return (
      <div>
        <h3>
          {this.state.proposition}!
        </h3>
        <Vote onUpdate={this.updateVote} vote={this.state.vote} />
        <Result onUpdate={this.updateResult} result={this.state.result} />
      </div>
    );
  }
}
