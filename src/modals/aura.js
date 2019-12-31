import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const AuraModal = props => {

  const renderAge = age => {
    props.dispatch({type: 'TIME TRAVEL', age})
    props.exitModal()
  }

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <section>
          <h4>Read Aura Occult Skill Unlock</h4>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <p><strong>Check</strong>: Once per day, you can examine the natural aura of a creature or object to discern the subject’s alignment, emotions, health, or magic. This requires 10 minutes of concentration, after which you attempt a Perception check. Each time, you must pick one of four auras to read: alignment, emotion, health, or magic. The result of the check applies only to the selected aura. You must be within 30 feet of the subject at all times during the reading.</p><p>Objects typically have only magic auras, though some also have alignment auras (and intelligent items have emotion auras). You can still attempt to detect a type of aura an object doesn’t have, but you get no results. The DC varies depending on the aura, as shown on the table.</p>
          </div>
          <p><u>Read Alignment Aura</u>: You attempt to read the alignment aura, learning the alignment and its strength. An alignment aura’s strength depends on the creature’s Hit Dice or item’s caster level, as noted in the description of the detect evil spell.</p>
          <p><u>Read Emotion Aura</u>: The colors within the target’s aura reveal its emotional state. If successful, you learn the target’s disposition and its attitude toward any creatures within 30 feet of it. For a number of rounds equal to the amount by which you exceeded the skill check’s DC, You gain a +2 circumstance bonus on Bluff, Diplomacy, Intimidate, and Sense Motive checks against the target.</p>
          <p><u>Read Health Aura</u>: Viewing the flow of vital force, you assess a creature’s physical condition. You learn if the creature is unharmed or wounded, if it is poisoned or diseased, and whether it is affected by any of the following conditions: confused, disabled, dying, nauseated, panicked, staggered, stunned, and unconscious. You also learn the total number of points available in its ki pool, grit pool, or similar resource.</p>
          <p><u>Read Magic Aura</u>: You attempt to determine the number and power of all magical auras on a target creature or object (see detect magic to determine a magic aura’s power). If the check is successful, you can attempt Spellcraft checks to determine the school or identify properties of a magic item, as normal. If the item is affected by magic aura or a similar spell, you can realize this and determine the actual properties of the item if your check result exceeds the DC by 5 or more. If the spell is of a higher level (such as aura alteration), increase this threshold DC by 2 for every spell level beyond 1st.</p>
          <span>
            <ul>
              <li><strong>Anger</strong>: Bright Red</li>
              <li><strong>Deceit</strong>: Oily Green</li>
              <li><strong>Faith</strong>: Blue</li>
              <li><strong>Fear</strong>: Livid Gray</li>
              <li><strong>Flexibility</strong>: Emerald Green</li>
              <li><strong>Greed</strong>: Brown-Red</li>
              <li><strong>Hatred</strong>: Black</li>
              <li><strong>Intellect</strong>: Golden</li>
              <li><strong>Love</strong>: Scarlet</li>
              <li><strong>Melancholy</strong>: Gray Lines</li>
              <li><strong>Passion</strong>: Blood Red</li>
              <li><strong>Pride</strong>: Orange</li>
            </ul>
          </span>
          <span>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>DC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Read Alignment Aura</td>
                  <td>15 + creature’s HD or item’s caster level</td>
                </tr>
                <tr>
                  <td>Read Emotion Aura</td>
                  <td>20 + creature’s HD or item’s caster level</td>
                </tr>
                <tr>
                  <td>Read Health Aura</td>
                  <td>15 + creature’s HD</td>
                </tr>
                <tr>
                  <td>Read Magic Aura</td>
                  <td>20 + creature’s HD or item’s caster level</td>
                </tr>
              </tbody>
            </table>
          </span>
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

export default connect(mapStatetoProps)(AuraModal)
