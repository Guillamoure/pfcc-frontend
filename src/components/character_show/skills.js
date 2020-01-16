import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import localhost from '../../localhost'

class Skills extends React.Component {

  state = {
    skillset: false
  }

  componentDidMount() {
    fetch(`${localhost}/api/v1/skillsets/${this.props.character.skillset.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({skillset: data.skillset})
    })
  }

  renderSkillBonus = (skill, style) => {
    let score = this.props.character_info.ability_scores[_.lowerCase(skill.ability_score)]
    const age = this.props.character.name === 'Maddox' && this.props.character_info.hardcode.age
    if (skill.ability_score === "Strength"){
      score += age === 'Young' ? -2 : 0
      score += age === 'Middle' ? -1 : 0
      score += age === 'Old' ? -2 : 0
      score += age === 'Venerable' ? -3 : 0
    }
    if (skill.ability_score === "Dexterity"){
      score += age === 'Young' ? 2 : 0
      score += age === 'Middle' ? -1 : 0
      score += age === 'Old' ? -2 : 0
      score += age === 'Venerable' ? -3 : 0
    }
    if (skill.ability_score === 'Constitution'){
      score += age === 'Young' ? -2 : 0
      score += age === 'Middle' ? -1 : 0
      score += age === 'Old' ? -2 : 0
      score += age === 'Venerable' ? -3 : 0
    }
    if (skill.ability_score === "Intelligence"){
      score += age === 'Middle' ? 1 : 0
      score += age === 'Old' ? 1 : 0
      score += age === 'Venerable' ? 1 : 0
    }
    if (skill.ability_score === 'Wisdom'){
      score += age === 'Young' ? -2 : 0
      score += age === 'Middle' ? 1 : 0
      score += age === 'Old' ? 1 : 0
      score += age === 'Venerable' ? 1 : 0
    }
    if (skill.ability_score === 'Charisma'){
      score += age === 'Middle' ? 1 : 0
      score += age === 'Old' ? 1 : 0
      score += age === 'Venerable' ? 1 : 0
    }
    let mod = Math.floor((score - 10) / 2)
    let skillRanks = this.renderNumOfRanks(skill)
      mod += skillRanks
    if (this.renderClassSkill(skill) && skillRanks > 0){
      mod += 3
    }
    // hardcode
    const hc = this.props.character_info.hardcode
    const name = this.props.character.name
    const size = this.props.character_info.size
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major', 'Squid - Major', 'Chameleon - Major'].includes(hc.major)
    const armor = hc.armor
    const enlarger = hc.enlarge
    const reducer = hc.reduce
    if (skill.name === "Stealth"){
      const size = this.props.character_info.size
      if (size === "Small"){
        mod += 4
      } else if (size === "Large"){
        mod -= 4
      } else if (size === "Tiny"){
        mod += 8
      }
    }
    if (skill.ability_score === 'Dexterity' && name === 'Cedrick'){
      mod += 1
    }
    if (armor){
      // ARMOR CHECK PENALTY FROM ARMOR
      if (skill.ability_score === 'Dexterity' || skill.ability_score === 'Strength'){
        mod += armor === 'Wooden' ? -1 : 0
        mod += armor === '+1 chain shirt' ? -1 : 0
      }
    }
    if (skill.ability_score === "Intelligence" && name === "Persephone"){
      mod += 1
    }
    // agile trait
    mod += skill.name === 'Acrobatics' && name === 'Robby' ? 2 : 0
    // sea legs
    mod += skill.name === 'Acrobatics' && name === 'Robby' ? 2 : 0
    mod += skill.name === 'Climb' && name === 'Robby' ? 2 : 0
    mod += skill.name === 'Swim' && name === 'Robby' ? 2 : 0


    let bonus = 0
    this.props.character_info.bonuses.forEach(b => {
      if (b.type === 'skill' && b.skill_id === skill.id && b.duration === 'permanent'){
        bonus += b.bonus
      }
    })
    mod += bonus
    // check to see if the starting mod is modified
    let ogMod = mod
    if (skill.ability_score === 'Strength'){
      if (largeMorph){
        mod += 2
      }
      if (hc.minor === 'Bull - Minor'){
        mod +=1
      }
      mod += enlarger ? 1 : 0
      mod += reducer ? -1 : 0
    }
    if (skill.ability_score === 'Dexterity'){
      if (largeMorph){
        mod -= 1
      }
      mod += enlarger ? -1 : 0
      mod += reducer ? 1 : 0
    }
    if (skill.name === 'Swim'){
      if (hc.minor === 'Frog - Minor'){
        mod += 2
      }
      if (hc.major === 'Frog - Major'){
        mod += 8
      }
      if (size === 'Tiny'){
        mod -= Math.floor((score-10)/2)
        const dex = this.props.character_info.ability_scores.dexterity
        const dexMod = Math.floor((dex-10)/2)
        mod += dexMod
      }
    }
    if (skill.name === 'Climb'){
      if (size === 'Tiny'){
        mod -= Math.floor((score-10)/2)
        const dex = this.props.character_info.ability_scores.dexterity
        const dexMod = Math.floor((dex-10)/2)
        mod += dexMod
      }
    }
    if (skill.name === 'Intimidate'){
      if (name === "Cedrick"){
        mod += 1
        ogMod += 1
      }
    }
    if (!style){
      return mod < 0 ? mod : `+${mod}`
    } else {
      if (ogMod > mod){
        return {color: 'maroon'}
      } else if (ogMod < mod){
        return {color: 'green'}
      } else {
        return {color: 'black'}
      }
    }
  }

  renderNumOfRanks = (skill) => {
    let name = this.props.character.name
    let skillRanks = this.props.character.character_skillset_skills.find(chsss => chsss.skill_id === skill.id)
    if (skill.name === 'Religion' && name === "Persephone"){
      skillRanks = skillRanks || {ranks: this.props.character.character_klasses.length}
    }
    if (skill.name === 'Profession (fence)' && name === "Merg"){
      skillRanks = {ranks: 0}
    }
    if (skill.name === 'Profession (sailor)' && name === "Merg"){
      skillRanks = {ranks: 2}
    }
    if (skill.name === 'Profession (sailor)' && name === "Robby"){
      skillRanks = {ranks: 2}
    }
    if (skill.name === 'Perform (acting)' && name === "Robby"){
      skillRanks = {ranks: 1}
    }
    if (skill.name === 'Perform (percussion)' && name === "Nettie"){
      skillRanks = {ranks: 100}
    }
    if (skill.name === 'Perform (strings)' && name === "Nettie"){
      skillRanks = {ranks: 100}
    }
    if (skill.name === 'Craft (gears/clockwork)' && name === "Maddox"){
      skillRanks = {ranks: 3}
    }
    return skillRanks !== undefined ? skillRanks.ranks : 0
  }

  renderClassSkill = (skill) => {
    let isThisAClassSkill = false
    this.props.character.uniq_klasses.forEach(klass => {
      klass.class_skillset_skills.forEach(csss => {
        if (klass.name === "Vigilante" && this.props.character.name === "Persephone"){
          let validClassSkills = ['Acrobatics', 'Bluff', 'Climb', 'Craft', 'Diplomacy', 'Disguise', 'Intimidate', 'Perform', 'Profession', 'Sense Motive', 'Stealth', 'Swim', 'Investigation', 'Society', 'Spellcraft', 'Religion']
          if (csss.skill_id === skill.id && csss.skillset_id === this.props.character.skillset.id && validClassSkills.includes(skill.name)){
            isThisAClassSkill = true
          }
        } else if (csss.skill_id === skill.id && csss.skillset_id === this.props.character.skillset.id) {
          isThisAClassSkill = true
        }
      })
    })
    if (skill.name.includes('Profession') || skill.name.includes('Perform') || skill.name.includes('Craft')){
      isThisAClassSkill = true
    }
    return isThisAClassSkill
  }

  renderAbilityScoreAbbreviation = (skill) => {
    const name = skill.name === "Climb" || skill.name === "Swim"
    const size = this.props.character_info.size === 'Tiny'
    let armor = this.props.character_info.hardcode.armor
    let abbrev
    if (name && size){
      abbrev = 'Dex'
    } else {
      abbrev = skill.ability_score.slice(0, 3)
    }
    if (armor){
      if (abbrev === 'Dex' || abbrev === 'Str'){
        abbrev += armor === 'Wooden' ? '*' : ''
        abbrev += armor === '+1 chain shirt' ? '*' : ''
      }
    }
    if (this.props.character_info.hardcode.quick){
      if (abbrev === 'Dex' || abbrev === 'Cha'){
        abbrev += '*'
      }
    }
    return abbrev
  }

  modifiedSkills = () => {
    let skills = [...this.state.skillset.skills]
    let name = this.props.character.name
    if (name === 'Merg'){
      skills.push({name: 'Profession (fence)', ability_score: 'Wisdom'})
      skills.push({name: 'Profession (sailor)', ability_score: 'Wisdom'})
      skills = skills.filter(sk => sk.name !== 'Profession')
    }
    if (name === 'Robby'){
      skills.push({name: 'Profession (sailor)', ability_score: 'Wisdom'})
      skills.push({name: 'Perform (acting)', ability_score: 'Charisma'})
      skills = skills.filter(sk => sk.name !== 'Profession')
      skills = skills.filter(sk => sk.name !== 'Perform')
    }
    if (name === 'Nettie'){
      skills.push({name: 'Perform (percussion)', ability_score: 'Charisma'})
      skills.push({name: 'Perform (strings)', ability_score: 'Charisma'})
      skills = skills.filter(sk => sk.name !== 'Perform')
    }
    if (name === 'Maddox'){
      skills.push({name: 'Craft (gears/clockwork)', ability_score: 'Intelligence'})
      skills = skills.filter(sk => sk.name !== 'Craft')
    }
    return skills.sort((a,b) => a.name > b.name ? 1 : -1)
  }

  renderSkillTableRow = () => {
    const sortedSkills = this.modifiedSkills()
    return sortedSkills.map(skill => {
      return (
        <tr key={_.random(1, 2000000)}>
          <td>{this.renderClassSkill(skill) ? "X" : null}</td>
          <td onMouseOver={(e) => this.renderTooltip(e, null, skill.ability_score)} onMouseOut={this.props.mouseOut}><strong>{this.renderAbilityScoreAbbreviation(skill)}</strong></td>
          <td className={this.raging(skill.name)} style={this.renderSkillBonus(skill, true)} onMouseOver={(e) => this.renderTooltip(e, skill.name)} onMouseOut={this.props.mouseOut}>{this.asterisk(skill.name)}</td>
          <td style={this.renderSkillBonus(skill, true)}>{this.renderSkillBonus(skill)}</td>
          <td>{this.renderNumOfRanks(skill)}</td>
        </tr>
      )}
    )
  }

// HARDCODING INSTEAD OF DYNAMIC
  // cheatingSize = (skill) => {
  //   if (this.props.character.name === "Nettie"){
  //     return "+19"
  //   } else if (this.props.character.name === "Cedrick"){
  //     return "LOOK UP THE DANG NUMBER"
  //   } else {
  //     return this.renderSkillBonus(skill)
  //   }
  // }

  asterisk = (skill) => {

    let asterisk = skill + "*"
    let name = this.props.character.name
    let hc = this.props.character_info.hardcode
    switch(skill){
      case 'Acrobatics':
        if (hc.minor === 'Frog - Minor' || hc.major === 'Frog - Major' || hc.major === 'Condor - Major' || name === 'Festus' || name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Heal':
        if (name === 'Nettie'){
          return asterisk
        } else {
          return skill
        }
      case 'Survival':
        if (name === 'Nettie'){
          return asterisk
        } else {
          return skill
        }
      case 'Swim':
        if (hc.major === 'Frog - Major' || name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Stealth':
        if (name === 'Cedrick'){
          return asterisk
        } else if (hc.major === 'Chameleon - Major') {
          return asterisk
        } else {
          return skill
        }
      case 'Intimidate':
        if (name === 'Cedrick' || name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Religion':
        if (name === 'Persephone'){
          return asterisk
        } else {
          return skill
        }
      case 'Disguise':
        if (name === 'Persephone'){
          return asterisk
        } else {
          return skill
        }
      case 'Finesse':
        if (name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Handle Animal':
        if (name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Climb':
        if (name === 'Robby'){
          return asterisk
        } else {
          return skill
        }
      case 'Sense Motive':
        if (name === 'Merg'){
          return asterisk
        } else {
          return skill
        }
      default:
        return skill
    }
  }

  raging = (skill) => {
    let array = ["Bluff", "Craft", "Diplomacy", "Disguise", "Finesse", "Handle Animal", "Investigation", "Linguistics", "Nature", "Perform", "Religion", "Society", "Spellcraft", "Stealth"]
    if (array.includes(skill) && this.props.character_info.hardcode.rage){
      return 'strike'
    }
  }

  renderTooltip = (e, skill, ability) => {
    let comment = null
    let name = this.props.character.name
    let hc = this.props.character_info.hardcode
    let armor = hc.armor
    if ((skill === "Survival" || skill === "Heal") && name === "Nettie"){
      comment = "Scrivener's Versatility"
    }
    if (skill === "Acrobatics"){
      if (hc.minor === 'Frog - Minor'){
        comment = '+4 when jumping'
      } else if (hc.major === 'Frog - Major'){
        comment = 'Treat all jumps as if you had a running start'
      } else if (hc.major === 'Condor - Major' || name === 'Festus'){
        comment = '+8 to flying check from Fly Speed'
      } else if (name === 'Robby'){
        comment = 'Derring-Do: Spend 1 Panache to add +1d6, up to 4 times'
      }
    }
    if (skill === "Swim"){
      if (hc.major === 'Frog - Major'){
        comment = 'Swim Speed'
      } else if (name === 'Robby'){
        comment = 'Derring-Do: Spend 1 Panache to add +1d6, up to 4 times'
      }
    }
    if (skill === "Stealth"){
      if (name === 'Cedrick'){
        comment = '+4 bonus in Marshes and Forests'
      }
      if (hc.major === 'Chameleon - Major'){
        comment = comment + ', +10 bonus if you are standing still'
      }
    }
    if (skill === 'Intimidate'){
      if (name === 'Cedrick'){
        comment = <span>+1 enchancement bonus from <em>ominous</em> from Ta'al'mon Ancestral Handwraps</span>
      } else if (name === 'Robby'){
        comment = 'Meanacing Swordplay: If you have at least 1 Panache, after a melee attack, Demoralize as a swift action instead of standard action'
      }
    }
    if (skill === 'Religion'){
      if (name === 'Persephone'){
        comment = <span>{this.props.character.character_klasses.length} skill ranks from <em>Headband of Vast Intelligence +2</em></span>
      }
    }
    if (skill === 'Disguise'){
      if (name === 'Persephone'){
        let currently = 'Persephone'
        let alterEgo = 'the Autumn Equinox'
        if (hc.autumn) {
          currently = 'the Autumn Equinox'
          alterEgo = 'Persephone'
        }
        comment = <span>+20 circumstance bonus to appear as {currently} if suspected to be {alterEgo}</span>
      }
    }
    if (skill === 'Finesse'){
      if (name === 'Robby'){
        comment = 'Derring-Do: Spend 1 Panache to add +1d6, up to 4 times'
      }
    }
    if (skill === 'Handle Animal'){
      if (name === 'Robby'){
        comment = 'Derring-Do: Spend 1 Panache to add +1d6 to ride checks, up to 4 times'
      }
    }
    if (skill === 'Climb'){
      if (name === 'Robby'){
        comment = 'Derring-Do: Spend 1 Panache to add +1d6, up to 4 times'
      }
    }
    if (skill === 'Sense Motive'){
      if (name === 'Merg'){
        comment = 'If the Fabric of Reality is draped over your eyes, +4 bonus.'
      }
    }
    if (ability){
      let armor = hc.armor
      if (armor && (ability === 'Strength' || ability === 'Dexterity')){
        comment = armor === 'Wooden' ? 'Armor Check Penalty: -1' : comment
        comment = armor === '+1 chain shirt' ? 'Armor Check Penalty: -1' : comment
      }
      if (hc.quick && (ability === 'Dexterity' || ability === 'Charisma')){
        comment = `Advantage on ${ability}-based checks`
      }
    }
    if (comment){
      this.props.renderTooltip(e, comment)
    }
  }


// HARDCODING INSTEAD OF DYNAMIC

  renderSkillsTable = () => {
    return (
      <table>
        <thead >
          <tr >
            <th>Class</th>
            <th>Ability</th>
            <th>Skill</th>
            <th>Bonus</th>
            <th>Ranks</th>
          </tr>
        </thead>
        <tbody >
          {this.renderSkillTableRow()}
        </tbody>
      </table>
    )
  }


  render(){
    console.log(this.props.character_info.hardcode)
    return(
      <div id='skills' className='shadow'>
        <div name="skill list">
          {!!this.state.skillset ? this.renderSkillsTable() : null}
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Skills)
