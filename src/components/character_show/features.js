import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { modalAction } from '../../helper_functions/action_creator/popups'

class Features extends React.Component {

  state = {
    activeFeature: 0
  }

  changeActiveFeature = (id) => {
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
    // let features = _.flatten(justFeatures)
    let features = [...this.props.character.applicable_klass_features]
    features = this.circumventFeatures(this.props.character.name, features)
    return features.map(feature => {
      // let level = this.props.character_info.classes.find(cl => cl.id === feature.klass_id).level
      // let startingLevel = 20
      // feature.feature_levels.forEach(fl => {
      //   if (fl.level < startingLevel){
      //     startingLevel = fl.level
      //   }
      // })
      // if (startingLevel <= level){
        let klass = klasses.find(cl => cl.id === feature.klass_id)
        let name = feature.name
        if (klass && feature.name === "Weapon and Armor Proficiency"){
          name = `${feature.name} - ${klass.name}`
        }
				let description = feature.description
				if (feature.associated_spells.length) {
					let domDescArray = []
					feature.associated_spells.forEach(sp => {
						let name = sp.name.toLowerCase()
						let descArray = description.split(name)
						for (let i = 0; i < descArray.length; i++){
							domDescArray.push(descArray[i])
							if (i + 1 < descArray.length){
								domDescArray.push(" ")
								domDescArray.push(<em className="underline-hover" onClick={() => modalAction("spellDescription", sp)}>{name}</em>)
								domDescArray.push(" ")
							}
						}
					})
					description = <span>{domDescArray}</span>
				}

        return (
          <li key={(feature.id * 3) -1} onClick={() => this.changeActiveFeature(feature.id)} className='highlight mobile-selected-tab-content' style={{maxHeight: window.outerHeight * 0.4}}>
            <strong>{name}</strong>
            {this.state.activeFeature === feature.id && <div style={{color: '#000'}}>{description}</div>}
          </li>
        )
      // } else {
      //   return null
      // }

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
    } else if (name === 'Maddox'){
      replacedFeatures = []
      addedFeatures = [
        {
          id: 4000,
          actions: [],
          description: 'An arcanist with this exploit can acquire a familiar as the arcane bond wizard class feature, using her arcanist level as her wizard level to determine any of the statistics and abilities of the familiar. If the arcanist receives a familiar from another class, her levels of arcanist stack with the levels from that class when determining the familiar’s statistics and abilities (this ability does not stack with a familiar gained through the bloodline development exploit; she must choose one or the other).',
          feature_levels: [{level: 6}],
          feature_options: [],
          klass_id: 8,
          name: 'Arcanist Exploit - Familiar',
          spellcasting: false
        },
        {
          id: 4001,
          actions: [],
          description: 'The arcanist can expend 1 point from her arcane reservoir to create a dimensional crack that she can step through to reach another location. This ability is used as part of a move action or withdraw action, allowing her to move up to 10 feet per arcanist level to any location she can see. This counts as 5 feet of movement. She can only use this ability once per round. She does not provoke attacks of opportunity when moving in this way, but any other movement she attempts as part of her move action provokes as normal.',
          feature_levels: [{level: 5}],
          feature_options: [],
          klass_id: 8,
          name: 'Arcanist Exploit - Dimensional Slide',
          spellcasting: false
        },
        {
          id: 4002,
          actions: [],
          description: 'The arcanist can expend 1 point from his arcane reservoir when he rolls initiative to allow himself or an ally within 30 feet to roll 1d4 and add it to that character’s initiative result. At 5th level, the chronomancer can expend 2 points from his arcane reservoir as an immediate action to apply this benefit to a saving throw he has just rolled (but before the result is revealed). At 10th level, the die size increases to 1d6.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 8,
          name: 'Arcanist Exploit - Forewarned',
          spellcasting: false
        },
        {
          id: 4003,
          actions: [],
          description: 'As an immediate action after losing a spell due to a failed concentration check or after casting a spell that had no effect (such as due to successful saving throws, a failed caster level check to overcome spell resistance, or other immunities), the arcanist can expend a number of points from his arcane reservoir equal to half the spell’s level (minimum 1) to immediately prepare the spell again, as if it had not been cast. Any material components expended in the original casting remain expended, as are actions used to cast the original spell.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 8,
          name: 'Arcanist Exploit - Rewind',
          spellcasting: false
        },
        {
          id: 4004,
          actions: [],
          description: "As an immediate action the arcanist can steal time from a target. The arcanist spends 1 point from his arcane reservoir and makes a melee touch attack. If successful, the target must make a Will save (DC 10 +  half of the arcanist's level + his Charisma modifier) or suffer a penalty to AC, Reflex saving throws, and base speed. Tis effect lasts for 1 round per arcanist level. The penalty suffered is equal to -1 to AC and Reflex saves as well as a 5-foot penalty to base speed, and increases to -2 and -10-foot at 8th level, and -3 and -15-foot at 16th level. The arcanist gains a bonus to AC and Reflex saving throws and an enhancement bonus to base speed equal to the penalty inflicted on the target for the duration of this effect.",
          feature_levels: [{level: 7}],
          feature_options: [],
          klass_id: 8,
          name: 'Arcanist Exploit - Steal Time',
          spellcasting: false
        },
      ]
    } else if (name === 'Merg'){
      replacedFeatures = ['Fast Movement', 'Uncanny Dodge', 'Improved Uncanny Dodge', 'Damage Reduction', 'Danger Sense']
      addedFeatures = [
        {
          id: 4999,
          actions: [],
          description: 'While raging, the drunken brute can drink a potion, or a tankard of ale or similar quantity of alcohol, as a move action that does not provoke attacks of opportunity. A potion has its normal effect, while an alcoholic drink allows the barbarian to maintain her rage that round without expending a round of rage for the day (instead of the alcohol’s normal effects). For each alcoholic drink consumed while raging, the barbarian is nauseated for 1 round when her rage expires, in addition to the normal fatigue that follows a rage. Tireless rage does not negate this nauseated condition but the internal fortitude rage power does. ',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 5,
          name: 'Drunken Brute - Raging Drunk',
          spellcasting: false
        },
        {
          id: 5000,
          actions: [],
          description: 'Choose an energy type: acid, cold, fire, or electricity. While raging, as a swift action up to three times a day, the barbarian can imbue her melee attacks with elemental energy, dealing an additional 1d6 points of damage of the chosen energy type for 1 round.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 5,
          name: 'Rage Power - Lesser Elemental Blood',
          spellcasting: false
        },
        {
          id: 5001,
          actions: [],
          description: 'While raging, you gain a +1 morale bonus on Intimidate checks and to the save DC of any fear effects you create for each alcoholic drink you have consumed during your rage, to a maximum of +1 per four barbarian levels.',
          feature_levels: [{level: 4}],
          feature_options: [],
          klass_id: 5,
          name: 'Rage Power - Roaring Drunk',
          spellcasting: false
        },
        {
          id: 5002,
          actions: [],
          description: 'While raging, the barbarian gains energy resistance 10 against the energy type chosen when she took lesser elemental blood.',
          feature_levels: [{level: 6}],
          feature_options: [],
          klass_id: 5,
          name: 'Rage Power - Elemental Blood',
          spellcasting: false
        },
        {
          id: 5003,
          actions: [],
          description: 'At 2nd level, the invulnerable rager gains DR/— equal to half her barbarian level. This damage reduction is doubled against nonlethal damage.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 5,
          name: 'Invulnerable Rager - Invulnerability',
          spellcasting: false
        },
        {
          id: 5004,
          actions: [],
          description: 'At 3rd level, the invulnerable rager is inured to either hot or cold climate effects (choose one) as if using endure elements. In addition, the barbarian gains 1 point of fire or cold resistance for every three levels beyond 3rd.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 5,
          name: 'Invulnerable Rager - Extreme Endurance',
          spellcasting: false
        },
      ]
    } else if (name === 'Robby'){
      replacedFeatures = ['Trapfinding', 'Danger Sense']
      addedFeatures = [
        {
          id: 6000,
          actions: [],
          description: 'At 1st level, a swashbuckler can spend 1 panache point when she makes an Acrobatics, Climb, Finesse, Animal Handling (Ride), or Swim check to roll 1d6 and add the result to the check. She can do this after she makes the check but before the result is revealed. If the result of the d6 roll is a natural 6, she rolls another 1d6 and adds it to the check. She can continue to do this as long as she rolls natural 6s, up to a number of times equal to her Dexterity modifier (minimum 1).',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Derring-Do',
          spellcasting: false
        },
        {
          id: 6001,
          actions: [],
          description: 'At 1st level, when an opponent attempts a melee attack against the swashbuckler, the swashbuckler can as an immediate action spend 1 panache point to move 5 feet; doing so grants the swashbuckler a dodge bonus to AC equal to her Charisma modifier (minimum 0) against the triggering attack. This movement doesn’t negate the attack, which is still resolved as if the swashbuckler had not moved from the original square. This movement is not a 5-foot step; it provokes attacks of opportunity from creatures other than the one who triggered this deed. The swashbuckler can only perform this deed while wearing light or no armor, and while carrying no heavier than a light load.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Dodging Panache',
          spellcasting: false
        },
        {
          id: 6002,
          actions: [],
          description: 'At 1st level, when an opponent makes a melee attack against the swashbuckler, she can spend 1 panache point and expend a use of an attack of opportunity to attempt to parry that attack. The swashbuckler makes an attack roll as if she were making an attack of opportunity; for each size category the attacking creature is larger than the swashbuckler, the swashbuckler takes a –2 penalty on this roll. If her result is greater than the attacking creature’s result, the creature’s attack automatically misses. The swashbuckler must declare the use of this ability after the creature’s attack is announced, but before its attack roll is made. Upon performing a successful parry and if she has at least 1 panache point, the swashbuckler can as an immediate action make an attack against the creature whose attack she parried, provided that creature is within her reach. This deed’s cost cannot be reduced by any ability or effect that reduces the number of panache points a deed costs.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Opportune Parry and Riposte',
          spellcasting: false
        },
        {
          id: 6003,
          actions: [],
          description: 'At 3rd level, while the swashbuckler has at least 1 panache point, she can kip-up from prone as a move action without provoking an attack of opportunity. She can kip-up as a swift action instead by spending 1 panache point.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Kip-Up',
          spellcasting: false
        },
        {
          id: 6004,
          actions: [],
          description: 'At 3rd level, while she has at least 1 panache point, when a swashbuckler hits an opponent with a light or one-handed piercing melee weapon, she can choose to use Intimidate to demoralize that opponent as a swift action instead of a standard action.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Meanacing Swordplay',
          spellcasting: false
        },
        {
          id: 6005,
          actions: [],
          description: 'At 3rd level, while she has at least 1 panache point, a swashbuckler gains the ability to strike precisely with a light or one-handed piercing melee weapon (though not natural weapon attacks), adding her swashbuckler level to the damage dealt. To use this deed, a swashbuckler cannot attack with a weapon in her other hand or use a shield other than a buckler. She can even use this ability with thrown light or one-handed piercing melee weapons, so long as the target is within 30 feet of her. Any creature that is immune to sneak attacks is immune to the additional damage granted by precise strike, and any item or ability that protects a creature from critical hits also protects a creature from the additional damage of a precise strike. This additional damage is precision damage, and isn’t multiplied on a critical hit. As a swift action, a swashbuckler can spend 1 panache point to double her precise strike’s damage bonus on the next attack. This benefit must be used before the end of her turn, or it is lost. This deed’s cost cannot be reduced by any ability or effect that reduces the amount of panache points a deed costs (such as the Signature Deed feat).',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Precise Strike',
          spellcasting: false
        },
        {
          id: 6006,
          actions: [],
          description: 'At 3rd level, while the swashbuckler has at least 1 panache point, she gains a +2 bonus on initiative checks. In addition, if she has the Quick Draw feat, her hands are free and unrestrained, and she has any single light or one-handed piercing melee weapon that isn’t hidden, she can draw that weapon as part of the initiative check.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 2,
          name: 'Deed - Swashbuckler Initiative',
          spellcasting: false
        },
        {
          id: 6007,
          actions: [],
          description: 'Whenever she makes a successful melee attack with the selected weapon, she adds her Dexterity modifier instead of her Strength modifier to the damage roll. If any effect would prevent the rogue from adding her Strength modifier to the damage roll, she does not add her Dexterity modifier.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 3,
          name: 'Finesse Training - Trident',
          spellcasting: false
        },
        {
          id: 6008,
          actions: [],
          description: 'At 1st level, a pirate becomes adept at moving on ships, boats, and similar vessels. She gains the Sea Legs feat as a bonus feat, even if she does not meet the prerequisites.',
          feature_levels: [{level: 1}],
          feature_options: [],
          klass_id: 3,
          name: 'Sea Legs',
          spellcasting: false
        },
        {
          id: 6009,
          actions: [],
          description: 'At 2nd level, a pirate incorporates a ship’s masts, rigging, ropes, sails, and other such structures into her combat style. Provided she is wearing light armor or no armor, when fighting in an environment where such structures exist, the rogue incorporates them into her movement, and does not have to move in a straight line when making either a charge attack or bull rush combat maneuver. Once she completes her attack or maneuver, she can reposition herself. Immediately after making the charge or bull rush, she can move 5 feet as a free action, even if the charge ends her turn. This movement does not provoke attacks of opportunity.',
          feature_levels: [{level: 2}],
          feature_options: [],
          klass_id: 3,
          name: 'Swinging Reposition',
          spellcasting: false
        },
        {
          id: 6010,
          actions: [],
          description: 'Pirates are a salty and steadfast lot. At 3rd level, a pirate gains a +1 bonus on saving throws against fear and mind-affecting effects. This bonus increases by +1 for every three levels, to a maximum of +6 at 18th level.',
          feature_levels: [{level: 3}],
          feature_options: [],
          klass_id: 3,
          name: 'Unflinching',
          spellcasting: false
        },
        {
          id: 6011,
          actions: [],
          description: 'Needs to be picked',
          feature_levels: [{level: 4}],
          feature_options: [],
          klass_id: 3,
          name: 'Rogue Talent - None',
          spellcasting: false
        },
      ]
    } else if (name === 'Festus'){
      replacedFeatures = []
      addedFeatures = [
        // {
        //   id: 7000,
        //   actions: [],
        //   description: '',
        //   feature_levels: [{level: 1}],
        //   feature_options: [],
        //   klass_id: 9,
        //   name: '',
        //   spellcasting: false
        // }
      ]
    }


    newFeatures = features.filter(f => {
      let klass = this.props.character.uniq_klasses.find(cl => cl.id === f.klass_id)
      let name = f.name
      if (klass && f.name === "Weapon and Armor Proficiency"){
        name = `${f.name} - ${klass.name}`
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
      <div style={{padding: '1em'}} className={localStorage.computer === "false" ? 'mobile-tab-selected-tab-container shadow' : 'none'}>
      {this.renderClassFeatures()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    admin: state.admin,
    character: state.character,
    character_info: state.character_info,
    classes: state.classes
  }
}


export default connect(mapStateToProps)(Features)
