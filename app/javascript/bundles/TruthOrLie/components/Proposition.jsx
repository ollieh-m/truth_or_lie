import React from 'react';
import drazFaceShut from 'assets/images/draz.png';
import drazFaceOpen from 'assets/images/draz_open_mouth.png';

export default class Proposition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      face: drazFaceShut
    }

    this.animateFace();
  }

  render () {
    return (
      <div className='container-fluid proposition'>
        <div className='row'>
          <div className='col-sm-4 speech'>
            <div className='wrapper'>
              <div className='content'>{ this.props.proposition }</div>
            </div>
          </div>
          <div className='col-sm-8'>
            <img src={this.state.face} />
          </div>
        </div>
      </div>
    )
  }

  animateFace = () => {
    setInterval( () => {
      if (this.state.face == drazFaceShut) {
        this.setState({face: drazFaceOpen})
      } else {
        this.setState({face: drazFaceShut})
      }
    }, 500);
  }

}
