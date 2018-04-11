import React from 'react';
import ApiService from '../services/ApiService';

export default class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.api = new ApiService();
  }

  options = () => {
    return (
      <div className='row no-gutters vote'>
        <div className='col'>
          <label className='panel truth'>
            <span>TRUTH</span>
            <input type='button' onClick={this.submitVote} value='truth'/>
          </label>
        </div>
        <div className='col'>
          <label className='panel lie'>
            <span>LIE</span>
            <input type='button' onClick={this.submitVote} value='lie'/>
          </label>
        </div>
      </div>
    )
  }

  confirmation = () => {
    return (
      <div className='row no-gutters confirmation'>
        <div className='col'>
          <div className={ "panel " + this.props.vote }>
            <span>{ "You think it's " + this.formatVote() }</span>
          </div>
        </div>
      </div>
    )
  }

  formatVote = () => {
    if (this.props.vote === 'lie') {
      return 'a lie'
    } else {
      return 'true'
    }
  }

  submitVote = (event) => {
    this.api.vote(event.target.value).then(response => {
      this.props.onUpdate(response.vote)
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
