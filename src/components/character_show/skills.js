import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class Skills extends React.Component {

  state = {
    skillset: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/skillsets/${this.props.character.skillset.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({skillset: data.skillset})
    })
  }

  renderSkillBonus = (skill, style) => {
    const score = this.props.character_info.ability_scores[_.lowerCase(skill.ability_score)]
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
    const largeMorph = ['Bull - Major', 'Condor - Major', 'Frog - Major'].includes(hc.major)
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
    if (skill.ability_score === "Intelligence" && name === "Persephone"){
      mod += 1
    }
    // check to see if the starting mod is modified
    let ogMod = mod
    if (skill.ability_score === 'Strength'){
      if (largeMorph){
        mod += 2
      }
      if (hc.minor === 'Bull - Minor'){
        mod +=1
      }
    }
    if (skill.ability_score === 'Dexterity'){
      if (largeMorph){
        mod -= 1
      }
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
    let skillRanks = this.props.character.character_skillset_skills.find(chsss => chsss.skill_id === skill.id)
    if (skill.name === 'Religion' && this.props.character.name === "Persephone"){
      skillRanks = skillRanks || {ranks: this.props.character.character_klasses.length}
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
    return isThisAClassSkill
  }

  renderAbilityScoreAbbreviation = (skill) => {
    const name = skill.name === "Climb" || skill.name === "Swim"
    const size = this.props.character_info.size === 'Tiny'
    if (name && size){
      return 'Dex'
    } else {
      return skill.ability_score.slice(0, 3)
    }
  }

  renderSkillTableRow = () => {
    const sortedSkills = this.state.skillset.skills.sort((a,b) => a.name > b.name ? 1 : -1)
    return sortedSkills.map(skill => {
      return (
        <tr key={_.random(1, 2000000)}>
          <td>{this.renderClassSkill(skill) ? "X" : null}</td>
          <td><strong>{this.renderAbilityScoreAbbreviation(skill)}</strong></td>
          <td className={this.raging(skill.name)} style={this.renderSkillBonus(skill, true)} onMouseOver={(e) => this.renderTooltip(e, skill.name)} onMouseOut={this.props.mouseOut}>{this.asteriks(skill.name)}</td>
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

  asteriks = (skill) => {
    let asterik = skill + "*"
    let name = this.props.character.name
    let hc = this.props.character_info.hardcode
    switch(skill){
      case 'Acrobatics':
        if (hc.minor === 'Frog - Minor' || hc.major === 'Frog - Major' || hc.major === 'Condor - Major' || name === 'Festus'){
          return asterik
        } else {
          return skill
        }
      case 'Heal':
        if (name === 'Nettie'){
          return asterik
        } else {
          return skill
        }
      case 'Survival':
        if (name === 'Nettie'){
          return asterik
        } else {
          return skill
        }
      case 'Swim':
        if (hc.major === 'Frog - Major'){
          return asterik
        } else {
          return skill
        }
      case 'Stealth':
        if (name === 'Cedrick'){
          return asterik
        } else {
          return skill
        }
      case 'Intimidate':
        if (name === 'Cedrick'){
          return asterik
        } else {
          return skill
        }
      case 'Religion':
        if (name === 'Persephone'){
          return asterik
        } else {
          return skill
        }
      case 'Disguise':
        if (name === 'Persephone'){
          return asterik
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

  renderTooltip = (e, skill) => {
    let comment = null
    let name = this.props.character.name
    let hc = this.props.character_info.hardcode
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
      }
    }
    if (skill === "Swim"){
      if (hc.major === 'Frog - Major'){
        comment = 'Swim Speed'
      }
    }
    if (skill === "Stealth"){
      if (name === 'Cedrick'){
        comment = '+4 bonus in Marshes and Forests'
      }
    }
    if (skill === 'Intimidate'){
      if (name === 'Cedrick'){
        comment = <span>+1 enchancement bonus from <em>ominous</em> from Ta'al'mon Ancestral Handwraps</span>
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
