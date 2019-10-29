import React from 'react'

class Rest extends React.Component {

  newDay = () => {
    
  }

  render(){


    return(
      <span style={{padding: '1em'}}>
        <button onClick={this.newDay}>Would You Like to Rest?</button>
      </span>
    )
  }
}

export default Rest
