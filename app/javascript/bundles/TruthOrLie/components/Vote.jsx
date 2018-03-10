import React from 'react';
import ApiService from '../services/ApiService';

export default class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.api = new ApiService();
  }

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
    this.api.vote(event.target.value).then(response => {
      this.props.onUpdate(event.target.value)
    }).catch(error => {
      // call a callback to update parent state with error
      console.log('error', error)
    })
  }

  render () {
    if (this.props.vote !== 'truth' && this.props.vote !== 'lie') {
      return this.options()
    } else {
      return this.confirmation()
    }
  }

}
