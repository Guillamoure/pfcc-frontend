import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { isThisActionAvailable } from '../../helper_functions/calculations/round_actions'
import { abilityScoreMod } from '../../helper_functions/calculations/ability_scores'
import { calculateFeaturePercentage, remainingUsage, calculateCurrentUsage, isThisFeatureActive } from '../../helper_functions/calculations/feature_usage'
import { featureDistribution } from '../../helper_functions/distributers/features'
import { patchFetch } from '../../helper_functions/fetches'
import { locateFeatureAndAbilityFromSource } from '../../helper_functions/fuf'

class Abilities extends React.Component {

  // check all class features learned by this level (that are activatable),
  // class feature options (that are activatable),
  // racial traits (that are activatable)
  // list them with their action buttons

  renderAbilities = () => {
    // let option = this.collectClassFeatureOptions()
    switch(this.props.character.name){
      case 'Nettie':
        return this.nettie()
      case 'Merg':
      case 'Merg':
        return this.merg()
      case 'Cedrick':
        return this.cedrick()
      case 'Maddox':
        return this.maddox()
      case 'Persephone':
        return this.pepper()
      case 'Robby':
        return this.robby()
      case 'Festus':
        return this.festus()
      case 'Grackle':
        return this.grackle()
      default:
        break
    }
    let activatableAbilities = []
    this.props.character.applicable_klass_features.map(akf => {
      // if an akf has a feature with an action, display it
			akf.features.forEach(f => {
				if (f.action){
					let ckfus = this.props.character.character_klass_feature_usages.filter(fu => fu.klass_feature_id === akf.id)
					// the id value in the below object refers to the id of the character[type]
					// so that specific klass_feature, magic_item_feature, etc. can be found by id
					activatableAbilities.push({...f, sourceId: akf.id, klassFeatureName: akf.name, klassId: akf.klass_id, character_klass_feature_usages: ckfus, source: "applicable_klass_features"})
				}

				if (f.usage?.feature_usage_base) {
					let baseFeatureAndAbility = locateFeatureAndAbilityFromSource(f.usage.feature_usage_base.baseSource)
					let ckfus = this.props.character.character_klass_feature_usages.filter(fu => fu.klass_feature_id === baseFeatureAndAbility.ability.id)
					activatableAbilities.push({...f, sourceId: akf.id, klassFeatureName: akf.name, klassId: akf.klass_id, character_klass_feature_usages: ckfus, source: "applicable_klass_features", baseFeatureAndAbility, action: baseFeatureAndAbility.feature.action})
				}
			})
      // only display the feature, but the text should be from the akf
    })

    return activatableAbilities.map((ability, idx) => {
			return (
				<tr key={idx * 3 - 1}>
					<td><button className={this.canThisAbilityBeUsed(ability)} onClick={() => this.newRenderClick(ability)}><strong>Click</strong></button></td>
					<td>{ability.klassFeatureName} {calculateFeaturePercentage(ability)}</td>
					<td>{this.renderDC(ability)}</td>
					<td className='table-details'>Nothin'</td>
				</tr>
			)
		})
  }

	canThisAbilityBeUsed = ability => {
		let actionClass = isThisActionAvailable(ability)



		return actionClass
	}

	renderDC = ability => {
		let st = ability.saving_throws[0]
		if (st){
			let save = _.capitalize(st.saving_throw)
			let asMod = abilityScoreMod(st.ability_score_modifier, true)
			let klassId = ability.klassId
			let lvl = this.props.character_info.classes.find(cl => cl.id === klassId).level

			let dc = st.base + asMod + (Math.floor(lvl * st.level_modifier))
			return `${save} ${dc}`
		} else {return "-"}
	}

  dispatchManager = (action, pointsDirection, specific, points) => {
    if (typeof points !== 'number' || points){
      if (!this.props.character_info.actions[action]){
        this.props.dispatch({type: 'TRIGGER ACTION', action})
        if (specific !== 'mutagen' && specific){
          this.props.dispatch({type: specific})
        } else if (specific === 'mutagen'){

          this.props.editModal('mutagen')
        }
      }
      if (pointsDirection){
        this.props.dispatch({type: 'POINTS CHANGE', amount: pointsDirection})
      }
    }
  }

