import React from 'react'
import { connect } from 'react-redux'

const Attacks = props => {

  const renderCharacter = (name) => {
    switch(name){
      case "Nettie":
        return nettie()
      case "Merg":
        return merg()
      case "Cedrick":
        return cedrick()
      case "Persephone":
        return pepper()
      default:
        return null
    }
  }

  const renderDispatch = (action, details) => {
    let actions = props.character_info.actions
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return null
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return null
    } else if (!actions[action]){
      props.dispatch({type: 'TRIGGER ACTION', action})
      if (details === 'charge'){
        props.dispatch({type: 'CHARGE'})
      }
      if (details === 'cleave'){
        props.dispatch({type: 'CLEAVE'})
      }
    } else {
      return null
    }
  }

  const canCast = (action) => {
    let actions = props.character_info.actions
    if ((action === 'standard' || action  === 'move' || action === 'swift') && actions.full){
      return "cannot-cast"
    } else if (action === 'full' && (actions.standard || actions.move || actions.swift)){
      return "cannot-cast"
    } else if (!actions[action]){
      return action
    } else {
      return "cannot-cast"
    }
  }

  const nettie = () => {
    return (
      <React.Fragment>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td><em>+1 Glammered Rapier</em></td>
          <td>+10</td>
          <td>-</td>
          <td>1d3+3 P</td>
          <td>18-20/x2</td>
          <td>Finesse</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Unarmed</td>
          <td>+9</td>
          <td>-</td>
          <td>3 B</td>
          <td>x2</td>
          <td>Non-lethal</td>
        </tr>
      </React.Fragment>
    )
  }

  const merg = () => {
    return (
      <React.Fragment>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td><em>+3 unholy/- orc double axe</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')+3}</td>
          <td>-</td>
          <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+3}</span> S {sparks()}(+2d6 v. good)</td>
          <td>x2</td>
          <td>Double</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td><em>+1 Great Mace</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('ab')+1}</td>
          <td>-</td>
          <td>1d10+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1}</span> S {sparks()}(+2d6 v. construct)</td>
          <td>x2</td>
          <td>Double</td>
        </tr>
        <tr>
          <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
          <td><em>+3 unholy/- orc double axe</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')+3-2}/+{renderNum('abS')-2}/+{renderNum('abS')-2-5}</td>
          <td>-</td>
          <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+3}</span> S {sparks()}(+2d6 v. good) / 1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> S {sparks()}</td>
          <td>x2</td>
          <td>Double</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Unarmed</td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')}</td>
          <td>-</td>
          <td><span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1}</span> B {sparks()}</td>
          <td>x2</td>
          <td>Non-lethal</td>
        </tr>
      </React.Fragment>
    )
  }

  const pepper = () => {
    return (
      <React.Fragment>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Light Crossbow</td>
          <td style={renderNum('abD', null, true)} onMouseOver={e => renderTooltip(e, 'PBS')} onMouseOut={props.mouseOut}>+{renderNum('abD')/*There was an extra +1 from here but, i removed it. Unsure what it came from*/}*</td>
          <td>80 ft</td>
          <td onMouseOver={e => renderTooltip(e, 'PBS')} onMouseOut={props.mouseOut}>1d8+<span style={renderNum('damageD', null, true)}>{renderNum('damageD')}*</span> P</td>
          <td>19-20/x2</td>
          <td><span onMouseOver={e => renderTooltip(e, 'Load Light')} onMouseOut={props.mouseOut}>Load*</span>{props.character_info.hardcode.arcane_strike ? ', Ignore DR/magic' : null}</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Claws</td>
          <td style={renderNum('abS', null, true)} onMouseOver={e => renderTooltip(e, 'PBS')} onMouseOut={props.mouseOut}>+{renderNum('abS')}</td>
          <td>-</td>
          <td>1d4<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> S</td>
          <td>x2</td>
          <td>{props.character_info.hardcode.arcane_strike ? ', Ignore DR/magic' : null}</td>
        </tr>
      </React.Fragment>
    )
  }

  const cedrick = () => {
    return (
      <React.Fragment>
        {polymorph()}
        {props.character_info.hardcode.combat === 'Condor - Combat' &&
          <tr>
            <td><button className={canCast('standard')} onClick={() => renderDispatch('standard', 'cleave')}><strong>Attack</strong></button></td>
            <td>Cleave - Shifter Claws</td>
            <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1+1 /*Ta'al'mon wraps*/}/+{renderNum('abS')+1+1 /*Ta'al'mon wraps*/}</td>
            <td>-</td>
            <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> P</td>
            <td>x2</td>
            <td>If you hit the first target, you may make a second attack on a target adjacent to the first and within reach</td>
          </tr>
        }
        {props.character_info.hardcode.combat === 'Squid - Combat' &&
          <tr>
            <td><button className={canCast('standard')} onClick={() => renderDispatch('standard', 'cleave')}><strong>Attack</strong></button></td>
            <td>Tentacle</td>
            <td style={renderNum('abS', null, true)}>+{renderNum('abS')-5}</td>
            <td>-</td>
            <td>1d3+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> B</td>
            <td>x2</td>
            <td>Secondary natural attack</td>
          </tr>
        }
      </React.Fragment>
    )
  }



  const renderNum = (type, strengthMultiplier, style, ability_score) => {
    // type includes abS, abD, damageS, damageD
    let bab = 0
    let str = Math.floor((props.character_info.ability_scores.strength-10)/2)
    let dex = Math.floor((props.character_info.ability_scores.dexterity-10)/2)
    let size = props.character_info.size
    let abSBonus = 0
    let abDBonus = 0
    let damageSBonus = 0
    let damageDBonus = 0
    const hc = props.character_info.hardcode
    const n = props.character.name
    let rage = hc.rage
    let power = hc.power
    let fd = hc.fd
    let charge = hc.charge
    let bullMinor = hc.minor === 'Bull - Minor'
    let largeMorph = hc.major === 'Bull - Major' || hc.major === 'Condor - Major'
    let taalmon = n === "Cedrick"
    let arcaneStrike = hc.arcane_strike

    bab = n === "Merg" ? 7 : bab
    bab = n === "Cedrick" ? 7 : bab
    bab = n === "Persephone" ? 3 : bab
    size = size === "Large" ? -1 : size
    size = size === "Medium" ? 0 : size
    size = size === "Small" ? 1 : size
    size = size === "Tiny" ? 2 : size

    const ogABS = bab + size + str
    const ogABD = bab + size + dex
    const ogDS = str
    const ogDD = 0
    // STRENGTH FIRST
    abSBonus += !!bullMinor ? 1: 0
    damageSBonus += !!bullMinor ? 1: 0

    abSBonus += !!largeMorph ? 2: 0
    damageSBonus += !!largeMorph ? 2: 0
    // +4 to strength (+2 mod) -2 to dexterity (-1 mod), size change is calculated above
    abDBonus -= !!largeMorph ? -1 : 0

    if (strengthMultiplier){
      damageSBonus = Math.floor(damageSBonus * strengthMultiplier + (str * 0.5))
    }

    // OTHER BONUSES NEXT
    // +2 to dex (+1 mod) from the wraps
    abDBonus += !!taalmon ? 1 : 0

    abSBonus += !!rage ? 2 :0
    damageSBonus += !!rage ? 2 :0

    abSBonus += !!power ? -2 : 0
    damageSBonus += !!power ? 4 : 0

    abSBonus += !!charge ? 2 : 0

    abSBonus += !!fd ? -4 : 0
    abDBonus += !!fd ? -4 : 0

    damageSBonus += arcaneStrike ? 2 : 0
    damageDBonus += arcaneStrike ? 2 : 0

    if (type === 'abS'){
      if (!style){
        return ogABS + abSBonus
      } else {
        return calcStyle(ogABS, ogABS + abSBonus)
      }
    } else if (type === 'damageS'){
      if (!style){
        return ogDS + damageSBonus
      } else {
        return calcStyle(ogDS, ogDS + damageSBonus)
      }
    } else if (type === 'abD'){
      if (!style){
        return ogABD + abDBonus
      } else {
        return calcStyle(ogABD, ogABD + abDBonus)
      }
    } else if (type === 'damageD'){
      if (!style){
        return ogDD + damageDBonus
      } else {
        return calcStyle(ogDD, ogDD + damageDBonus)
      }
    }
  }

  const calcStyle = (ogMod, mod) => {
    if (ogMod > mod){
      return {color: 'maroon'}
    } else if (ogMod < mod){
      return {color: 'green'}
    } else {
      return {color: 'black'}
    }
  }

  const renderTooltip = (e, name) => {
    let comment = null
    if (name === "Load Light"){
      comment = 'Loading a light crossbow is a move action that provokes attacks of opportunity.'
    } else if (name === 'PBS'){
      comment = '+1 to Attack and Damage Rolls if target is within 30 ft'
    } else if (name === 'ominous'){
      comment = 'When this weapon confirms a critical hit, the target is shaken for 1 minute (DC 13 Will negates); if the weapon’s critical multiplier is greater than x2, this condition lasts 1 additional minute per multiple over x2. A creature that gains the shaken condition from an ominous weapon cannot gain that condition again from the same weapon for 24 hours.'
    }
    if (comment){
      props.renderTooltip(e, comment)
    }
  }

  const polymorph = () => {
    const major = props.character_info.hardcode.major
    switch(major){
      case 'Bull - Major':
        return (
          <React.Fragment>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Gore</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS', 1.5)}</span> P</td>
              <td>x2</td>
              <td></td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full', 'charge')}><strong>Attack</strong></button></td>
              <td>Powerful Charge</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+2+1 /*Ta'al'mon wraps*/}</td>
              <td>-</td>
              <td>2d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> P</td>
              <td>x2</td>
              <td>Move up to {props.character.race.speed * 2} ft, make Attack. +2 to attack, -2 to AC</td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full', 'charge')}><strong>Attack</strong></button></td>
              <td>Trample</td>
              <td>-</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS', 1.5)+1 /*Ta'al'mon wraps*/}</span> B</td>
              <td>-</td>
              <td>Overrun target(s) Medium or smaller. Targets get AoO (-4 penalty), or can forgo to make a DC {10 + 3 + renderNum('damage')} Reflex save for half damage</td>
            </tr>
          </React.Fragment>
        )
      case 'Condor - Major':
        return (
          <React.Fragment>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Talon</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1 /*Ta'al'mon wraps*/}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S</td>
              <td>x2</td>
              <td></td>
            </tr>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Bite</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> P</td>
              <td>x2</td>
              <td></td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
              <td>2 Talons, Bite</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1 /*Ta'al'mon wraps*/}/+{renderNum('abS')+1 /*Ta'al'mon wraps*/}/+{renderNum('abS')}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S, 1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S, 1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> P</td>
              <td>x2</td>
              <td></td>
            </tr>
          </React.Fragment>
        )
      default:
        let sc = props.character_info.hardcode.combat === 'Squid - Combat'
        return (
          <React.Fragment>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Shifter Claws</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1+1 /* Weapon Focus (shifter claws) && Ta'al'mon wraps*/}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S {renderFrogCombat()}</td>
              <td>x2</td>
              <td>Ignore DR/silver & DR/cold iron, <em onMouseOver={e => renderTooltip(e, 'ominous')} onMouseOut={props.mouseOut}>ominous</em></td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
              <td>Shifter Claws{sc ? ', 2 Tentacles' : null}</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1+1 /* Weapon Focus (shifter claws) && Ta'al'mon wraps*/}/+{renderNum('abS')+1+1-5 /* Weapon Focus (shifter claws) && Ta'al'mon wraps*/}{sc ? `/+${renderNum('abS')-5}/+${renderNum('abS')-5}`/*tentacle attacks attack at full attack bonus*/ : null}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/} S{sc ? `/1d3+${renderNum('damageS')} B`/*tentacle attacks attack at full attack bonus*/ : null} </span> {renderFrogCombat()}</td>
              <td>x2</td>
              <td>Ignore DR/silver & DR/cold iron, <em onMouseOver={e => renderTooltip(e, 'ominous')} onMouseOut={props.mouseOut}>ominous</em>{sc ? ', 2 Tentacle attacks': null }</td>
            </tr>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Unarmed</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1 /*Ta'al'mon wraps*/}</td>
              <td>-</td>
              <td><span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> B</td>
              <td>x2</td>
              <td>Non-lethal, <em onMouseOver={e => renderTooltip(e, 'ominous')} onMouseOut={props.mouseOut}>ominous</em></td>
            </tr>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td><em>+1 Underwater Light Crossbow</em></td>
              <td style={renderNum('abD', null, true)}>+{renderNum('abD')+1}</td>
              <td>80 ft</td>
              <td>1d6+<span style={renderNum('damageD', null, true)}>{renderNum('damageD')+1}</span> B</td>
              <td>x2</td>
              <td>ACCOUNT FOR THIS WITH THE STATS CHANGING CUZ ITS DEX NOT STR</td>
            </tr>
          </React.Fragment>
        )
    }
  }

  const sparks = () => {
    let active = props.character_info.hardcode.eBloodActive
    return active ? '+1d6 elec ' : null
  }

  const renderFrogCombat = () => {
    const fc = props.character_info.hardcode.frogCombat
    switch(fc){
      case 'Sickened':
        return '(Sickened for 1 round)'
      case 'Acid Damage':
        return '+1d3 acid'
      case 'Silent Image':
        return (<span>(Affected by <em className='underline-hover' onClick={() => props.editModal('spell', null, 26)}>silent image</em> for 1 round)</span>)
      default:
        return null
    }
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Weapon</th>
            <th>Bonus</th>
            <th>Range</th>
            <th>Damage</th>
            <th>Critical</th>
            <th>Special</th>
          </tr>
        </thead>
        <tbody>
        {renderCharacter(props.character.name)}
        </tbody>
      </table>
    </section>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Attacks)
