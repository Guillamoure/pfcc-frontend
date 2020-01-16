import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const SaseaModal = props => {

  const renderAge = age => {
    props.dispatch({type: 'TIME TRAVEL', age})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <section>
          <h4>Sasea Bitch</h4>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div>Colossal water vehicle</div>
            <div><u>Squares</u>: 40 (20 ft. by 50 ft.)</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div><strong>AC</strong> 2; <u>Hardness</u> 12</div>
            <div><strong>hp</strong> 600</div>
            <div><strong>Base Save</strong> +4</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div><strong>Maximum Speed</strong> 100 ft. (flying), or 60 ft. (current), or 30 ft. (muscle)</div>
            <div><strong>Acceleration</strong> 30 ft.</div>
            <div><strong>CMB</strong> +8; <strong>CMD</strong> 18</div>
            <div><strong>Ramming Damage</strong> 8d8</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div><strong>Description</strong> This long, flat-bottomed ship has a few oars to supplement its single mast with a square sail. It can make both sea and river voyages. The keelboat can carry 50 tons of cargo or 100 soldiers.</div>
            <div><strong>Propulsion</strong> flying (telepathy), current (air; 20 squares of sails, hp 100), current (water), or muscle (pushed; 8 Medium rowers)</div>
            <div><strong>Driving Check</strong> Diplomacy or Intimidate while rowed, or Profession (sailor) or Nature; +10 to the DC when sail is used</div>
            <div><strong>Forward Facing</strong> ship's forward</div>
            <div><strong>Driving Device</strong> telepathy, ship's rudder</div>
            <div><strong>Driving Space</strong> helmsman's chair, the two middle rear squares of the keelboat</div>
            <div><strong>Crew</strong> 8; <strong>Decks</strong> 1</div>
          </div>
          </section>
        </div>
      </div>
    </Portal>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(SaseaModal)
