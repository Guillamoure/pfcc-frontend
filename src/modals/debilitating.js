import React from 'react'
import Portal from '../portal'

const DebilitatingModal = props => {

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <h3>Debilitating Injury</h3>
          <p>Whenever you deal sneak attack damage to a foe, you can also debilitate the target of your attack, causing it to take a penalty for 1 round (this is in addition to any penalty caused by a rogue talent or other special ability).</p>
          <ul>
            <li><u>Bewildered</u>: The target becomes bewildered, taking a –2 penalty to AC. The target takes an additional –2 penalty to AC against all attacks made by the rogue.</li>
            <li><u>Disoriented</u>: The target takes a –2 penalty on attack rolls. In addition, the target takes an additional –2 penalty on all attack rolls it makes against the rogue.</li>
            <li><u>Hampered</u>: All of the target’s speeds are reduced by half (to a minimum of 5 feet). In addition, the target cannot take a 5-foot step.</li>
          </ul>
          <p>These penalties do not stack with themselves, but additional attacks that deal sneak attack damage extend the duration by 1 round. A creature cannot suffer from more than one penalty from this ability at a time. If a new penalty is applied, the old penalty immediately ends. Any form of healing applied to a target suffering from one of these penalties also removes the penalty.</p>
        </div>
      </div>
    </Portal>
  )
}

export default DebilitatingModal
