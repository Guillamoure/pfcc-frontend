import React from 'react'
import { connect } from 'react-redux'
import { endTurn } from '../../utils/distributers/new_turn'

const TurnActions = props => {

  const used = (action) => {
		const {full, standard, move} = props.character_info.actions
		if (action === "full" && (full || standard || move)) {return "cast-full"}
    let className = props.character_info.actions[action] ? `cast-${action}` : action
		return className
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
    <section id='actions' className='character-show shadow action-container dynamic-size-smaller' style={{boxShadow: `5px 4px 2px #${props.settings.shadeColor}`, opacity: "0.95", backgroundColor: `#${props.settings.bubbleColor}`, borderColor: `#${props.settings.borderColor}`}}>
      <li id='full-action' className={used("full")} style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={() => dispatch("full")}><div style={{margin: "auto"}}>Full-Round Action</div></li>
      <li id='immediate-action' className={used("immediate")} style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={() => dispatch("immediate")}><div style={{margin: "auto"}}>Immediate Action</div></li>
      <li id='standard-action' className={used("standard")} style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={() => dispatch("standard")}><div style={{margin: "auto"}}>Standard Action</div></li>
      <li id='move-action' className={used("move")} style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={() => dispatch("move")}><div style={{margin: "auto"}}>Move Action</div></li>
      <li id='swift-action' className={used("swift")} style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={() => dispatch("swift")}><div style={{margin: "auto"}}>Swift Action</div></li>
      <li id='free-action' className="free" style={{lineHeight: "normal", padding: "inherit", display: "flex"}}><div style={{margin: "auto"}}>Free Action</div></li>
      <li id='start-turn' className="start"  style={{lineHeight: "normal", padding: "inherit", display: "flex"}} onClick={endTurn}><div style={{margin: "auto"}}>Start Turn</div></li>
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