	newRenderClick = ability => {
		// NEW DATA

		// STORED DATA

		// CALCULATED DATA
		let areThereEnoughPoints = !!remainingUsage(ability)
		let isThereAnAction = isThisActionAvailable(ability) !== "cannot-cast" ? true : false

		if (!areThereEnoughPoints || !isThereAnAction){return null}

		if (isThisFeatureActive(ability)){
			featureDistribution(ability)
		} else {

			if (ability.usage.all_feature_usage_options.length){
				this.props.dispatch({type: "MODAL", detail: "featureUsageOptions", obj: ability})
				return null
			}

			let body = {
				character_id: this.props.character.id,
				klass_feature_id: ability.sourceId,
				feature_usage_id: ability.usage.id,
				current_usage: calculateCurrentUsage(ability.character_klass_feature_usages) + 1
			}
			if (ability.baseFeatureAndAbility){
				if (ability.character_klass_feature_usages.length === 1){
					let ckfu = ability.character_klass_feature_usages[0]
					body = {...ckfu, current_usage: ckfu.current_usage + 1}
				}
			}

			patchFetch("character_klass_feature_usages", body)
				.then(data => {
					this.props.dispatch({type: "ADJUST CHARACTER REPLACE VALUE IN ARRAY", adjust: "character_klass_feature_usages", value: data})
					featureDistribution(ability)
				})

			this.props.dispatch({type: 'TRIGGER ACTION', action: isThisActionAvailable(ability)})

		}

		// use action
		// reduce points
	}

  renderClick = (ability, amount) => {
    let { modal, action, limit, starting, name, points, redux } = ability
    if (modal){
      this.props.editModal(modal)
    }
    if (action !== 'free' && amount !== 0 && action !== 'long'){
      this.props.dispatch({type: 'TRIGGER ACTION', action})
    }
    if (points && this.props.character_info.hardcode.points >= points){
      this.props.dispatch({type: 'POINTS CHANGE', amount: 'decrease'})
      if (points > 1){
        this.props.dispatch({type: 'POINTS CHANGE', amount: 'decrease'})
      }
    }
    if (redux){
      this.props.dispatch({type: redux})
    }
    if (limit){
      // if limits exist in redux
      let limits = this.props.character_info.hardcode.limits
      // if limits doesn't exist, dispatch
      // if limits does exist, try to find the specifc one
      // if that one isn't found, dispatch
      // if that one is found, check to see if the number of casts is equal to the limit
      // if casts is less than limit, dispatch
      // if casts is equal to limit, don't
      if (limits){
        let found = this.props.character_info.hardcode.limits.find(l => l.name === name)
        if (found){
          if (starting && found.cast < starting){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          } else if (found.cast < limit){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          }
        } else {
          this.props.dispatch({type: 'LIMIT CASTING', name})
        }
      } else {
        this.props.dispatch({type: 'LIMIT CASTING', name})
      }
    }
  }

  nettie = () => {
    const perf = this.props.character_info.hardcode.performance
    let className = 'move'
    if (perf){
      className = 'free'
    }
    let action = 'Activate'
    if (perf){
      action = 'Maintain'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={className} onClick={() => this.props.editModal('performance', className)}><strong>{action}</strong></button></td>
          <td>Bardic Performance</td>
          <td className='table-details'>Select a performance to start</td>
        </tr>
      </React.Fragment>
    )
  }

