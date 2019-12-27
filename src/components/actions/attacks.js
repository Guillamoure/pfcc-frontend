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
      case 'Maddox':
        return maddox()
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
          <td>{renderDamageDice('1d6')}+3 P</td>
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
          <td><em>+3 unholy/- Orc Double Axe</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')+3+1 /*Weapon Focus*/}</td>
          <td>-</td>
          <td>{renderDamageDice('1d8')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+3}</span> S {sparks()}(+2d6 v. good)</td>
          <td>x2</td>
          <td>Double, <em onMouseOver={e => renderTooltip(e, 'unholy')} onMouseOut={props.mouseOut}>unholy</em> on one blade</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td><em>+1 construct bane Morningstar</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1}</td>
          <td>-</td>
          <td>{renderDamageDice('1d10')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1}</span> S {sparks()}</td>
          <td>x2</td>
          <td><em onMouseOver={e => renderTooltip(e, 'bane')} onMouseOut={props.mouseOut}>bane</em></td>
        </tr>
        <tr>
          <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
          <td><em>+3 unholy/- Orc Double Axe</em></td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')+3-2+1 /*Weapon Focus*/}/+{renderNum('abS')-2+1 /*Weapon Focus*/}/+{renderNum('abS')-2-5+1 /*Weapon Focus*/}</td>
          <td>-</td>
          <td>{renderDamageDice('1d8')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+3}</span> S {sparks()}/ {renderDamageDice('1d8')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> S {sparks()}</td>
          <td>x2</td>
          <td>Double, <em onMouseOver={e => renderTooltip(e, 'unholy')} onMouseOut={props.mouseOut}>unholy</em> on one blade</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Dagger</td>
          <td style={renderNum('abS', null, true)}>{renderNum('abS') >= 0 ? '+' + renderNum('abS') : renderNum('abS')}, {renderNum('abD') >= 0 ? '+' + renderNum('abD') : renderNum('abD')}</td>
          <td>10 ft.</td>
          <td>{renderDamageDice('1d4')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS') >= 0 ? '+' + renderNum('damageS') : renderNum('damageS')}</span> S/P</td>
          <td>19-20/x2</td>
          <td>If thrown, use second attack bonus</td>
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
          <td onMouseOver={e => renderTooltip(e, 'PBS')} onMouseOut={props.mouseOut}>{renderDamageDice('1d8')}+<span style={renderNum('damageD', null, true)}>{renderNum('damageD')}*</span> P</td>
          <td>19-20/x2</td>
          <td><span onMouseOver={e => renderTooltip(e, 'Load Light')} onMouseOut={props.mouseOut}>Load*</span>{props.character_info.hardcode.arcane_strike ? ', Ignore DR/magic' : null}</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Claws</td>
          <td style={renderNum('abS', null, true)} onMouseOver={e => renderTooltip(e, 'PBS')} onMouseOut={props.mouseOut}>+{renderNum('abS')}</td>
          <td>-</td>
          <td>{renderDamageDice('1d4')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> S</td>
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
            <td>{renderDamageDice('1d8')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> P</td>
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
            <td>{renderDamageDice('1d3')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> B</td>
            <td>x2</td>
            <td>Secondary natural attack</td>
          </tr>
        }
      </React.Fragment>
    )
  }

  const maddox = () => {
    return (
      <React.Fragment>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Quarterstaff</td>
          <td style={renderNum('abS', null, true)}>+{renderNum('abS')}</td>
          <td>-</td>
          <td>{renderDamageDice('1d6')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS') >= 0 ? '+' + renderNum('damageS') : renderNum('damageS')}</span> B</td>
          <td>x2</td>
          <td>Double</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td>Dagger</td>
          <td style={renderNum('abS', null, true)}>{renderNum('abS') >= 0 ? '+' + renderNum('abS') : renderNum('abS')}, {renderNum('abD') >= 0 ? '+' + renderNum('abD') : renderNum('abD')}</td>
          <td>10 ft.</td>
          <td>{renderDamageDice('1d4')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS') >= 0 ? '+' + renderNum('damageS') : renderNum('damageS')}</span> S/P</td>
          <td>19-20/x2</td>
          <td>If thrown, use second attack bonus</td>
        </tr>
        <tr>
          <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
          <td><em>+1 Flaming Cestus</em></td>
          <td style={renderNum('abS', null, true)}>{renderNum('abS')+1 >= 0 ? '+' + (renderNum('abS')+1) : (renderNum('abS')+1)}</td>
          <td>-</td>
          <td>{renderDamageDice('1d4')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 >= 0 ? '+' + (renderNum('damageS')+1) : (renderNum('damageS')+1)}</span> B/P +1d6 fire</td>
          <td>19-20/x2</td>
          <td>If wielded, -2 penalty to precision-based tasks with that hand, <em onMouseOver={e => renderTooltip(e, 'flaming')} onMouseOut={props.mouseOut}>flaming</em></td>
        </tr>
        <tr>
          <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
          <td>Quarterstaff</td>
          <td style={renderNum('abS', null, true)}>{renderNum('abS')-4 >= 0 ? '+' + renderNum('abS')-4 : renderNum('abS')-4}/{renderNum('abS')-8 >= 0 ? '+' + renderNum('abS')-8 : renderNum('abS')-8}</td>
          <td>-</td>
          <td>{renderDamageDice('1d6')}<span style={renderNum('damageS', null, true)}>{renderNum('damageS') >= 0 ? '+' + renderNum('damageS') : renderNum('damageS')}</span> B/{renderDamageDice('1d6')} <span style={renderNum('damageS', null, true)}>{renderNum('damageS') >= 0 ? '+' + renderNum('damageS') : renderNum('damageS')}</span> B</td>
          <td>x2</td>
          <td>Double</td>
        </tr>
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
    let otherABS = 0
    let otherABD = 0
    const hc = props.character_info.hardcode
    const n = props.character.name
    let rage = hc.rage
    let power = hc.power
    let fd = hc.fd
    let charge = hc.charge
    let bullMinor = hc.minor === 'Bull - Minor'
    let largeMorph = hc.major === 'Bull - Major' || hc.major === 'Condor - Major' || hc.major === 'Frog - Major' || hc.major === 'Squid - Major'
    let taalmon = n === "Cedrick"
    let arcaneStrike = hc.arcane_strike
    let enlarger = hc.enlarge
    let reducer = hc.reduce

    bab = n === "Merg" ? 7 : bab
    bab = n === "Cedrick" ? 7 : bab
    bab = n === "Persephone" ? 3 : bab
    bab = n === 'Maddox' ? 3 : bab
    size = size === "Large" ? -1 : size
    size = size === "Medium" ? 0 : size
    size = size === "Small" ? 1 : size
    size = size === "Tiny" ? 2 : size

    // +2 to dex (+1 mod) from the wraps
    otherABD += !!taalmon ? 1 : 0

    const ogABS = bab + size + str + otherABS
    const ogABD = bab + size + dex + otherABD
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

    abSBonus += !!rage ? 2 :0
    damageSBonus += !!rage ? 2 :0

    abSBonus += !!power ? -2 : 0
    damageSBonus += !!power ? 4 : 0

    abSBonus += !!charge ? 2 : 0

    abSBonus += !!fd ? -4 : 0
    abDBonus += !!fd ? -4 : 0

    damageSBonus += arcaneStrike ? 2 : 0
    damageDBonus += arcaneStrike ? 2 : 0

    // +2 to str, -2 Dex, -1 to attacks
    abDBonus += enlarger ? -2 : 0
    damageSBonus += enlarger ? 1 : 0
    // dex doesn't effect damage
    // damageDBonus += enlarger ? -1 : 0

    // -2 to str, +2 Dex, +1 to attacks
    abDBonus += reducer ? 2 : 0
    damageSBonus += reducer ? -1 : 0
    // dex doesn't effect damage
    // damageDBonus += reducer ? 1 : 0

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

  const renderDamageDice = (dice) => {
    const size = props.character_info.size
    let newDice = dice
    if (size === "Large"){
      switch(dice){
        case '1d3':
          newDice = '1d4'
          break
        case '1d4':
          newDice = '1d6'
          break
        case '1d6':
          newDice = '1d8'
          break
        case '1d8':
          newDice = '2d6'
          break
        case '1d10':
          newDice = '2d8'
          break
        default:
          break
      }
    } else if (size === 'Small'){
      switch(dice){
        case '1d3':
          newDice = '1d2'
          break
        case '1d4':
          newDice = '1d3'
          break
        case '1d6':
          newDice = '1d4'
          break
        case '1d8':
          newDice = '1d6'
          break
        case '1d10':
          newDice = '1d8'
          break
        default:
          break
      }
    } else if (size === 'Tiny'){
      switch(dice){
        case '1d3':
          newDice = '1'
          break
        case '1d4':
          newDice = '1d2'
          break
        case '1d6':
          newDice = '1d3'
          break
        case '1d8':
          newDice = '1d4'
          break
        case '1d10':
          newDice = '1d6'
          break
        default:
          break
      }
    }
    return newDice
  }

  const renderTooltip = (e, name) => {
    let comment = null
    if (name === "Load Light"){
      comment = 'Loading a light crossbow is a move action that provokes attacks of opportunity.'
    } else if (name === 'PBS'){
      comment = '+1 to Attack and Damage Rolls if target is within 30 ft'
    } else if (name === 'ominous'){
      comment = 'When this weapon confirms a critical hit, the target is shaken for 1 minute (DC 13 Will negates); if the weapon’s critical multiplier is greater than x2, this condition lasts 1 additional minute per multiple over x2. A creature that gains the shaken condition from an ominous weapon cannot gain that condition again from the same weapon for 24 hours.'
    } else if (name === 'grab'){
      comment = 'When this attack hits a creature, you may attempt to grapple that creature as a free action, provoking an AoO. The creature must be your size or smaller. If you succeed, you deal constrict damage. Each subsequent round, if you succeed on the grapple check, the creature takes the constrict damage.'
    } else if (name === 'flaming'){
      comment = 'Upon command, a flaming weapon is sheathed in fire that deals an extra 1d6 points of fire damage on a successful hit. The fire does not harm the wielder. The effect remains until another command is given.'
    } else if (name === 'bane'){
      comment = 'A bane weapon excels against certain foes. Against a designated foe, the weapon’s enhancement bonus is +2 better than its actual bonus. It also deals an extra 2d6 points of damage against the foe.'
    } else if (name === 'unholy'){
      comment = 'An unholy weapon is imbued with unholy power. This power makes the weapon evil-aligned and thus bypasses the corresponding damage reduction. It deals an extra 2d6 points of damage against all creatures of good alignment. It bestows one permanent negative level on any good creature attempting to wield it. The negative level remains as long as the weapon is in hand and disappears when the weapon is no longer wielded. This negative level cannot be overcome in any way (including restoration spells) while the weapon is wielded.'
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
      case 'Squid - Major':
        return (
          <React.Fragment>
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
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Tentacle</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1-5 /*Ta'al'mon wraps && Secondary attack*/}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> B</td>
              <td>x2</td>
              <td>Secondary Natural Attack, <em onMouseOver={e => renderTooltip(e, 'grab')} onMouseOut={props.mouseOut}>grab</em>, constrict (2d6+5)</td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
              <td>Bite, 2 Tentacles</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')}/+{renderNum('abS')+1-5 /*Ta'al'mon wraps && secondary attack*/}/+{renderNum('abS')+1-5 /*Ta'al'mon wraps && secondary attack*/}</td>
              <td>-</td>
              <td>1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> P, 1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S, 1d8+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S</td>
              <td>x2</td>
              <td>Tentacles: Secondary Natural Attacks, <em onMouseOver={e => renderTooltip(e, 'grab')} onMouseOut={props.mouseOut}>grab</em>, constrict (2d6+5)</td>
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
              <td>{renderDamageDice('1d10')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/}</span> S {renderFrogCombat()}</td>
              <td>x2</td>
              <td>Ignore DR/silver & DR/cold iron, <em onMouseOver={e => renderTooltip(e, 'ominous')} onMouseOut={props.mouseOut}>ominous</em></td>
            </tr>
            <tr>
              <td><button className={canCast('full')} onClick={() => renderDispatch('full')}><strong>Attack</strong></button></td>
              <td>Shifter Claws{sc ? ', 2 Tentacles' : null}</td>
              <td style={renderNum('abS', null, true)}>+{renderNum('abS')+1+1 /* Weapon Focus (shifter claws) && Ta'al'mon wraps*/}/+{renderNum('abS')+1+1-5 /* Weapon Focus (shifter claws) && Ta'al'mon wraps*/}{sc ? `/+${renderNum('abS')-5}/+${renderNum('abS')-5}`/*tentacle attacks attack at full attack bonus*/ : null}</td>
              <td>-</td>
              <td>{renderDamageDice('1d10')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')+1 /*Ta'al'mon wraps*/} S{sc ? `/${renderDamageDice('1d4')}+${renderNum('damageS')} B`/*tentacle attacks attack at full attack bonus*/ : null} </span> {renderFrogCombat()}</td>
              <td>x2</td>
              <td>Ignore DR/silver & DR/cold iron, <em onMouseOver={e => renderTooltip(e, 'ominous')} onMouseOut={props.mouseOut}>ominous</em>{sc ? ', 2 Tentacle attacks': null }</td>
            </tr>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td><em>+1 Underwater Light Crossbow</em></td>
              <td style={renderNum('abD', null, true)}>+{renderNum('abD')+1}</td>
              <td>80 ft/20 ft</td>
              <td>{renderDamageDice('1d8')}+<span style={renderNum('damageD', null, true)}>{renderNum('damageD')+1}</span> B</td>
              <td>x2</td>
              <td>Use second range number if underwater.<span onMouseOver={e => renderTooltip(e, 'Load Light')} onMouseOut={props.mouseOut}> Load*</span></td>
            </tr>
            <tr>
              <td><button className={canCast('standard')} onClick={() => renderDispatch('standard')}><strong>Attack</strong></button></td>
              <td>Chakram</td>
              <td style={renderNum('abD', null, true)}>+{renderNum('abD')-4/*Not Proficient*/}, +{renderNum('abS')-4-1/*Not Proficient, melee Chakram*/}</td>
              <td>30 ft</td>
              <td>{renderDamageDice('1d8')}+<span style={renderNum('damageS', null, true)}>{renderNum('damageS')}</span> S</td>
              <td>x2</td>
              <td>not proficient, if used as a melee weapon (second numbers), make a DC 15 Reflex save or cut yourself (1d6 slashing)</td>
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
