import React from 'react';
import drazFace from 'assets/images/draz.jpg';

export default class Proposition extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div>
          <div>{ this.props.proposition }</div>
        </div>
        <div className='face'>
          <img src={drazFace} />

        </div>
      </div>
    )
  }

}
