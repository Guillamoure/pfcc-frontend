import React from 'react'
import { connect } from 'react-redux'
import { endTurn } from '../../helper_functions/distributers/new_turn'

const TurnActions = props => {

  const used = (action) => {
    return props.character_info.actions[action] ? `cast-${action}` : action
  }

  const dispatch = (action) => {
    props.dispatch({type: 'TRIGGER ACTION', action})
  }

  // const newTurn = () => {
    // patch fetch
    // reset all features, items, abilities, etc, that have a limit of a round
    // if successful, dispatch new turn
  // }

  if (localStorage.computer === "false"){
    return (
      <section id='actions' className='character-show shadow action-container'>
        <section style={{padding: '.15em'}}>
          <span id='full-action' className={used("full")} onClick={() => dispatch("full")}>Full-Round</span>
        </section>
        <section style={{padding: '.15em', paddingLeft: '0em'}}>
          <span id='immediate-action' className={used("immediate")} onClick={() => dispatch("immediate")}>Immediate</span>
        </section>
        <section style={{padding: '.15em', paddingTop: '0em'}}>
          <span id='standard-action' className={used("standard")} onClick={() => dispatch("standard")}>Standard</span>
          <span id='move-action' className={used("move")} onClick={() => dispatch("move")}>Move</span>
          <span id='swift-action' className={used("swift")} onClick={() => dispatch("swift")}>Swift</span>
        </section>
        <section style={{padding: '.15em', paddingTop: '0em', paddingLeft: '0em'}}>
          <span id='free-action' className="free">Free</span>
          <span id='start-turn' className="start" onClick={endTurn}>Start Turn</span>
        </section>
      </section>
    )
  }

  return (
    <section id='actions' className='character-show shadow action-container' style={{boxShadow: `5px 4px 2px #${props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`}}>
      <li id='full-action' className={used("full")} onClick={() => dispatch("full")}>Full-Round Action</li>
      <li id='immediate-action' className={used("immediate")} onClick={() => dispatch("immediate")}>Immediate Action</li>
      <li id='standard-action' className={used("standard")} onClick={() => dispatch("standard")}>Standard Action</li>
      <li id='move-action' className={used("move")} onClick={() => dispatch("move")}>Move Action</li>
      <li id='swift-action' className={used("swift")} onClick={() => dispatch("swift")}>Swift Action</li>
      <li id='free-action' className="free">Free Action</li>
      <li id='start-turn' className="start" onClick={endTurn}>Start Turn</li>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info,
		settings: state.settings
  }
}

export default connect(mapStatetoProps)(TurnActions)
