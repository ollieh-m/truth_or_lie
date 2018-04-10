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
    this.setState({
      seconds: nextProps.seconds
    })
  }

  countDownSeconds = () => {
    this.countdown = setInterval(this.changeSeconds, 1000)
  }

  changeSeconds = () => {
    if (this.state.seconds == 0) {
      clearInterval(this.countdown)
    } else {
      this.setState((state) => ({seconds : state.seconds - 1}) )
    }
  }

  render () {
    return (
      <div className='container-fluid proposition'>
        <div className='row'>
          <div className='col'>
            { "Revealing the truth in " + this.state.seconds + " seconds" }
          </div>
        </div>
      </div>
    )
  }

}
