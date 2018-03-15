import React from 'react';

export default class Proposition extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>{ this.props.proposition }</div>
        </div>
      </div>
    )
  }

}
