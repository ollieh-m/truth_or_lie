import React from 'react';
import drazFace from 'assets/images/draz.png';

export default class Proposition extends React.Component {

  constructor(props) {
    super(props);
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
          <div className='col-sm-8'><img src={drazFace} /></div>
        </div>
      </div>
    )
  }

}
