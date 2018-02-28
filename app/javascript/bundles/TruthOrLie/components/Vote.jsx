import React from 'react';

export default class Vote extends React.Component {

  options = () => {
    return (
      <div>
        <div>
          <label>TRUTH</label>
          <input type='button' onClick={this.submitVote} value='truth'/>
        </div>
        <div>
          <label>LIE</label>
          <input type='button' onClick={this.submitVote} value='lie'/>
        </div>
      </div>
    )
  }

  confirmation = () => {
    return (
      <div>
        You think it's {this.props.vote}
      </div>
    )
  }

  submitVote = (event) => {
    // invoke API service to submit vote and call props.onUpdate when the vote has been submitted
    // to update the internal state
    this.props.onUpdate(event.target.value)
  }

  render () {
    if (this.props.vote !== 'truth' && this.props.vote !== 'lie') {
      return this.options()
    } else {
      return this.confirmation()
    }
  }

}
