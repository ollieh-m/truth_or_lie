import React from 'react';
var moment = require('moment');

export default class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {seconds: null}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.next_reveal !== this.props.next_reveal) {
      clearInterval(this.countdown);

      var secondsToNextReveal = Math.round(moment.utc(nextProps.next_reveal).diff(moment.utc()) / 1000)
      this.setState({
        seconds: secondsToNextReveal
      })

      this.countDownSeconds();
    }
  }

  countDownSeconds = () => {
    this.countdown = setInterval(this.changeSeconds, 1000)
  }

  changeSeconds = () => {
    if (this.state.seconds == 0 || this.state.seconds == null) {
      clearInterval(this.countdown)
    } else {
      this.setState((state) => ({seconds : state.seconds - 1}) )
    }
  }

  render () {
    if (this.state.seconds) {
      return (
        <div className='row countdown'>
          <div className='col'>
            <span>{ "Revealing the truth in " + this.state.seconds + " seconds" }</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className='row countdown'>
          <div className='col'>
            <span>{ "Revealing the truth soon!" }</span>
          </div>
        </div>
      )
    }
  }

}
