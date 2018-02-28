import PropTypes from 'prop-types';
import Vote from './Vote';
import React from 'react';

export default class TruthOrLie extends React.Component {
  static propTypes = {
    statement: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
    this.state = {
      statement: this.props.statement
    };
  }

  // we want to hold statement, result, results, vote - to be updated through an API service (for refresh option) or websocket service
  // update state here by defining callbacks used in API service
  // the constructor needs to get the API service to subscribe to websockets straight away
  // use these three bits of state in three different subcomponents

  // 1. component for submitting truth or lie. needs to call API service to submit request. needs to update stored vote when vote is registered.

  // updateStatement = (statement) => {
  //   this.setState({ statement: statement });
  // };

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
          {this.state.statement}!
        </h3>
        <Vote onUpdate={this.updateVote} vote={this.state.vote} />
      </div>
    );
  }
}
