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
      return this.props.result.overall_results
    }
  }

  hide = () => {
    this.props.result.display = false
    this.props.onUpdate(this.props.result)
  }

  render () {
    if (this.props.result && this.props.result.display) {
      return (
        <div className="result">
          <div className="modal-backdrop"></div>
          <div className="modal-wrapper">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{ this.success() }</h5>
                  <button type="button" className="close">
                    <span aria-hidden="true">&times;</span>
                    <input type='button' onClick={this.hide}/>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    { this.result() }
                  </div>
                </div>
                <div className="modal-footer">
                  { this.overall() }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

}