  merg = () => {
    const actions = this.props.character_info.actions
    const power = this.props.character_info.hardcode.power
    const rage = this.props.character_info.hardcode.rage
    const teleswap = this.props.character_info.hardcode.teleswap
    const hats = this.props.character_info.hardcode.magicalHats
    const manipulate = this.props.character_info.hardcode.manipulate || 0
    const auraRead = this.props.character_info.hardcode.auraRead
    let powerClassName = 'free'
    if (power){
      powerClassName = 'cannot-cast'
    }
    let powerAction = 'Activate'
    if (power){
      powerAction = 'Active'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={rage ? 'cannot-cast' : 'free'} onClick={() => this.props.editModal('rage')}><strong>{rage ? 'Active' : 'Activate'}</strong></button></td>
          <td>Rage</td>
          <td className='table-details'>+2 to melee attacks, thrown attacks, melee damage, will saves. -2 to AC. +14 temp hp</td>
        </tr>
        <tr>
          <td><button className={powerClassName} onClick={() => this.props.dispatch({type: 'POWER ATTACK'})}><strong>{powerAction}</strong></button></td>
          <td>Power Attack</td>
          <td className='table-details'>-2 to melee attacks, +4 to melee attack damage</td>
        </tr>
        {this.props.character_info.hardcode.rage && this.sparks()}
        <tr>
          <td><button className={actions.standard ? 'cannot-cast' : 'standard'} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Swipe</strong></button></td>
          <td>Fabric of Reality - Swipe Fabric</td>
          <td className='table-details'>Teleport to a point within line-of-sight up to 30 ft away. You can use this ability again after 1d10 rounds.</td>
        </tr>
        <tr>
          <td><button className={actions.move || teleswap ? 'cannot-cast' : 'move'} onClick={() => this.dispatchManager('move', false, 'TELESWAP')}><strong>Swap</strong></button></td>
          <td>Fabric of Reality - Spacial Entanglement</td>
          <td className='table-details'>Select a willing ally within line-of-sight up to 30 ft away. Switch places. This ability counts as the Swipe Fabric ability, and therefore can only be used again after 1d10 rounds.</td>
        </tr>
        <tr>
          <td><button className={actions.standard || hats ? 'cannot-cast' : 'standard'} onClick={() => this.dispatchManager('standard', false, 'MAGICAL HATS')}><strong>Wisp</strong></button></td>
          <td>Fabric of Reality - Whipping Wisps</td>
          <td className='table-details'>Summon 4 whipping cloths, and diguise yourself in one. Touch AC, DC 20 Will disbelieve. If a blank is struck, attacker takes 1d6 per remaining clothes + Cha mod psychic damage (Will 15 for half damage).</td>
        </tr>
        <tr>
          <td><button className={actions.swift || manipulate >= 2 ? 'cannot-cast' : 'swift'} onClick={() => this.dispatchManager('swift', false, 'REALITY BEND')}><strong>Bend</strong></button></td>
          <td>Fabric of Reality - Reality Bending ({2-manipulate}/2)</td>
          <td className='table-details'>Make a Combat Maneuver check (bonus equal to your class level + highest mental bonus) against creature to manipulate them or their immediate area.</td>
        </tr>
        <tr>
          <td><button className={auraRead ? 'cannot-cast' : 'long'} onClick={() => this.props.dispatch({type: 'AURA READ'})}><strong>Read</strong></button></td>
          <td>Fabric of Reality - No Illusion</td>
          <td className='table-details'>If draped over your head, +4 to sense motive checks, affected by <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 46)}>see invisibility</em>, and activate to <span className='underline-hover' onClick={() => this.props.editModal('aura')}>Read Auras</span></td>
        </tr>
      </React.Fragment>
    )
  }

  maddox = () => {
    // const power = this.props.character_info.hardcode.power
    // let powerClassName = 'free'
    // if (power){
    //   powerClassName = 'cannot-cast'
    // }
    // let powerAction = 'Activate'
    // if (power){
    //   powerAction = 'Active'
    // }
    let abilities = [
      {
        id: 4000,
        name: 'Change Age',
        description: 'Alter Age',
        button: 'Alter',
        modal: 'age',
        action: 'free'
      },
      {
        id: 4001,
        name: 'Augment Spell',
        description: 'When you cast a spell, expend a point from your reservoir to either incrase the caster level by 1, or increase the DC by +1. You can spend no more than 1 point from your reservoir on a given spell this way.',
        button: 'Augment',
        modal: 'reservoir',
        action: 'free'
      },
      {
        id: 4002,
        name: 'Zamantash Delta Chronometer - Insight Bonus',
        description: 'Thrice a day, the wielder can add a +2 insight bonus to any roll involving a d20. You can add this bonus after rolling, but before knowing the result of the check.',
        button: 'Foresight',
        action: 'free',
        limit: 3
      },
      {
        id: 4003,
        name: 'Zamantash Delta Chronometer - Instant Rest',
        description: 'Once every three days, as a move action, the wielder, and any companion, familiar, or mount within 5 ft of them, feels as though they received an 8-hour rest.',
        button: 'Rest',
        action: 'move',
        limit: 1
      },
      {
        id: 4004,
        name: 'Zamantash Delta Chronometer - Time Ritual',
        description: 'Once a month, the wielder and all others can participate in a ritual that takes 20 minutes. The moment the ritual ends becomes a fixed point in time.',
        button: 'Lock',
        action: 'long',
        limit: 1
      },
      {
        id: 4005,
        name: 'Zamantash Delta Chronometer - Ritual Break',
        description: 'Within 24 hours of completing this ritual, the wielder can trigger the Curio as a 3-round action that requires concentration, and provokes an attack of opportunity. Time is rewound back to the fixed point in time, which becomes no longer fixed, and all of the participants of the ritual are aware of the events that they experienced.',
        button: 'Rewind',
        action: 'long',
        limit: 1,
        dependent: 4004
      },
      {
        id: 4006,
        name: 'Zamantash Delta Chronometer - Quick Reaction',
        description: 'You can select one creature within 30 ft of you. That target gains +10 to their speed, a +2 insight bonus to their AC, and on their next attack roll, Reflex saving throw, or Dexterity-based or Charisma-based skill check, they may roll twice and take the higher of the two results. This effect lasts until the beginning of your next turn.',
        button: 'Enhance',
        action: 'standard'
      },
      {
        id: 4007,
        name: 'Arcanist Exploit - Forewarned',
        description: 'Expend 1 point when you or ally within 30 ft rolls initiative, add 1d4 to that roll.',
        button: 'Warn',
        action: 'free',
        points: 1
      },
      {
        id: 4008,
        name: 'Arcanist Exploit - Forewarned',
        description: 'Expend 2 points when you or ally within 30 ft rolls a saving throw, add 1d4 to that roll.',
        button: 'Save',
        action: 'immediate',
        points: 2
      },
      {
        id: 4009,
        name: 'Arcanist Exploit - Rewind',
        description: 'After a spell fizzles or breaks, spend points equal to half the spell level to immediately prepare that spell again. (NOTE: feature not built, change points manually, and spell should still be available.)',
        button: 'Rewind',
        action: 'immediate'
      },
      {
        id: 4010,
        name: 'Arcanist Exploit - Steal Time',
        description: 'Make a melee touch attack, then target needs to make a DC 16 Will save. If they fail, they take a -1 penalty to AC and Reflex saves, and a -5-foot penalty to base speed. You gain a +1 bonus to AC and Reflex saves, and a +5-foot bonus to base speed. This effect lasts for 7 rounds.',
        button: 'Sap',
        action: 'immediate',
        points: 1,
        redux: 'STEAL TIME'
      }
    ]
    return(
      <React.Fragment>
        {abilities.map((a, idx) => {
          let points = this.props.character_info.hardcode.points
          let limits = this.props.character_info.hardcode.limits
          let amount = true
          if (limits && a.limit){
            let found = limits.find(l => l.name === a.name)
            if (a.starting){
              amount = found ? a.starting - found.cast : a.starting
            } else {
              amount = found ? a.limit - found.cast : a.limit
            }
          } else {
            if (a.limit){
              amount = a.starting ? a.starting : a.limit
            }
          }
          let className = !this.props.character_info.actions[a.action] && amount && (a.points ? points >= a.points : true) ? a.action : 'cannot-cast'
          if (a.dependent){
            if (!limits || !limits.find(l => l.name === abilities.find(ability => ability.id === a.dependent).name)){
              return null
            }
          }
          return (
            <tr key={idx*a.id*3-1}>
            <td><button className={className} onClick={() => this.renderClick(a, amount)}>{a.button}</button></td>
            <td>{a.name}{a.limit ? ` (${amount}/${a.limit})` : null}{a.points ? ` ${a.points}${a.points === 1 ? 'pt' : 'pts'}` : null}</td>
            <td className='table-details'>{a.description}</td>
            </tr>
          )
        })}
      </React.Fragment>
    )
  }

  pepper = () => {
    // const power = this.props.character_info.hardcode.power
    let hex = 'standard'
    if (this.props.character_info.actions.standard){
      hex = 'cast-standard'
    }
    let arcane = 'swift'
    if (this.props.character_info.actions.swift){
      arcane = 'cast-swift'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className='long' onClick={() => this.props.dispatch({type: 'AUTUMN EQUINOX'})}><strong>Transform</strong></button></td>
          <td>Transformation Sequence</td>
          <td className='table-details'>As an action that takes 5 rounds (30 seconds), <a className='underline-hover' href='https://youtu.be/cirhQ8iLdbw?t=1m21s' target='_blank' rel='noopener noreferrer'>transform</a> into {this.props.character_info.hardcode.autumn ? 'Persephone' : 'the Autumn Equinox'}.</td>
        </tr>
        <tr>
          <td><button className={hex} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Hex</strong></button></td>
          <td>Protective Luck Hex</td>
          <td className='table-details'>Target creature within 30 ft, if it's targeted by an attack roll, attacker must roll twice and take the worse result</td>
        </tr>
        <tr>
          <td><button className={hex} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Hex</strong></button></td>
          <td>Fortune Hex</td>
          <td className='table-details'>Target creature within 30 ft, for one round, once a round, may reroll any ability check, attack roll, saving throw, or skill check, and take the better result. A creature can only benefit from this hex every 24 hours.</td>
        </tr>
        <tr>
          <td><button className={arcane} onClick={this.arcaneStrike}><strong>Activate</strong></button></td>
          <td>Arcane Strike</td>
          <td className='table-details'>As a swift action, you can imbue your weapons with a fraction of your power. For 1 round, your weapons deal +2 damage and are treated as magic for the purpose of overcoming damage reduction.</td>
        </tr>
      </React.Fragment>
    )
  }

  cedrick = () => {
    const hc = this.props.character_info.hardcode
    const power = this.props.character_info.hardcode.power
    const swift = this.props.character_info.actions.swift
    let powerClassName = 'free'
    if (power){
      powerClassName = 'cannot-cast'
    }
    let powerAction = 'Activate'
    if (power){
      powerAction = 'Active'
    }
    return(
      <React.Fragment>
        <tr>
          <td><button className={powerClassName} onClick={() => this.props.dispatch({type: 'POWER ATTACK'})}><strong>{powerAction}</strong></button></td>
          <td>Power Attack</td>
          <td className='table-details'>-2 to melee attacks, +4 to melee attack damage</td>
        </tr>
        <tr>
          <td><button className={hc.init_reroll || swift ? 'cannot-cast' : 'swift'} onClick={() => this.taalmon('init')}><strong>Reroll</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Initiative Reroll</td>
          <td className='table-details'>Reroll Initiative with a bonus equal to your Dex mod</td>
        </tr>
        <tr>
          <td><button className={hc.double_damage ? 'cannot-cast' : 'free'} onClick={() => this.taalmon('damage')}><strong>Damage</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Additional Damage</td>
          <td className='table-details'>On your next attack, if you hit, roll double the dice for damage. Stacks on critical hits, does not stack with precision damage.</td>
        </tr>
        <tr>
          <td><button className={hc.taal_tele || swift ? 'cannot-cast' : 'swift'} onClick={() => this.taalmon('teleport')}><strong>Teleport</strong></button></td>
          <td>Ta'al'mon Ancestral Handwraps - Teleport</td>
          <td className='table-details'>If you make an unarmed attack on a creature your size or smaller, teleport to the opposite side of them.</td>
        </tr>
        {hc.combat === 'Squid - Combat' ? this.squidCombat() : null}
        {hc.minor === 'Squid - Minor' ? this.squidMinor() : null}
        {hc.major === 'Squid - Major' ? this.squidMajor() : null}
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Bull - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Bull - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Bull - Combat Form (1 pt)</td>
          <td className='table-details'>On successful Bull Rush, make a melee attack against FF AC, push target back +5ft, and if impact hard surface deal melee attack damage (7 rounds)</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Bull - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Bull - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Bull - Minor Form (1 pt)</td>
          <td className='table-details'>+2 bonus to Strength</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Bull - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Bull - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Bull - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Bull - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Bull</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Chameleon - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Chameleon - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Chameleon - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Chameleon - Combat Form (1 pt)</td>
          <td className='table-details'>If you make an attack against an enemy who was not aware of your presence, add a competence bonus equal to your Wisdom modifier to your attack roll. </td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Chameleon - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Chameleon - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Chameleon - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Chameleon - Minor Form (1 pt)</td>
          <td className='table-details'>Can change the color of hair, eyes, or skin, and can cast <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 13)}>prestidigitation</em> on your equipment</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Chameleon - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Chameleon - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Chameleon - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Chameleon - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Chameleon</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Condor - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Condor - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Condor - Combat Form (1 pt)</td>
          <td className='table-details'>Gain <em>Cleave</em> feat</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Condor - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Condor - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Condor - Minor Form (1 pt)</td>
          <td className='table-details'>Can cast <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 18)}>feather fall</em></td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Condor - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Condor - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Condor - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Condor - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Condor</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Frog - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Frog - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Frog - Combat Form (1 pt)</td>
          <td className='table-details'>Excrete a poison through claws. Select the type of Poison. Creatures that fail a DC 17 Fortitude save are affected.</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Frog - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Frog - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Frog - Minor Form (1 pt)</td>
          <td className='table-details'>+4 bonus to Acrobatics when jumping and a +2 bonus to Swim</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Frog - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Frog - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Frog - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Frog - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Frog</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Combat', 'combat', 'class', 'swift', 1)} onClick={() => this.shift('Squid - Combat', 'combat', 1, 'swift')}><strong>{this.renderShifterFormClass('Squid - Combat', 'combat', 'button', null, 1)}</strong></button></td>
          <td>Squid - Combat Form (1 pt)</td>
          <td className='table-details'>Summon ink cloud for 1 round, or longer if underwater. Grow two tentacle appendages.</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Minor', 'minor', 'class', 'swift', 1)} onClick={() => this.shift('Squid - Minor', 'minor', 1, 'swift')}><strong>{this.renderShifterFormClass('Squid - Minor', 'minor', 'button', null, 1)}</strong></button></td>
          <td>Squid - Minor Form (1 pt)</td>
          <td className='table-details'>Jet up to {hc.speed * 2} ft in any direction</td>
        </tr>
        <tr>
          <td><button className={this.renderShifterFormClass('Squid - Major', 'major', 'class', 'standard', 1)} onClick={() => this.shift('Squid - Major', 'major', 2, 'standard', 'Large')}><strong>{this.renderShifterFormClass('Squid - Major', 'major', 'button', null, 1)}</strong></button></td>
          <td>Squid - Major Form (2 pts)</td>
          <td className='table-details'>Polymorph into Squid</td>
        </tr>
      </React.Fragment>
    )
  }

  robby = () => {
    let actions = this.props.character_info.actions
    let hc = this.props.character_info.hardcode
    let panache = hc.points
    let charmedLife = this.props.character_info.hardcode.charmedLife
    let charmedActive = this.props.character_info.hardcode.charmedActive
    return(
      <React.Fragment>
        <tr>
          <td><button className={actions.standard ? 'cannot-cast' : 'standard'} onClick={() => this.dispatchManager('standard', null, 'ALTER SELF')}><strong>Change</strong></button></td>
          <td>Change Shape</td>
          <td className='table-details'>You can assume the appearance of a specific single human form of the same sex. You always take this specific form when you use this ability. Functions as <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 76)}>alter self</em>.</td>
        </tr>
        <tr>
          <td><button className={actions.immediate || charmedLife >= 3 || charmedActive ? 'cannot-cast' : 'immediate'} onClick={() => this.dispatchManager('immediate', null, 'CHARMED', 3-charmedLife)}><strong>Lucky</strong></button></td>
          <td>Charmed Life ({3-charmedLife}/3)</td>
          <td className='table-details'>Add your Charisma bonus to your saving throw</td>
        </tr>
        <tr>
          <td><button className={actions.immediate || panache <= 0 ? 'cannot-cast' : 'immediate'} onClick={() => this.dispatchManager('immediate', 'decrease', 'DODGING PANACHE', panache)}><strong>Dodge</strong></button></td>
          <td>Dodging Panache</td>
          <td className='table-details'>1 panache: Move 5 ft (AoO from anyone besides attacker), add Charisma mod to AC</td>
        </tr>
        {!hc.parry && <tr>
          <td><button className={actions.free || panache <= 0 ? 'cannot-cast' : 'free'} onClick={() => this.dispatchManager('free', 'decrease', 'PARRY', panache)}><strong>Parry</strong></button></td>
          <td>Opportune Parry</td>
          <td className='table-details'>1 panache: Use your AoO to make a melee attack on an attacker making a melee attack (for each size larger attacker is, -2 penalty). If your attack roll is higher, the target misses.</td>
        </tr>}
        {hc.parry && <tr>
          <td><button className={actions.immediate || panache <= 0 ? 'cannot-cast' : 'immediate'} onClick={() => this.dispatchManager('immediate', null, null, panache)}><strong>Riposte</strong></button></td>
          <td>Opportune Riposte</td>
          <td className='table-details'>If you parried, you may make a melee attack, as long as you have at least 1 panache point.</td>
        </tr>}
        <tr>
          <td><button className={actions.move || panache <= 0 ? 'cannot-cast' : 'move'} onClick={() => this.dispatchManager('move', null, null, panache)}><strong>Stand</strong></button></td>
          <td>Kip-Up</td>
          <td className='table-details'>Stand up from prone without provoking an AoO</td>
        </tr>
        <tr>
          <td><button className={actions.swift || panache <= 0 ? 'cannot-cast' : 'swift'} onClick={() => this.dispatchManager('swift', 'decrease', null, panache)}><strong>Stand</strong></button></td>
          <td>Kip-Up</td>
          <td className='table-details'>1 panache: Stand up from prone without provoking an AoO</td>
        </tr>
        <tr>
          <td><button className={actions.swift || panache <= 0 ? 'cannot-cast' : 'swift'} onClick={() => this.dispatchManager('swift', 'decrease', 'PRECISE STRIKE', panache)}><strong>Damage</strong></button></td>
          <td>Precise Strike</td>
          <td className='table-details'>1 panache: Double Precise Strike damage bonus (+3 to +6)</td>
        </tr>
        {this.props.character_info.hardcode.helmsman && this.besmara()}
      </React.Fragment>
    )
  }

  festus = () => {
    let actions = this.props.character_info.actions
    return(
      <React.Fragment>
        <tr>
          <td><button className={actions.move ? 'cannot-cast': 'move'} onClick={() => this.dispatchManager('move')}><strong>Teleport</strong></button></td>
          <td>Long Step</td>
          <td className='table-details'>Teleport 60 ft. You can use this feature again after 1d4 rounds.</td>
        </tr>
      </React.Fragment>
    )
  }

  grackle = () => {
    let actions = this.props.character_info.actions
    return(
      <React.Fragment>
        {!this.props.character_info.hardcode.mutagen && <tr>
          <td><button className={actions.move ? 'cannot-cast': 'long'} onClick={() => this.dispatchManager('long', null, 'mutagen')}><strong>Brew</strong></button></td>
          <td>Brew Mutagen</td>
          <td className='table-details'>Create a mutagen. +2 to AC, +4 to selected ability score, -2 to opposite ability score. Options: Strength/Intelligence, Dexterity/Wisdom, Constitution/Charisma.</td>
        </tr>}
        {this.props.character_info.hardcode.mutagen && this.renderMutagen()}
      </React.Fragment>
    )
  }

  renderMutagen = () => {
    let actions = this.props.character_info.actions
    let chosenMutagen = this.props.character_info.hardcode.mutagen
    let activeMutagen = this.props.character_info.hardcode.activeMutagen || false
    let positiveAbilityScore
    let negativeAbilityScore
    switch(chosenMutagen){
      case "strength":
        positiveAbilityScore = 'Strength'
        negativeAbilityScore = 'Intelligence'
        break
      case "dexterity":
        positiveAbilityScore = 'Dexterity'
        negativeAbilityScore = 'Wisdom'
        break
      case "constitution":
        positiveAbilityScore = 'Constitution'
        negativeAbilityScore = 'Charisma'
        break
      default:
        break
    }
    let className = actions.move ? 'cannot-cast': 'standard'
    className = activeMutagen ? 'cannot-cast' : className
    return (
      <tr>
        <td><button className={className} onClick={() => this.dispatchManager(className, null, 'TOGGLE MUTAGEN')}><strong>Imbibe</strong></button></td>
        <td>{positiveAbilityScore}/{negativeAbilityScore} Mutagen</td>
        <td className='table-details'>70 minutes, +2 natural armor bonus to AC, +4 alchemical bonus to {positiveAbilityScore}, -2 penalty to {negativeAbilityScore}</td>
      </tr>
    )
  }

  renderShifterFormClass = (form, type, location, action, points) => {
    const activeForm = this.props.character_info.hardcode[type]
    const isActionAvailable = !this.props.character_info.actions[action]
    let className = action
    let button = 'Activate'
    if (activeForm === form && isActionAvailable){
      button = 'End'
      className = 'free'
    } else if (activeForm === form && !isActionAvailable){
      button = 'End'
      className = `cast-${action}`
    } else if (activeForm !== form && !isActionAvailable){
      className = 'cannot-cast'
    } else if (points > this.props.character_info.hardcode.points){
      className = 'cannot-cast'
    }
    return location === 'class' ? className : button
  }

  collectClassFeatureOptions = () => {
    let featuresNested = this.props.character.character_klasses.map(ck => {
      return ck.feature_options
    })
    let features = _.flatten(featuresNested)
    return features
  }

  besmara = () => {
    let actions = this.props.character_info.actions
    return (
      <tr>
        <td><button className={actions.full ? 'cannot-cast' : 'full'} onClick={() => this.dispatchManager('full')}><strong>Toggle</strong></button></td>
        <td>Store/Withdraw Siege Weapon</td>
        <td className='table-details'>Must have a siege weapon installed on the ship to store or withdraw it.</td>
      </tr>
    )
  }

  sparks = () => {
    let className = 'swift'
    let eBlood = this.props.character_info.hardcode.eBlood || 0
    if (this.props.character_info.hardcode.eBloodActive){
      className = `cast-${className}`
    }
    if (eBlood === 3){
      className = 'cannot-cast'
    }
    let status = `Activate  (${3 - eBlood})`
    if (this.props.character_info.hardcode.eBloodActive){
      status = 'Active'
    }
    if (eBlood === 3){
      status = 'Spent'
    }
    return (
      <tr>
        <td><button className={className} onClick={() => this.props.dispatch({type: 'SPARKS'})}><strong>{status}</strong></button></td>
        <td>Lesser Elemental Blood (electricity)</td>
        <td>Deal +1d6 electricity damage on all Melee Attack this turn</td>
      </tr>
    )
  }

  shift = (detail, form, points, action, size) => {
    // if the action is available
    if (!this.props.character_info.actions[action]){
      // if the form the user clicked is already active
      if (this.props.character_info.hardcode[form] === detail){
        // clear it
        this.props.dispatch({type: 'SHIFT', detail: null, form, points: 0})
        // if you have enough point when you click
      } else if (this.props.character_info.hardcode.points >= points){
        // shift and fire off the action
        this.props.dispatch({type: 'SHIFT', detail, form, points})
        this.props.dispatch({type: 'TRIGGER ACTION', action})
      }
      if (size){
        console.log('dispatching size', size)
        this.props.dispatch({type: 'CHANGE SIZE', size, detail, form})
      }
      if (detail === 'Condor - Major'){
        this.props.dispatch({type: 'SPEED SHIFT', speed: 20})
      }
      if (detail === 'Chameleon - Major'){
        this.props.dispatch({type: 'SPEED SHIFT', speed: 40})
      }
      if (detail === 'Frog - Combat'){
        if (this.props.character_info.hardcode.frogCombat){
          this.props.dispatch({type: 'FROG COMBAT', name: null})
        } else {
          this.props.editModal('frogCombat')
        }
      }
    }
  }

  arcaneStrike = () => {
    if (!this.props.character_info.actions.swift){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'ARCANE STRIKE'})
    }
  }

  taalmon = (type) => {
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.init_reroll && type === 'init'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'INIT REROLL'})
    }
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.init_reroll && type === 'damage'){
      this.props.dispatch({type: 'DOUBLE DAMAGE'})
    }
    if (!this.props.character_info.actions.swift && !this.props.character_info.hardcode.taal_tele && type === 'teleport'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'swift'})
      this.props.dispatch({type: 'TAALMON TELEPORT'})
    }
  }

  chronometer = type => {

  }

  squidCombat = () => {
    let className = !this.props.character_info.actions.standard ? 'standard' :'cannot-cast'
    return (
      <tr>
        <td><button className={className} onClick={() => this.props.dispatch({type: 'TRIGGER ACTION', action: 'standard'})}><strong>Create</strong></button></td>
        <td>Ink Cloud</td>
        <td className='table-details'>Fills a 5-foot square with an ink cloud for 1 round, or 4 rounds underwater. If any attack would go through the cloud, the defending creature gains a +5 circumstance bonus. This effect otherwise acts as <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 63)}>obscuring mist</em>.</td>
      </tr>
    )
  }

  squidMinor = () => {
    let className = !this.props.character_info.actions.move ? 'move' :'cannot-cast'
    let limits = this.props.character_info.hardcode.limits
    let amount
    if (limits){
      let found = limits.find(l => l.name === 'Squid - Minor')
      amount = found ? 4 - found.cast : 4
    } else {
      amount = 4
    }
    className = amount === 0 ? 'cannot-cast' : className
    return (
      <tr>
        <td><button className={className} onClick={className !== 'cannot-cast' ? () => this.renderLimit('Squid - Minor', 4) : null}><strong>Jet</strong></button></td>
        <td>Squid Jet ({amount}/4)</td>
        <td className='table-details'>Jet up to {this.props.character_info.hardcode.speed * 2} ft in one direction. If you impact a surface, take 2d8 bludgeoning damage. If you are underwater, you move up to {this.props.character_info.hardcode.speed * 4} ft, and if you impact a surface, take 2d4 bludgeoning damage.</td>
      </tr>
    )
  }

  squidMajor = () => {
    let className = !this.props.character_info.actions.full ? 'full' :'cannot-cast'
    let dispatch = !this.props.character_info.actions.full ? () => this.props.dispatch({type: 'TRIGGER ACTION', action: 'full'}) : null
    return (
      <React.Fragment>
        <tr>
          <td><button className='free'><strong>Ink</strong></button></td>
          <td>Ink Cloud</td>
          <td className='table-details'>Emit a 10-foot-radius cloud of ink once per minute while underwater. This cloud provides total concealment, and persists for 1 minute.</td>
        </tr>
        <tr>
          <td><button className={className} onClick={dispatch}><strong>Jet</strong></button></td>
          <td>Jet</td>
          <td className='table-details'>Move in a straight line up to 260 ft.</td>
        </tr>
      </React.Fragment>
    )
  }

  renderLimit = (name, limit, startingValue) => {
    if (limit){
      // if limits exist in redux
      let limits = this.props.character_info.hardcode.limits
      // if limits doesn't exist, dispatch
      // if limits does exist, try to find the specifc one
      // if that one isn't found, dispatch
      // if that one is found, check to see if the number of casts is equal to the limit
      // if casts is less than limit, dispatch
      // if casts is equal to limit, don't
      if (limits){
        let found = this.props.character_info.hardcode.limits.find(l => l.name === name)
        if (found){
          if (startingValue && found.cast < startingValue){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          } else if (found.cast < limit){
            this.props.dispatch({type: 'LIMIT CASTING', name})
          }
        } else {
          this.props.dispatch({type: 'LIMIT CASTING', name})
        }
      } else {
        this.props.dispatch({type: 'LIMIT CASTING', name})
      }
    }
    if (name === 'Squid - Minor'){
      this.props.dispatch({type: 'TRIGGER ACTION', action: 'move'})
    }
  }

  render() {
    return(
      <section>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>DC</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {this.renderAbilities()}
          </tbody>
        </table>
      </section>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Abilities)
