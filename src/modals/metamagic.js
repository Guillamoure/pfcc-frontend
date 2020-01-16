import React from 'react'
import Portal from '../portal'

const MetamagicModal = props => {

  return (
    <Portal>
      <div className="page-dimmer" onClick={props.clickOut}>
        <div className="edit-form" name="background">
          <p>
            <h3>Extend Spell</h3>
            <p>An extended spell lasts twice as long as normal. A spell with a duration of concentration, instantaneous, or permanent is not affected by this feat. An extended spell uses up a spell slot one level higher than the spell’s actual level.</p>
          </p>
          <p>
            <h3>Empower Spell</h3>
            <p>All variable, numeric effects of an empowered spell are increased by half, including bonuses to those dice rolls. Saving throws and opposed rolls are not affected, nor are spells without random variables. An empowered spell uses up a spell slot two levels higher than the spell’s actual level.</p>
          </p>
          <p>
            <h3>Heightened Spell</h3>
            <p>A heightened spell has a higher spell level than normal (up to a maximum of 9th level). Unlike other metamagic feats, Heighten Spell actually increases the effective level of the spell that it modifies. All effects dependent on spell level (such as saving throw DCs and ability to penetrate a lesser globe of invulnerability) are calculated according to the heightened level. The heightened spell is as difficult to prepare and cast as a spell of its effective level.</p>
          </p>
        </div>
      </div>
    </Portal>
  )
}

export default MetamagicModal
