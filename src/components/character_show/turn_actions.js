import React from 'react'
import { connect } from 'react-redux'

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
          <span id='start-turn' className="start" onClick={() => props.dispatch({type: 'NEW TURN'})}>Start Turn</span>
        </section>
      </section>
    )
  }

  return (
    <section id='actions' className='character-show shadow action-container'>
      <section style={{padding: '.15em'}}>
        <span id='full-action' className={used("full")} onClick={() => dispatch("full")}>Full-Round Action</span>
      </section>
      <section style={{padding: '.15em', paddingLeft: '0em'}}>
        <span id='immediate-action' className={used("immediate")} onClick={() => dispatch("immediate")}>Immediate Action</span>
      </section>
      <section style={{padding: '.15em', paddingTop: '0em'}}>
        <span id='standard-action' className={used("standard")} onClick={() => dispatch("standard")}>Standard Action</span>
        <span id='move-action' className={used("move")} onClick={() => dispatch("move")}>Move Action</span>
        <span id='swift-action' className={used("swift")} onClick={() => dispatch("swift")}>Swift Action</span>
      </section>
      <section style={{padding: '.15em', paddingTop: '0em', paddingLeft: '0em'}}>
        <span id='free-action' className="free">Free Action</span>
        <span id='start-turn' className="start" onClick={() => props.dispatch({type: 'NEW TURN'})}>Start Turn</span>
      </section>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(TurnActions)
