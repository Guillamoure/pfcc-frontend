import React from 'react'
import { connect } from 'react-redux'
import Portal from '../portal'

const PoisonModal = props => {

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h5>Poison Rules</h5>
          <div><p>Once a poison is used on a target, they must make a saving throw. If the target fails, after the onset time expires, the target is affected by the poison. They must make a check each iteration of the frequency, up to the maximum duration. For each iteration, the target must make another saving throw. If they fail, they are effected by the poison. If they succeed the cure condition, they are no longer effected by the poison, even if there is more time to the duration.</p></div>
          <br/>
          <div>
            <p>Poisons have four categories, based on how they reach the target: contact, ingested, inhaled, or injury.</p>
            <ul>
              <li><u>Contact</u>: These poisons are delivered the moment a creature touches the poison with its bare skin. Such poisons can be used as injury poisons. Contact poisons usually have an onset time of 1 minute and a frequency of 1 minute.</li>
              <li><u>Ingested</u>: These poisons are delivered when a creature eats or drinks the poison. Ingested poisons usually have an onset time of 10 minutes and a frequency of 1 minute.</li>
              <li><u>Inhaled</u>: These poisons are delivered the moment a creature enters an area containing such poisons and do not usually have an onset time. For most inhaled poisons, 1 dose fills a volume equal to a 10-foot cube. A creature can attempt to hold its breath while inside the area to avoid inhaling the toxin. A creature holding its breath receives a 50% chance of not having to make a Fortitude save each round. See the rules for holding your breath and suffocation. If a creature is holding its breath and fails the constitution check to continue doing so, rather than suffocating it begins to breathe normally again (and is subject to the effects of the inhaled poison if still in the area).</li>
              <li><u>Injury</u>: These poisons are primarily delivered through the attacks of certain creatures and through weapons coated in the toxin. Injury poisons do not usually have an onset time and have a frequency of 1 round.</li>
            </ul>
          </div>
          <br/>
          <div>
            <p>One dose of poison smeared on a weapon or some other object affects just a single target. A poisoned weapon or object retains its poison until the weapon scores a hit or the object is touched (unless the poison is wiped off before a target comes in contact with it).</p>
            <p>Applying poison to a weapon or single piece of ammunition is a standard action. Whenever you apply or ready a poison for use, there is a 5% chance that you expose yourself to the poison and must save against the poison as normal. This does not consume the dose of poison. Whenever you attack with a poisoned weapon, if the attack roll results in a natural 1, you expose yourself to the poison. This poison is consumed when the weapon strikes a creature or is touched by the wielder. If you have the poison use class feature (such as from the assassin prestige class or the alchemist base class), you do not risk accidentally poisoning yourself when applying poison.</p>
          </div>
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

export default connect(mapStatetoProps)(PoisonModal)
