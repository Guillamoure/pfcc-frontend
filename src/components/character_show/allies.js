import React from 'react'
import { connect } from 'react-redux'

import AlliesTab from '../allies_tab.js'

class Allies extends React.Component {

  state ={
    activeAlly: null
  }

  componentDidMount() {

  }

  collectMonsters = () => {
    let monsters = []
    switch(this.props.character.name){
      case("Nettie"):
        monsters = this.nettie()
        break
      case("Persephone"):
        monsters = this.pepper()
        break
      case("Cedrick"):
        monsters = this.cedrick()
        break
      case("Maddox"):
        monsters = this.maddox()
        break
      default:
        break
    }
    return monsters
  }

  renderTabClick = (ally, index) => {
    this.setState({activeAlly: index})
  }

  removeAlly = (index) => {
    this.setState({activeAlly: null}, () => this.props.dispatch({type: 'REMOVE ALLY', monster: index}))
  }

  renderAlly = () => {
    let monster = this.collectMonsters()[this.state.activeAlly]
    if (monster || this.props.character.name === "Persephone" || this.props.character.name === 'Cedrick' || this.props.character.name === 'Maddox'){
      if (!monster){
        monster = this.collectMonsters()[0]
      }
      return (
        <section>
          <h4>{monster.name}</h4>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div>{monster.alignment} {monster.size} {monster.type} </div>
            <div><u>Init</u>:{monster.init} {monster.senses.join("; ")} </div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div><strong>AC</strong> {monster.ac.base}, touch {monster.ac.touch}, flat-footed {monster.ac.ff} ({monster.ac.details})</div>
            <div><strong>hp</strong> {monster.hp}</div>
            <div><strong>Fort</strong> {monster.fort}, <strong>Ref</strong> {monster.ref}, <strong>Will</strong> {monster.will}</div>
            <div>{!!monster.def.length && <span><u>Defensive Abilities</u> {monster.def.join(", ")} </span>}{!!monster.dr.length && <span><u>DR</u> {monster.dr.join(", ")} </span>}{!!monster.immune.length && <span><u>Immune</u> {monster.immune.join(", ")} </span>}{!!monster.resist.length && <span><u>Resist</u> {monster.resist.join(", ")} </span>}{!!monster.weaknesses.length && <span><u>Weaknesses</u> {monster.weaknesses.join(", ")} </span>}</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div><strong>Speed</strong> {monster.speed.join(", ")}</div>
            <div>Melee {monster.melee.join("\n\n")}</div>
            <div>{!!monster.range.length && `Range ${monster.range.join("\n\n")}`}</div>
            <div>{!!monster.space && <span><strong>Space</strong> {monster.space} </span>}{!!monster.reach && <span><strong>Reach</strong> {monster.reach} </span>}</div>
            <div>{!!monster.spAtt.length && `Special Attacks ${monster.spAtt.join("\n\n")}`}</div>
            <div>{/*Spells */}</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div>Str {monster.stats.str ? monster.stats.str : "-"}, Dex {monster.stats.dex ? monster.stats.dex : "-"}, Con {monster.stats.con ? monster.stats.con : "-"}, Int {monster.stats.int ? monster.stats.int : "-"}, Wis {monster.stats.wis ? monster.stats.wis : "-"}, Cha {monster.stats.cha ? monster.stats.cha : "-"}</div>
            <div>Base Atk {monster.bab > 0 ? `+${monster.bab}` : monster.bab}; CMB {monster.cmb}; CMD {monster.cmd}</div>
            <div>{!!monster.feats.length && <span><u>Feats</u> {monster.feats.join(", ")}</span>}</div>
            <div>{!!monster.skills.length && <span><u>Skills</u> {monster.skills.join(", ")}</span>}</div>
            <div>{!!monster.languages.length && <span><u>Languages</u> {monster.languages.join(", ")}</span>}</div>
          </div>
          <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}>
            <div>{monster.special.map(sp => <section><div><strong>{sp.name}</strong> ({sp.type})</div><p>{sp.description}</p></section>)}</div>
          </div>
        </section>
      )
    } else {
      return <h3>Select an Ally from the Menu!</h3>
    }
  }

  nettie = () => {
    let monsters = []
    let reduxMonsters = this.props.character_info.hardcode.monsters || []
    reduxMonsters.forEach(monster => {
      switch(monster){
        case ('air elemental'):
          let airElemental = {
        name: "Air Elemental",
        alignment: "N",
        size: "Small",
        type: "outsider (air)",
        init: "+7",
        senses: [
          "darkvision 60 ft",
          "Perception +4"
        ],
        ac: {
          base: 17,
          touch: 14,
          ff: 14,
          details: "+3 Dex, +3 natural, +1 size"
        },
        hp: 13,
        fort: '+4',
        ref: '+6',
        will: '+0',
        def: [
          "air mastery"
        ],
        dr: [],
        immune: [
          "bleed",
          "paralysis",
          "poison",
          "sleep",
          "stun",
          "critical hits",
          "flanking",
          "precision damage"
        ],
        resist: [],
        weaknesses: [],
        speed: [
          "fly 100 ft (perfect)"
        ],
        melee: [
          "slam +6 (1d4+1)"
        ],
        range: [],
        space: null,
        reach: null,
        spAtt: [
          "whirlwind (DC 12, 10-20 ft.)"
        ],
        stats: {
          str: 12,
          dex: 17,
          con: 12,
          int: 4,
          wis: 11,
          cha: 11
        },
        bab: 2,
        cmb: '+2',
        cmd: '15',
        feats: [
          "Flyby Attack",
          "Improved Initiative",
          "Weapon Finesse"
        ],
        skills: [
          "Acrobatics +7",
          "Finesse +7",
          "Perception +4",
          "Religion +1",
          "Stealth +11"
        ],
        languages: [
          "Auran"
        ],
        special: [
          {name: "Air Mastery", description: "Airborne creatures take a –1 penalty on attack and damage rolls against an air elemental.", type: "Ex"},
          {name: "Whirlwind", description: "The whirlwind is always 5 feet wide at its base, but its height and width at the top vary from creature to creature (minimum 10 feet high). A whirlwind’s width at its peak is always equal to half of its height. The creature controls the exact height, but it must be at least 10 feet high.\n\nThe whirlwind form does not provoke attacks of opportunity, even if the creature enters the space another creature occupies. Another creature might be caught in the whirlwind if it touches or enters the whirlwind, or if the whirlwind moves into or through the creature’s space. A creature in whirlwind form cannot make its normal attacks and does not threaten the area around it.\n\nCreatures one or more size categories smaller than the whirlwind might take damage when caught in the whirlwind (generally damage equal to the monster’s slam attack for a creature of its size) and may be lifted into the air. An affected creature must succeed on a Reflex save (DC 10 + half monster’s HD + the monster’s Strength modifier) when it comes into contact with the whirlwind or take damage as if it were hit by the whirlwind creature’s slam attack. It must also succeed on a second Reflex save or be picked up bodily and held suspended in the powerful winds, automatically taking the indicated damage each round. A creature that can fly is allowed a Reflex save each round to escape the whirlwind. The creature still takes damage but can leave if the save is successful.\n\nCreatures trapped in the whirlwind cannot move except to go where the whirlwind carries them or to escape the whirlwind. Trapped creatures can otherwise act normally, but must succeed on a concentration check (DC 15 + spell level) to cast a spell. Creatures caught in the whirlwind take a –4 penalty to Dexterity and a –2 penalty on attack rolls. The whirlwind can have only as many creatures trapped inside at one time as will fit inside the whirlwind’s volume. The whirlwind can eject any carried creatures whenever it wishes as a free action, depositing them in its space.\n\nIf the whirlwind’s base touches the ground, it creates a swirling cloud of debris. This cloud is centered on the creature and has a diameter equal to half the whirlwind’s height. The cloud obscures all vision, including darkvision, beyond 5 feet. Creatures 5 feet away have concealment, while those farther away have total concealment. Those caught in the cloud of debris must succeed on a concentration check (DC 15 + spell level) to cast a spell.", type: "Su"}
        ]
      }
          monsters.push(airElemental)
          break
        case ('lemure'):
          let lemure = {
          name: "Lemure",
          alignment: "LE",
          size: "Medium",
          type: "outsider (devil, evil, extraplanar, lawful)",
          init: "+0",
          senses: [
            "darkvision 60 ft",
            "see in darkness",
            "Perception +4"
          ],
          ac: {
            base: 14,
            touch: 10,
            ff: 14,
            details: "+4 natural"
          },
          hp: 13,
          fort: '+4',
          ref: '+3',
          will: '+0',
          def: [],
          dr: [
            "5/good or silver"
          ],
          immune: [
            "fire",
            "mind-affecting effects",
            "poison"
          ],
          resist: [
            "acid 10",
            "cold 10"
          ],
          weaknesses: [],
          speed: [
            "20 ft"
          ],
          melee: [
            "2 claws +2 (1d4)"
          ],
          range: [],
          space: null,
          reach: null,
          spAtt: [],
          stats: {
            str: 11,
            dex: 10,
            con: 12,
            int: null,
            wis: 11,
            cha: 5
          },
          bab: 2,
          cmb: '+2',
          cmd: '12',
          feats: [],
          skills: [],
          languages: [
            "Celestial",
            "Infernal",
            "Draconic",
            "Telepathy"
          ],
          special: [
            {name: "See in Darkness", description: "Some devils can see perfectly in darkness of any kind, even that created by a deeper darkness spell.", type: "Su"},
            {name: "Telepathy", description: "The creature can mentally communicate with any other creature within a certain range (specified in the creature’s entry, usually 100 feet) that has a language. It is possible to address multiple creatures at once telepathically, although maintaining a telepathic conversation with more than one creature at a time is just as difficult as simultaneously speaking and listening to multiple people at the same time", type: "Su"}
          ]
        }
          monsters.push(lemure)
          break
        case ('fire elemental'):
          let fireElemental = {}
          monsters.push(fireElemental)
          break
        case('water elemental'):
          let waterElemental = {}
          monsters.push(waterElemental)
          break
        default:
          break
      }
    })
    return monsters
  }

  pepper = () => {
    let monsters = []
    let chubbs = {
      name: "Chubbs",
      alignment: "N",
      size: "Diminutive",
      type: "magical beast",
      init: "+4",
      senses: [
        "low-light vision",
        "Perception +1"
      ],
      ac: {
        base: 22,
        touch: 18,
        ff: 18,
        details: "+4 Dex, +4 size, +4 natural"
      },
      hp: "CALCULATE: HALF OF PEPPER'S HP",
      fort: 'CALCULATE: PEPPERS SAVES',
      ref: 'CALCULATE: PEPPERS SAVES',
      will: 'CALCULATE: PEPPERS SAVES',
      def: [],
      dr: ['In Vigilante Form, DR 2/magic'],
      immune: [],
      resist: [],
      weaknesses: [],
      speed: [
        "20 ft",
        "climb 20 ft."
      ],
      melee: [
        "bite +8 (1d2–4)"
      ],
      range: [],
      space: "1 ft",
      reach: "0 ft",
      spAtt: [],
      stats: {
        str: 2,
        dex: 19,
        con: 9,
        int: 9,
        wis: 12,
        cha: 9
      },
      bab: "CALCULATE: PEPPER'S BAB",
      cmb: '+0',
      cmd: '6 (10 vs. trip)',
      feats: [
        "Weapon Finesse"
      ],
      skills: [
        "Acrobatics +8",
        "Climb +12",
        "For each skill in which either the master or the familiar has ranks, use either the normal skill ranks for an animal of that type or the master’s skill ranks, whichever is better. In either case, the familiar uses its own ability modifiers. Regardless of a familiar’s total skill modifiers, some skills may remain beyond the familiar’s ability to use. Familiars treat Acrobatics, Climb, Fly, Perception, Perform, Stealth, and Swim as class skills."
      ],
      languages: [],
      special: [
        {name: "Affinity for My Team", description: "A mascot is the heart and soul of its team. At first, the team consists of only the familiar and its master, but at 3rd level and every 3 levels thereafter, a mascot can add an additional member to its team. A mascot’s empathic link extends to all members of its team. A mascot can add or remove one team member over the course of a day.", type: "Su"},
        {name: "Lucky Mascot", description: "Whenever a mascot uses the aid another action to improve a team member’s attack roll or AC, that team member also gains a +1 luck bonus to AC for 1 round.", type: "Su"},
        {name: "Share Spells", description: "The witch may cast a spell with a target of “You” on her familiar (as a touch spell) instead of on herself. A witch may cast spells on her familiar even if the spells do not normally affect creatures of the familiar’s type (magical beast). Spells that target a mascot via its share spells ability function at its master’s caster level – 2. The mascot also benefit from the spells of any team member when it is using share spells.", type: "Ex"},
        {name: "Deliver Touch Spells", description: "If the master and the familiar are in contact at the time the master casts a touch spell, she can designate his familiar as the “toucher.” The familiar can then deliver the touch spell just as the master would. As usual, if the master casts another spell before the touch is delivered, the touch spell dissipates. Spells delivered by a mascot’s deliver touch spells ability function at its master’s caster level – 2. The mascot can deliver the touch spells of any of its team members.", type: "Su"},
        {name: "Speak with Team", description: "A mascot gains the ability to speak with all members of its team verbally as if using speak with master.", type: "Ex"}
      ]
    }
    monsters.push(chubbs)
    return monsters
  }

  cedrick = () => {
    let monsters = []
    let hoo = {
      name: "Hoo",
      alignment: "N",
      size: "Medium",
      type: "outsider (air, cold, elemental, extraplanar, water)",
      init: "+0",
      senses: [
        "darkvision 60 ft.",
        "snow vision",
        "Perception +7"
      ],
      ac: {
        base: 16,
        touch: 10,
        ff: 16,
        details: "+6 natural"
      },
      hp: 30,
      fort: '+6',
      ref: '+4',
      will: '+1',
      def: [],
      dr: [],
      immune: [
        'cold',
        "bleed",
        "paralysis",
        "poison",
        "sleep",
        "stun",
        "critical hits",
        "flanking",
        "precision damage"
      ],
      weaknesses: [
        'vulnerable to fire'
      ],
      resist: [],
      speed: [
        "20 ft",
        "burrow (snow and ice only) 20 ft.",
        'swim 60 ft.'
      ],
      melee: [
        "slam +7 (1d6+4 plus 1d4 cold)"
      ],
      range: [],
      space: null,
      reach: null,
      spAtt: [
        'numbing cold (DC 14)'
      ],
      stats: {
        str: 16,
        dex: 10,
        con: 15,
        int: 4,
        wis: 11,
        cha: 11
      },
      bab: "+4",
      cmb: '+7',
      cmd: "17 (can't be tripped)",
      feats: [
        "Power Attack",
        "Cleave"
      ],
      skills: [
        "Religion +4",
        "Perception +7",
        "Stealth +7",
        "Swim +11"
      ],
      languages: [
        'Aquan'
      ],
      special: [
        {name: "Snow Vision", description: "Hoo can see perfectly well in snowy conditions and does not take any penalties on Perception checks while in snow.", type: "Ex"},
        {name: "Numbing Cold", description: "When Hoo deals cold damage to a creature, that creature must succeed on a Fortitude save or be staggered for 1 round. The save DC is listed in the elemental’s stat block and is Constitution-based.", type: "Su"},
        {name: "Ice Gliding", description: "A burrowing Hoo can pass through nonmagical ice and snow as easily as a fish swims through water. Its burrowing leaves behind no tunnel or hole, nor does it create any ripple or other sign of its presence. A control water spell cast on an area containing a burrowing Hoo flings the elemental back 30 feet, stunning Hoo for 1 round unless it succeeds on a DC 15 Fortitude save.", type: "Su"},
        {name: "Ice Walking", description: "This ability works like the spider climb spell, but the surfaces the elemental climbs must be icy. The elemental can move across icy surfaces without penalty and does not need to make Acrobatics checks to run or charge on ice.", type: "Ex"}
      ]
    }
    monsters.push(hoo)
    return monsters
  }

  maddox = () => {
    let monsters = []
    let b8 = {
      name: "B8-triX",
      alignment: "N",
      size: "Tiny",
      type: "construct",
      init: "+2",
      senses: [
        "blindsight 30 ft.",
        "Perception +2"
      ],
      ac: {
        base: 19,
        touch: 15,
        ff: 16,
        details: "+2 Dex, +1 dodge, +2 size, +4 natural"
      },
      hp: 'HALF OF MADDOX HP',
      fort: 'MADDOX FORTITUDE',
      ref: 'MADDOX REFLEX',
      will: 'MADDOX WILL',
      def: [],
      dr: [],
      immune: [
        'mind-affecting effects',
        'disease',
        'death effects',
        'necromancy effects',
        'paralysis',
        'poison',
        'sleep',
        'stunning',
        'ability damage',
        'ability drain',
        'fatigue',
        'exhaustion',
        'energy drain',
        'nonlethal damage',
        'any effect that requires a Fortitude save (unless the effect also works on objects, or is harmless)'
      ],
      weaknesses: [],
      resist: [],
      speed: [
        "0 ft",
        'fly 30 ft.'
      ],
      melee: [
        "slam +0 (1d4-3)"
      ],
      range: [],
      space: '2 1/2 ft',
      reach: '0 ft',
      spAtt: [],
      stats: {
        str: 4,
        dex: 15,
        con: '-',
        int: 9,
        wis: 14,
        cha: 5
      },
      bab: "MADDOX BAB",
      cmb: '+1',
      cmd: "9",
      feats: [
        "Dodge"
      ],
      skills: [
        "Fly +10",
        "Acrobatics +8",
        "Heal +7",
        "Investigation +5",
        "Linguistics +5",
        "Nature +5",
        "Perception +10",
        "Religion +5",
        "Spellcraft +5",
        "Survival +5"
      ],
      languages: [
        "Common (can't speak)"
      ],
      special: [
        {name: "Ioun Affinity", description: "An ioun wyrd can integrate a number of ioun stones into its body equal to 1 + half its Hit Dice. Because an ioun wyrd sees all ioun stones as equal and gains no bene ts from them, the wyrd’s ioun stones can be swapped out by any creature the wyrd trusts.", type: "Su"},
        {name: "Share Iouns", description: "A character with an ioun wyrd familiar gains the bene t of the wyrd’s ioun stones as long as the character is within 30 feet of the ioun wyrd.", type: "Su"},
        {name: "Echo", description: <span>Once per day when delivering a touch spell, an arcane amplifier can apply the <span className='underline-hover' onClick={() => this.props.editModal('metamagic')}>Extend Spell metamagic feat</span> to the spell.</span>, type: "Su"},
        {name: "Share Spells", description: "You may cast a spell with a target of “You” on his familiar (as a touch spell) instead of on yourself. You may cast spells on your familiar even if the spells do not normally affect creatures of the familiar’s type.", type: "Su"},
        {name: "Empathic Link", description: "You have an empathic link with your familiar to a 1 mile distance. You can communicate empathically with the familiar, but cannot see through its eyes. Because of the link’s limited nature, only general emotions can be shared. You have the same connection to an item or place that his familiar does.", type: "Su"},
        {name: "Deliver Touch Spells", description: "Your familiar can deliver touch spells for you. If you and the familiar are in contact at the time you cast a touch spell, you can designate your familiar as the “toucher.” The familiar can then deliver the touch spell just as you would. As usual, if you cast another spell before the touch is delivered, the touch spell dissipates.", type: "Su"},
        {name: "Speak with Master", description: "You and your familiar can communicate verbally as if you were using a common language. Other creatures do not understand the communication without magical help.", type: "Ex"},
        {name: "Reverberate", description: <span>Once per day when delivering a touch spell, an arcane amplifier can apply either the <span className='underline-hover' onClick={() => this.props.editModal('metamagic')}>Empower Spell metamagic feat</span> to the spell or use the <span className='underline-hover' onClick={() => this.props.editModal('metamagic')}>Heighten Spell metamagic feat</span> to increase its spell level by 2.</span>, type: "Su"}
      ]
    }
    monsters.push(b8)
    return monsters
  }

  render(){
    console.log(this.state.activeAlly)
    return(
      <div>
        <AlliesTab renderTabClick={this.renderTabClick} allies={this.props.character_info.hardcode.monsters} activeAlly={this.state.activeAlly} character={this.props.character.name} removeAlly={this.removeAlly}/>
        {this.renderAlly()}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Allies)
