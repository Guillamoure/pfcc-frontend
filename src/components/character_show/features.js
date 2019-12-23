import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class Features extends React.Component {

  state = {
    activeFeature: 0
  }

  changeActiveFeature = (e) => {
    let id = _.parseInt(e.target.dataset.id)
    if (this.state.activeFeature === id) {
      this.setState({activeFeature: 0})
    } else {
      this.setState({activeFeature: id})
    }
  }

  renderClassFeatures = () => {
    // let klass_ids = {}
    // this.props.character.character_klasses.forEach(klass => {
    //   klass_ids[klass.klass_id] = klass.level
    // })
    let klasses = [...this.props.character.uniq_klasses]
    let justFeatures = klasses.map(kl => kl.klass_features)
    let features = _.flatten(justFeatures)
    features = this.circumventFeatures(this.props.character.name, features)
    return features.map(feature => {
      let level = this.props.character_info.classes.find(cl => cl.id === feature.klass_id).level
      let startingLevel = 20
      feature.feature_levels.forEach(fl => {
        if (fl.level < startingLevel){
          startingLevel = fl.level
        }
      })
      if (startingLevel <= level){
        let klass = this.props.classes.find(cl => cl.id === feature.klass_id)
        let name = feature.name
        if (klass && feature.name === "Weapon and Armor Proficiency"){
          name = `${feature.name} - ${this.props.classes.find(cl => cl.id === feature.klass_id).name}`
        }
        return (
          <li key={feature.id *3 -1} data-id={feature.id} onClick={this.changeActiveFeature} className='highlight'>
            <strong data-id={feature.id}>{name}</strong>
            {this.state.activeFeature === feature.id && <div style={{color: '#000'}}>{feature.description}</div>}
          </li>
        )
      } else {
        return null
      }

    })
  }

  circumventFeatures = (name, features) => {
    let newFeatures = []
    let replacedFeatures = []
    let addedFeatures = []
    if (name === 'Nettie'){
      replacedFeatures = ["Bardic Knowledge", "Well-Versed", "Versatile Performance"]
      addedFeatures = [
        {
          id: 1001,
          actions: [],
          description: 'A chronicler of worlds can take 10 on Religion checks. A number of times per day equal to her Intelligence modifier, she can take 20 on a Religion check. This ability stacks with that gained by lore master at 5th level.\n\nA chronicler of worlds can attempt all Knowledge checks untrained.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 10,
          name: "Planar Lore",
          spellcasting: null
        },
        {
          id: 1002,
          actions: [],
          description: 'A chronicler of worlds rejects cosmic morality. At 2nd level, she does not take penalties imposed by planar alignment traits, and she gains a +4 bonus on saving throws against spells and effects that vary based on their target’s alignment.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 10,
          name: "Amoral Scholar",
          spellcasting: null
        },
        {
          id: 1003,
          actions: [],
          description: 'A chronicler of worlds seeks to emulate history’s greatest scribe; gaining insight into widely varying subjects, from anatomy to discourse. At 2nd level, a chronicler of worlds selects a skill from the following list: Bluff, Diplomacy, Finesse, Heal, Intimidate, Profession (scribe), Sense Motive, or Survival. When attempting skill checks of that type, a chronicler can use her Linguistics skill bonus in place of her bonus with the chosen skill. At 6th level and every 4 levels thereafter, a chronicler of worlds selects an additional skill to gain this benefit.',
          feature_levels: [{level: 2}, {level: 6}, {level: 10}, {level: 14}, {level: 18}],
          feature_options: [],
          klass_id: 10,
          name: "Scrivener’s Versatility",
          spellcasting: null
        }
      ]
    } else if (name === 'Persephone'){
      replacedFeatures = ['Weapon and Armor Proficiency - Vigilante', 'Vigilante Specialization']
      addedFeatures = [
        {
          id: 2000,
          actions: [],
          description: <div><p>A season witch observes the cycles of life through symbolic festivals and the very real passage of time. Their covens celebrate the seasons and their impact on magic. These seasonal cycles alter their magic and mind-set, focusing their spells and hexes on a predominant energy type and philosophy.</p><p>A season witch makes a commitment to embody the sacred symbolism of a season year round, and learns her spells through communion with nature, divining secrets from shapes in the clouds or the play of leaves on the wind. At 1st level, a season witch chooses the season that defines her abilities as her patron; this choice also provides her certain benefits.</p><p>An autumn witch has dominion over the provision of the land and the passing of life. The save DCs of her spells that deal acid damage increase by 1. At 1st level, she gains either the blight hex or slumber hex as a bonus hex.</p><p>A winter witch has dominion over hearth and home. The save DCs of her spells that deal cold damage increase by 1. At 1st level, she gains either the healing hex or ward hex as a bonus hex.</p><p>This alters patron and the hex gained at 1st level.</p></div>,
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 6,
          name: "Season of the Witch",
          spellcasting: null
        },
        {
          id: 2001,
          actions: [],
          description: <span>At 1st level, the witch can use <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 18)}>feather fall</em> at will and gains a +4 racial bonus on Swim checks. At 3rd level, she can cast <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 56)}>levitate</em> once per day. At 5th level, she can <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 57)}>fly</em>, as per the spell, for a number of minutes per day equal to her level. These minutes do not need to be consecutive, but they must be spent in 1-minute increments. This hex only affects the witch.</span>,
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 6,
          name: "Flight Hex",
          spellcasting: null
        },
        {
          id: 2002,
          actions: [],
          description: <span><p>A witch can cause a creature within 30 feet to fall into a deep, magical sleep, as per the spell <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 58)}>sleep</em>. The creature receives a Will save to negate the effect. If the save fails, the creature falls asleep for a number of rounds equal to the witch’s level.</p><p>This hex can affect a creature of any HD. The creature will not wake due to noise or light, but others can rouse it with a standard action. This hex ends immediately if the creature takes damage. Whether or not the save is successful, a creature cannot be the target of this hex again for 1 day.</p></span>,
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 6,
          name: "Slumber Hex",
          spellcasting: null
        },
        {
          id: 2003,
          actions: [],
          description: 'The witch can grant a creature within 30 feet a bit of good luck for 1 round. The target can call upon this good luck once per round, allowing him to reroll any ability check, attack roll, saving throw, or skill check, taking the better result. He must decide to use this ability before the first roll is made. At 8th level and 16th level, the duration of this hex is extended by 1 round. Once a creature has benefited from the fortune hex, it cannot benefit from it again for 24 hours.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 6,
          name: "Fortune Hex",
          spellcasting: null
        },
        {
          id: 2004,
          actions: [],
          description: <div><p>The witch can cause fate to twist so that it benefits a creature within 30 feet for 1 round. Whenever that creature is targeted by an effect that requires an attack roll, including weapon attacks, the attacker must roll twice and take the worse result.</p><p>At 8th level and 16th level, the duration of this hex is extended by 1 round. A witch cannot use this ability on herself. Hexes that affect the fortune hex, such as cackle, also affect protective luck.</p></div>,
          feature_levels: [{level: 4}],
          feature_options: [],
          klass_id: 6,
          name: "Protective Luck Hex",
          spellcasting: null
        },
        {
          id: 2005,
          actions: [],
          description: <div><p>At 1st level, when a witch gains her familiar, she must also select a patron. This patron is a vague and mysterious force, granting the witch power for reasons that she might not entirely understand. While these forces need not be named, they typically hold influence over one of the following forces.</p><p>At 2nd level, and every two levels thereafter, a witch’s patron adds new spells to a witch’s list of spells known. These spells are also automatically added to the list of spells stored by the familiar. The spells gained depend upon the patron chosen. Each patron is listed by its theme. Its actual name is up to the GM and the witch to decide.</p><p>Autumn Patron: 2nd - <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 50)}>ray of enfeeblement</em>, 4th - <em className='underline-hover' onClick={() => this.props.editModal('spell', null, 42)}>create pit</em></p></div>,
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 6,
          name: "Patron: Autumn",
          spellcasting: null
        },
        {
          id: 2006,
          actions: [],
          description: <div><p>At 1st level, a witch forms a close bond with a familiar, a creature that teaches her magic and helps to guide her along her path. Familiars also aid a witch by granting her skill bonuses, additional spells, and help with some types of magic. This functions like the wizard’s arcane bond class feature, except as noted in the Witch’s Familiar section.</p><p>A witch must commune with her familiar each day to prepare her spells. Familiars store all of the spells that a witch knows, and a witch cannot prepare a spell that is not stored by her familiar. A witch’s familiar begins play storing all of the 0-level witch spells plus three 1st level spells of the witch’s choice. The witch also selects a number of additional 1st-level spells equal to her Intelligence modifier to store in her familiar. At each new witch level, she adds two new spells of any spell level or levels that she can cast (based on her new witch level) to her familiar. A witch can also add additional spells to her familiar through a special ritual.</p></div>,
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 6,
          name: "Witch's Familiar: Chubbs",
          spellcasting: null
        },
        {
          id: 2007,
          actions: [],
          description: 'Vigilantes are proficient with all simple and martial weapons, light armor, and shields (except tower shields). They can cast summoner spells (see spellcasting below) while wearing light armor without incurring the normal arcane spell failure chance.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 7,
          name: "Weapon and Armor Proficiency - Vigilante - Magical Child",
          spellcasting: null
        },
        {
          id: 2008,
          actions: [],
          description: 'A magical child’s transformation between identities is assisted by magic. This makes it faster than usual, but also more noticeable. A magical child can normally transform between her identities in 5 rounds, though this improves to a standard action with the quick change social talent and a swift action with the immediate change social talent. However, the transformation is quite a spectacle, involving loud sounds or music, brilliant colorful energies, and swift motions.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 7,
          name: "Transformation Sequence",
          spellcasting: null
        },
        {
          id: 2009,
          actions: [],
          description: <span><p>A magical child starts play with a magical spirit guide in the form of a familiar, using her vigilante level as her effective wizard level. The familiar also has a social identity as a seemingly normal animal, though vigilantes with outlandish familiars might still need to hide the familiar.</p><p>At 3rd level, the magical child’s familiar reveals another aspect of its form, and its vigilante identity changes into a creature on the Improved Familiar list that would be available to a 3rd-level spellcaster (the animal guide’s social identity always remains as the original normal animal).</p><p>The familiar can change its vigilante identity again when the magical child reaches 5th and 7th level, each time to familiars available at those levels. The Improved Familiar feat’s alignment restrictions apply to this ability, but only the magical child’s vigilante identity needs to have an alignment that fulfills the alignment requirements of the improved familiar. The familiar’s new vigilante form choices are permanent, and it cannot transform back into its former vigilante identities until 9th level, when the familiar gains the change shape universal monster ability if it doesn’t already have it. It can use this ability at will when in its vigilante identity to transform into any of its four vigilante identities.</p><p>In vigilante form, a magical child’s familiar gains an amount of DR/magic equal to her vigilante level.</p><p>This doesn’t stack with any DR/magic that her vigilante form might already possess.</p><p>If a magical child’s familiar dies, its consciousness simply leaves its body, and the magical child can replace its body after 24 hours. To do so, she must conduct an 8-hour ritual that costs 200 gp per her vigilante level, but once the ritual is complete, the familiar returns in a new body. It retains all of its memories from its earlier service to the magical child.</p></span>,
          feature_levels: [{level: 1}, {level: 3}, {level: 5}, {level: 7}, {level: 9}],
          feature_options: [],
          klass_id: 7,
          name: "Animal Guide",
          spellcasting: null
        },
        {
          id: 2010,
          actions: [],
          description: 'A magical child casts arcane spells and cantrips as an unchained summoner. She can cast any spell she knows without preparing it ahead of time, assuming she has not yet used up her allotment of spells per day for the spell’s level, and she chooses her spells known from the summoner spell list (she cannot choose spells that would affect an eidolon). A magical child’s selection of spells is extremely limited; use Table: Unchained Summoner Spells Known to determine how many spells the magical child knows at each level. A magical child needs to commune with her animal guide for 1 hour in order to replenish her daily spell slots.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 7,
          name: "Spellcasting",
          spellcasting: true
        },
        {
          id: 2011,
          actions: [],
          description: 'The vigilante becomes known for deeds and abilities regardless of his current identity. This renown grants him favorable treatment in civilized company and lends him an air of menace while facing down his enemies. While he is in his social identity, a vigilante can spend 1 week gaining renown among the locals of any community of no more than about 200 individuals (a village, if using settlement population ranges). This could be the entire community or a smaller neighborhood in a larger settlement. He must spend at least 4 hours each day socializing and making contacts. After spending 1 week doing this, whenever he is in his social identity, all NPCs in the community have a starting attitude toward him that is one category better, as long as each person’s initial attitude would have at least been indifferent (see the Diplomacy skill description). While he gains renown in an area using his social identity, he also spreads rumors and tales about his vigilante identity. Once he has gained renown in a community, he gains a +4 circumstance bonus on Intimidate checks whenever he is in his vigilante identity. This bonus applies only while he is near the community in which he has gained renown; he must be within a number of miles equal to his vigilante level. A vigilante can hold renown in a limited number of communities (normally one, with other social talents allowing two). If he gains renown in a new community, he must decide which one of his previous communities to lose. These effects are subject to GM approval. For example, the GM might rule that an NPC or monster has not heard any tales about the vigilante. Or, a foe may have a starting attitude toward him that’s one category worse, rather than one category better.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 7,
          name: "Social Talent - Renown",
          spellcasting: false
        },
        {
          id: 2012,
          actions: [],
          description: 'Needs to be picked',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 7,
          name: "Vigilante Talent - None",
          spellcasting: false
        },

      ]

    } else if (name === 'Cedrick'){
      replacedFeatures = []
      addedFeatures = [
        {
          id: 3000,
          actions: [],
          description: 'The bull is a fierce charger and is adept at trampling its foes, pounding them to a bloody pulp.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 4,
          name: "Shifter Aspect - Bull",
          spellcasting: false
        },
        {
          id: 3001,
          actions: [],
          description: 'The aspect of the frog grants great mobility in leaping through the air and swimming in water, and surprising tactics in combat. The poison secreted by a frog can cause hallucinations, and poison damage at a high enough dosage.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 4,
          name: "Shifter Aspect - Frog",
          spellcasting: false
        },
        {
          id: 3002,
          actions: [],
          description: 'The aspect of the chameleon grants the power of near invisibility to the shifter. Combined with a powerful tongue and quick movement, the chameleon can be a dangerous threat even when visible.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 4,
          name: "Shifter Aspect - Chameleon",
          spellcasting: false
        },
        {
          id: 3003,
          actions: [],
          description: 'The aspect of the squid embodies its aggressive underwater tactics, striking with multiple tentacles, and disorienting targets with ink clouds and quick movements.',
          feature_levels: [{level: 4}],
          feature_options: [],
          klass_id: 4,
          name: "Shifter Aspect - Squid",
          spellcasting: false
        },
        {
          id: 3004,
          actions: [],
          description: 'The aspect of the condor assumes a creature with a large wingspan that can be used to create great gusts that propel the condor across the world.',
          feature_levels: [{level: 6}],
          feature_options: [],
          klass_id: 4,
          name: "Shifter Aspect - Condor",
          spellcasting: false
        },
      ]
    }
    newFeatures = features.filter(f => {
      let klass = this.props.classes.find(cl => cl.id === f.klass_id)
      let name = f.name
      if (klass && f.name === "Weapon and Armor Proficiency"){
        name = `${f.name} - ${this.props.classes.find(cl => cl.id === f.klass_id).name}`
      }
      return !replacedFeatures.includes(name)
    })
    addedFeatures.forEach(af => newFeatures.push(af))
    return newFeatures
  }

  // renderFeatures = (max_lvl, id) => {
  //   this.props.character.klass_features.map(feature => {
  //     if (feature.level_learned <= max_lvl && feature.klass_id === id){
  //       return (
  //         <div>
  //           <span>{feature.name}</span>
  //           <span>{feature.description}</span>
  //         </div>
  //       )
  //     }
  //   })
  // }

  render () {
    return(
      <div style={{padding: '1em'}}>
      {this.renderClassFeatures()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Features)
