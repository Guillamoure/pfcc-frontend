import React from 'react'

class FeatureOptions extends React.Component {

  renderOptions = () => {
    return this.props.options.map(kfo => {
      return (
        <ul style={{margin: '1em', listStyleType: 'none', marginBottom: '1.5em'}}>
          <li style={{marginBottom: '.5em'}}><strong>{kfo.name}</strong></li>
          <li>{this.renderParagraphs(kfo.description)}</li>
        </ul>
      )
    })
  }

  renderParagraphs = (desc) => {
    let splitDesc = desc.split('\n\n')
    return splitDesc.map(p => <p>{p}</p>)
  }

  render() {
    return (
      <div>
        {this.renderOptions()}
      </div>
    )
  }
}

export default FeatureOptions
