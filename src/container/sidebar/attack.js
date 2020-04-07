import React from 'react'

const Attack = props => {

  let {name, action, special} = props.content


  return (
    <section style={{padding: '2%'}}>
      <ul style={{listStyleType: 'none', paddingLeft: '0', margin: '1%'}}>
        <li>{name}</li>
        <li><u>Details</u>: {special}</li>
      </ul>
    </section>
  )
}

export default (Attack)
