import React from 'react';

export default class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  result = () => {
    if (this.props.result.result == 'truth') {
      return "It's true!"
    } else {
      return "It's false!"
    }
  }

  success = () => {
    if (this.props.result.success) {
      return "You're right..."
    } else {
      return "You got that wrong..."
    }
  }

  overall = () => {
    if (this.props.result.overall_results) {
      return this.props.overall_results
    }
  }

  hide = () => {
    this.props.result.display = false
    this.props.onUpdate(this.props.result)
  }

  render () {
    if (this.props.result && this.props.result.display) {
      return (
        <div>
          <div>
            { this.success() }
          </div>
          <div>
            { this.result() }
          </div>
          <div>
            { this.overall() }
          </div>
          <input type='button' onClick={this.hide} />
        </div>
      )
    } else {
      return null
    }
  }

}
