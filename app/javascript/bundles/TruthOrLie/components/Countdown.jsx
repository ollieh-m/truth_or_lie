import React from 'react';

export default class Countdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds
    }

    this.countDownSeconds();
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.countdown);

    this.setState({
      seconds: nextProps.seconds
    })

    this.countDownSeconds();
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
        <div className='container-fluid proposition'>
          <div className='row'>
            <div className='col'>
              { "Revealing the truth in " + this.state.seconds + " seconds" }
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

}
