import React from 'react'

import CharacterDetails from '../components/character_show/details'
import Notes from '../components/character_show/notes'

import DetailsTabs from './details_tabs'

class Details extends React.Component {
  state= {
    activeTab: "Details"
  }

  renderTabClick = (choice) => {
    this.setState({activeTab: choice})
  }

  render(){
    return(
      <div id="details" className='shadow character-show'>
        <DetailsTabs renderTabClick={this.renderTabClick} activeTab={this.state.activeTab}/>
        <div style={{height: '100%'}}>
          {this.state.activeTab === "Details" && <CharacterDetails editModal={this.props.editModal}/>}
          {this.state.activeTab === "Notes" && <Notes character={this.props.character}/>}
        </div>
      </div>
    )
  }
}

export default Details
