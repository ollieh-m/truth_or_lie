import React from 'react';

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
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              { "Revealing the truth in " + this.state.seconds + " seconds" }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              { "Revealing the truth soon!" }
            </div>
          </div>
        </div>
      )
    }
  }

}
