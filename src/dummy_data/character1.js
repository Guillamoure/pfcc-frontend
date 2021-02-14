const Character1 = {
	character : {
		id: 10001,
		name: "Jezebel",
		strength: 9,
		dexterity: 9,
		constitution: 15,
		intelligence: 9,
		wisdom: 6,
		charisma: 10,
		alignment: "Chaotic Neutral",
		deity: null,
		homeland: null,
		gender: null,
		age: null,
		height: "2'3\"",
		weight: "9 lbs",
		hair: null,
		eyes: null,
		description: "",
		any_bonus: null,
		skillset_id: 3,
		lethal_damage: 0,
		non_lethal_damage: 0,
		temp_hp: 0,
		is_done_preparing_spells: false,
		full_name: null,
		campaign_id: 3,
		max_hp: 21,
		pp: null,
		gp: null,
		sp: null,
		cp: null,
		uniq_klasses: [
			{
				id: 15,
				name: "Kineticist",
				description: "Kineticists are living channels for elemental matter and energy, manipulating the world around them by drawing upon inner reserves from their own bodies. Kineticists often awaken to their kinetic abilities during a violent or traumatic experience, releasing their power involuntarily. As kinetic power is seldom inherited, kineticists are rarely able to find mentors to guide them, so they must delve into these mysteries on their own to learn to control their gifts.\n\nRole: Kineticists generally use their powers to assail their foes from range, but based on the way their talents develop, they can channel their kinetic abilities for a variety of situations. Kineticists are usually quite different from their families and friends, so they often strike out on their own or alongside others with extraordinary talents.\n\nAlignment: Any.",
				hit_die: 8,
				"skill_ranks": 4,
				"fortitude": 0.5,
				"reflex": 0.5,
				"will": 0.34,
				source: {
					id: 11,
					title: "Occult Adventures",
					abbreviation: "OA",
					code: "PZO1132"
				},
				klass_features: [
					{
						id: 122,
						klass_id: 15,
						name: "Weapon and Armor Proficiency",
						description: "Kineticists are proficient with all simple weapons and light armor, but not shields.",
						created_at: "2021-01-02T15:58:19.255Z",
						updated_at: "2021-01-02T15:58:19.255Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 123,
						klass_id: 15,
						name: "Elemental Focus",
						description: "At 1st level, a kineticist chooses one primary element on which to focus. This element determines how she accesses the raw power of the Ethereal Plane, and grants her access to specific wild talents (see below) and additional class skills. She gains her selected element’s basic utility wild talent (basic telekinesis, basic aerokinesis, etc.) as a bonus wild talent.",
						created_at: "2021-01-02T15:58:19.288Z",
						updated_at: "2021-01-02T15:58:19.288Z",
						specialization: true,
						choice_amount: 1,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 124,
						klass_id: 15,
						name: "Wild Talents",
						description: "A kineticist can use wild talents—magical abilities similar to spells but drawn from the kineticist’s innate psychic talent and usable at will. Wild talents are typically spell-like abilities (though some are supernatural abilities), and take a standard action to use unless otherwise noted. A wild talent always has the elemental descriptor or descriptors (aether, air, earth, fire, or water) matching its element entry. A wild talent that can be used with any of several elements gains the appropriate elemental descriptor when used with an element. For example, the wall wild talent gains the earth descriptor when used by a geokineticist.\n\nEvery wild talent has an effective spell level. A kineticist can always select 1st-level wild talents, but she can select a wild talent of a higher level only if her kineticist level is at least double the wild talent’s effective spell level. Kinetic blast and defense wild talents are always considered to have an effective spell level equal to 1/2 the kineticist’s class level (to a maximum effective spell level of 9th at kineticist level 18th).\n\nUnless otherwise noted, the DC for a saving throw against a wild talent is equal to 10 + the wild talent’s effective spell level + the kineticist’s Constitution modifier. The kineticist uses her Constitution modifier on all concentration checks for wild talents.\n\nIn addition to the wild talents she gains from her other class features, at 2nd level and every 2 levels thereafter, a kineticist selects a new utility wild talent from the list of options available to her. A kineticist can select only universal wild talents or those that match her element (see Elemental Focus above). At 6th, 10th, and 16th levels, a kineticist can replace one of her utility wild talents with another wild talent of the same level or lower. She can’t replace a wild talent that she used to qualify for another of her wild talents.",
						created_at: "2021-01-02T15:58:19.300Z",
						updated_at: "2021-01-02T15:58:19.300Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 125,
						klass_id: 15,
						name: "Burn",
						description: "At 1st level, a kineticist can overexert herself to channel more power than normal, pushing past the limit of what is safe for her body by accepting burn. Some of her wild talents allow her to accept burn in exchange for a greater effect, while others require her to accept a certain amount of burn to use that talent at all. For each point of burn she accepts, a kineticist takes 1 point of nonlethal damage per character level. This damage can’t be healed by any means other than getting a full night’s rest, which removes all burn and associated nonlethal damage. Nonlethal damage from burn can’t be reduced or redirected, and a kineticist incapable of taking nonlethal damage can’t accept burn. A kineticist can accept only 1 point of burn per round. This limit rises to 2 points of burn at 6th level, and rises by 1 additional point every 3 levels thereafter. A kineticist can’t choose to accept burn if it would put her total number of points of burn higher than 3 + her Constitution modifier (though she can be forced to accept more burn from a source outside her control). A kineticist who has accepted burn never benefits from abilities that allow her to ignore or alter the effects she receives from nonlethal damage.",
						created_at: "2021-01-02T15:58:19.364Z",
						updated_at: "2021-01-02T15:58:19.364Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 126,
						klass_id: 15,
						name: "Kinetic Blast",
						description: "At 1st level, a kineticist gains a kinetic blast wild talent of her choice. This kinetic blast must be a simple blast that matches her element. Simple blasts are listed with their corresponding elements.\n\nAs a standard action, the kineticist can unleash a kinetic blast at a single target up to a range of 30 feet. She must have at least one hand free to aim the blast (or one prehensile appendage, if she doesn’t have hands). All damage from a kinetic blast is treated as magic for the purpose of bypassing damage reduction. Kinetic blasts count as a type of weapon for the purpose of feats such as Weapon Focus. The kineticist is never considered to be wielding or gripping the kinetic blast (regardless of effects from form infusions; see Infusion), and she can’t use Vital Strike feats with kinetic blasts. Even the weakest kinetic blast involves a sizable mass of elemental matter or energy, so kinetic blasts always deal full damage to swarms of any size (though only area blasts deal extra damage to swarms). A readied kinetic blast can be used to counterspell any spell of equal or lower level that shares its descriptor. A kinetic blast that deals energy damage of any type (including force) has the corresponding descriptor.\n\nEach simple blast is either a physical blast or an energy blast.\n\nPhysical blasts are ranged attacks that deal an amount of damage equal to 1d6+1 + the kineticist’s Constitution modifier, increasing by 1d6+1 for every 2 kineticist levels beyond 1st. Spell resistance doesn’t apply against physical blasts.\n\nEnergy blasts are ranged touch attacks that deal an amount of damage equal to 1d6 + 1/2 the kineticist’s Constitution modifier, increasing by 1d6 for every 2 kineticist levels beyond 1st.\n\nComposite blasts combine elements to form a new blast. When a kineticist gains a new element through expanded element, she gains access to all composite blasts for which she qualifies. All composite blasts are listed after the kineticist elements.\n\nMost composite blasts are either physical or energy blasts, like simple blasts.\n\nPhysical composite blasts deal an amount of damage equal to 2d6+2 + the kineticist’s Constitution modifier, increasing by 2d6+2 for every 2 kineticist levels beyond 1st.\n\nEnergy composite blasts deal an amount of damage equal to 2d6 + 1/2 the kineticist’s Constitution modifier, increasing by 2d6 for every 2 kineticist levels beyond 1st.",
						created_at: "2021-01-02T15:58:19.375Z",
						updated_at: "2021-01-02T15:58:19.375Z",
						specialization: true,
						choice_amount: 1,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 127,
						klass_id: 15,
						name: "Gather Power",
						description: "If she has both hands free (or all of her prehensile appendages free, for unusual kineticists), a kineticist can gather energy or elemental matter as a move action. Gathering power creates an extremely loud, visible display in a 20-foot radius centered on the kineticist, as the energy or matter swirls around her. Gathering power in this way allows the kineticist to reduce the total burn cost of a blast wild talent she uses in the same round by 1 point. The kineticist can instead gather power for 1 full round in order to reduce the total burn cost of a blast wild talent used on her next turn by 2 points (to a minimum of 0 points). If she does so, she can also gather power as a move action during her next turn to reduce the burn cost by a total of 3 points. If the kineticist takes damage during or after gathering power and before using the kinetic blast that releases it, she must succeed at a concentration check (DC = 10 + damage taken + effective spell level of her kinetic blast) or lose the energy in a wild surge that forces her to accept a number of points of burn equal to the number of points by which her gathered power would have reduced the burn cost. This ability can never reduce the burn cost of a wild talent below 0 points.",
						created_at: "2021-01-02T15:58:19.387Z",
						updated_at: "2021-01-02T15:58:19.387Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 136,
						klass_id: 15,
						name: "Composite Specialization",
						description: "At 16th level, a kineticist becomes more adept at creating composite blasts. She reduces the burn cost of all composite blasts by 1 point.\n\nThis can’t reduce the cost of a composite blast below 0 points.",
						created_at: "2021-01-02T15:58:19.664Z",
						updated_at: "2021-01-02T15:58:19.664Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 137,
						klass_id: 15,
						name: "Metakinetic Master",
						description: "At 19th level, a kineticist chooses one type of metakinesis, such as empower or quicken. She reduces the burn cost of that metakinesis by 1 point (to a minimum of 0 points).",
						created_at: "2021-01-02T15:58:19.678Z",
						updated_at: "2021-01-02T15:58:19.678Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 128,
						klass_id: 15,
						name: "Infusion",
						description: "At 1st level, a kineticist gains an infusion wild talent from the list of options available based on her elemental focus. She gains additional infusions at 3rd, 5th, 9th, 11th, 13th, 17th, and 19th levels. By using infusions along with her kinetic blasts, a kineticist can alter her kinetic blasts to suit her needs. Infusions come in two types, each of which changes a kinetic blast differently: a substance infusion causes an additional effect, while a form infusion causes the kinetic blast to manifest in a different way. Each infusion can alter only certain kinds of kinetic blasts, which are listed in its Associated Blasts entry. Each time the kineticist uses one of her kinetic blast wild talents, she can apply up to one associated form infusion and up to one associated substance infusion.\n\nSome infusions change the action required to activate a kinetic blast or entirely transform the kinetic blast’s normal effects.\n\nThe burn cost listed in each infusion’s Burn entry is added to the burn cost of the kinetic blast the infusion modifies.\n\nThe DC for a save against an infusion is based on the associated kinetic blast’s effective spell level, not the level of the infusion. The DCs for form infusions are calculated using the kineticist’s Dexterity modifier instead of her Constitution modifier. When a kineticist modifies a kinetic blast with a form infusion and a substance infusion that both require saving throws, each target first attempts a saving throw against the form infusion. If a target succeeds and a successful save negates the infusion’s effects, the entire kinetic blast is negated; otherwise, the target then attempts a saving throw against the substance infusion. If a kineticist’s form and substance infusions both alter the kinetic blast’s damage, apply the substance infusion’s alteration first.\n\nAt 5th, 11th, and 17th levels, a kineticist can replace one of her infusions with another infusion of the same effective spell level or lower. She can’t replace an infusion that she used to qualify for another of her wild talents.",
						created_at: "2021-01-02T15:58:19.413Z",
						updated_at: "2021-01-02T15:58:19.413Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 129,
						klass_id: 15,
						name: "Elemental Defense",
						description: "At 2nd level, a kineticist gains her element’s defensive wild talent.\n\nShe must select the expanded defense utility wild talent to gain the defensive wild talent of any element she gains via the expanded element class feature.",
						created_at: "2021-01-02T15:58:19.464Z",
						updated_at: "2021-01-02T15:58:19.464Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 130,
						klass_id: 15,
						name: "Elemental Overflow",
						description: "At 3rd level, a kineticist’s body surges with energy from her chosen element whenever she accepts burn, causing her to glow with a nimbus of fire, weep water from her pores, or experience some other thematic effect. In addition, she receives a bonus on her attack rolls with kinetic blasts equal to the total number of points of burn she currently has, to a maximum bonus of +1 for every 3 kineticist levels she possesses. She also receives a bonus on damage rolls with her kinetic blast equal to double the bonus on attack rolls. The kineticist can suppress the visual effects of elemental overflow by concentrating for 1 full round, but doing so suppresses all of this ability’s other benefits, as well. The next time the kineticist uses any wild talent, the visual effects and benefits return instantly.\n\nAs a kineticist’s body becomes more and more suffused with her element, she begins to gain more powerful benefits.\n\nStarting at 6th level, whenever she has at least 3 points of burn, the kineticist gains a +2 size bonus to two physical ability scores of her choice. She also gains a chance to ignore the effects of a critical hit or sneak attack equal to 5% × her current number of points of burn. At 11th level, whenever the kineticist has at least 5 points of burn, these bonuses increase to a +4 size bonus to one physical ability score of her choice and a +2 size bonus to each of her other two physical ability scores.\n\nAt 16th level, whenever the kineticist has at least 7 points of burn, these bonuses increase to a +6 size bonus to one physical ability score of her choice, a +4 size bonus to a second physical ability score of her choice, and a +2 size bonus to the remaining physical ability score.",
						created_at: "2021-01-02T15:58:19.476Z",
						updated_at: "2021-01-02T15:58:19.476Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 131,
						klass_id: 15,
						name: "Infusion Specialization",
						description: "At 5th level, whenever a kineticist uses one or more infusions with a blast, she reduces the combined burn cost of the infusions by 1. This can’t reduce the total cost of the infusions used below 0.\n\nShe reduces the burn cost by 1 additional point at 8th, 11th, 14th, 17th, and 20th levels.",
						created_at: "2021-01-02T15:58:19.538Z",
						updated_at: "2021-01-02T15:58:19.538Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 132,
						klass_id: 15,
						name: "Metakinesis",
						description: "At 5th level, a kineticist gains the ability to alter her kinetic blasts as if with metamagic feats by accepting burn. By accepting 1 point of burn, she can empower her kinetic blast (as if using Empower Spell). At 9th level, by accepting 2 points of burn, she can maximize her kinetic blast as if using Maximize Spell. At 13th level, by accepting 3 points of burn, she can quicken her kinetic blast as if using Quicken Spell.\n\nAt 17th level, by accepting 4 points of burn, the kineticist can use her kinetic blast twice with the same standard action, or swift action if she also uses metakinesis to quicken the blast.\n\nWhen she uses a double kinetic blast, all modifications, such as metakinesis and infusions, apply to both of the blasts, but the kineticist needs to pay the burn cost only once.",
						created_at: "2021-01-02T15:58:19.579Z",
						updated_at: "2021-01-02T15:58:19.579Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 133,
						klass_id: 15,
						name: "Internal Buffer",
						description: "At 6th level, a kineticist’s study of her body and the elemental forces that course through it allow her to form an internal buffer to store extra energy.\n\nThe buffer starts empty and doesn’t replenish each day, but the kineticist can accept 1 point of burn to add 1 point to the buffer as a full-round action, to a maximum of 1 point total. This maximum increases to 2 points at 11th level and to 3 points at 16th level. Once the kineticist adds points to her buffer, they remain indefinitely until she spends them.\n\nWhen she would otherwise accept burn, a kineticist can spend 1 point from her buffer to avoid accepting 1 point of burn. She cannot spend more than 1 point from her buffer in this way for a single wild talent. Points spent from the internal buffer don’t activate elemental overflow or add to its effects. Similarly, this buffer can be used to exceed the limit on the number of points of burn the kineticist can accept in a single turn.",
						created_at: "2021-01-02T15:58:19.610Z",
						updated_at: "2021-01-02T15:58:19.610Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 134,
						klass_id: 15,
						name: "Expanded Element",
						description: "At 7th level, a kineticist learns to use another element or expands her understanding of her own element. She can choose any element, including her primary element. She gains one of that element’s simple blast wild talents that she does not already possess, if any. She also gains all composite blast wild talents whose prerequisites she meets, as well as the basic wild talent of her chosen expanded element (for instance, basic aerokinesis if she chooses air). See Composite Blasts for additional rules for and descriptions of composite blasts. She doesn’t gain the defensive wild talent of the expanded element unless she later selects it with the expanded defense utility wild talent, nor does she gain the additional class skills from her expanded element unless she later selects the Elemental Knowledge feat.\n\nIf the kineticist’s expanded element is different from her primary element, she treats her kineticist level as 4 levels lower for the purpose of determining which wild talents she can learn from her expanded element.\n\nIf the kineticist chooses to expand her understanding of an element she already has, she gains an additional utility wild talent or infusion of her choice from that element, as if from her infusion or wild talent class feature, as appropriate.\n\nAt 15th level, the kineticist can either select a new element or expand her understanding of her original element. She can’t select the same element she selected at 7th level unless it is her primary element. She gains all the benefits from her new expanded element as listed above. However, if the kineticist selected her primary element as her expanded element at both 7th and 15th levels, her mastery of that element increases. For wild talents of her element, the kineticist gains a +1 bonus on attack rolls and damage rolls, as well as to caster level and DCs.",
						created_at: "2021-01-02T15:58:19.634Z",
						updated_at: "2021-01-02T15:58:19.634Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 135,
						klass_id: 15,
						name: "Supercharge",
						description: "At 11th level, when using gather power as a move action, a kineticist can reduce the total burn cost of a single wild talent by 2 points instead of 1. When using gather power for 1 full round, she can reduce the burn cost of a single wild talent by 3 points instead of 2.",
						created_at: "2021-01-02T15:58:19.652Z",
						updated_at: "2021-01-02T15:58:19.652Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					},
					{
						id: 138,
						klass_id: 15,
						name: "Omnikinesis",
						description: "At 20th level, a kineticist transcends the distinction between the different elements and can bend all creation to her will. By accepting 1 point of burn (in addition to any burn requirement of the kinetic blast she chooses), she can use any blast wild talent she doesn’t know.\n\nBy accepting 1 point of burn as a standard action, she can change any of her wild talents into any other wild talent of the same category (such as simple blasts or defense) for 24 hours, ignoring any elemental requirements or restrictions (but not any other requirements or restrictions).",
						created_at: "2021-01-02T15:58:19.690Z",
						updated_at: "2021-01-02T15:58:19.690Z",
						specialization: null,
						choice_amount: 0,
						base_klass_feature_id: null,
						has_klass_feature_options: null
					}
				],
				class_skillset_skills: [
					{
						id: 190,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 1
					},
					{
						id: 191,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 5
					},
					{
						id: 192,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 12
					},
					{
						id: 193,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 13
					},
					{
						id: 194,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 24
					},
					{
						id: 195,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 26
					},
					{
						id: 196,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 28
					},
					{
						id: 197,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 33
					},
					{
						id: 198,
						klass_id: 15,
						skillset_id: 1,
						skill_id: 36
					},
					{
						id: 199,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 1
					},
					{
						id: 200,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 5
					},
					{
						id: 201,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 12
					},
					{
						id: 202,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 13
					},
					{
						id: 203,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 24
					},
					{
						id: 204,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 26
					},
					{
						id: 205,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 28
					},
					{
						id: 206,
						klass_id: 15,
						skillset_id: 3,
						skill_id: 33
					}
				],
				skills: [
					{
						id: 1,
						name: "Acrobatics",
						ability_score: "Dexterity",
						description: "You can use Acrobatics to move on narrow surfaces and uneven ground without falling. A successful check allows you to move at half speed across such surfaces—only one check is needed per round. Use the following table to determine the base DC, which is then modified by the Acrobatics skill modifiers noted below. While you are using Acrobatics in this way, you are considered flat-footed and lose your Dexterity bonus to your AC (if any). If you take damage while using Acrobatics, you must immediately make another Acrobatics check at the same DC to avoid falling or being knocked prone. *No Acrobatics check is needed to move across these surfaces unless the modifiers increase the DC to 10 or higher.\n\n<table>\n  <tr>\n    <th>Surface Width</th>\n    <th>Base Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>Greater Than 3 Feet Wide</td>\n    <td>0*</td>\n  </tr>\n  <tr>\n    <td>1-3 Feet Wide</td>\n    <td>5*</td>\n  </tr>\n  <tr>\n    <td>7-11 Inches Wide</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>2-6 Inches Wide</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Less Than 2 Inches Wide</td>\n    <td>20</td>\n  </tr>\n</table>\n\nIn addition, you can move through a threatened square without provoking an attack of opportunity from an enemy by using Acrobatics. When moving in this way, you move at half speed. You can move at full speed by increasing the DC of the check by 10. You cannot use Acrobatics to move past foes if your speed is reduced due to carrying a medium or heavy load or wearing medium or heavy armor. If an ability allows you to move at full speed under such conditions, you can use Acrobatics to move past foes. You can use Acrobatics in this way while prone, but doing so requires a full-round action to move 5 feet, and the DC is increased by 5. If you attempt to move through an enemy’s space and fail the check, you lose the move action and provoke an attack of opportunity. *This DC is used to avoid an attack of opportunity due to movement. This DC increases by 2 for each additional opponent avoided in 1 round.\n\n<table>\n  <tr>\n    <th>Situation</th>\n    <th>Base Acrobatics DC*</th>\n  </tr>\n  <tr>\n    <td>Move Through a Threatened Area</td>\n    <td>Opponent's Combat Maneuver Defense</td>\n  </tr>\n  <tr>\n    <td>Move Through an Enemy's Space</td>\n    <td>5 + Opponent's Combat Maneuver Defense</td>\n  </tr>\n</table>\n\nFinally, you can use the Acrobatics skill to make jumps or to soften a fall. The base DC to make a jump is equal to the distance to be crossed (if horizontal) or four times the height to be reached (if vertical). These DCs double if you do not have at least 10 feet of space to get a running start. The only Acrobatics modifiers that apply are those concerning the surface you are jumping from. If you fail this check by 4 or less, you can attempt a DC 20 Reflex save to grab hold of the other side after having missed the jump. If you fail by 5 or more, you fail to make the jump and fall (or land prone, in the case of a vertical jump).\n\nCreatures with a base land speed above 30 feet receive a +4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed above 30 feet. Creatures with a base land speed below 30 feet receive a –4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed below 30 feet. No jump can allow you to exceed your maximum movement for the round.\n\nFor a running jump, the result of your Acrobatics check indicates the distance traveled in the jump (and if the check fails, the distance at which you actually land and fall prone). Halve this result for a standing long jump to determine where you land.\n\nWhen you deliberately fall any distance, even as a result of a missed jump, a DC 15 Acrobatics skill check allows you to ignore the first 10 feet fallen, although you still end up prone if you take damage from a fall.\n\n<table>\n  <tr>\n    <th>Long Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>5 Feet</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>10 Feet</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>15 Feet</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>20 Feet</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Greater Than 20 Feet</td>\n    <td>+5 per 5 Feet</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>High Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>1 Foot</td>\n    <td>4</td>\n  </tr>\n  <tr>\n    <td>2 Feet</td>\n    <td>8</td>\n  </tr>\n  <tr>\n    <td>3 Feet</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>4 Feet</td>\n    <td>16</td>\n  </tr>\n  <tr>\n    <td>Greater Than 4 Feet</td>\n    <td>+4 per Foot</td>\n  </tr>\n</table>\n\nThe following modifiers apply to all Acrobatics skill checks. The modifiers stack with one another, but only the most severe modifier for any given condition applies.\n\n<table>\n  <tr>\n    <th>Acrobatics Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Slightly Obstructed (Gravel, Sand)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severyly Obstructed (Cavern, Rubble)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Slippery (Wet)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Slippery</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Sloped (<45 degrees)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Sloped (>45 degrees)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Unsteady (Boat in Rough Water)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Moderately Unsteady (Boat in a Storm)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Move at Full Speed on Narrow or Uneven Surfaces</td>\n    <td>+5 (not to Jumps)</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You can keep your balance while traversing narrow or treacherous surfaces. You can also dive, flip, jump, and roll, avoiding attacks and confusing your opponents.",
						action: "None. An Acrobatics check is made as part of another action or as a reaction to a situation.",
						try_again: "",
						special: "If you have 3 or more ranks in Acrobatics, you gain a +3 dodge bonus to AC when fighting defensively instead of the usual +2, and a +6 dodge bonus to AC when taking the total defense action instead of the usual +4.",
						skill_unlock_5: "You can move at normal speed through a threatened square without provoking an attack of opportunity by increasing the DC of the check by 5 (instead of by 10). You aren’t denied your Dexterity bonus when attempting Acrobatics checks with DCs of 20 or lower.",
						skill_unlock_10: "You can attempt an Acrobatics check at a –10 penalty and use the result as your CMD against trip maneuvers. You can also attempt an Acrobatics check at a –10 penalty in place of a Reflex save to avoid falling. You must choose to use this ability before the trip attempt or Reflex save is rolled. With a successful DC 20 Acrobatics check, you treat an unintentional fall as 10 feet shorter plus 10 feet for every 10 by which you exceed the DC, and treat an intentional fall as 10 feet shorter for every 10 by which you exceed the DC.",
						skill_unlock_15: "You do not provoke attacks of opportunity when standing up from prone.",
						skill_unlock_20: "You double the result of any Acrobatics check when jumping and never fall prone at the end of a fall as long as you remain conscious."
					},
					{
						id: 5,
						name: "Craft",
						ability_score: "Intelligence",
						description: "You can practice your trade and make a decent living, earning half your check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the craft’s daily tasks, how to supervise untrained helpers, and how to handle common problems. (Untrained laborers and assistants earn an average of 1 silver piece per day.)\n\nThe basic function of the Craft skill, however, is to allow you to make an item of the appropriate type. The DC depends on the complexity of the item to be created. The DC, your check result, and the price of the item determine how long it takes to make a particular item. The item’s finished price also determines the cost of raw materials.\n\nTo determine how much time and money it takes to make an item, follow these steps.\n\n1) Find the item’s price in silver pieces (1 gp = 10 sp).\n\n2) Find the item’s DC from Table: Craft Skills.\n\n3) Pay 1/3 of the item’s price for the raw material cost.\n\n4) Make an appropriate Craft check representing one week’s worth of work. If the check succeeds, multiply your check result by the DC. If the result × the DC equals the price of the item in sp, then you have completed the item. (If the result × the DC equals double or triple the price of the item in silver pieces, then you’ve completed the task in one-half or one-third of the time. Other multiples of the DC reduce the time in the same manner.) If the result × the DC doesn’t equal the price, then it represents the progress you’ve made this week. Record the result and make a new Craft check for the next week. Each week, you make more progress until your total reaches the price of the item in silver pieces.\n\nIf you fail a check by 4 or less, you make no progress this week (or day, see below). If you miss by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.\n\nTools: All crafts require artisan’s tools to give the best chance of success. If improvised tools are used, the check is made with a –2 penalty. On the other hand, masterwork artisan’s tools provide a +2 circumstance bonus on the check.\n\nFabricate Spell: In some cases, the fabricate spell can be used to achieve the results of a Craft check with no actual check involved. You must still make an appropriate Craft check when using the spell to make articles requiring a high degree of craftsmanship.\n\nIronwood Spell: A successful Craft check related to woodworking in conjunction with the casting of the ironwood spell enables you to make wooden items that have the strength of steel.\n\nMinor Creation: When casting the spell minor creation, you must succeed on an appropriate Craft check to make a complex item.\n\nProgress by the Day: You can make checks by the day instead of by the week. In this case your progress (check result × DC) should be divided by the number of days in a week.\n\nCreate Masterwork Items: You can make a masterwork item: a weapon, suit of armor, shield, or tool that conveys a bonus on its use through its exceptional craftsmanship. To create a masterwork item, you create the masterwork component as if it were a separate item in addition to the standard item. The masterwork component has its own price (300 gp for a weapon or 150 gp for a suit of armor or a shield, see Chapter 6 for the price of other masterwork tools) and a Craft DC of 20. Once both the standard component and the masterwork component are completed, the masterwork item is finished. The cost you pay for the masterwork component is one-third of the given amount, just as it is for the cost in raw materials.\n\nRepair Items: You can repair an item by making checks against the same DC that it took to make the item in the first place. The cost of repairing an item is one-fifth of the item’s price.\n\n*You must be trained in the listed skill to attempt this task.\n\n<table>\n  <tr>\n    <th>Item/Task</th>\n    <th>Craft Skill</th>\n    <th>Craft DC</th>\n  </tr>\n  <tr>\n    <td>Craft Acid</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine the Items an Alchemist Makes with Substances from Their Lab*</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Alchemist's Fire, Smokestick, or Tindertwig</td>\n    <td>Alchemy</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Antitoxin, Sunrod, Tanglefoot Bag, or Thunderstone</td>\n    <td>Alchemy</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Armor or Shield</td>\n    <td>Armor</td>\n    <td>10 + AC Bonus</td>\n  </tr>\n  <tr>\n    <td>Etch Metal Armor Plates with Decorative Designs</td>\n    <td>Armor or Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Suit of Masterwork Armor on Sight</td>\n    <td>Armor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine What Type of Environment a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine the Specific Region a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Smelt Ore and Refine the Metal</td>\n    <td>Blacksmithing</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create Armor Spikes or Shield Spikes Without Craft (Armor)*</td>\n    <td>Blacksmithing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Determine a Book's Approxiamte Age</td>\n    <td>Books</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Composite Bow on Site</td>\n    <td>Bows</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Longbow, Shortbow, or Arrows</td>\n    <td>Bows</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Bow on Sight</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow With High Strength Rating</td>\n    <td>Bows</td>\n    <td>15 + (2 x Rating)</td>\n  </tr>\n  <tr>\n    <td>Determine a Writer's Experience Level and Handedness*</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Write an Invitation That Matches Appropriate Social Conventions</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Make a Makeshift Barrel or Crate</td>\n    <td>Carpentry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Rudiementary Raft from Found Materials</td>\n    <td>Carpentry or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Carve Fine Woodworking</td>\n    <td>Carpentry or Sculptures</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Wooden Armor or a Wooden Shield Without Craft (Armor)</td>\n    <td>Carpentry</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Correctly Dye a Garment or Bolt of Cloth</td>\n    <td>Cloth</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Mend a Sail</td>\n    <td>Cloth, Clothin, or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Tailor a Garment to Another Size or Body Shape</td>\n    <td>Clothing</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Temporary Cold-Weather Gear (Grants a +2 Bonus)</td>\n    <td>Clothing</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Padded Armor Without Craft (Armor)</td>\n    <td>Clothing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Craft One-Handed Firearm or Two-Handed Firearm</td>\n    <td>Firearms</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Heavy</td>\n    <td>Firearms</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Light</td>\n    <td>Firearms</td>\n    <td>35</td>\n  </tr>\n  <tr>\n    <td>Locate or Identify Naturally Formed Glass</td>\n    <td>Glass</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify the Work of Famous Jewelers</td>\n    <td>Jewelry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a Fake Gemstone*</td>\n    <td>Jewelry</td>\n    <td>Opposed</td>\n  </tr>\n  <tr>\n    <td>Identify the Sort of Creature From Which a Piece of Leather Came*</td>\n    <td>Leather</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Leather</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a High-Quality Item From the Hide of a Non-Standard Creature*</td>\n    <td>Leather</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Leather, Studded Leather, or Hide Armor Without Craft (Armor)</td>\n    <td>Leather</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Skill Check to Open a Lock*</td>\n    <td>Locks</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Tune a Musical Instrument</td>\n    <td>Musical Instruments</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Paint or Other Pigments from Scratch</td>\n    <td>Paintings</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from Memory</td>\n    <td>Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from an Eyewitness Account</td>\n    <td>Paintings</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary or Makeshift Kiln</td>\n    <td>Pottery</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Make a Mold of an Object or Part of a Body</td>\n    <td>Sculptures</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Heavy</td>\n    <td>Seige Engines</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Medium</td>\n    <td>Seige Engines</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Light</td>\n    <td>Seige Engines</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Alter Shoes to a Different Size or Foot Shape*</td>\n    <td>Shoes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize a Famous Ship and Where it Likely Came From</td>\n    <td>Ships</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Whether a Stone Wall is Entirely Stone or a Veneer</td>\n    <td>Stonemasonry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary Stone Support or Small Rampart with Found Supplies</td>\n    <td>Stonemasonry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Mechanical Traps</td>\n    <td>Traps</td>\n    <td>Varies</td>\n  </tr>\n  <tr>\n    <td>Determine the Age of a Mechanical Trap</td>\n    <td>Traps</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Weapon on Sight</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Crossbow or Bolts</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Simple Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Martial Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Exotic Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>18</td>\n  </tr>\n  <tr>\n    <td>Very Simple Item (Wooden Spoon)</td>\n    <td>Varies</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Craft Typical Item (Iron Pot)</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Famous Maker's Mark</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft High-Quality Item (Bell)</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Detemine What Culture (e.g. Elves, Frost Giants) Made an Item</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Complex or Superior Item (Lock)</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify an Obscure Maker's Mark*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Hardness and Hit Points of an Item*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify the Creator of an Item with No Mark*</td>\n    <td>Varies</td>\n    <td>30</td>\n  </tr>\n</table>\n\nThe table below lists which craft skills to use for certain prominent items and adventuring tools. This list omits obvious items - outfits are made with Craft (clothing), keelboats with Craft (ships),  and so on. More specific skills can also be used instead of the listed skill, such as using Craft (tattoos) instead of Craft (paintings) for a tattoo.\n\n<table>\n  <tr>\n    <th>Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Alchemist's Lab</td>\n    <td>Alchemy</td>\n  </tr>\n  <tr>\n    <td>Artisan's Tools</td>\n    <td>Blacksmithing or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Backpack</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Barding</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Bedroll</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Caltrops</td>\n    <td>Weapons</td>\n  </tr>\n  <tr>\n    <td>Cart or Carriage</td>\n    <td>Carpentry</td>\n  </tr>\n  <tr>\n    <td>Chain</td>\n    <td>Blacksmithing or Traps</td>\n  </tr>\n  <tr>\n    <td>Chest</td>\n    <td>Carpentry or Locks</td>\n  </tr>\n  <tr>\n    <td>Climber's Kit</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Disguise Kit</td>\n    <td>Alchemy or Paintings</td>\n  </tr>\n  <tr>\n    <td>Flint and Steel</td>\n    <td>Blacksmithing or Stonemasonry</td>\n  </tr>\n  <tr>\n    <td>Grappling Hook</td>\n    <td>Blacksmithing or Weapons</td>\n  </tr>\n  <tr>\n    <td>Gunslinger's Kit</td>\n    <td>Alchemy or Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Harrow Deck</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Healer's Kit</td>\n    <td>Alchemy or Cloth</td>\n  </tr>\n  <tr>\n    <td>Hemp Rope</td>\n    <td>Baskets or Cloth</td>\n  </tr>\n  <tr>\n    <td>Lamp</td>\n    <td>Blacksmithing or Glass</td>\n  </tr>\n  <tr>\n    <td>Manacles<td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Masterwork Tool</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Musical Instrument</td>\n    <td>Musical Instruments</td>\n  </tr>\n  <tr>\n    <td>Saddle</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Scroll Case</td>\n    <td>Carpentry or Leather</td>\n  </tr>\n  <tr>\n    <td>Signet Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Silk Rope</td>\n    <td>Cloth</td>\n  </tr>\n  <tr>\n    <td>Silver Holy Symbol</td>\n    <td>Blacksmithing or Sculptures</td>\n  </tr>\n  <tr>\n    <td>Skeleton Key</td>\n    <td>Locks</td>\n  </tr>\n  <tr>\n    <td>Spell Component Pouch/td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Spyglass</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Tattoo</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Tent</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Thieves' Tools</td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Waterskin</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Wood Holy Symbol</td>\n    <td>Carpentry or Sculptures</td>\n  </tr>\n</table>\n\nThe following table indicates which Craft skills are typically used to create common worn items. While the normal system for creating magic items doesn't incorporate Craft skills, such skills could reasonably be used while creating a magic item to make it appear especially ornate.\n\n<table>\n  <tr>\n    <th>Worn Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Amulet</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Belt</td>\n    <td>Leather or Clothing</td>\n  </tr>\n  <tr>\n    <td>Bracelet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Bracer</td>\n    <td>Armor or Leather</td>\n  </tr>\n  <tr>\n    <td>Brooch</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Cape or Cloak</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Circlet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Crown</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Gauntlet</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Girdle</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Glasses or Goggles</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Glove</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Hat</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Headband</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Helm</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Mask</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Necklace</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Periapt</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Phylactery</td>\n    <td>Leather or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Robe</td>\n    <td>Clothing</td>\n  </tr>\n  <tr>\n    <td>Vestments</td>\n    <td>Clothing</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: true,
						knowledge: false,
						blurb: "You are skilled in the creation of a specific group of items, such as armor or weapons. Like Knowledge, Perform, and Profession, Craft is actually a number of separate skills. You could have several Craft skills, each with its own ranks. The most common Craft skills are alchemy, armor, baskets, books, bows, calligraphy, carpentry, cloth, clothing, glass, jewelry, leather, locks, paintings, pottery, sculptures, ships, shoes, stonemasonry, traps, and weapons.\n\nA Craft skill is specifically focused on creating something. If nothing is created by the endeavor, it probably falls under the heading of a Profession skill.",
						action: "Does not apply. Craft checks are made by the day or week (see above).",
						try_again: "Yes, but each time you fail by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.",
						special: "You may voluntarily add +10 to the indicated DC to craft an item. This allows you to create the item more quickly (since you’ll be multiplying this higher DC by your Craft check result to determine progress). You must decide whether to increase the DC before you make each weekly or daily check.\n\nTo make an item using Craft (alchemy), you must have alchemical equipment. If you are working in a city, you can buy what you need as part of the raw materials cost to make the item, but alchemical equipment is difficult or impossible to come by in some places. Purchasing and maintaining an alchemist’s lab grants a +2 circumstance bonus on Craft (alchemy) checks because you have the perfect tools for the job, but it does not affect the cost of any items made using the skill.\n\nThose who wish to construct or repair technological items use Craft (mechanical) in conjunction with technological item crafting feats. Without the Technologist feat, Craft (mechanical) can still be used to craft less advanced forms of technology such as gears, hinges, and pulleys. NPCs with the means of crafting technological items are extremely rare, and it is not assumed that PCs have access to such resources. GMs are encouraged to discuss such considerations with their players before allowing technological crafting into the game.",
						skill_unlock_5: "When determining your weekly progress, double the result of your Craft check before multiplying the result by the item’s DC.",
						skill_unlock_10: "You do not ruin any of your raw materials unless you fail a check by 10 or more.",
						skill_unlock_15: "When you determine your progress, the result of your check is how much work you complete each day in silver pieces.",
						skill_unlock_20: "You can craft magic armor, magic weapons, magic rings, and wondrous items that fall under your category of Craft using the normal Craft rules."
					},
					{
						id: 12,
						name: "Heal",
						ability_score: "Wisdom",
						description: "The DC and effect of a Heal check depend on the task you attempt.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Heal DC</th>\n  </tr>\n  <tr>\n    <td>First Aid</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Long-Term Care</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Wounds from Caltrops, spike growth, or spike stones</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Deadly Wounds</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Treat Poison</td>\n    <td>Poison's Save DC</td>\n  </tr>\n  <tr>\n    <td>Treat Disease</td>\n    <td>Disease's Save DC</td>\n  </tr>\n</table>\n\nFirst Aid: You usually use first aid to save a dying character. If a character has negative hit points and is losing hit points (at the rate of 1 per round, 1 per hour, or 1 per day), you can make him stable. A stable character regains no hit points but stops losing them. First aid also stops a character from losing hit points due to effects that cause bleed.\n\nLong-Term Care: Providing long-term care means treating a wounded person for a day or more. If your Heal check is successful, the patient recovers hit points or ability score points lost to ability damage at twice the normal rate: 2 hit points per level for a full 8 hours of rest in a day, or 4 hit points per level for each full day of complete rest; 2 ability score points for a full 8 hours of rest in a day, or 4 ability score points for each full day of complete rest.\n\nYou can tend to as many as six patients at a time. You need a few items and supplies (bandages, salves, and so on) that are easy to come by in settled lands. Giving long-term care counts as light activity for the healer. You cannot give long-term care to yourself.\n\nTreat Wounds from Caltrops, Spike Growth, or Spike Stones: A creature wounded by stepping on a caltrop moves at half normal speed. A successful Heal check removes this movement penalty.\n\nA creature wounded by a spike growth or spike stones spell must succeed on a Ref lex save or take injuries that reduce his speed by one-third. Another character can remove this penalty by taking 10 minutes to dress the victim’s injuries and succeeding on a Heal check against the spell’s save DC.\n\nTreat Deadly Wounds: When treating deadly wounds, you can restore hit points to a damaged creature. Treating deadly wounds restores 1 hit point per level of the creature. If you exceed the DC by 5 or more, add your Wisdom modifier (if positive) to this amount. A creature can only benefit from its deadly wounds being treated within 24 hours of being injured and never more than once per day. You must expend two uses from a healer’s kit to perform this task. You take a –2 penalty on your Heal skill check for each use from the healer’s kit that you lack.\n\nTreat Poison: To treat poison means to tend to a single character who has been poisoned and who is going to take more damage from the poison (or suffer some other effect). Every time the poisoned character makes a saving throw against the poison, you make a Heal check. If your Heal check exceeds the DC of the poison, the character receives a +4 competence bonus on his saving throw against the poison.\n\nTreat Disease: To treat a disease means to tend to a single diseased character. Every time the diseased character makes a saving throw against disease effects, you make a Heal check. If your Heal check exceeds the DC of the disease, the character receives a +4 competence bonus on his saving throw against the disease.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You are skilled at tending to wounds and ailments.",
						action: "Providing first aid, treating a wound, or treating poison is a standard action. Treating a disease or tending a creature wounded by a spike growth or spike stones spell takes 10 minutes of work. Treating deadly wounds takes 1 hour of work. Providing long-term care requires 8 hours of light activity.",
						try_again: "Varies. Generally speaking, you can’t try a Heal check again without witnessing proof of the original check’s failure. You can always retry a check to provide first aid, assuming the target of the previous attempt is still alive.",
						special: "A healer’s kit gives you a +2 circumstance bonus on Heal checks.",
						skill_unlock_5: "When you treat deadly wounds, the target recovers hit points and ability damage as if it had rested for a full day.",
						skill_unlock_10: "When you treat deadly wounds, the target recovers hit points as if it had rested for a full day with long-term care.",
						skill_unlock_15: "When you treat deadly wounds, the creature recovers hit point and ability damage as if it had rested for 3 days.",
						skill_unlock_20: "When you treat deadly wounds, the target recovers hit point and ability damage as if it had rested for 3 days with long-term care."
					},
					{
						id: 13,
						name: "Intimidate",
						ability_score: "Charisma",
						description: "You can use Intimidate to force an opponent to act friendly toward you for 1d6 × 10 minutes with a successful check. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If successful, the target gives you the information you desire, takes actions that do not endanger it, or otherwise offers limited assistance. After the Intimidate expires, the target treats you as unfriendly and may report you to local authorities. If you fail this check by 5 or more, the target attempts to deceive you or otherwise hinder your activities.\n\nDemoralize: You can use this skill to cause an opponent to become shaken for a number of rounds. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If you are successful, the target is shaken for 1 round. This duration increases by 1 round for every 5 by which you beat the DC. You can only threaten an opponent in this way if it is within 30 feet and can clearly see and hear you. Using demoralize on the same creature only extends the duration; it does not create a stronger fear condition.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You can use this skill to frighten your opponents or to get them to act in a way that benefits you. This skill includes verbal threats and displays of prowess.",
						action: "Using Intimidate to change an opponent’s attitude requires 1 minute of conversation. Demoralizing an opponent is a standard action.",
						try_again: "You can attempt to Intimidate an opponent again, but each additional check increases the DC by +5. This increase resets after 1 hour has passed.",
						special: "You also gain a +4 bonus on Intimidate checks if you are larger than your target and a –4 penalty on Intimidate checks if you are smaller than your target.",
						skill_unlock_5: "If you exceed the DC to demoralize a target by at least 10, it is frightened for 1 round and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened condition, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_10: "If you exceed the DC to demoralize a target by at least 10, it is panicked for 1 round or frightened for 1d4 rounds (your choice) and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened or panicked condition, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_15: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1 round or panicked for 1d4 rounds (your choice) and frightened thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering, panicked, and frightened conditions, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_20: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1d4 rounds and panicked thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering and panicked conditions, but the target is still shaken, even if it has the stalwart ability."
					},
					{
						id: 24,
						name: "Knowledge",
						ability_score: "Intelligence",
						description: "Arcana (ancient mysteries, magic traditions, arcane symbols, constructs, dragons, magical beasts)\n\nDungeoneering (aberrations, caverns, oozes, spelunking)\n\nEngineering (buildings, aqueducts, bridges, fortifications)\n\nGeography (lands, terrain, climate, people)\n\nHistory (wars, colonies, migrations, founding of cities)\n\nLocal (legends, personalities, inhabitants, laws, customs, traditions, humanoids)\n\nNature (animals, fey, monstrous humanoids, plants, seasons and cycles, weather, vermin)\n\nNobility (lineages, heraldry, personalities, royalty)\n\nPlanes (the Inner Planes, the Outer Planes, the Astral Plane, the Ethereal Plane, outsiders, planar magic)\n\nReligion (gods and goddesses, mythic history, ecclesiastic tradition, holy symbols, undead)\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Many of the Knowledge skills have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Knowledge Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Identify Auras While Using Detect Magic</td>\n    <td>Arcana</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell Effect That Is In Place</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify Materials Manufactured by Magic</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell That Just Targeted You</td>\n    <td>Arcana</td>\n    <td>25 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify the Spells Cast Using a Specific Material Component</td>\n    <td>Arcana</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Underground Hazard</td>\n    <td>Dungeoneering</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify Mineral, Stone, or Metal</td>\n    <td>Dungeoneering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Slope</td>\n    <td>Dungeoneering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Depth Underground</td>\n    <td>Dungeoneering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Dangerous Construction</td>\n    <td>Engineering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Style or Age</td>\n    <td>Engineering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Weakness</td>\n    <td>Engineering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Ethnicity or Accent</td>\n    <td>Geography</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Regional Terrain Features</td>\n    <td>Geography</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Location of Nearest Community or Noteworthy Site</td>\n    <td>Geography</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Recent or Historically Significant Date</td>\n    <td>History</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Approximate Date of Specific Event</td>\n    <td>History</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Obscure or Ancient Historical Event</td>\n    <td>History</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Local Laws, Rulers, and Popular Locations</td>\n    <td>Local</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know a Common Rumor or Local Tradition</td>\n    <td>Local</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Hidden Organizations, Rulers, and Locations</td>\n    <td>Local</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Natural Hazard</td>\n    <td>Nature</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify a Common Plant or Animal</td>\n    <td>Nature</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Unnatural Weather Phenomenon</td>\n    <td>Nature</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Artifical Nature of Feature</td>\n    <td>Nature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Current Rulers and Their Symbols</td>\n    <td>Nobility</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Proper Etiquette</td>\n    <td>Nobility</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Line of Succession</td>\n    <td>Nobility</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know the Names of the Planes</td>\n    <td>Planes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Current Plane</td>\n    <td>Planes</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Planar Origin</td>\n    <td>Planes</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Recognize a Common Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Common Mythology and Tenets</td>\n    <td>Religion</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize an Obscure Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>Varies</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
						untrained: false,
						customizable: true,
						knowledge: true,
						blurb: "You are educated in a field of study and can answer both simple and complex questions. Like the Craft, Perform, and Profession skills, Knowledge actually encompasses a number of different specialties.",
						action: "Usually none. In most cases, a Knowledge check doesn’t take an action.",
						try_again: "No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
						special: "You cannot make an untrained Knowledge check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Knowledge checks in the fields that they cover.",
						skill_unlock_5: "When you successfully identify a creature, you gain one additional piece of information for every 5 ranks you possess in that Knowledge skill.",
						skill_unlock_10: "When you successfully identify a creature, you gain a +1 competence bonus on attack rolls, opposed ability checks, skill checks, and caster level checks against creatures of that kind (e.g., glabrezu demons, but not other demons or evil outsiders) for 1 minute. This bonus increases by 1 for every 5 ranks beyond 10 you possess in that Knowledge skill.",
						skill_unlock_15: "When you fail a Knowledge check, you can reroll the check at a –10 penalty. The competence bonus above also applies to saving throws against exceptional, spell-like, or supernatural abilities used by creatures you identify.",
						skill_unlock_20: "Whenever you attempt a Knowledge check, you can roll twice and take the better result."
					},
					{
						id: 26,
						name: "Perception",
						ability_score: "Wisdom",
						description: "Perception has a number of uses, the most common of which is an opposed check versus an opponent’s Stealth check to notice the opponent and avoid being surprised. If you are successful, you notice the opponent and can react accordingly. If you fail, your opponent can take a variety of actions, including sneaking past you and attacking you.\n\nPerception is also used to notice fine details in the environment. The DC to notice such details varies depending upon distance, the environment, and how noticeable the detail is. The following table gives a number of guidelines.\n\n<table>\n  <tr>\n    <th>Detail</th>\n    <th>Perception DC</th>\n  </tr>\n  <tr>\n    <td>Hear the Sound of Battle</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Notice the Stench of Rotting Garbage</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Detect the Smell of Smoke</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Conversation</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Notice a Visible Creature</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Determine if Food is Spoiled</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Creature Walking</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Whispered Conversation</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Find the Average Concealed Door</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Key Being Turned in a Lock</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Find the Average Secret Door</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Hear a Bow Being Drawn</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Sense a Burrowing Creature Underneath You</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Notice a Pickpocket</td>\n    <td>Opposed by Sleight of Hand</td>\n  </tr>\n  <tr>\n    <td>Notice a Creature Using Stealth</td>\n    <td>Opposed by Stealth</td>\n  </tr>\n  <tr>\n    <td>Find a Hidden Trap</td>\n    <td>Varies by Trap</td>\n  </tr>\n  <tr>\n    <td>Identify the Powers of a Potion through Taste</td>\n    <td>15 + Potion's Caster Level</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>Perception Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Distance to the Source, Object, or Creature</td>\n    <td>+1 per 10 Feet</td>\n  </tr>\n  <tr>\n    <td>Through a Closed Door</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Through a Wall</td>\n    <td>+10 per Foot</td>\n  </tr>\n  <tr>\n    <td>Favorable Conditions</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Unfavorable Conditions</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Terrible Conditions</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Distracted</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Asleep</td>\n    <td>+10</td>\n  </tr>\n  <tr>\n    <td>Creature or Object is Invisible</td>\n    <td>+20</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "Your senses allow you to notice fine details and alert you to danger. Perception covers all five senses, including sight, hearing, touch, taste, and smell.",
						action: "Most Perception checks are reactive, made in response to observable stimulus. Intentionally searching for stimulus is a move action.",
						try_again: "Yes. You can try to sense something you missed the first time, so long as the stimulus is still present.",
						special: "Creatures with the scent special quality have a +8 bonus on Perception checks made to detect a scent. Creatures with the tremorsense special quality have a +8 bonus on Perception checks against creatures touching the ground and automatically make any such checks within their range.",
						skill_unlock_5: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping is halved. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 20 feet.",
						skill_unlock_10: "The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 30 feet. In addition, you gain a +5 bonus on Perception checks to notice or locate an invisible creature or object.",
						skill_unlock_15: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping doesn’t apply to you. The distance modifier on the DC of your Perception checks is reduced to +1 per 40 feet.",
						skill_unlock_20: "You gain a +10 bonus on Perception checks to notice invisible creatures or objects. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 60 feet."
					},
					{
						id: 28,
						name: "Profession",
						ability_score: "Wisdom",
						description: "You can earn half your Profession check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the profession’s daily tasks, how to supervise helpers, and how to handle common problems. You can also answer questions about your Profession. Basic questions are DC 10, while more complex questions are DC 15 or higher.\n\nA profession often encompasses many smaller areas of expertise, and these auxiliary skills can come in handy in situations beyond just making money or answering trade-specific questions. Below are some sample additional uses for Profession skills, and GMs are encouraged to create their own.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Profession Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Determine Hardness and Hit Points of a Structure</td>\n    <td>Architect or Engineer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Prepare Trail Rations (Takes 1 Hour Per Day's Worth of Rations)</td>\n    <td>Baker or Cook</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Obtain a Legal Permit</td>\n    <td>Barrister or Clerk</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Get Somone Released From Jail Who Has Been Imprisoned for a Minor Crime</td>\n    <td>Barrister</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Ask a Special Favor From a Judge (Such as Arresting Someone)</td>\n    <td>Barrister</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Brew Alcohol of Exceptional Quality</td>\n    <td>Brewer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in a Beverage</td>\n    <td>Brewer</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Butcher, Shepherd, or Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Slaughter and Butcher an Animal</td>\n    <td>Butcher, Cook, or Shepherd</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Reduce a Legal Fine or Tax By Half the Result of the Check in gp (up to 75%)</td>\n    <td>Clerk</td>\n    <td>20+</td>\n  </tr>\n  <tr>\n    <td>Cook a Meal of Exceptional Quality</td>\n    <td>Cook</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in Food</td>\n    <td>Cook</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Find Potential Clients within an Establishment or Large Group</td>\n    <td>Courtesan</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Continue Steering a Vehicle When You Take Damage</td>\n    <td>Driver or Sailor</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Take Cover (As The Ride Skill) While Steering a Vehicle</td>\n    <td>Driver or Sailor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Non-Creature Plant</td>\n    <td>Farmer or Gardener</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Rejuvinate Dying Plants</td>\n    <td>Farmer or Gardener</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Provide 1 Day's Worth of Food for Yourself and Others in the Wild</td>\n    <td>Fisherman or Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recall the Rules of a Game of Chance</td>\n    <td>Gambler</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Get a Hunch Regarding Whether a Game is Rigged</td>\n    <td>Gambler</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Reduce an Average or Lower Cost of Living by 50%</td>\n    <td>Innkeeper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Sate Hunger or Thirst for 1 Day</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Common Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Knowledge Check Using Reference Material</td>\n    <td>Librarian</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Recall the Name of a Rare Book</td>\n    <td>Librarian</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Where an Item was Manufactured</td>\n    <td>Merchant</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Recall Where a Common Good Fetches a Higher Price</td>\n    <td>Merchant</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child</td>\n    <td>Midwife</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child Despite Complications</td>\n    <td>Midwife</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Grind a Small Piece of Nonmagical Substance into Powder</td>\n    <td>Miller</td>\n    <td>10 + Hardness</td>\n  </tr>\n  <tr>\n    <td>Identify Common Metal or Semiprecious Stone</td>\n    <td>Miner</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Metal or Precious Gem</td>\n    <td>Miner</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking a Stone or Metal Object</td>\n    <td>Miner</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Increase Carrying Capacity for 8 Hours as if Strength were 2 Higher</td>\n    <td>Porter</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Unload a Vessel in Half the Normal Time</td>\n    <td>Porter</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Navigate a Ship in Fair Conditions</td>\n    <td>Sailor</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Pilot a Ship Safely Through a Hazardous Seaway</td>\n    <td>Sailor</td>\n    <td>25+</td>\n  </tr>\n  <tr>\n    <td>Determine Which Scribe Wrote a Document</td>\n    <td>Scribe</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Copy a Document (30 Minutes per Page; Requires a Blank Book)</td>\n    <td>Scribe</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Illuminate a Manuscript (1 Hour per Page)</td>\n    <td>Scribe</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Woolen Textiles</td>\n    <td>Shepherd</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Whether a Weapon or Armor is of Masterwork Quality</td>\n    <td>Soldier</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Estimate the Size of a Military Force</td>\n    <td>Soldier</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify Advantages and Disadvantages of a Military Formation</td>\n    <td>Soldier</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Keep Horses Fed in the Wild</td>\n    <td>Stable Master</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Fit or Remove Barding in Half the Normal Time</td>\n    <td>Stable Master</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize Damaged or Sabotaged Horse Tack</td>\n    <td>Stable Master</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Leatherwork (and Tell If It's Masterwork Quality)</td>\n    <td>Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Aid Another on an Skill Check to Get Out of a Trap or Snare</td>\n    <td>Trapper</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Reset a Trap in Half the Normal Amount of Time</td>\n    <td>Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Scavenge Wood Suitable for Campfire or Shelter</td>\n    <td>Woodcutter</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking Wooden Object</td>\n    <td>Woodcutter</td>\n    <td>20</td>\n  </tr>\n</table>",
						untrained: false,
						customizable: true,
						knowledge: false,
						blurb: "You are skilled at a specific job. Like Craft, Knowledge, and Perform, Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. While a Craft skill represents ability in creating an item, a Profession skill represents an aptitude in a vocation requiring a broader range of less specific knowledge. The most common Profession skills are architect, baker, barrister, brewer, butcher, clerk, cook, courtesan, driver, engineer, farmer, f isherman, gambler, gardener, herbalist, innkeeper, librarian, merchant, midwife, miller, miner, porter, sailor, scribe, shepherd, stable master, soldier, tanner, trapper, and woodcutter.",
						action: "Not applicable. A single check generally represents a week of work.",
						try_again: "Varies. An attempt to use a Profession skill to earn income cannot be retried. You are stuck with whatever weekly wage your check result brought you. Another check may be made after a week to determine a new income for the next period of time. An attempt to accomplish some specific task can usually be retried.",
						special: "Untrained laborers and assistants (that is, characters without any ranks in Profession) earn an average of 1 silver piece per day.",
						skill_unlock_5: "When using Profession checks to earn income, you earn gold pieces equal to the result of your check each week.",
						skill_unlock_10: "When attempting Profession checks, you can roll twice and take the better result. When answering questions about your Profession, you can always take 10.",
						skill_unlock_15: "You can attempt checks to earn income once per day instead of once per week.",
						skill_unlock_20: "When attempting Profession checks, you can choose to roll once instead of twice. If you do and the result of the roll is less than 10, replace it with 10. When answering questions about your Profession, you can always take 20."
					},
					{
						id: 33,
						name: "Stealth",
						ability_score: "Dexterity",
						description: "Your Stealth check is opposed by the Perception check of anyone who might notice you. Creatures that fail to beat your Stealth check are not aware of you and treat you as if you had total concealment. You can move up to half your normal speed and use Stealth at no penalty. When moving at a speed greater than half but less than your normal speed, you take a –5 penalty. It’s impossible to use Stealth while attacking, running, or charging.\n\nCreatures gain a bonus or penalty on Stealth checks based on their size: Fine +16, Diminutive +12, Tiny +8, Small +4, Medium +0, Large –4, Huge –8, Gargantuan –12, Colossal –16.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.\n\nBreaking Stealth: When you start your turn using Stealth, you can leave cover or concealment and remain unobserved as long as you succeed at a Stealth check and end your turn in cover or concealment. Your Stealth immediately ends after you make an attack roll, whether or not the attack is successful (except when sniping as noted below).\n\nSniping: If you’ve already successfully used Stealth at least 10 feet from your target, you can make one ranged attack and then immediately use Stealth again. You take a –20 penalty on your Stealth check to maintain your obscured location.\n\nCreating a Diversion to Hide: You can use Bluff to allow you to use Stealth. A successful Bluff check opposed by the viewer’s Sense Motive can give you the momentary diversion you need to attempt a Stealth check while people are aware of you.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You are skilled at avoiding detection, allowing you to slip past foes or strike from an unseen position. This skill covers hiding and moving silently.",
						action: "Usually none. Normally, you make a Stealth check as part of movement, so it doesn’t take a separate action. However, using Stealth immediately after a ranged attack (see Sniping, above) is a move action.",
						try_again: "",
						special: "If you are invisible, you gain a +40 bonus on Stealth checks if you are immobile, or a +20 bonus on Stealth checks if you’re moving.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.",
						skill_unlock_5: "Reduce the Stealth penalty from sniping by 10.",
						skill_unlock_10: "Stealth check penalties for moving quickly are halved, including the ability unlocked at 5 ranks, moving full speed, and reaching concealment after creating a distraction.",
						skill_unlock_15: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the end of your turn.",
						skill_unlock_20: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the beginning of your next turn."
					},
					{
						id: 36,
						name: "Use Magic Device",
						ability_score: "Charisma",
						description: "You can use this skill to read a spell or to activate a magic item. Use Magic Device lets you use a magic item as if you had the spell ability or class features of another class, as if you were a different race, or as if you were of a different alignment.\n\nYou make a Use Magic Device check each time you activate a device such as a wand. If you are using the check to emulate an alignment or some other quality in an ongoing manner, you need to make the relevant Use Magic Device check once per hour.\n\nYou must consciously choose which requirement to emulate. That is, you must know what you are trying to emulate when you make a Use Magic Device check for that purpose. The DCs for various tasks involving Use Magic Device checks are summarized on the table below.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Use Magic Device DC</th>\n  </tr>\n  <tr>\n    <td>Activate Blindly</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Decipher a Written Scroll</td>\n    <td>25 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Use a Scroll</td>\n    <td>20 + Caster Level</td>\n  </tr>\n  <tr>\n    <td>Use a Wand</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Emulate a Class Feature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Emulate an Ability Score</td>\n    <td>See Text</td>\n  </tr>\n  <tr>\n    <td>Emulate an Ancestry</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Emulate an Alignment</td>\n    <td>30</td>\n  </tr>\n</table>\n\nActivate Blindly: Some magic items are activated by special words, thoughts, or actions. You can activate such an item as if you were using the activation word, thought, or action, even when you’re not and even if you don’t know it. You do have to perform some equivalent activity in order to make the check. That is, you must speak, wave the item around, or otherwise attempt to get it to activate. You get a +2 bonus on your Use Magic Device check if you’ve activated the item in question at least once before. If you fail by 9 or less, you can’t activate the device. If you fail by 10 or more, you suffer a mishap. A mishap means that magical energy gets released but doesn’t do what you wanted it to do. The default mishaps are that the item affects the wrong target or that uncontrolled magical energy is released, dealing 2d6 points of damage to you. This mishap is in addition to the chance for a mishap that you normally risk when you cast a spell from a scroll that you could not otherwise cast yourself.\n\nDecipher a Written Spell: This usage works just like deciphering a written spell with the Spellcraft skill, except that the DC is 5 points higher. Deciphering a written spell requires 1 minute of concentration.\n\nEmulate an Ability Score: To cast a spell from a scroll, you need a high score in the appropriate ability (Intelligence for wizard spells, Wisdom for divine spells, or Charisma for sorcerer or bard spells). Your effective ability score (appropriate to the class you’re emulating when you try to cast the spell from the scroll) is your Use Magic Device check result minus 15. If you already have a high enough score in the appropriate ability, you don’t need to make this check.\n\nEmulate an Alignment: Some magic items have positive or negative effects based on the user’s alignment. Use Magic Device lets you use these items as if you were of an alignment of your choice. You can emulate only one alignment at a time.\n\nEmulate a Class Feature: Sometimes you need to use a class feature to activate a magic item. In this case, your effective level in the emulated class equals your Use Magic Device check result minus 20. This skill does not let you actually use the class feature of another class. It just lets you activate items as if you had that class feature. If the class whose feature you are emulating has an alignment requirement, you must meet it, either honestly or by emulating an appropriate alignment with a separate Use Magic Device check (see above).\n\nEmulate an Ancestry: Some magic items work only for members of certain ancestries, or work better for members of those ancestries. You can use such an item as if you were a member of an ancestry of your choice. You can emulate only one ancestry at a time.\n\nUse a Scroll: Normally, to cast a spell from a scroll, you must have the scroll’s spell on your class spell list. Use Magic Device allows you to use a scroll as if you had a particular spell on your class spell list. The DC is equal to 20 + the caster level of the spell you are trying to cast from the scroll. In addition, casting a spell from a scroll requires a minimum score (10 + spell level) in the appropriate ability. If you don’t have a sufficient score in that ability, you must emulate the ability score with a separate Use Magic Device check.\n\nThis use of the skill also applies to other spell completion magic items.\n\nUse a Wand, Staff, or Other Spell Trigger Item: Normally, to use a wand, you must have the wand’s spell on your class spell list. This use of the skill allows you to use a wand as if you had a particular spell on your class spell list. Failing the roll does not expend a charge.",
						untrained: false,
						customizable: false,
						knowledge: false,
						blurb: "You are skilled at activating magic items, even if you are not otherwise trained in their use.",
						action: "None. The Use Magic Device check is made as part of the action (if any) required to activate the magic item.",
						try_again: "Yes, but if you ever roll a natural 1 while attempting to activate an item and you fail, then you can’t try to activate that item again for 24 hours.",
						special: "You cannot take 10 with this skill. You can’t aid another on Use Magic Device checks. Only the user of the item may attempt such a check.",
						skill_unlock_5: "You can use the aid another action to assist another creature’s Use Magic Device check by attempting a check against the item’s Use Magic Device DC.",
						skill_unlock_10: "If you roll a natural 1 when activating an item, you take a –10 penalty on Use Magic Device checks with that item for 24 hours instead of being unable to activate it. This penalty stacks with itself.",
						skill_unlock_15: "You can use this skill to emulate two ancestries or two alignments simultaneously.",
						skill_unlock_20: "If you roll a natural 1 when activating an item, you can reroll the check at a –10 penalty to activate the item. You must take the result of the second check, even if it is worse, and you can’t reroll it again."
					},
					{
						id: 1,
						name: "Acrobatics",
						ability_score: "Dexterity",
						description: "You can use Acrobatics to move on narrow surfaces and uneven ground without falling. A successful check allows you to move at half speed across such surfaces—only one check is needed per round. Use the following table to determine the base DC, which is then modified by the Acrobatics skill modifiers noted below. While you are using Acrobatics in this way, you are considered flat-footed and lose your Dexterity bonus to your AC (if any). If you take damage while using Acrobatics, you must immediately make another Acrobatics check at the same DC to avoid falling or being knocked prone. *No Acrobatics check is needed to move across these surfaces unless the modifiers increase the DC to 10 or higher.\n\n<table>\n  <tr>\n    <th>Surface Width</th>\n    <th>Base Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>Greater Than 3 Feet Wide</td>\n    <td>0*</td>\n  </tr>\n  <tr>\n    <td>1-3 Feet Wide</td>\n    <td>5*</td>\n  </tr>\n  <tr>\n    <td>7-11 Inches Wide</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>2-6 Inches Wide</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Less Than 2 Inches Wide</td>\n    <td>20</td>\n  </tr>\n</table>\n\nIn addition, you can move through a threatened square without provoking an attack of opportunity from an enemy by using Acrobatics. When moving in this way, you move at half speed. You can move at full speed by increasing the DC of the check by 10. You cannot use Acrobatics to move past foes if your speed is reduced due to carrying a medium or heavy load or wearing medium or heavy armor. If an ability allows you to move at full speed under such conditions, you can use Acrobatics to move past foes. You can use Acrobatics in this way while prone, but doing so requires a full-round action to move 5 feet, and the DC is increased by 5. If you attempt to move through an enemy’s space and fail the check, you lose the move action and provoke an attack of opportunity. *This DC is used to avoid an attack of opportunity due to movement. This DC increases by 2 for each additional opponent avoided in 1 round.\n\n<table>\n  <tr>\n    <th>Situation</th>\n    <th>Base Acrobatics DC*</th>\n  </tr>\n  <tr>\n    <td>Move Through a Threatened Area</td>\n    <td>Opponent's Combat Maneuver Defense</td>\n  </tr>\n  <tr>\n    <td>Move Through an Enemy's Space</td>\n    <td>5 + Opponent's Combat Maneuver Defense</td>\n  </tr>\n</table>\n\nFinally, you can use the Acrobatics skill to make jumps or to soften a fall. The base DC to make a jump is equal to the distance to be crossed (if horizontal) or four times the height to be reached (if vertical). These DCs double if you do not have at least 10 feet of space to get a running start. The only Acrobatics modifiers that apply are those concerning the surface you are jumping from. If you fail this check by 4 or less, you can attempt a DC 20 Reflex save to grab hold of the other side after having missed the jump. If you fail by 5 or more, you fail to make the jump and fall (or land prone, in the case of a vertical jump).\n\nCreatures with a base land speed above 30 feet receive a +4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed above 30 feet. Creatures with a base land speed below 30 feet receive a –4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed below 30 feet. No jump can allow you to exceed your maximum movement for the round.\n\nFor a running jump, the result of your Acrobatics check indicates the distance traveled in the jump (and if the check fails, the distance at which you actually land and fall prone). Halve this result for a standing long jump to determine where you land.\n\nWhen you deliberately fall any distance, even as a result of a missed jump, a DC 15 Acrobatics skill check allows you to ignore the first 10 feet fallen, although you still end up prone if you take damage from a fall.\n\n<table>\n  <tr>\n    <th>Long Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>5 Feet</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>10 Feet</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>15 Feet</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>20 Feet</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Greater Than 20 Feet</td>\n    <td>+5 per 5 Feet</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>High Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>1 Foot</td>\n    <td>4</td>\n  </tr>\n  <tr>\n    <td>2 Feet</td>\n    <td>8</td>\n  </tr>\n  <tr>\n    <td>3 Feet</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>4 Feet</td>\n    <td>16</td>\n  </tr>\n  <tr>\n    <td>Greater Than 4 Feet</td>\n    <td>+4 per Foot</td>\n  </tr>\n</table>\n\nThe following modifiers apply to all Acrobatics skill checks. The modifiers stack with one another, but only the most severe modifier for any given condition applies.\n\n<table>\n  <tr>\n    <th>Acrobatics Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Slightly Obstructed (Gravel, Sand)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severyly Obstructed (Cavern, Rubble)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Slippery (Wet)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Slippery</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Sloped (<45 degrees)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Sloped (>45 degrees)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Unsteady (Boat in Rough Water)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Moderately Unsteady (Boat in a Storm)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Move at Full Speed on Narrow or Uneven Surfaces</td>\n    <td>+5 (not to Jumps)</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You can keep your balance while traversing narrow or treacherous surfaces. You can also dive, flip, jump, and roll, avoiding attacks and confusing your opponents.",
						action: "None. An Acrobatics check is made as part of another action or as a reaction to a situation.",
						try_again: "",
						special: "If you have 3 or more ranks in Acrobatics, you gain a +3 dodge bonus to AC when fighting defensively instead of the usual +2, and a +6 dodge bonus to AC when taking the total defense action instead of the usual +4.",
						skill_unlock_5: "You can move at normal speed through a threatened square without provoking an attack of opportunity by increasing the DC of the check by 5 (instead of by 10). You aren’t denied your Dexterity bonus when attempting Acrobatics checks with DCs of 20 or lower.",
						skill_unlock_10: "You can attempt an Acrobatics check at a –10 penalty and use the result as your CMD against trip maneuvers. You can also attempt an Acrobatics check at a –10 penalty in place of a Reflex save to avoid falling. You must choose to use this ability before the trip attempt or Reflex save is rolled. With a successful DC 20 Acrobatics check, you treat an unintentional fall as 10 feet shorter plus 10 feet for every 10 by which you exceed the DC, and treat an intentional fall as 10 feet shorter for every 10 by which you exceed the DC.",
						skill_unlock_15: "You do not provoke attacks of opportunity when standing up from prone.",
						skill_unlock_20: "You double the result of any Acrobatics check when jumping and never fall prone at the end of a fall as long as you remain conscious."
					},
					{
						id: 5,
						name: "Craft",
						ability_score: "Intelligence",
						description: "You can practice your trade and make a decent living, earning half your check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the craft’s daily tasks, how to supervise untrained helpers, and how to handle common problems. (Untrained laborers and assistants earn an average of 1 silver piece per day.)\n\nThe basic function of the Craft skill, however, is to allow you to make an item of the appropriate type. The DC depends on the complexity of the item to be created. The DC, your check result, and the price of the item determine how long it takes to make a particular item. The item’s finished price also determines the cost of raw materials.\n\nTo determine how much time and money it takes to make an item, follow these steps.\n\n1) Find the item’s price in silver pieces (1 gp = 10 sp).\n\n2) Find the item’s DC from Table: Craft Skills.\n\n3) Pay 1/3 of the item’s price for the raw material cost.\n\n4) Make an appropriate Craft check representing one week’s worth of work. If the check succeeds, multiply your check result by the DC. If the result × the DC equals the price of the item in sp, then you have completed the item. (If the result × the DC equals double or triple the price of the item in silver pieces, then you’ve completed the task in one-half or one-third of the time. Other multiples of the DC reduce the time in the same manner.) If the result × the DC doesn’t equal the price, then it represents the progress you’ve made this week. Record the result and make a new Craft check for the next week. Each week, you make more progress until your total reaches the price of the item in silver pieces.\n\nIf you fail a check by 4 or less, you make no progress this week (or day, see below). If you miss by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.\n\nTools: All crafts require artisan’s tools to give the best chance of success. If improvised tools are used, the check is made with a –2 penalty. On the other hand, masterwork artisan’s tools provide a +2 circumstance bonus on the check.\n\nFabricate Spell: In some cases, the fabricate spell can be used to achieve the results of a Craft check with no actual check involved. You must still make an appropriate Craft check when using the spell to make articles requiring a high degree of craftsmanship.\n\nIronwood Spell: A successful Craft check related to woodworking in conjunction with the casting of the ironwood spell enables you to make wooden items that have the strength of steel.\n\nMinor Creation: When casting the spell minor creation, you must succeed on an appropriate Craft check to make a complex item.\n\nProgress by the Day: You can make checks by the day instead of by the week. In this case your progress (check result × DC) should be divided by the number of days in a week.\n\nCreate Masterwork Items: You can make a masterwork item: a weapon, suit of armor, shield, or tool that conveys a bonus on its use through its exceptional craftsmanship. To create a masterwork item, you create the masterwork component as if it were a separate item in addition to the standard item. The masterwork component has its own price (300 gp for a weapon or 150 gp for a suit of armor or a shield, see Chapter 6 for the price of other masterwork tools) and a Craft DC of 20. Once both the standard component and the masterwork component are completed, the masterwork item is finished. The cost you pay for the masterwork component is one-third of the given amount, just as it is for the cost in raw materials.\n\nRepair Items: You can repair an item by making checks against the same DC that it took to make the item in the first place. The cost of repairing an item is one-fifth of the item’s price.\n\n*You must be trained in the listed skill to attempt this task.\n\n<table>\n  <tr>\n    <th>Item/Task</th>\n    <th>Craft Skill</th>\n    <th>Craft DC</th>\n  </tr>\n  <tr>\n    <td>Craft Acid</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine the Items an Alchemist Makes with Substances from Their Lab*</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Alchemist's Fire, Smokestick, or Tindertwig</td>\n    <td>Alchemy</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Antitoxin, Sunrod, Tanglefoot Bag, or Thunderstone</td>\n    <td>Alchemy</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Armor or Shield</td>\n    <td>Armor</td>\n    <td>10 + AC Bonus</td>\n  </tr>\n  <tr>\n    <td>Etch Metal Armor Plates with Decorative Designs</td>\n    <td>Armor or Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Suit of Masterwork Armor on Sight</td>\n    <td>Armor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine What Type of Environment a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine the Specific Region a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Smelt Ore and Refine the Metal</td>\n    <td>Blacksmithing</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create Armor Spikes or Shield Spikes Without Craft (Armor)*</td>\n    <td>Blacksmithing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Determine a Book's Approxiamte Age</td>\n    <td>Books</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Composite Bow on Site</td>\n    <td>Bows</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Longbow, Shortbow, or Arrows</td>\n    <td>Bows</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Bow on Sight</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow With High Strength Rating</td>\n    <td>Bows</td>\n    <td>15 + (2 x Rating)</td>\n  </tr>\n  <tr>\n    <td>Determine a Writer's Experience Level and Handedness*</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Write an Invitation That Matches Appropriate Social Conventions</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Make a Makeshift Barrel or Crate</td>\n    <td>Carpentry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Rudiementary Raft from Found Materials</td>\n    <td>Carpentry or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Carve Fine Woodworking</td>\n    <td>Carpentry or Sculptures</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Wooden Armor or a Wooden Shield Without Craft (Armor)</td>\n    <td>Carpentry</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Correctly Dye a Garment or Bolt of Cloth</td>\n    <td>Cloth</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Mend a Sail</td>\n    <td>Cloth, Clothin, or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Tailor a Garment to Another Size or Body Shape</td>\n    <td>Clothing</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Temporary Cold-Weather Gear (Grants a +2 Bonus)</td>\n    <td>Clothing</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Padded Armor Without Craft (Armor)</td>\n    <td>Clothing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Craft One-Handed Firearm or Two-Handed Firearm</td>\n    <td>Firearms</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Heavy</td>\n    <td>Firearms</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Light</td>\n    <td>Firearms</td>\n    <td>35</td>\n  </tr>\n  <tr>\n    <td>Locate or Identify Naturally Formed Glass</td>\n    <td>Glass</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify the Work of Famous Jewelers</td>\n    <td>Jewelry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a Fake Gemstone*</td>\n    <td>Jewelry</td>\n    <td>Opposed</td>\n  </tr>\n  <tr>\n    <td>Identify the Sort of Creature From Which a Piece of Leather Came*</td>\n    <td>Leather</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Leather</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a High-Quality Item From the Hide of a Non-Standard Creature*</td>\n    <td>Leather</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Leather, Studded Leather, or Hide Armor Without Craft (Armor)</td>\n    <td>Leather</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Skill Check to Open a Lock*</td>\n    <td>Locks</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Tune a Musical Instrument</td>\n    <td>Musical Instruments</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Paint or Other Pigments from Scratch</td>\n    <td>Paintings</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from Memory</td>\n    <td>Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from an Eyewitness Account</td>\n    <td>Paintings</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary or Makeshift Kiln</td>\n    <td>Pottery</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Make a Mold of an Object or Part of a Body</td>\n    <td>Sculptures</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Heavy</td>\n    <td>Seige Engines</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Medium</td>\n    <td>Seige Engines</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Light</td>\n    <td>Seige Engines</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Alter Shoes to a Different Size or Foot Shape*</td>\n    <td>Shoes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize a Famous Ship and Where it Likely Came From</td>\n    <td>Ships</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Whether a Stone Wall is Entirely Stone or a Veneer</td>\n    <td>Stonemasonry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary Stone Support or Small Rampart with Found Supplies</td>\n    <td>Stonemasonry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Mechanical Traps</td>\n    <td>Traps</td>\n    <td>Varies</td>\n  </tr>\n  <tr>\n    <td>Determine the Age of a Mechanical Trap</td>\n    <td>Traps</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Weapon on Sight</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Crossbow or Bolts</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Simple Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Martial Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Exotic Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>18</td>\n  </tr>\n  <tr>\n    <td>Very Simple Item (Wooden Spoon)</td>\n    <td>Varies</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Craft Typical Item (Iron Pot)</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Famous Maker's Mark</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft High-Quality Item (Bell)</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Detemine What Culture (e.g. Elves, Frost Giants) Made an Item</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Complex or Superior Item (Lock)</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify an Obscure Maker's Mark*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Hardness and Hit Points of an Item*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify the Creator of an Item with No Mark*</td>\n    <td>Varies</td>\n    <td>30</td>\n  </tr>\n</table>\n\nThe table below lists which craft skills to use for certain prominent items and adventuring tools. This list omits obvious items - outfits are made with Craft (clothing), keelboats with Craft (ships),  and so on. More specific skills can also be used instead of the listed skill, such as using Craft (tattoos) instead of Craft (paintings) for a tattoo.\n\n<table>\n  <tr>\n    <th>Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Alchemist's Lab</td>\n    <td>Alchemy</td>\n  </tr>\n  <tr>\n    <td>Artisan's Tools</td>\n    <td>Blacksmithing or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Backpack</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Barding</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Bedroll</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Caltrops</td>\n    <td>Weapons</td>\n  </tr>\n  <tr>\n    <td>Cart or Carriage</td>\n    <td>Carpentry</td>\n  </tr>\n  <tr>\n    <td>Chain</td>\n    <td>Blacksmithing or Traps</td>\n  </tr>\n  <tr>\n    <td>Chest</td>\n    <td>Carpentry or Locks</td>\n  </tr>\n  <tr>\n    <td>Climber's Kit</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Disguise Kit</td>\n    <td>Alchemy or Paintings</td>\n  </tr>\n  <tr>\n    <td>Flint and Steel</td>\n    <td>Blacksmithing or Stonemasonry</td>\n  </tr>\n  <tr>\n    <td>Grappling Hook</td>\n    <td>Blacksmithing or Weapons</td>\n  </tr>\n  <tr>\n    <td>Gunslinger's Kit</td>\n    <td>Alchemy or Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Harrow Deck</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Healer's Kit</td>\n    <td>Alchemy or Cloth</td>\n  </tr>\n  <tr>\n    <td>Hemp Rope</td>\n    <td>Baskets or Cloth</td>\n  </tr>\n  <tr>\n    <td>Lamp</td>\n    <td>Blacksmithing or Glass</td>\n  </tr>\n  <tr>\n    <td>Manacles<td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Masterwork Tool</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Musical Instrument</td>\n    <td>Musical Instruments</td>\n  </tr>\n  <tr>\n    <td>Saddle</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Scroll Case</td>\n    <td>Carpentry or Leather</td>\n  </tr>\n  <tr>\n    <td>Signet Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Silk Rope</td>\n    <td>Cloth</td>\n  </tr>\n  <tr>\n    <td>Silver Holy Symbol</td>\n    <td>Blacksmithing or Sculptures</td>\n  </tr>\n  <tr>\n    <td>Skeleton Key</td>\n    <td>Locks</td>\n  </tr>\n  <tr>\n    <td>Spell Component Pouch/td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Spyglass</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Tattoo</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Tent</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Thieves' Tools</td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Waterskin</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Wood Holy Symbol</td>\n    <td>Carpentry or Sculptures</td>\n  </tr>\n</table>\n\nThe following table indicates which Craft skills are typically used to create common worn items. While the normal system for creating magic items doesn't incorporate Craft skills, such skills could reasonably be used while creating a magic item to make it appear especially ornate.\n\n<table>\n  <tr>\n    <th>Worn Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Amulet</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Belt</td>\n    <td>Leather or Clothing</td>\n  </tr>\n  <tr>\n    <td>Bracelet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Bracer</td>\n    <td>Armor or Leather</td>\n  </tr>\n  <tr>\n    <td>Brooch</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Cape or Cloak</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Circlet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Crown</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Gauntlet</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Girdle</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Glasses or Goggles</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Glove</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Hat</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Headband</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Helm</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Mask</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Necklace</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Periapt</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Phylactery</td>\n    <td>Leather or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Robe</td>\n    <td>Clothing</td>\n  </tr>\n  <tr>\n    <td>Vestments</td>\n    <td>Clothing</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: true,
						knowledge: false,
						blurb: "You are skilled in the creation of a specific group of items, such as armor or weapons. Like Knowledge, Perform, and Profession, Craft is actually a number of separate skills. You could have several Craft skills, each with its own ranks. The most common Craft skills are alchemy, armor, baskets, books, bows, calligraphy, carpentry, cloth, clothing, glass, jewelry, leather, locks, paintings, pottery, sculptures, ships, shoes, stonemasonry, traps, and weapons.\n\nA Craft skill is specifically focused on creating something. If nothing is created by the endeavor, it probably falls under the heading of a Profession skill.",
						action: "Does not apply. Craft checks are made by the day or week (see above).",
						try_again: "Yes, but each time you fail by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.",
						special: "You may voluntarily add +10 to the indicated DC to craft an item. This allows you to create the item more quickly (since you’ll be multiplying this higher DC by your Craft check result to determine progress). You must decide whether to increase the DC before you make each weekly or daily check.\n\nTo make an item using Craft (alchemy), you must have alchemical equipment. If you are working in a city, you can buy what you need as part of the raw materials cost to make the item, but alchemical equipment is difficult or impossible to come by in some places. Purchasing and maintaining an alchemist’s lab grants a +2 circumstance bonus on Craft (alchemy) checks because you have the perfect tools for the job, but it does not affect the cost of any items made using the skill.\n\nThose who wish to construct or repair technological items use Craft (mechanical) in conjunction with technological item crafting feats. Without the Technologist feat, Craft (mechanical) can still be used to craft less advanced forms of technology such as gears, hinges, and pulleys. NPCs with the means of crafting technological items are extremely rare, and it is not assumed that PCs have access to such resources. GMs are encouraged to discuss such considerations with their players before allowing technological crafting into the game.",
						skill_unlock_5: "When determining your weekly progress, double the result of your Craft check before multiplying the result by the item’s DC.",
						skill_unlock_10: "You do not ruin any of your raw materials unless you fail a check by 10 or more.",
						skill_unlock_15: "When you determine your progress, the result of your check is how much work you complete each day in silver pieces.",
						skill_unlock_20: "You can craft magic armor, magic weapons, magic rings, and wondrous items that fall under your category of Craft using the normal Craft rules."
					},
					{
						id: 12,
						name: "Heal",
						ability_score: "Wisdom",
						description: "The DC and effect of a Heal check depend on the task you attempt.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Heal DC</th>\n  </tr>\n  <tr>\n    <td>First Aid</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Long-Term Care</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Wounds from Caltrops, spike growth, or spike stones</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Deadly Wounds</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Treat Poison</td>\n    <td>Poison's Save DC</td>\n  </tr>\n  <tr>\n    <td>Treat Disease</td>\n    <td>Disease's Save DC</td>\n  </tr>\n</table>\n\nFirst Aid: You usually use first aid to save a dying character. If a character has negative hit points and is losing hit points (at the rate of 1 per round, 1 per hour, or 1 per day), you can make him stable. A stable character regains no hit points but stops losing them. First aid also stops a character from losing hit points due to effects that cause bleed.\n\nLong-Term Care: Providing long-term care means treating a wounded person for a day or more. If your Heal check is successful, the patient recovers hit points or ability score points lost to ability damage at twice the normal rate: 2 hit points per level for a full 8 hours of rest in a day, or 4 hit points per level for each full day of complete rest; 2 ability score points for a full 8 hours of rest in a day, or 4 ability score points for each full day of complete rest.\n\nYou can tend to as many as six patients at a time. You need a few items and supplies (bandages, salves, and so on) that are easy to come by in settled lands. Giving long-term care counts as light activity for the healer. You cannot give long-term care to yourself.\n\nTreat Wounds from Caltrops, Spike Growth, or Spike Stones: A creature wounded by stepping on a caltrop moves at half normal speed. A successful Heal check removes this movement penalty.\n\nA creature wounded by a spike growth or spike stones spell must succeed on a Ref lex save or take injuries that reduce his speed by one-third. Another character can remove this penalty by taking 10 minutes to dress the victim’s injuries and succeeding on a Heal check against the spell’s save DC.\n\nTreat Deadly Wounds: When treating deadly wounds, you can restore hit points to a damaged creature. Treating deadly wounds restores 1 hit point per level of the creature. If you exceed the DC by 5 or more, add your Wisdom modifier (if positive) to this amount. A creature can only benefit from its deadly wounds being treated within 24 hours of being injured and never more than once per day. You must expend two uses from a healer’s kit to perform this task. You take a –2 penalty on your Heal skill check for each use from the healer’s kit that you lack.\n\nTreat Poison: To treat poison means to tend to a single character who has been poisoned and who is going to take more damage from the poison (or suffer some other effect). Every time the poisoned character makes a saving throw against the poison, you make a Heal check. If your Heal check exceeds the DC of the poison, the character receives a +4 competence bonus on his saving throw against the poison.\n\nTreat Disease: To treat a disease means to tend to a single diseased character. Every time the diseased character makes a saving throw against disease effects, you make a Heal check. If your Heal check exceeds the DC of the disease, the character receives a +4 competence bonus on his saving throw against the disease.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You are skilled at tending to wounds and ailments.",
						action: "Providing first aid, treating a wound, or treating poison is a standard action. Treating a disease or tending a creature wounded by a spike growth or spike stones spell takes 10 minutes of work. Treating deadly wounds takes 1 hour of work. Providing long-term care requires 8 hours of light activity.",
						try_again: "Varies. Generally speaking, you can’t try a Heal check again without witnessing proof of the original check’s failure. You can always retry a check to provide first aid, assuming the target of the previous attempt is still alive.",
						special: "A healer’s kit gives you a +2 circumstance bonus on Heal checks.",
						skill_unlock_5: "When you treat deadly wounds, the target recovers hit points and ability damage as if it had rested for a full day.",
						skill_unlock_10: "When you treat deadly wounds, the target recovers hit points as if it had rested for a full day with long-term care.",
						skill_unlock_15: "When you treat deadly wounds, the creature recovers hit point and ability damage as if it had rested for 3 days.",
						skill_unlock_20: "When you treat deadly wounds, the target recovers hit point and ability damage as if it had rested for 3 days with long-term care."
					},
					{
						id: 13,
						name: "Intimidate",
						ability_score: "Charisma",
						description: "You can use Intimidate to force an opponent to act friendly toward you for 1d6 × 10 minutes with a successful check. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If successful, the target gives you the information you desire, takes actions that do not endanger it, or otherwise offers limited assistance. After the Intimidate expires, the target treats you as unfriendly and may report you to local authorities. If you fail this check by 5 or more, the target attempts to deceive you or otherwise hinder your activities.\n\nDemoralize: You can use this skill to cause an opponent to become shaken for a number of rounds. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If you are successful, the target is shaken for 1 round. This duration increases by 1 round for every 5 by which you beat the DC. You can only threaten an opponent in this way if it is within 30 feet and can clearly see and hear you. Using demoralize on the same creature only extends the duration; it does not create a stronger fear condition.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You can use this skill to frighten your opponents or to get them to act in a way that benefits you. This skill includes verbal threats and displays of prowess.",
						action: "Using Intimidate to change an opponent’s attitude requires 1 minute of conversation. Demoralizing an opponent is a standard action.",
						try_again: "You can attempt to Intimidate an opponent again, but each additional check increases the DC by +5. This increase resets after 1 hour has passed.",
						special: "You also gain a +4 bonus on Intimidate checks if you are larger than your target and a –4 penalty on Intimidate checks if you are smaller than your target.",
						skill_unlock_5: "If you exceed the DC to demoralize a target by at least 10, it is frightened for 1 round and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened condition, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_10: "If you exceed the DC to demoralize a target by at least 10, it is panicked for 1 round or frightened for 1d4 rounds (your choice) and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened or panicked condition, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_15: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1 round or panicked for 1d4 rounds (your choice) and frightened thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering, panicked, and frightened conditions, but the target is still shaken, even if it has the stalwart ability.",
						skill_unlock_20: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1d4 rounds and panicked thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering and panicked conditions, but the target is still shaken, even if it has the stalwart ability."
					},
					{
						id: 24,
						name: "Knowledge",
						ability_score: "Intelligence",
						description: "Arcana (ancient mysteries, magic traditions, arcane symbols, constructs, dragons, magical beasts)\n\nDungeoneering (aberrations, caverns, oozes, spelunking)\n\nEngineering (buildings, aqueducts, bridges, fortifications)\n\nGeography (lands, terrain, climate, people)\n\nHistory (wars, colonies, migrations, founding of cities)\n\nLocal (legends, personalities, inhabitants, laws, customs, traditions, humanoids)\n\nNature (animals, fey, monstrous humanoids, plants, seasons and cycles, weather, vermin)\n\nNobility (lineages, heraldry, personalities, royalty)\n\nPlanes (the Inner Planes, the Outer Planes, the Astral Plane, the Ethereal Plane, outsiders, planar magic)\n\nReligion (gods and goddesses, mythic history, ecclesiastic tradition, holy symbols, undead)\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Many of the Knowledge skills have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Knowledge Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Identify Auras While Using Detect Magic</td>\n    <td>Arcana</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell Effect That Is In Place</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify Materials Manufactured by Magic</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell That Just Targeted You</td>\n    <td>Arcana</td>\n    <td>25 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify the Spells Cast Using a Specific Material Component</td>\n    <td>Arcana</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Underground Hazard</td>\n    <td>Dungeoneering</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify Mineral, Stone, or Metal</td>\n    <td>Dungeoneering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Slope</td>\n    <td>Dungeoneering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Depth Underground</td>\n    <td>Dungeoneering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Dangerous Construction</td>\n    <td>Engineering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Style or Age</td>\n    <td>Engineering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Weakness</td>\n    <td>Engineering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Ethnicity or Accent</td>\n    <td>Geography</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Regional Terrain Features</td>\n    <td>Geography</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Location of Nearest Community or Noteworthy Site</td>\n    <td>Geography</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Recent or Historically Significant Date</td>\n    <td>History</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Approximate Date of Specific Event</td>\n    <td>History</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Obscure or Ancient Historical Event</td>\n    <td>History</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Local Laws, Rulers, and Popular Locations</td>\n    <td>Local</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know a Common Rumor or Local Tradition</td>\n    <td>Local</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Hidden Organizations, Rulers, and Locations</td>\n    <td>Local</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Natural Hazard</td>\n    <td>Nature</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify a Common Plant or Animal</td>\n    <td>Nature</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Unnatural Weather Phenomenon</td>\n    <td>Nature</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Artifical Nature of Feature</td>\n    <td>Nature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Current Rulers and Their Symbols</td>\n    <td>Nobility</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Proper Etiquette</td>\n    <td>Nobility</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Line of Succession</td>\n    <td>Nobility</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know the Names of the Planes</td>\n    <td>Planes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Current Plane</td>\n    <td>Planes</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Planar Origin</td>\n    <td>Planes</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Recognize a Common Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Common Mythology and Tenets</td>\n    <td>Religion</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize an Obscure Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>Varies</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
						untrained: false,
						customizable: true,
						knowledge: true,
						blurb: "You are educated in a field of study and can answer both simple and complex questions. Like the Craft, Perform, and Profession skills, Knowledge actually encompasses a number of different specialties.",
						action: "Usually none. In most cases, a Knowledge check doesn’t take an action.",
						try_again: "No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
						special: "You cannot make an untrained Knowledge check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Knowledge checks in the fields that they cover.",
						skill_unlock_5: "When you successfully identify a creature, you gain one additional piece of information for every 5 ranks you possess in that Knowledge skill.",
						skill_unlock_10: "When you successfully identify a creature, you gain a +1 competence bonus on attack rolls, opposed ability checks, skill checks, and caster level checks against creatures of that kind (e.g., glabrezu demons, but not other demons or evil outsiders) for 1 minute. This bonus increases by 1 for every 5 ranks beyond 10 you possess in that Knowledge skill.",
						skill_unlock_15: "When you fail a Knowledge check, you can reroll the check at a –10 penalty. The competence bonus above also applies to saving throws against exceptional, spell-like, or supernatural abilities used by creatures you identify.",
						skill_unlock_20: "Whenever you attempt a Knowledge check, you can roll twice and take the better result."
					},
					{
						id: 26,
						name: "Perception",
						ability_score: "Wisdom",
						description: "Perception has a number of uses, the most common of which is an opposed check versus an opponent’s Stealth check to notice the opponent and avoid being surprised. If you are successful, you notice the opponent and can react accordingly. If you fail, your opponent can take a variety of actions, including sneaking past you and attacking you.\n\nPerception is also used to notice fine details in the environment. The DC to notice such details varies depending upon distance, the environment, and how noticeable the detail is. The following table gives a number of guidelines.\n\n<table>\n  <tr>\n    <th>Detail</th>\n    <th>Perception DC</th>\n  </tr>\n  <tr>\n    <td>Hear the Sound of Battle</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Notice the Stench of Rotting Garbage</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Detect the Smell of Smoke</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Conversation</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Notice a Visible Creature</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Determine if Food is Spoiled</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Creature Walking</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Whispered Conversation</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Find the Average Concealed Door</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Key Being Turned in a Lock</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Find the Average Secret Door</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Hear a Bow Being Drawn</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Sense a Burrowing Creature Underneath You</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Notice a Pickpocket</td>\n    <td>Opposed by Sleight of Hand</td>\n  </tr>\n  <tr>\n    <td>Notice a Creature Using Stealth</td>\n    <td>Opposed by Stealth</td>\n  </tr>\n  <tr>\n    <td>Find a Hidden Trap</td>\n    <td>Varies by Trap</td>\n  </tr>\n  <tr>\n    <td>Identify the Powers of a Potion through Taste</td>\n    <td>15 + Potion's Caster Level</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>Perception Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Distance to the Source, Object, or Creature</td>\n    <td>+1 per 10 Feet</td>\n  </tr>\n  <tr>\n    <td>Through a Closed Door</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Through a Wall</td>\n    <td>+10 per Foot</td>\n  </tr>\n  <tr>\n    <td>Favorable Conditions</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Unfavorable Conditions</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Terrible Conditions</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Distracted</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Asleep</td>\n    <td>+10</td>\n  </tr>\n  <tr>\n    <td>Creature or Object is Invisible</td>\n    <td>+20</td>\n  </tr>\n</table>",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "Your senses allow you to notice fine details and alert you to danger. Perception covers all five senses, including sight, hearing, touch, taste, and smell.",
						action: "Most Perception checks are reactive, made in response to observable stimulus. Intentionally searching for stimulus is a move action.",
						try_again: "Yes. You can try to sense something you missed the first time, so long as the stimulus is still present.",
						special: "Creatures with the scent special quality have a +8 bonus on Perception checks made to detect a scent. Creatures with the tremorsense special quality have a +8 bonus on Perception checks against creatures touching the ground and automatically make any such checks within their range.",
						skill_unlock_5: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping is halved. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 20 feet.",
						skill_unlock_10: "The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 30 feet. In addition, you gain a +5 bonus on Perception checks to notice or locate an invisible creature or object.",
						skill_unlock_15: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping doesn’t apply to you. The distance modifier on the DC of your Perception checks is reduced to +1 per 40 feet.",
						skill_unlock_20: "You gain a +10 bonus on Perception checks to notice invisible creatures or objects. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 60 feet."
					},
					{
						id: 28,
						name: "Profession",
						ability_score: "Wisdom",
						description: "You can earn half your Profession check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the profession’s daily tasks, how to supervise helpers, and how to handle common problems. You can also answer questions about your Profession. Basic questions are DC 10, while more complex questions are DC 15 or higher.\n\nA profession often encompasses many smaller areas of expertise, and these auxiliary skills can come in handy in situations beyond just making money or answering trade-specific questions. Below are some sample additional uses for Profession skills, and GMs are encouraged to create their own.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Profession Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Determine Hardness and Hit Points of a Structure</td>\n    <td>Architect or Engineer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Prepare Trail Rations (Takes 1 Hour Per Day's Worth of Rations)</td>\n    <td>Baker or Cook</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Obtain a Legal Permit</td>\n    <td>Barrister or Clerk</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Get Somone Released From Jail Who Has Been Imprisoned for a Minor Crime</td>\n    <td>Barrister</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Ask a Special Favor From a Judge (Such as Arresting Someone)</td>\n    <td>Barrister</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Brew Alcohol of Exceptional Quality</td>\n    <td>Brewer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in a Beverage</td>\n    <td>Brewer</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Butcher, Shepherd, or Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Slaughter and Butcher an Animal</td>\n    <td>Butcher, Cook, or Shepherd</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Reduce a Legal Fine or Tax By Half the Result of the Check in gp (up to 75%)</td>\n    <td>Clerk</td>\n    <td>20+</td>\n  </tr>\n  <tr>\n    <td>Cook a Meal of Exceptional Quality</td>\n    <td>Cook</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in Food</td>\n    <td>Cook</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Find Potential Clients within an Establishment or Large Group</td>\n    <td>Courtesan</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Continue Steering a Vehicle When You Take Damage</td>\n    <td>Driver or Sailor</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Take Cover (As The Ride Skill) While Steering a Vehicle</td>\n    <td>Driver or Sailor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Non-Creature Plant</td>\n    <td>Farmer or Gardener</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Rejuvinate Dying Plants</td>\n    <td>Farmer or Gardener</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Provide 1 Day's Worth of Food for Yourself and Others in the Wild</td>\n    <td>Fisherman or Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recall the Rules of a Game of Chance</td>\n    <td>Gambler</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Get a Hunch Regarding Whether a Game is Rigged</td>\n    <td>Gambler</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Reduce an Average or Lower Cost of Living by 50%</td>\n    <td>Innkeeper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Sate Hunger or Thirst for 1 Day</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Common Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Knowledge Check Using Reference Material</td>\n    <td>Librarian</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Recall the Name of a Rare Book</td>\n    <td>Librarian</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Where an Item was Manufactured</td>\n    <td>Merchant</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Recall Where a Common Good Fetches a Higher Price</td>\n    <td>Merchant</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child</td>\n    <td>Midwife</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child Despite Complications</td>\n    <td>Midwife</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Grind a Small Piece of Nonmagical Substance into Powder</td>\n    <td>Miller</td>\n    <td>10 + Hardness</td>\n  </tr>\n  <tr>\n    <td>Identify Common Metal or Semiprecious Stone</td>\n    <td>Miner</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Metal or Precious Gem</td>\n    <td>Miner</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking a Stone or Metal Object</td>\n    <td>Miner</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Increase Carrying Capacity for 8 Hours as if Strength were 2 Higher</td>\n    <td>Porter</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Unload a Vessel in Half the Normal Time</td>\n    <td>Porter</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Navigate a Ship in Fair Conditions</td>\n    <td>Sailor</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Pilot a Ship Safely Through a Hazardous Seaway</td>\n    <td>Sailor</td>\n    <td>25+</td>\n  </tr>\n  <tr>\n    <td>Determine Which Scribe Wrote a Document</td>\n    <td>Scribe</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Copy a Document (30 Minutes per Page; Requires a Blank Book)</td>\n    <td>Scribe</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Illuminate a Manuscript (1 Hour per Page)</td>\n    <td>Scribe</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Woolen Textiles</td>\n    <td>Shepherd</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Whether a Weapon or Armor is of Masterwork Quality</td>\n    <td>Soldier</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Estimate the Size of a Military Force</td>\n    <td>Soldier</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify Advantages and Disadvantages of a Military Formation</td>\n    <td>Soldier</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Keep Horses Fed in the Wild</td>\n    <td>Stable Master</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Fit or Remove Barding in Half the Normal Time</td>\n    <td>Stable Master</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize Damaged or Sabotaged Horse Tack</td>\n    <td>Stable Master</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Leatherwork (and Tell If It's Masterwork Quality)</td>\n    <td>Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Aid Another on an Skill Check to Get Out of a Trap or Snare</td>\n    <td>Trapper</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Reset a Trap in Half the Normal Amount of Time</td>\n    <td>Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Scavenge Wood Suitable for Campfire or Shelter</td>\n    <td>Woodcutter</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking Wooden Object</td>\n    <td>Woodcutter</td>\n    <td>20</td>\n  </tr>\n</table>",
						untrained: false,
						customizable: true,
						knowledge: false,
						blurb: "You are skilled at a specific job. Like Craft, Knowledge, and Perform, Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. While a Craft skill represents ability in creating an item, a Profession skill represents an aptitude in a vocation requiring a broader range of less specific knowledge. The most common Profession skills are architect, baker, barrister, brewer, butcher, clerk, cook, courtesan, driver, engineer, farmer, f isherman, gambler, gardener, herbalist, innkeeper, librarian, merchant, midwife, miller, miner, porter, sailor, scribe, shepherd, stable master, soldier, tanner, trapper, and woodcutter.",
						action: "Not applicable. A single check generally represents a week of work.",
						try_again: "Varies. An attempt to use a Profession skill to earn income cannot be retried. You are stuck with whatever weekly wage your check result brought you. Another check may be made after a week to determine a new income for the next period of time. An attempt to accomplish some specific task can usually be retried.",
						special: "Untrained laborers and assistants (that is, characters without any ranks in Profession) earn an average of 1 silver piece per day.",
						skill_unlock_5: "When using Profession checks to earn income, you earn gold pieces equal to the result of your check each week.",
						skill_unlock_10: "When attempting Profession checks, you can roll twice and take the better result. When answering questions about your Profession, you can always take 10.",
						skill_unlock_15: "You can attempt checks to earn income once per day instead of once per week.",
						skill_unlock_20: "When attempting Profession checks, you can choose to roll once instead of twice. If you do and the result of the roll is less than 10, replace it with 10. When answering questions about your Profession, you can always take 20."
					},
					{
						id: 33,
						name: "Stealth",
						ability_score: "Dexterity",
						description: "Your Stealth check is opposed by the Perception check of anyone who might notice you. Creatures that fail to beat your Stealth check are not aware of you and treat you as if you had total concealment. You can move up to half your normal speed and use Stealth at no penalty. When moving at a speed greater than half but less than your normal speed, you take a –5 penalty. It’s impossible to use Stealth while attacking, running, or charging.\n\nCreatures gain a bonus or penalty on Stealth checks based on their size: Fine +16, Diminutive +12, Tiny +8, Small +4, Medium +0, Large –4, Huge –8, Gargantuan –12, Colossal –16.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.\n\nBreaking Stealth: When you start your turn using Stealth, you can leave cover or concealment and remain unobserved as long as you succeed at a Stealth check and end your turn in cover or concealment. Your Stealth immediately ends after you make an attack roll, whether or not the attack is successful (except when sniping as noted below).\n\nSniping: If you’ve already successfully used Stealth at least 10 feet from your target, you can make one ranged attack and then immediately use Stealth again. You take a –20 penalty on your Stealth check to maintain your obscured location.\n\nCreating a Diversion to Hide: You can use Bluff to allow you to use Stealth. A successful Bluff check opposed by the viewer’s Sense Motive can give you the momentary diversion you need to attempt a Stealth check while people are aware of you.",
						untrained: true,
						customizable: false,
						knowledge: false,
						blurb: "You are skilled at avoiding detection, allowing you to slip past foes or strike from an unseen position. This skill covers hiding and moving silently.",
						action: "Usually none. Normally, you make a Stealth check as part of movement, so it doesn’t take a separate action. However, using Stealth immediately after a ranged attack (see Sniping, above) is a move action.",
						try_again: "",
						special: "If you are invisible, you gain a +40 bonus on Stealth checks if you are immobile, or a +20 bonus on Stealth checks if you’re moving.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.",
						skill_unlock_5: "Reduce the Stealth penalty from sniping by 10.",
						skill_unlock_10: "Stealth check penalties for moving quickly are halved, including the ability unlocked at 5 ranks, moving full speed, and reaching concealment after creating a distraction.",
						skill_unlock_15: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the end of your turn.",
						skill_unlock_20: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the beginning of your next turn."
					}
				]
			}
		],
		class_obj: [
			{
				klass_id: 15,
				level: 2
			}
		],
		race: {
			id: 8,
			name: "Vine Leshy",
			speed: 20,
			size: "Small",
			description: "Vine leshys are born by ritual, called forth when a druid channels a nature spirit into a plant’s form. The nature spirit that answers the call for a vine leshy creation ritual is always one that has keenly felt the influence of mortal beings. Compared to other leshys, vine leshys have an easier time relating to non-plant creatures and a deeper sense of curiosity about the wonders of the natural world beyond those plants closely related to them, as well as a fascination with the societies of humans and other creatures.\n\nPhysical Description: A vine leshy’s body is made of masses of twisted vines and leaves, sometimes incorporating flowers and fruits as well. Their appearance is mostly determined by the species of vine used in their creation, but most have a large cluster of leaves that forms a face with round eyes, a small mouth, and no visible nose.\n\nSociety: Because of their ritual-based genesis, vine leshys do not have a traditional family structure. They form strong friendships with those who accompany them on explorations or who assist them in protecting a natural site. Unlike most leshys, vine leshys usually feel a strong desire to seek out the one who create!d them. They see their creators as friends and allies rather than as parents.\n\nWhile most leshys devote themselves to protecting a particular ward for long stretches of time, vine leshys are far more likely to travel and explore, stopping to care for many different wards for short periods throughout their lifetime. Vine leshys love storytelling, but they place more importance on the meaning and message of the story than the details, both because they can’t always remember the details and because they find many details to be unnecessary. A story that has passed through several vine leshys is likely to undergo significant changes in characters and setting but usually retains its core message.\n\nRelations: Vine leshys are interested in learning about the cultures of many other races. Their initial attitudes when they encounter new races are based on biases from the nature spirit’s past incarnations, but they evolve over time through the leshy’s experiences. In unfamiliar situations, vine leshys prefer to blend in with vegetation to observe before venturing out and introducing themselves.\n\nConsistent with the plant species from which they derive their bodies, vine leshys recognize a spectrum of genders. Some vine leshys are exclusively female or male, while many vine leshys are both. The biological features of a leshy’s flowers do not necessarily indicate its gender, as the nature spirit that inhabits the leshy plays a strong role in determining the leshy’s identity.\n\nVine leshys have an unusual relationship with other leshys, for unlike standard leshys, vine leshys are not grown to be servants. They are free-willed and individualistic creatures. Whether or not an individual vine leshy views the servitude other leshys endure as akin to slavery or as something more like an honorable tradition of service to a powerful druid depends on the vine leshy’s opinion and alignment. While it’s unusual for a vine leshy to take on another leshy as a minion in the traditional way, it’s not unusual to see vine leshys take on sponsorship of a sort over other leshys, treating them almost as adopted children or wayward exiles in need of guidance and protection from those who would force their servitude.\n\nAlignment and Religion: Vine leshys see themselves as part of the ancient cycle of nature. They care for their friends and any natural areas under their care, but rarely feel compelled toward either charity or malice. Most vine leshys are truly neutral, and they almost always have at least one neutral aspect to their alignments. Religion is not particularly important to vine leshys.\n\nAdventurers: Like most leshys, vine leshys typically do not fear death. They know that if their bodies die, their spirits will return to the natural world and may someday find themselves in new bodies. This lack of fear combined with their curiosity leads them to take risks. However, they typically avoid excessively dangerous activities, as they would rather gather a story from their adventures to tell later. Vine leshys gravitate toward classes that let them use their connection to nature, such as druid and ranger.\n\nNames: Vine leshys’ names change throughout their lives. A young vine leshy typically names herself after her physical characteristics or a natural feature that she particularly enjoys. As vine leshys age, they modify their names to better reflect their personality and experiences. A leshy may even have several names that she cycles among, such as one name for each season. Most vine leshys select names that are at least two words long. Example vine leshy names include Burbling Waterfall, Lovely Triple Leaves, Masterful Sun Drinker, Snowy Pine Branches, Verdant Taleweaver, and Vibrant Tree Climber.",
			racial_traits: [
				{
					id: 42,
					name: "Type",
					race_id: 8,
					description: "Vine leshys are plants with the leshy subtype but lack the immunities to mind-affecting effects, paralysis, poison, polymorph, sleep, and stunning that the plant type usually grants, and they lack the immunity to electricity and sonic that the leshy subtype usually grants.",
					source_id: null
				},
				{
					id: 43,
					name: "Languages",
					race_id: 8,
					description: "Vine leshys begin play speaking Common and Sylvan. Vine leshys with high Intelligence scores can choose from the following: Aquan, Auran, Aklo, Elven, Gnome, Goblin, Terran, or Undercommon.",
					source_id: null
				},
				{
					id: 44,
					name: "Plantspeech",
					race_id: 8,
					description: "Vine leshys can speak with vines as if subject to a continual speak with plants spell.",
					source_id: null
				},
				{
					id: 45,
					name: "Darkvision",
					race_id: 8,
					description: "Vine leshys can see in the dark up to 60 feet.",
					source_id: null
				},
				{
					id: 46,
					name: "Low-Light Vision",
					race_id: 8,
					description: "Vine leshys can see twice as far as humans under conditions of dim light.",
					source_id: null
				},
				{
					id: 47,
					name: "Pass Without Trace",
					race_id: 8,
					description: "Vine leshys have pass without trace as a constant spell-like ability (caster level 2nd).",
					source_id: null
				},
				{
					id: 48,
					name: "Change Shape",
					race_id: 8,
					description: "Vine leshys can transform into vines, with results similar to tree shape. In this form, the leshy appears as a particularly healthy Small vine. The 	leshy can assume plant form or revert to its true form as a swift action.",
					source_id: null
				},
				{
					id: 49,
					name: "Verdant Burst",
					race_id: 8,
					description: "When slain, a vine leshy explodes in a burst of fertile energies. All plant creatures within 30 feet of the slain leshy regain hit 1d8 points, and vines quickly infest the area. If the terrain can support vines, the undergrowth is dense enough to make the region into difficult terrain for 24 hours, after which the plant life diminishes to a normal level; otherwise, this plant life has no significant effect on movement and withers and dies within an hour.",
					source_id: null
				},
				{
					id: 50,
					name: "Unassuming Foliage",
					race_id: 8,
					description: "Vine leshys gain a +4 racial bonus on Stealth checks in forests.",
					source_id: null
				},
				{
					id: 51,
					name: "Climber",
					race_id: 8,
					description: "Vine leshys gain a +2 racial bonus on Climb checks.",
					source_id: null
				}
			],
			race_ability_score_modifiers: [
				{
					id: 20,
					race_id: 8,
					ability_score: "Constitution",
					bonus: 2
				},
				{
					id: 21,
					race_id: 8,
					ability_score: "Wisdom",
					bonus: 2
				},
				{
					id: 22,
					race_id: 8,
					ability_score: "Intelligence",
					bonus: -2
				}
			],
			img_url: "https://i.pinimg.com/originals/95/2f/4a/952f4a813b92fdde2da083dc934c36b3.png",
			favored_klass_bonuses: [
				{
					id: 4,
					description: "Add a +1/3 bonus to Perform (oratory) checks, including checks using versatile performance, as long as the bard first spends at least 10 minutes telling a story.",
					klass_id: 7,
					race_id: 8,
					source_id: null
				},
				{
					id: 5,
					description: "An oracle with the nature or wood mystery adds one spell from the druid's spell list that isn't on the cleric spell list to the oracle's spell list; they still must select this spell as one of their spells known in order to cast it. This spell must be at least 1 level lower than the highest spell level the oracle can cast.",
					klass_id: 1,
					race_id: 8,
					source_id: null
				}
			],
			source: {
				id: 14,
				title: "Ultimate Wilderness",
				abbreviation: "UW",
				code: "PZO1140"
			},
			alternate_racial_traits: [
				{
					name: "Grapevine",
					description: "A vine leshy made from a grapevine can produce magically infused fruit that can heal her allies. She can cast goodberry once per day as a spell-like ability, with a caster level equal to her character level. This replaces pass without trace.",
					source: {
						id: 14,
						title: "Ultimate Wilderness",
						abbreviation: "UW",
						code: "PZO1140"
					},
					alternate_trait_replace_racial_traits: [
						{
							id: 4,
							alternate_racial_trait_id: 3,
							racial_trait_id: 47
						}
					],
					associated_spells: [
						{
							id: 219,
							name: "Goodberry",
							description: "Casting goodberry makes 2d4 freshly picked berries magical. You (as well as any other druid of 3rd or higher level) can immediately discern which berries are affected. Each transmuted berry provides nourishment as if it were a normal meal for a Medium creature. The berry also cures 1 point of damage when eaten, subject to a maximum of 8 points of such curing in any 24-hour period.",
							target: "2d4 fresh berries touched",
							saving_throw: "none",
							spell_resistance: false,
							magic_school_id: 8,
							action_id: 1,
							duration: "1 day/level",
							time: 1,
							unit_of_time: "day",
							increase_per_level: 1,
							dismissible: false,
							concentration: false,
							spell_range_id: 2,
							source_id: null
						}
					]
				},
				{
					name: "Swamp Leshy",
					description: "Some vine leshys are made from plants that naturally grow in swamps. These leshys gain a +2 racial bonus on Swim checks and a +4 racial bonus on Stealth checks in swamps. This replaces climber and alters unassuming foliage.",
					source: {
						id: 14,
						title: "Ultimate Wilderness",
						abbreviation: "UW",
						code: "PZO1140"
					},
					alternate_trait_replace_racial_traits: [
						{
							id: 5,
							alternate_racial_trait_id: 4,
							racial_trait_id: 51
						},
						{
							id: 6,
							alternate_racial_trait_id: 4,
							racial_trait_id: 50
						}
					],
					associated_spells: []
				}
			]
		},
	}
}

export default Character1
// "character_skillset_skills": [
// {
// id: 64,
// "character_id": 10,
// skillset_id: 3,
// skill_id: 28,
// "ranks": 2,
// "detail": "chef"
// },
// {
// id: 65,
// "character_id": 10,
// skillset_id: 3,
// skill_id: 38,
// "ranks": 1,
// "detail": null
// },
// {
// id: 66,
// "character_id": 10,
// skillset_id: 3,
// skill_id: 25,
// "ranks": 1,
// "detail": null
// },
// {
// id: 67,
// "character_id": 10,
// skillset_id: 3,
// skill_id: 34,
// "ranks": 1,
// "detail": null
// },
// {
// id: 68,
// "character_id": 10,
// skillset_id: 3,
// skill_id: 5,
// "ranks": 1,
// "detail": "woodcarving"
// }
// ],
// "character_klasses": [
// {
// id: 40,
// "character_id": 10,
// klass_id: 15,
// "hp": 8,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 1
// },
// {
// id: 41,
// "character_id": 10,
// klass_id: 15,
// "hp": 7,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2
// }
// ],
// "character_magic_items": [],
// "character_magic_item_feature_usages": [],
// "notes": [],
// "applicable_klass_features": [
// {
// id: 122,
// name: "Weapon and Armor Proficiency",
// description: "Kineticists are proficient with all simple weapons and light armor, but not shields.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 331,
// "klass_feature_id": 122,
// "level": 1,
// "table_description": ""
// }
// ],
// "actions": [],
// "features": [
// {
// id: 44,
// action: null,
// "usage": null,
// name: null,
// "after": false,
// "feature_usage_spell_options": [],
// "skill_bonuses": [],
// "spells": [],
// "feature_container": null,
// "stat_bonuses": [],
// "skill_notes": [],
// "stat_notes": [],
// "movements": [],
// "languages": [],
// "loading": null,
// "attack_of_opportunity": false,
// "weapon_proficiencies": [
// {
// id: 16,
// "feature_id": 44,
// "proficiency_group": "Simple",
// "weapon_id": null,
// "additive": true,
// "player_choice": null
// }
// ],
// "armor_proficiencies": [
// {
// id: 17,
// "feature_id": 44,
// "proficiency_group": "Light",
// "armor_id": null,
// "additive": true
// }
// ],
// "conditions": [],
// "applications": [],
// "status_conditions": [],
// "alternate_actions": [],
// "saving_throws": [],
// "spellcasting": null,
// "display_descriptions": [],
// "damages": [],
// "character_choices": [],
// "steps": [],
// "bonus_spell_slot": null,
// "spontaneous_castings": [],
// "attack": null,
// "castable_spells": [],
// "weapon_applications": []
// }
// ],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// },
// {
// id: 123,
// name: "Elemental Focus",
// description: "At 1st level, a kineticist chooses one primary element on which to focus. This element determines how she accesses the raw power of the Ethereal Plane, and grants her access to specific wild talents (see below) and additional class skills. She gains her selected element’s basic utility wild talent (basic telekinesis, basic aerokinesis, etc.) as a bonus wild talent.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 332,
// "klass_feature_id": 123,
// "level": 1,
// "table_description": "Elemental Focus"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: true,
// choice_amount: 1,
// "klass_specializations": [
// {
// id: 5,
// name: "Aether",
// description: "Kineticists who focus on the element of aether—a rare substance formed when elemental energy affects the Ethereal Plane—are called telekineticists. Telekineticists use strands of aether to move objects with their minds.\n\nClass Skills: A telekineticist adds Knowledge (engineering) and Sleight of Hand to her list of class skills.\n\nBasic Manipulation: A telekineticist gains basic telekinesis.\n\n<underline>Basic Telekinesis</underline>\n\nElement(s) aether; Type utility (Sp); Level 1; Burn 0\n\nThis ability is similar to mage hand, except you can move an object that weighs up to 5 pounds per 2 kineticist levels you possess (minimum 5 pounds), and you can move magical objects. Additionally, you can create a container of entwined strands of aether in order to hold liquids or piles of small objects of the same weight. You can dip the container to pick up or drop a liquid as a move action. If you possess the extended range wild talent, you can increase the range of basic telekinesis to medium range and increase the rate of movement to 30 feet per round, and if you possess the extreme range wild talent, You can increase the range of basic telekinesis to long range and increase the rate of movement to 60 feet per round. You can also use your basic telekinesis to duplicate the effects of the open/close cantrip.\n\nSimple Blast: A telekineticist gains telekinetic blast as a simple blast wild talent.\n\n<underline>Telekinetic Blast</underline>\n\nElement(s) aether; Type simple blast (Sp); Level —; Burn 0\n\nBlast Type: physical; Damage bludgeoning, piercing, or slashing\n\nYou throw a nearby unattended object at a single foe as a ranged attack. The object must weigh no more than 5 pounds per kineticist level you possess. If the attack hits, the target and the thrown object each take the blast’s damage. Since the object is enfolded in strands of aether, even if you use this power on a magic weapon or other unusual object, the attack doesn’t use any of the magic weapon’s bonuses or effects; it simply deals your blast damage. Alternatively, you can loosen the strands of aether in order to deal damage to both the object and the target as though you had thrown the object yourself (instead of dealing your normal blast damage).\n\nYou substitute your Constitution modifier for your Strength modifier if throwing the object would have added your Strength modifier on the damage roll, and you don’t take the –4 penalty on the attack roll for throwing an object that wasn’t designed to be thrown. In this case, the object’s special effects apply (including effects from its materials), and if the object is a weapon, you must be proficient with it and able to wield it with one hand; otherwise, the item deals damage as a one-handed improvised weapon for a creature of your size.\n\nDefense: a telekineticist’s defensive wild talent is force ward.\n\n<underline>Force Ward</underline>\n\nElement(s) aether; Type defense (Su); Level —; Burn 0\n\nYou constantly surround yourself with a ward of force. You gain a number of temporary hit points equal to your kineticist level.\n\nYou always lose these temporary hit points first, even before other temporary hit points. If an attack deals less damage than you still have as temporary hit points from force ward, it still reduces those temporary hit points but otherwise counts as a miss for the purpose of abilities that trigger on a hit or a miss. These temporary hit points regenerate at a rate of 1 per minute. By accepting 1 point of burn as a standard action, you can increase the maximum number of temporary hit points provided by your force ward by half your kineticist level until the next time your burn is removed.\n\nIf you use this ability multiple times, the increases stack. For every 2 points of burn you accept in this way, your force ward’s rate of regeneration increases by 1 hit point per minute. Whenever you accept burn while using an aether wild talent, you siphon some of the energy from the aether flowing through you and your force ward recovers a number of temporary hit points equal to your character level, up to its current maximum. You can dismiss or restore your force ward as an immediate action, but doing so doesn’t change the number of temporary hit points available, and the temporary hit points don’t recover while this ability is inactive.\n\nWild Talents: A telekineticist qualifies for the following wild talents in addition to all those listed as universal:\n\nInfusion: 1st—pushing infusion, telekinetic boomerang; 2nd—bowling infusion; 3rd—foe throw, force hook; 6th—disintegrating infusion; 8th—many throw\n\nUtility: 1st—basic telekinesis, kinetic cover, kinetic healer, telekinetic finesse; 2nd—telekinetic haul; 3rd—self telekinesis, telekinetic invisibility, touchsight; 4th—healing burst, telekinetic maneuvers, touchsight (spying); 5th—aether puppet, force barrier, self telekinesis (greater), touchsight (reactive); 6th—kinetic revivification, suffocate; 7th—spell deflection; 8th—telekinetic deflection, telekinetic globe; 9th—aether architect"
// },
// {
// id: 6,
// name: "Air",
// description: "Kineticists who focus on the element of air are called aerokineticists. Aerokineticists often control air flow or electricity, specializing in mobility and ranged combat.\n\nClass Skills: An aerokineticist adds Fly and Knowledge (nature) to her list of class skills.\n\nBasic Manipulation: An aerokineticists gains basic aerokinesis.\n\n<underline>Basic Aerokinesis</underline>\n\nElement(s) air; Type utility (Sp); Level 1; Burn 0\n\nYou can create a light breeze that blows against a creature or object from a direction of your choice that follows the target wherever it goes. The breeze grants the subject a +2 bonus on saves against very hot conditions, severe heat, breath weapons, and cloud vapors and gases (such as cloudkill, stinking cloud, and inhaled poisons). This wild talent doesn’t function without air or while underwater. You can have only one such breeze active at any one time.\n\nYou can also use your aerokinesis to make it harder to detect you or others by scent. You can designate a number of creatures or objects equal to your Constitution bonus. These creatures and objects always count as being downwind for the purpose of determining the distance at which they can be detected by scent. This effect lasts for 1 hour or until you use basic aerokinesis again, whichever comes first.\n\nSimple Blast: An aerokineticist can select either air blast or electric blast as her simple blast. She gains one of them when she first selects air, and must select air again with expanded element to gain the other.\n\n<underline>Air Blast</underline>\n\nElement(s) air; Type simple blast (Sp); Level —; Burn 0\n\nBlast Type: physical; Damage bludgeoning\n\nYou batter a single foe with a gust of air.\n\n<underline>Electric Blast</underline>\n\nElement(s) air; Type simple blast (Sp); Level —; Burn 0\n\nBlast Type: energy; Damage electricity\n\nYou shoot an arc of electricity to shock a single foe.\n\nDefense: An aerokineticist’s defensive wild talent is enveloping winds.\n\n<underline>Enveloping Winds</underline>\n\nElement(s) air; Type defense (Su); Level —; Burn 0\n\nYou constantly surround yourself with a whirling torrent of air, crackling arcs of lightning, or both to protect yourself from ranged attacks. All ranged attacks made with physical weapons suffer a 20% miss chance against you, except for attacks from massive weapons such as a giant’s thrown boulder or a ballista. This ability has no effect on ray attacks. The miss chance increases by 5% for every 5 kineticist levels you possess beyond 2nd. By accepting 1 point of burn, you can increase the miss chance by 5% until the next time your burn is removed. You can continue to accept points of burn to increase the miss chance further, up to a maximum of 75%. Whenever you accept burn while using an air wild talent, the energy surging through you causes your enveloping winds to also affect non-physical ranged attacks such as ray attacks for 1 round.\n\nYou can dismiss or restore this effect as an immediate action.\n\nWild Talents: A aerokineticist qualifies for the following wild talents in addition to all those listed as universal:\n\nInfusion: 1st—energize weapon, gusting infusion, pushing infusion, thundering infusion; 2nd—penetrating infusion; 3rd—magnetic infusion, synaptic infusion; torrent; 4th—cyclone; 5th—chain; 7th—cloud;\n\nUtility: 1st—aerial adaptation, air cushion, air’s leap, air’s reach, air shroud, basic aerokinesis, voice of the wind; 2nd—living capacitor, voice of the wind (greater); 3rd—aerial evasion, celerity, engulfing winds, windsight, wings of air; 4rd—body of air; 5th—air shroud (greater), winfsight (greater); 6th—suffocate, wind manipulator; 8th—weather master"
// },
// {
// id: 7,
// name: "Earth",
// description: "Kineticists who focus on the element of earth are called geokineticists. Geokineticists manipulate the earth itself, and they are masters of defensive techniques.\n\nClass Skills: A geokineticist adds Climb and Knowledge (dungeoneering) to her list of class skills.\n\nBasic Manipulation: A geokineticist gains basic geokinesis.\n\n<underline>Basic Geokinesis</underline>\n\nElement(s) earth; Type utility (Sp); Level 1; Burn 0\n\nYou can move up to 5 pounds per kineticist level of rocks, loose earth, sand, clay, and other similar materials up to 15 feet as a move action. You can search earthen and stone areas from a distance as if using the sift cantrip.\n\nSimple Blast: A geokineticist gains earth blast as a simple blast wild talent.\n\n<underline>Earth Blast</underline>\n\nElement(s) earth; Type simple blast (Sp); Level —; Burn 0\n\nBlast Type: physical; Damage bludgeoning, piercing, or slashing\n\nYou shape earth into clumps or shards and send them flying at a foe.\n\nDefense: A geokineticist’s defensive wild talent is flesh of stone.\n\n<underlin>Flesh of Stone</underline>\n\nElement(s) earth; Type defense (Su); Level —; Burn 0\n\nYour skin hardens like stone, dampening the impact of most attacks. You gain DR 1/adamantine. This DR increases by 1 for every 2 kineticist levels you possess beyond 2nd. By accepting 1 point of burn, you can increase the DR by 1 until the next time your burn is removed, to a maximum DR equal to your kineticist level. Whenever you accept burn while using an earth wild talent, the energy surging through you causes your damage reduction to change from DR/adamantine to DR/— for 1 round.\n\nYou can dismiss and restore this effect as an immediate action.\n\nWild Talents: A geokineticist qualifies for the following wild talents in addition to all those listed as universal:\n\nInfusion: 1st—pushing infusionl; 2nd—bowling infusion, entangling infusion; 3rd—impale, magnetic infusion, rare metal infusion; 5th—tremor; 6th—deadly earth; 7th—fragmentation\n\nUtility: 1st—basic geokinesis, eath walk, kinetic cover; 2nd—earth climb; 3rd—jagged flesh, tremorsense; 4th—earthmeld, shift earth, enduring earth; 5th—earth glide, stone sculptor, tremorsense (greater); 7th—shift earth (greater); 8th—earth tongue; 9th—seismic master"
// },
// {
// id: 8,
// name: "Fire",
// description: "Kineticists who focus on the element of fire are called pyrokineticists. Pyrokineticists wield elemental fire as a potent weapon, and they possess a powerful offense.\n\nClass Skills: A pyrokineticist adds Escape Artist and Knowledge (nature) to her list of class skills.\n\nBasic Manipulation: A pyrokineticist gains basic pyrokinesis.\n\n<underline>Basic Pyrokinesis</underline>\n\nElement(s) fire; Type utility (Sp); Level 1; Burn 0\n\nYou can use your inner flame to reproduce the effects of a flare, light, or spark cantrip, except that the light you create with light produces heat like a normal flame; using any of the three abilities ends any previous light effect from this wild talent.\n\nSimple Blast: A pyrokineticist gains fire blast as a simple blast wild talent.\n\n<underline>Fire Blast</underline>\n\nElement(s) fire; Type simple blast (Sp); Level —; Burn 0\n\nBlast Type: energy; Damage fire\n\nYou unleash a gout of flickering fire to burn a single foe.\n\nDefense: A pyrokineticist’s defensive wild talent is searing flesh.\n\n<underline>Searing Flesh</underline>\n\nElement(s) fire; Type defense (Su); Level —; Burn 0\n\nYour body becomes painfully hot. Whenever a creature hits you with a natural attack or an unarmed strike, that creature takes 1 point of fire damage per 4 kineticist levels you possess (minimum 1 point of fire damage). A creature in a grapple with you takes double this amount of damage at the end of each of its turns.\n\nWeapons that strike you also take this damage, though the damage is unlikely to penetrate the weapon’s hardness. By accepting 1 point of burn, you can increase this damage by 1 point per 4 kineticist levels you possess until the next time your burn is removed. You can increase the damage in this way up to seven times.\n\nWhenever you accept burn while using a fire wild talent, the surging flame causes your searing flesh to deal double its current amount of damage for 1 round (a creature in a grapple with you takes a total of four times as much damage as normal). You can dismiss or restore this effect as an immediate action.\n\nWild Talents: A pyrokineticist qualifies for the following wild talents in addition to all those listed as universal:\n\nInfusion: 1st—burning infusion, dazzling infusion, energize weapon, fan of flames; 2nd—penetrating infusion; 3rd—eruption, foxfire infusion, torrent; 4th—detonation, flash infusion; 5th—unravelling infusion; 6th—brilliant infusion; 7th—explosion, pure flame infusion\n\nUtility: 1st—basic pyrokinesis, cold adaptation, fire sculptor, fire’s fury, heat adaptation; 2nd flame trap, foxfire, searing flame; 3rd firesight, heatwave, flame jet, smoke storm; 5th flame jet (greater), flame shield, trail of flames; 9th from the ashes"
// }
// ]
// },
// {
// id: 124,
// name: "Wild Talents",
// description: "A kineticist can use wild talents—magical abilities similar to spells but drawn from the kineticist’s innate psychic talent and usable at will. Wild talents are typically spell-like abilities (though some are supernatural abilities), and take a standard action to use unless otherwise noted. A wild talent always has the elemental descriptor or descriptors (aether, air, earth, fire, or water) matching its element entry. A wild talent that can be used with any of several elements gains the appropriate elemental descriptor when used with an element. For example, the wall wild talent gains the earth descriptor when used by a geokineticist.\n\nEvery wild talent has an effective spell level. A kineticist can always select 1st-level wild talents, but she can select a wild talent of a higher level only if her kineticist level is at least double the wild talent’s effective spell level. Kinetic blast and defense wild talents are always considered to have an effective spell level equal to 1/2 the kineticist’s class level (to a maximum effective spell level of 9th at kineticist level 18th).\n\nUnless otherwise noted, the DC for a saving throw against a wild talent is equal to 10 + the wild talent’s effective spell level + the kineticist’s Constitution modifier. The kineticist uses her Constitution modifier on all concentration checks for wild talents.\n\nIn addition to the wild talents she gains from her other class features, at 2nd level and every 2 levels thereafter, a kineticist selects a new utility wild talent from the list of options available to her. A kineticist can select only universal wild talents or those that match her element (see Elemental Focus above). At 6th, 10th, and 16th levels, a kineticist can replace one of her utility wild talents with another wild talent of the same level or lower. She can’t replace a wild talent that she used to qualify for another of her wild talents.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 333,
// "klass_feature_id": 124,
// "level": 1,
// "table_description": ""
// },
// {
// id: 334,
// "klass_feature_id": 124,
// "level": 2,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 335,
// "klass_feature_id": 124,
// "level": 4,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 336,
// "klass_feature_id": 124,
// "level": 6,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 337,
// "klass_feature_id": 124,
// "level": 8,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 338,
// "klass_feature_id": 124,
// "level": 10,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 339,
// "klass_feature_id": 124,
// "level": 12,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 340,
// "klass_feature_id": 124,
// "level": 14,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 341,
// "klass_feature_id": 124,
// "level": 16,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 342,
// "klass_feature_id": 124,
// "level": 18,
// "table_description": "Utility Wild Talent"
// },
// {
// id: 343,
// "klass_feature_id": 124,
// "level": 20,
// "table_description": "Utility Wild Talent"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// },
// {
// id: 125,
// name: "Burn",
// description: "At 1st level, a kineticist can overexert herself to channel more power than normal, pushing past the limit of what is safe for her body by accepting burn. Some of her wild talents allow her to accept burn in exchange for a greater effect, while others require her to accept a certain amount of burn to use that talent at all. For each point of burn she accepts, a kineticist takes 1 point of nonlethal damage per character level. This damage can’t be healed by any means other than getting a full night’s rest, which removes all burn and associated nonlethal damage. Nonlethal damage from burn can’t be reduced or redirected, and a kineticist incapable of taking nonlethal damage can’t accept burn. A kineticist can accept only 1 point of burn per round. This limit rises to 2 points of burn at 6th level, and rises by 1 additional point every 3 levels thereafter. A kineticist can’t choose to accept burn if it would put her total number of points of burn higher than 3 + her Constitution modifier (though she can be forced to accept more burn from a source outside her control). A kineticist who has accepted burn never benefits from abilities that allow her to ignore or alter the effects she receives from nonlethal damage.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 344,
// "klass_feature_id": 125,
// "level": 1,
// "table_description": "Burn"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// },
// {
// id: 126,
// name: "Kinetic Blast",
// description: "At 1st level, a kineticist gains a kinetic blast wild talent of her choice. This kinetic blast must be a simple blast that matches her element. Simple blasts are listed with their corresponding elements.\n\nAs a standard action, the kineticist can unleash a kinetic blast at a single target up to a range of 30 feet. She must have at least one hand free to aim the blast (or one prehensile appendage, if she doesn’t have hands). All damage from a kinetic blast is treated as magic for the purpose of bypassing damage reduction. Kinetic blasts count as a type of weapon for the purpose of feats such as Weapon Focus. The kineticist is never considered to be wielding or gripping the kinetic blast (regardless of effects from form infusions; see Infusion), and she can’t use Vital Strike feats with kinetic blasts. Even the weakest kinetic blast involves a sizable mass of elemental matter or energy, so kinetic blasts always deal full damage to swarms of any size (though only area blasts deal extra damage to swarms). A readied kinetic blast can be used to counterspell any spell of equal or lower level that shares its descriptor. A kinetic blast that deals energy damage of any type (including force) has the corresponding descriptor.\n\nEach simple blast is either a physical blast or an energy blast.\n\nPhysical blasts are ranged attacks that deal an amount of damage equal to 1d6+1 + the kineticist’s Constitution modifier, increasing by 1d6+1 for every 2 kineticist levels beyond 1st. Spell resistance doesn’t apply against physical blasts.\n\nEnergy blasts are ranged touch attacks that deal an amount of damage equal to 1d6 + 1/2 the kineticist’s Constitution modifier, increasing by 1d6 for every 2 kineticist levels beyond 1st.\n\nComposite blasts combine elements to form a new blast. When a kineticist gains a new element through expanded element, she gains access to all composite blasts for which she qualifies. All composite blasts are listed after the kineticist elements.\n\nMost composite blasts are either physical or energy blasts, like simple blasts.\n\nPhysical composite blasts deal an amount of damage equal to 2d6+2 + the kineticist’s Constitution modifier, increasing by 2d6+2 for every 2 kineticist levels beyond 1st.\n\nEnergy composite blasts deal an amount of damage equal to 2d6 + 1/2 the kineticist’s Constitution modifier, increasing by 2d6 for every 2 kineticist levels beyond 1st.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 345,
// "klass_feature_id": 126,
// "level": 1,
// "table_description": "Kinetic Blast"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: true,
// choice_amount: 1,
// "klass_specializations": []
// },
// {
// id: 127,
// name: "Gather Power",
// description: "If she has both hands free (or all of her prehensile appendages free, for unusual kineticists), a kineticist can gather energy or elemental matter as a move action. Gathering power creates an extremely loud, visible display in a 20-foot radius centered on the kineticist, as the energy or matter swirls around her. Gathering power in this way allows the kineticist to reduce the total burn cost of a blast wild talent she uses in the same round by 1 point. The kineticist can instead gather power for 1 full round in order to reduce the total burn cost of a blast wild talent used on her next turn by 2 points (to a minimum of 0 points). If she does so, she can also gather power as a move action during her next turn to reduce the burn cost by a total of 3 points. If the kineticist takes damage during or after gathering power and before using the kinetic blast that releases it, she must succeed at a concentration check (DC = 10 + damage taken + effective spell level of her kinetic blast) or lose the energy in a wild surge that forces her to accept a number of points of burn equal to the number of points by which her gathered power would have reduced the burn cost. This ability can never reduce the burn cost of a wild talent below 0 points.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 346,
// "klass_feature_id": 127,
// "level": 1,
// "table_description": "Gather Power"
// }
// ],
// "actions": [],
// "features": [
// {
// id: 45,
// action: {
// id: 3,
// name: "Move Action"
// },
// "usage": null,
// name: null,
// "after": false,
// "feature_usage_spell_options": [],
// "skill_bonuses": [],
// "spells": [],
// "feature_container": null,
// "stat_bonuses": [],
// "skill_notes": [],
// "stat_notes": [],
// "movements": [],
// "languages": [],
// "loading": null,
// "attack_of_opportunity": false,
// "weapon_proficiencies": [],
// "armor_proficiencies": [],
// "conditions": [],
// "applications": [],
// "status_conditions": [],
// "alternate_actions": [],
// "saving_throws": [],
// "spellcasting": null,
// "display_descriptions": [],
// "damages": [],
// "character_choices": [],
// "steps": [],
// "bonus_spell_slot": null,
// "spontaneous_castings": [],
// "attack": null,
// "castable_spells": [],
// "weapon_applications": []
// }
// ],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// },
// {
// id: 128,
// name: "Infusion",
// description: "At 1st level, a kineticist gains an infusion wild talent from the list of options available based on her elemental focus. She gains additional infusions at 3rd, 5th, 9th, 11th, 13th, 17th, and 19th levels. By using infusions along with her kinetic blasts, a kineticist can alter her kinetic blasts to suit her needs. Infusions come in two types, each of which changes a kinetic blast differently: a substance infusion causes an additional effect, while a form infusion causes the kinetic blast to manifest in a different way. Each infusion can alter only certain kinds of kinetic blasts, which are listed in its Associated Blasts entry. Each time the kineticist uses one of her kinetic blast wild talents, she can apply up to one associated form infusion and up to one associated substance infusion.\n\nSome infusions change the action required to activate a kinetic blast or entirely transform the kinetic blast’s normal effects.\n\nThe burn cost listed in each infusion’s Burn entry is added to the burn cost of the kinetic blast the infusion modifies.\n\nThe DC for a save against an infusion is based on the associated kinetic blast’s effective spell level, not the level of the infusion. The DCs for form infusions are calculated using the kineticist’s Dexterity modifier instead of her Constitution modifier. When a kineticist modifies a kinetic blast with a form infusion and a substance infusion that both require saving throws, each target first attempts a saving throw against the form infusion. If a target succeeds and a successful save negates the infusion’s effects, the entire kinetic blast is negated; otherwise, the target then attempts a saving throw against the substance infusion. If a kineticist’s form and substance infusions both alter the kinetic blast’s damage, apply the substance infusion’s alteration first.\n\nAt 5th, 11th, and 17th levels, a kineticist can replace one of her infusions with another infusion of the same effective spell level or lower. She can’t replace an infusion that she used to qualify for another of her wild talents.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 347,
// "klass_feature_id": 128,
// "level": 1,
// "table_description": "Infusion"
// },
// {
// id: 348,
// "klass_feature_id": 128,
// "level": 3,
// "table_description": "Infusion"
// },
// {
// id: 349,
// "klass_feature_id": 128,
// "level": 5,
// "table_description": "Infusion"
// },
// {
// id: 350,
// "klass_feature_id": 128,
// "level": 9,
// "table_description": "Infusion"
// },
// {
// id: 351,
// "klass_feature_id": 128,
// "level": 11,
// "table_description": "Infusion"
// },
// {
// id: 352,
// "klass_feature_id": 128,
// "level": 13,
// "table_description": "Infusion"
// },
// {
// id: 353,
// "klass_feature_id": 128,
// "level": 17,
// "table_description": "Infusion"
// },
// {
// id: 354,
// "klass_feature_id": 128,
// "level": 19,
// "table_description": "Infusion"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// },
// {
// id: 129,
// name: "Elemental Defense",
// description: "At 2nd level, a kineticist gains her element’s defensive wild talent.\n\nShe must select the expanded defense utility wild talent to gain the defensive wild talent of any element she gains via the expanded element class feature.",
// klass_id: 15,
// "feature_levels": [
// {
// id: 355,
// "klass_feature_id": 129,
// "level": 2,
// "table_description": "Elemental Defense"
// }
// ],
// "actions": [],
// "features": [],
// has_klass_feature_options: null,
// associated_spells: [],
// specialization: null,
// choice_amount: 0,
// "klass_specializations": []
// }
// ],
// "skillset": {
// id: 3,
// name: "Ravnica Custom",
// skills: [
// {
// name: "Acrobatics",
// ability_score: "Dexterity",
// description: "You can use Acrobatics to move on narrow surfaces and uneven ground without falling. A successful check allows you to move at half speed across such surfaces—only one check is needed per round. Use the following table to determine the base DC, which is then modified by the Acrobatics skill modifiers noted below. While you are using Acrobatics in this way, you are considered flat-footed and lose your Dexterity bonus to your AC (if any). If you take damage while using Acrobatics, you must immediately make another Acrobatics check at the same DC to avoid falling or being knocked prone. *No Acrobatics check is needed to move across these surfaces unless the modifiers increase the DC to 10 or higher.\n\n<table>\n  <tr>\n    <th>Surface Width</th>\n    <th>Base Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>Greater Than 3 Feet Wide</td>\n    <td>0*</td>\n  </tr>\n  <tr>\n    <td>1-3 Feet Wide</td>\n    <td>5*</td>\n  </tr>\n  <tr>\n    <td>7-11 Inches Wide</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>2-6 Inches Wide</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Less Than 2 Inches Wide</td>\n    <td>20</td>\n  </tr>\n</table>\n\nIn addition, you can move through a threatened square without provoking an attack of opportunity from an enemy by using Acrobatics. When moving in this way, you move at half speed. You can move at full speed by increasing the DC of the check by 10. You cannot use Acrobatics to move past foes if your speed is reduced due to carrying a medium or heavy load or wearing medium or heavy armor. If an ability allows you to move at full speed under such conditions, you can use Acrobatics to move past foes. You can use Acrobatics in this way while prone, but doing so requires a full-round action to move 5 feet, and the DC is increased by 5. If you attempt to move through an enemy’s space and fail the check, you lose the move action and provoke an attack of opportunity. *This DC is used to avoid an attack of opportunity due to movement. This DC increases by 2 for each additional opponent avoided in 1 round.\n\n<table>\n  <tr>\n    <th>Situation</th>\n    <th>Base Acrobatics DC*</th>\n  </tr>\n  <tr>\n    <td>Move Through a Threatened Area</td>\n    <td>Opponent's Combat Maneuver Defense</td>\n  </tr>\n  <tr>\n    <td>Move Through an Enemy's Space</td>\n    <td>5 + Opponent's Combat Maneuver Defense</td>\n  </tr>\n</table>\n\nFinally, you can use the Acrobatics skill to make jumps or to soften a fall. The base DC to make a jump is equal to the distance to be crossed (if horizontal) or four times the height to be reached (if vertical). These DCs double if you do not have at least 10 feet of space to get a running start. The only Acrobatics modifiers that apply are those concerning the surface you are jumping from. If you fail this check by 4 or less, you can attempt a DC 20 Reflex save to grab hold of the other side after having missed the jump. If you fail by 5 or more, you fail to make the jump and fall (or land prone, in the case of a vertical jump).\n\nCreatures with a base land speed above 30 feet receive a +4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed above 30 feet. Creatures with a base land speed below 30 feet receive a –4 racial bonus on Acrobatics checks made to jump for every 10 feet of their speed below 30 feet. No jump can allow you to exceed your maximum movement for the round.\n\nFor a running jump, the result of your Acrobatics check indicates the distance traveled in the jump (and if the check fails, the distance at which you actually land and fall prone). Halve this result for a standing long jump to determine where you land.\n\nWhen you deliberately fall any distance, even as a result of a missed jump, a DC 15 Acrobatics skill check allows you to ignore the first 10 feet fallen, although you still end up prone if you take damage from a fall.\n\n<table>\n  <tr>\n    <th>Long Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>5 Feet</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>10 Feet</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>15 Feet</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>20 Feet</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Greater Than 20 Feet</td>\n    <td>+5 per 5 Feet</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>High Jump</th>\n    <th>Acrobatics DC</th>\n  </tr>\n  <tr>\n    <td>1 Foot</td>\n    <td>4</td>\n  </tr>\n  <tr>\n    <td>2 Feet</td>\n    <td>8</td>\n  </tr>\n  <tr>\n    <td>3 Feet</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>4 Feet</td>\n    <td>16</td>\n  </tr>\n  <tr>\n    <td>Greater Than 4 Feet</td>\n    <td>+4 per Foot</td>\n  </tr>\n</table>\n\nThe following modifiers apply to all Acrobatics skill checks. The modifiers stack with one another, but only the most severe modifier for any given condition applies.\n\n<table>\n  <tr>\n    <th>Acrobatics Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Slightly Obstructed (Gravel, Sand)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severyly Obstructed (Cavern, Rubble)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Slippery (Wet)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Slippery</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Sloped (<45 degrees)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Severly Sloped (>45 degrees)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Slightly Unsteady (Boat in Rough Water)</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Moderately Unsteady (Boat in a Storm)</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Move at Full Speed on Narrow or Uneven Surfaces</td>\n    <td>+5 (not to Jumps)</td>\n  </tr>\n</table>",
// id: 1,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You can keep your balance while traversing narrow or treacherous surfaces. You can also dive, flip, jump, and roll, avoiding attacks and confusing your opponents.",
// action: "None. An Acrobatics check is made as part of another action or as a reaction to a situation.",
// try_again: "",
// special: "If you have 3 or more ranks in Acrobatics, you gain a +3 dodge bonus to AC when fighting defensively instead of the usual +2, and a +6 dodge bonus to AC when taking the total defense action instead of the usual +4.",
// skill_unlock_5: "You can move at normal speed through a threatened square without provoking an attack of opportunity by increasing the DC of the check by 5 (instead of by 10). You aren’t denied your Dexterity bonus when attempting Acrobatics checks with DCs of 20 or lower.",
// skill_unlock_10: "You can attempt an Acrobatics check at a –10 penalty and use the result as your CMD against trip maneuvers. You can also attempt an Acrobatics check at a –10 penalty in place of a Reflex save to avoid falling. You must choose to use this ability before the trip attempt or Reflex save is rolled. With a successful DC 20 Acrobatics check, you treat an unintentional fall as 10 feet shorter plus 10 feet for every 10 by which you exceed the DC, and treat an intentional fall as 10 feet shorter for every 10 by which you exceed the DC.",
// skill_unlock_15: "You do not provoke attacks of opportunity when standing up from prone.",
// skill_unlock_20: "You double the result of any Acrobatics check when jumping and never fall prone at the end of a fall as long as you remain conscious."
// },
// {
// name: "Bluff",
// ability_score: "Charisma",
// description: "Bluff is an opposed skill check against your opponent’s Sense Motive skill. If you use Bluff to fool someone, with a successful check you convince your opponent that what you are saying is true. Bluff checks are modified depending upon the believability of the lie. The following modifiers are applied to the roll of the creature attempting to tell the lie. Note that some lies are so improbable that it is impossible to convince anyone that they are true (subject to GM discretion).\n\n<table>\n  <tr>\n    <th>Circumstances</th>\n    <th>Bluff Modifier</th>\n  </tr>\n  <tr>\n    <td>The Target Wants to Believe You</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>The Lie is Believable</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>The Lie is Unlikely</td>\n    <td>-5</td>\n  </tr>\n  <tr>\n    <td>The Lie is Far-fetched</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>The Lie is Impossible</td>\n    <td>-20</td>\n  </tr>\n  <tr>\n    <td>The Target is Drunk or Impaired</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>You Possess Convincing Proof</td>\n    <td>Up to +10</td>\n  </tr>\n</table>\n\nFient: You can also use Bluff to feint in combat, causing your opponent to be denied his Dexterity bonus to his AC against your next attack. The DC of this check is equal to 10 + your opponent’s base attack bonus + your opponent’s Wisdom modifier. If your opponent is trained in Sense Motive, the DC is instead equal to 10 + your opponent’s Sense Motive bonus, if higher.\n\nSecret Messages: You can use Bluff to pass hidden messages to another character without others understanding your true meaning. The DC of this check is 15 for simple messages and 20 for complex messages. If you are successful, the target automatically understands you, assuming you are speaking in a language that it understands. If your check fails by 5 or more, you deliver the wrong message. Other creatures that hear the message can decipher the message by succeeding at an opposed Sense Motive check against your Bluff result.",
// id: 3,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You know how to tell a lie.",
// action: "Attempting to deceive someone takes at least 1 round, but can possibly take longer if the lie is elaborate (as determined by the GM on a case-by-case basis).\n\nFeinting in combat is a standard action.\n\nUsing Bluff to deliver a secret message takes twice as long as the message would otherwise take to relay.",
// try_again: "If you fail to deceive someone, further attempts to deceive them are at a –10 penalty and may be impossible (GM discretion).\n\nYou can attempt to feint against someone again if you fail. Secret messages can be relayed again if the first attempt fails.",
// special: "",
// skill_unlock_5: "The penalty to Bluff a creature after a failed check is halved unless you failed by 5 or more.",
// skill_unlock_10: "You take no penalty to Bluff a creature after a failed check unless you failed by 5 or more.",
// skill_unlock_15: "Creatures magically attempting to read your thoughts, detect your alignment, or reveal when you are lying must attempt a caster level check (DC = 11 + your ranks in Bluff ) or the effect reveals nothing.",
// skill_unlock_20: "As a full-round action, you can make a suggestion (as the spell, maximum duration 1 hour) to a creature within 30 feet (Will negates, DC = 15 + your Charisma modifier). A creature that saves against your suggestion is immune to further uses of this effect for 24 hours, and whenever the suggested creature is specifically confronted with proof of your manipulation, it receives another saving throw. This is an extraordinary mind-affecting compulsion."
// },
// {
// name: "Climb",
// ability_score: "Strength",
// description: "With a successful Climb check, you can advance up, down, or across a slope, wall, or other steep incline (or even across a ceiling, provided it has handholds) at one-quarter your normal speed. A slope is considered to be any incline at an angle measuring less than 60 degrees; a wall is any incline at an angle measuring 60 degrees or more. A Climb check that fails by 4 or less means that you make no progress, and one that fails by 5 or more means that you fall from whatever height you have already attained. The DC of the check depends on the conditions of the climb. Compare the task with those on the following table to determine an appropriate DC.\n\nYou need both hands free to climb, but you may cling to a wall with one hand while you cast a spell or take some other action that requires only one hand. While climbing, you can’t move to avoid a blow, so you lose your Dexterity bonus to AC (if any). You also can’t use a shield while climbing. Anytime you take damage while climbing, make a Climb check against the DC of the slope or wall. Failure means you fall from your current height and sustain the appropriate falling damage.\n\n<table>\n  <tr>\n    <th>DC</th>\n    <th>Example Surface or Activity</th>\n  </tr>\n  <tr>\n    <td>0</td>\n    <td>A slope too steep to walk up, or a knotted rope with a wall to brace against.</td>\n  </tr>\n  <tr>\n    <td>5</td>\n    <td>A rope with a wall to brace against, or a knotted rope, or a rope affected by the rope trick spell.</td>\n  </tr>\n  <tr>\n    <td>10</td>\n    <td>A surface with ledges to hold on to and stand on, such as a very rough wall or a ship’s rigging.</td>\n  </tr>\n  <tr>\n    <td>15</td>\n    <td>Any surface with adequate handholds and footholds (natural or artificial), such as a very rough natural rock surface or a tree, or an unknotted rope, or pulling yourself up when dangling by your hands.</td>\n  </tr>\n  <tr>\n    <td>20</td>\n    <td>An uneven surface with some narrow handholds and footholds, such as a typical wall in a dungeon.</td>\n  </tr>\n  <tr>\n    <td>21</td>\n    <td>A typical buildings upper-story wall</td>\n  </tr>\n  <tr>\n    <td>25</td>\n    <td>A rough surface, such as a natural rock wall or a brick wall; A typical buildings lower-story wall.</td>\n  </tr>\n  <tr>\n    <td>-</td>\n    <td>A perfectly smooth, flat, vertical (or inverted) surface cannot be climbed.</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>Climb DC Modifier</th>\n    <th>Example Surface or Activity</th>\n  </tr>\n  <tr>\n    <td>-10</td>\n    <td>Climbing a chimney (artificial or natural) or other location where you can brace against two opposite walls.</td>\n  </tr>\n  <tr>\n    <td>-5</td>\n    <td>Climbing a corner where you can brace against perpendicular walls.</td>\n  </tr>\n  <tr>\n    <td>+5</td>\n    <td>Surface is slippery.</td>\n  </tr>\n</table>\n\nAccelerated Climbing: You try to climb more quickly than normal. By accepting a –5 penalty, you can move half your speed (instead of one-quarter your speed).\n\nMake Your Own Handholds and Footholds: You can make your own handholds and footholds by pounding pitons into a wall. Doing so takes 1 minute per piton, and one piton is needed per 5 feet of distance. As with any surface that offers handholds and footholds, a wall with pitons inithasaDCof15.Inthesameway,aclimberwitha handaxe or similar implement can cut handholds in an ice wall.\n\nCatch Yourself When Falling: It’s practically impossible to catch yourself on a wall while falling. Make a Climb check (DC = wall’s DC + 20) to do so. It’s much easier to catch yourself on a slope (DC = slope’s DC + 10).\n\nCatch a Falling Character While Climbing: If someone climbing above you or adjacent to you falls, you can attempt to catch the falling character if he or she is within your reach. Doing so requires a successful melee touch attack against the falling character (though he or she can voluntarily forego any Dexterity bonus to AC if desired). If you hit, you must immediately attempt a Climb check (DC = wall’s DC + 10). Success indicates that you catch the falling character, but his total weight, including equipment, cannot exceed your heavy load limit or you automatically fall. If you fail your Climb check by 4 or less, you fail to stop the character’s fall but don’t lose your grip on the wall. If you fail by 5 or more, you fail to stop the character’s fall and begin falling as well.",
// id: 4,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at scaling vertical surfaces, from smooth city walls to rocky cliffs.",
// action: "Climbing is part of movement, so it’s generally part of a move action (and may be combined with other types of movement in a move action). Each move action that includes any climbing requires a separate Climb check. Catching yourself or another falling character doesn’t take an action.",
// try_again: "",
// special: "You can use a rope to haul a character upward (or lower a character) through sheer strength. You can lift double your maximum load in this manner.\n\nA creature with a climb speed has a +8 racial bonus on all Climb checks. The creature must make a Climb check to climb any wall or slope with a DC higher than 0, but it can always choose to take 10, even if rushed or threatened while climbing. If a creature with a climb speed chooses an accelerated climb (see above), it moves at double its climb speed (or at its land speed, whichever is slower) and makes a single Climb check at a –5 penalty. Such a creature retains its Dexterity bonus to Armor Class (if any) while climbing, and opponents get no special bonus to their attacks against it. It cannot, however, use the run action while climbing.\n\nAny creature of Tiny or smaller size should use its Dex modifier instead of its Str modifier for Climb and Swim checks.",
// skill_unlock_5: "You are no longer denied your Dexterity bonus when climbing.",
// skill_unlock_10: "You gain a natural climb speed (but not the +8 racial bonus on Climb checks) of 10 feet, but only on surfaces with a Climb DC of 20 or lower.",
// skill_unlock_15: "You gain a natural climb speed (but not the +8 racial bonus on Climb checks) equal to your base speed on surfaces with a Climb DC of 20 or lower, and of 10 feet on all other surfaces.",
// skill_unlock_20: "You gain a natural climb speed equal to your base speed on all surfaces. If you have both hands free, you gain a +8 racial bonus on Climb checks."
// },
// {
// name: "Craft",
// ability_score: "Intelligence",
// description: "You can practice your trade and make a decent living, earning half your check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the craft’s daily tasks, how to supervise untrained helpers, and how to handle common problems. (Untrained laborers and assistants earn an average of 1 silver piece per day.)\n\nThe basic function of the Craft skill, however, is to allow you to make an item of the appropriate type. The DC depends on the complexity of the item to be created. The DC, your check result, and the price of the item determine how long it takes to make a particular item. The item’s finished price also determines the cost of raw materials.\n\nTo determine how much time and money it takes to make an item, follow these steps.\n\n1) Find the item’s price in silver pieces (1 gp = 10 sp).\n\n2) Find the item’s DC from Table: Craft Skills.\n\n3) Pay 1/3 of the item’s price for the raw material cost.\n\n4) Make an appropriate Craft check representing one week’s worth of work. If the check succeeds, multiply your check result by the DC. If the result × the DC equals the price of the item in sp, then you have completed the item. (If the result × the DC equals double or triple the price of the item in silver pieces, then you’ve completed the task in one-half or one-third of the time. Other multiples of the DC reduce the time in the same manner.) If the result × the DC doesn’t equal the price, then it represents the progress you’ve made this week. Record the result and make a new Craft check for the next week. Each week, you make more progress until your total reaches the price of the item in silver pieces.\n\nIf you fail a check by 4 or less, you make no progress this week (or day, see below). If you miss by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.\n\nTools: All crafts require artisan’s tools to give the best chance of success. If improvised tools are used, the check is made with a –2 penalty. On the other hand, masterwork artisan’s tools provide a +2 circumstance bonus on the check.\n\nFabricate Spell: In some cases, the fabricate spell can be used to achieve the results of a Craft check with no actual check involved. You must still make an appropriate Craft check when using the spell to make articles requiring a high degree of craftsmanship.\n\nIronwood Spell: A successful Craft check related to woodworking in conjunction with the casting of the ironwood spell enables you to make wooden items that have the strength of steel.\n\nMinor Creation: When casting the spell minor creation, you must succeed on an appropriate Craft check to make a complex item.\n\nProgress by the Day: You can make checks by the day instead of by the week. In this case your progress (check result × DC) should be divided by the number of days in a week.\n\nCreate Masterwork Items: You can make a masterwork item: a weapon, suit of armor, shield, or tool that conveys a bonus on its use through its exceptional craftsmanship. To create a masterwork item, you create the masterwork component as if it were a separate item in addition to the standard item. The masterwork component has its own price (300 gp for a weapon or 150 gp for a suit of armor or a shield, see Chapter 6 for the price of other masterwork tools) and a Craft DC of 20. Once both the standard component and the masterwork component are completed, the masterwork item is finished. The cost you pay for the masterwork component is one-third of the given amount, just as it is for the cost in raw materials.\n\nRepair Items: You can repair an item by making checks against the same DC that it took to make the item in the first place. The cost of repairing an item is one-fifth of the item’s price.\n\n*You must be trained in the listed skill to attempt this task.\n\n<table>\n  <tr>\n    <th>Item/Task</th>\n    <th>Craft Skill</th>\n    <th>Craft DC</th>\n  </tr>\n  <tr>\n    <td>Craft Acid</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine the Items an Alchemist Makes with Substances from Their Lab*</td>\n    <td>Alchemy</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Alchemist's Fire, Smokestick, or Tindertwig</td>\n    <td>Alchemy</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Antitoxin, Sunrod, Tanglefoot Bag, or Thunderstone</td>\n    <td>Alchemy</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Armor or Shield</td>\n    <td>Armor</td>\n    <td>10 + AC Bonus</td>\n  </tr>\n  <tr>\n    <td>Etch Metal Armor Plates with Decorative Designs</td>\n    <td>Armor or Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Suit of Masterwork Armor on Sight</td>\n    <td>Armor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine What Type of Environment a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine the Specific Region a Basket's Material Came From</td>\n    <td>Baskets</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Smelt Ore and Refine the Metal</td>\n    <td>Blacksmithing</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create Armor Spikes or Shield Spikes Without Craft (Armor)*</td>\n    <td>Blacksmithing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Determine a Book's Approxiamte Age</td>\n    <td>Books</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Composite Bow on Site</td>\n    <td>Bows</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Longbow, Shortbow, or Arrows</td>\n    <td>Bows</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Bow on Sight</td>\n    <td>Bows</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Composite Longbow or Composite Shortbow With High Strength Rating</td>\n    <td>Bows</td>\n    <td>15 + (2 x Rating)</td>\n  </tr>\n  <tr>\n    <td>Determine a Writer's Experience Level and Handedness*</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Write an Invitation That Matches Appropriate Social Conventions</td>\n    <td>Calligraphy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Make a Makeshift Barrel or Crate</td>\n    <td>Carpentry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Rudiementary Raft from Found Materials</td>\n    <td>Carpentry or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Carve Fine Woodworking</td>\n    <td>Carpentry or Sculptures</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Wooden Armor or a Wooden Shield Without Craft (Armor)</td>\n    <td>Carpentry</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Correctly Dye a Garment or Bolt of Cloth</td>\n    <td>Cloth</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Mend a Sail</td>\n    <td>Cloth, Clothin, or Ships</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Tailor a Garment to Another Size or Body Shape</td>\n    <td>Clothing</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Temporary Cold-Weather Gear (Grants a +2 Bonus)</td>\n    <td>Clothing</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Padded Armor Without Craft (Armor)</td>\n    <td>Clothing</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Craft One-Handed Firearm or Two-Handed Firearm</td>\n    <td>Firearms</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Heavy</td>\n    <td>Firearms</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Craft Seige Firearm, Light</td>\n    <td>Firearms</td>\n    <td>35</td>\n  </tr>\n  <tr>\n    <td>Locate or Identify Naturally Formed Glass</td>\n    <td>Glass</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify the Work of Famous Jewelers</td>\n    <td>Jewelry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a Fake Gemstone*</td>\n    <td>Jewelry</td>\n    <td>Opposed</td>\n  </tr>\n  <tr>\n    <td>Identify the Sort of Creature From Which a Piece of Leather Came*</td>\n    <td>Leather</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Leather</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Create a High-Quality Item From the Hide of a Non-Standard Creature*</td>\n    <td>Leather</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create Leather, Studded Leather, or Hide Armor Without Craft (Armor)</td>\n    <td>Leather</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Skill Check to Open a Lock*</td>\n    <td>Locks</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Tune a Musical Instrument</td>\n    <td>Musical Instruments</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create Paint or Other Pigments from Scratch</td>\n    <td>Paintings</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from Memory</td>\n    <td>Paintings</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Re-create Someone's Likeness from an Eyewitness Account</td>\n    <td>Paintings</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary or Makeshift Kiln</td>\n    <td>Pottery</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Make a Mold of an Object or Part of a Body</td>\n    <td>Sculptures</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Heavy</td>\n    <td>Seige Engines</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Medium</td>\n    <td>Seige Engines</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Craft Ranged Seige Engine, Light</td>\n    <td>Seige Engines</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Alter Shoes to a Different Size or Foot Shape*</td>\n    <td>Shoes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize a Famous Ship and Where it Likely Came From</td>\n    <td>Ships</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Whether a Stone Wall is Entirely Stone or a Veneer</td>\n    <td>Stonemasonry</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Create a Temporary Stone Support or Small Rampart with Found Supplies</td>\n    <td>Stonemasonry</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Mechanical Traps</td>\n    <td>Traps</td>\n    <td>Varies</td>\n  </tr>\n  <tr>\n    <td>Determine the Age of a Mechanical Trap</td>\n    <td>Traps</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Masterwork Weapon on Sight</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Crossbow or Bolts</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Simple Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>12</td>\n  </tr>\n  <tr>\n    <td>Craft Martial Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Exotic Melee or Thrown Weapon</td>\n    <td>Weapons</td>\n    <td>18</td>\n  </tr>\n  <tr>\n    <td>Very Simple Item (Wooden Spoon)</td>\n    <td>Varies</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Craft Typical Item (Iron Pot)</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Famous Maker's Mark</td>\n    <td>Varies</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Craft High-Quality Item (Bell)</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Detemine What Culture (e.g. Elves, Frost Giants) Made an Item</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Craft Complex or Superior Item (Lock)</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify an Obscure Maker's Mark*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Hardness and Hit Points of an Item*</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify the Creator of an Item with No Mark*</td>\n    <td>Varies</td>\n    <td>30</td>\n  </tr>\n</table>\n\nThe table below lists which craft skills to use for certain prominent items and adventuring tools. This list omits obvious items - outfits are made with Craft (clothing), keelboats with Craft (ships),  and so on. More specific skills can also be used instead of the listed skill, such as using Craft (tattoos) instead of Craft (paintings) for a tattoo.\n\n<table>\n  <tr>\n    <th>Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Alchemist's Lab</td>\n    <td>Alchemy</td>\n  </tr>\n  <tr>\n    <td>Artisan's Tools</td>\n    <td>Blacksmithing or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Backpack</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Barding</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Bedroll</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Caltrops</td>\n    <td>Weapons</td>\n  </tr>\n  <tr>\n    <td>Cart or Carriage</td>\n    <td>Carpentry</td>\n  </tr>\n  <tr>\n    <td>Chain</td>\n    <td>Blacksmithing or Traps</td>\n  </tr>\n  <tr>\n    <td>Chest</td>\n    <td>Carpentry or Locks</td>\n  </tr>\n  <tr>\n    <td>Climber's Kit</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Disguise Kit</td>\n    <td>Alchemy or Paintings</td>\n  </tr>\n  <tr>\n    <td>Flint and Steel</td>\n    <td>Blacksmithing or Stonemasonry</td>\n  </tr>\n  <tr>\n    <td>Grappling Hook</td>\n    <td>Blacksmithing or Weapons</td>\n  </tr>\n  <tr>\n    <td>Gunslinger's Kit</td>\n    <td>Alchemy or Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Harrow Deck</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Healer's Kit</td>\n    <td>Alchemy or Cloth</td>\n  </tr>\n  <tr>\n    <td>Hemp Rope</td>\n    <td>Baskets or Cloth</td>\n  </tr>\n  <tr>\n    <td>Lamp</td>\n    <td>Blacksmithing or Glass</td>\n  </tr>\n  <tr>\n    <td>Manacles<td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Masterwork Tool</td>\n    <td>Blacksmithing</td>\n  </tr>\n  <tr>\n    <td>Musical Instrument</td>\n    <td>Musical Instruments</td>\n  </tr>\n  <tr>\n    <td>Saddle</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Scroll Case</td>\n    <td>Carpentry or Leather</td>\n  </tr>\n  <tr>\n    <td>Signet Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Silk Rope</td>\n    <td>Cloth</td>\n  </tr>\n  <tr>\n    <td>Silver Holy Symbol</td>\n    <td>Blacksmithing or Sculptures</td>\n  </tr>\n  <tr>\n    <td>Skeleton Key</td>\n    <td>Locks</td>\n  </tr>\n  <tr>\n    <td>Spell Component Pouch/td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Spyglass</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Tattoo</td>\n    <td>Paintings</td>\n  </tr>\n  <tr>\n    <td>Tent</td>\n    <td>Cloth or Leather</td>\n  </tr>\n  <tr>\n    <td>Thieves' Tools</td>\n    <td>Blacksmithing or Locks</td>\n  </tr>\n  <tr>\n    <td>Waterskin</td>\n    <td>Leather</td>\n  </tr>\n  <tr>\n    <td>Wood Holy Symbol</td>\n    <td>Carpentry or Sculptures</td>\n  </tr>\n</table>\n\nThe following table indicates which Craft skills are typically used to create common worn items. While the normal system for creating magic items doesn't incorporate Craft skills, such skills could reasonably be used while creating a magic item to make it appear especially ornate.\n\n<table>\n  <tr>\n    <th>Worn Item</th>\n    <th>Craft Skill</th>\n  </tr>\n  <tr>\n    <td>Amulet</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Belt</td>\n    <td>Leather or Clothing</td>\n  </tr>\n  <tr>\n    <td>Bracelet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Bracer</td>\n    <td>Armor or Leather</td>\n  </tr>\n  <tr>\n    <td>Brooch</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Cape or Cloak</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Circlet</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Crown</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Gauntlet</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Girdle</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Glasses or Goggles</td>\n    <td>Glass</td>\n  </tr>\n  <tr>\n    <td>Glove</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Hat</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Headband</td>\n    <td>Cloth or Clothing</td>\n  </tr>\n  <tr>\n    <td>Helm</td>\n    <td>Armor</td>\n  </tr>\n  <tr>\n    <td>Mask</td>\n    <td>Clothing or Leather</td>\n  </tr>\n  <tr>\n    <td>Necklace</td>\n    <td>Blacksmithing or Jewelry</td>\n  </tr>\n  <tr>\n    <td>Periapt</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Phylactery</td>\n    <td>Leather or Carpentry</td>\n  </tr>\n  <tr>\n    <td>Ring</td>\n    <td>Jewelry</td>\n  </tr>\n  <tr>\n    <td>Robe</td>\n    <td>Clothing</td>\n  </tr>\n  <tr>\n    <td>Vestments</td>\n    <td>Clothing</td>\n  </tr>\n</table>",
// id: 5,
// untrained: true,
// customizable: true,
// knowledge: false,
// blurb: "You are skilled in the creation of a specific group of items, such as armor or weapons. Like Knowledge, Perform, and Profession, Craft is actually a number of separate skills. You could have several Craft skills, each with its own ranks. The most common Craft skills are alchemy, armor, baskets, books, bows, calligraphy, carpentry, cloth, clothing, glass, jewelry, leather, locks, paintings, pottery, sculptures, ships, shoes, stonemasonry, traps, and weapons.\n\nA Craft skill is specifically focused on creating something. If nothing is created by the endeavor, it probably falls under the heading of a Profession skill.",
// action: "Does not apply. Craft checks are made by the day or week (see above).",
// try_again: "Yes, but each time you fail by 5 or more, you ruin half the raw materials and have to pay half the original raw material cost again.",
// special: "You may voluntarily add +10 to the indicated DC to craft an item. This allows you to create the item more quickly (since you’ll be multiplying this higher DC by your Craft check result to determine progress). You must decide whether to increase the DC before you make each weekly or daily check.\n\nTo make an item using Craft (alchemy), you must have alchemical equipment. If you are working in a city, you can buy what you need as part of the raw materials cost to make the item, but alchemical equipment is difficult or impossible to come by in some places. Purchasing and maintaining an alchemist’s lab grants a +2 circumstance bonus on Craft (alchemy) checks because you have the perfect tools for the job, but it does not affect the cost of any items made using the skill.\n\nThose who wish to construct or repair technological items use Craft (mechanical) in conjunction with technological item crafting feats. Without the Technologist feat, Craft (mechanical) can still be used to craft less advanced forms of technology such as gears, hinges, and pulleys. NPCs with the means of crafting technological items are extremely rare, and it is not assumed that PCs have access to such resources. GMs are encouraged to discuss such considerations with their players before allowing technological crafting into the game.",
// skill_unlock_5: "When determining your weekly progress, double the result of your Craft check before multiplying the result by the item’s DC.",
// skill_unlock_10: "You do not ruin any of your raw materials unless you fail a check by 10 or more.",
// skill_unlock_15: "When you determine your progress, the result of your check is how much work you complete each day in silver pieces.",
// skill_unlock_20: "You can craft magic armor, magic weapons, magic rings, and wondrous items that fall under your category of Craft using the normal Craft rules."
// },
// {
// name: "Diplomacy",
// ability_score: "Charisma",
// description: "You can change the initial attitudes of nonplayer characters with a successful check. The DC of this check depends on the creature’s starting attitude toward you, adjusted by its Charisma modifier. If you succeed, the character’s attitude toward you is improved by one step. For every 5 by which your check result exceeds the DC, the character’s attitude toward you increases by one additional step. A creature’s attitude cannot be shifted more than two steps up in this way, although the GM can override this rule in some situations. If you fail the check by 4 or less, the character’s attitude toward you is unchanged. If you fail by 5 or more, the character’s attitude toward you is decreased by one step.\n\nYou cannot use Diplomacy against a creature that does not understand you or has an Intelligence of 3 or less. Diplomacy is generally ineffective in combat and against creatures that intend to harm you or your allies in the immediate future. Any attitude shift caused through Diplomacy generally lasts for 1d4 hours but can last much longer or shorter depending upon the situation (GM discretion).\n\n<table>\n  <tr>\n    <th>Starting Attitude</th>\n    <th>Diplomacy DC</th>\n  </tr>\n  <tr>\n    <td>Hostile</td>\n    <td>25 + Creature's Cha Modifier</td>\n  </tr>\n  <tr>\n    <td>Unfriendly</td>\n    <td>20 + Creature's Cha Modifier</td>\n  </tr>\n  <tr>\n    <td>Indifferent</td>\n    <td>15 + Creature's Cha Modifier</td>\n  </tr>\n  <tr>\n    <td>Friendly</td>\n    <td>10 + Creature's Cha Modifier</td>\n  </tr>\n  <tr>\n    <td>Helpful</td>\n    <td>0 + Creature's Cha Modifier</td>\n  </tr>\n</table>\n\nIf a creature’s attitude toward you is at least indifferent, you can make requests of the creature. This is an additional Diplomacy check, using the creature’s current attitude to determine the base DC, with one of the following modifiers. Once a creature’s attitude has shifted to helpful, the creature gives in to most requests without a check, unless the request is against its nature or puts it in serious peril. Some requests automatically fail if the request goes against the creature’s values or its nature, subject to GM discretion.\n\n<table>\n  <tr>\n    <th>Request</th>\n    <th>Diplomacy DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Give Simple Advice or Directions</td>\n    <td>-5</td>\n  </tr>\n  <tr>\n    <td>Give Detailed Advice</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>Give Simple Aid</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>Reveal an Unimportant Secret</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Give Lengthy or Complicated Aid</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Give Dangerous Aid</td>\n    <td>+10</td>\n  </tr>\n  <tr>\n    <td>Reveal an Important Secret</td>\n    <td>+10 or More</td>\n  </tr>\n  <tr>\n    <td>Give Aid That Could Result in Punishment</td>\n    <td>+15 or More</td>\n  </tr>\n  <tr>\n    <td>Additional Requests</td>\n    <td>+5 per Request</td>\n  </tr>\n</table>\n\nGather Information: You can also use Diplomacy to gather information about a specific topic or individual. To do this, you must spend at least 1d4 hours canvassing people at local taverns, markets, and gathering places. The DC of this check depends on the obscurity of the information sought, but for most commonly known facts or rumors it is 10. For obscure or secret knowledge, the DC might increase to 20 or higher. The GM might rule that some topics are simply unknown to common folk.",
// id: 6,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You can use this skill to persuade others to agree with your arguments, to resolve differences, and to gather valuable information or rumors from people. This skill is also used to negotiate conflicts by using the proper etiquette and manners suitable to the problem.",
// action: "Using Diplomacy to influence a creature’s attitude takes 1 minute of continuous interaction. Making a request of a creature takes 1 or more rounds of interaction, depending upon the complexity of the request. Using Diplomacy to gather information takes 1d4 hours of work searching for rumors and informants.",
// try_again: "You cannot use Diplomacy to influence a given creature’s attitude more than once in a 24-hour period. If a request is refused, the result does not change with additional checks, although other requests might be made. You can retry Diplomacy checks made to gather information.",
// special: "",
// skill_unlock_5: "The time required to influence a creature’s attitude or gather information is halved.",
// skill_unlock_10: "You can attempt to adjust a creature’s attitude in 1 round by taking a –10 penalty. If you take 1 minute to adjust a creature’s attitude, add your Charisma bonus to the number of hours that attitude change persists.",
// skill_unlock_15: "You can attempt to adjust a creature’s attitude in 1 round with no penalty. If you take 1 minute to adjust a creature’s attitude, the duration of the resulting change is measured in days, not hours. You can gather information in 10 minutes by taking a –5 penalty.",
// skill_unlock_20: "You can attempt to adjust a creature’s attitude in 1 round with no penalty. If you take 1 minute to adjust a creature’s attitude, the duration of the resulting change is measured in weeks, not hours. You can gather information in 1d4 minutes with no penalty."
// },
// {
// name: "Disguise",
// ability_score: "Charisma",
// description: "Your Disguise check result determines how good the disguise is, and it is opposed by others’ Perception check results. If you don’t draw any attention to yourself, others do not get to make Perception checks. If you come to the attention of people who are suspicious (such as a guard who is watching commoners walking through a city gate), it can be assumed that such observers are taking 10 on their Perception checks.\n\nYou get only one Disguise check per use of the skill, even if several people make Perception checks against it. The Disguise check is made secretly, so that you can’t be sure how good the result is.\n\nThe effectiveness of your disguise depends on how much you’re changing your appearance. Disguise can be used to make yourself appear like a creature that is one size category larger or smaller than your actual size. This does not change your actual size or reach, should you enter combat while wearing such a disguise.\n\n*Per step of difference between your actual age category and your disguised age category. The steps are: young (younger than adulthood), adulthood, middle age, old, and venerable.\n\n<table>\n  <tr>\n    <th>Disguise</th>\n    <th>Disguise Check Modifier</th>\n  </tr>\n  <tr>\n    <td>Minor Details Only</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Disguised as a Different Gender</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Disguised as a Different Ancestry</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Disguised as a Different Age Category</td>\n    <td>-2*</td>\n  </tr>\n  <tr>\n    <td>Disguised as a Different Size Category</td>\n    <td>-10</td>\n  </tr>\n</table>\n\nIf you are impersonating a particular individual, those who know what that person looks like get a bonus on their Perception checks according to the table below. Furthermore, they are automatically considered to be suspicious of you, so opposed checks are always called for.\n\n<table>\n  <tr>\n    <th>Familiarity</th>\n    <th>Viewer's Perception Check Bonus</th>\n  </tr>\n  <tr>\n    <td>Recognizes on Sight</td>\n    <td>+4</td>\n  </tr>\n  <tr>\n    <td>Friends or Associates</td>\n    <td>+6</td>\n  </tr>\n  <tr>\n    <td>Close Friends</td>\n    <td>+8</td>\n  </tr>\n  <tr>\n    <td>Intimate</td>\n    <td>+10</td>\n  </tr>\n</table>\n\nAn individual makes a Perception check to see through your disguise immediately upon meeting you and again every hour thereafter. If you casually meet a large number of different creatures, each for a short time, check once per day or hour, using an average Perception modifier for the group.",
// id: 8,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at changing your appearance.",
// action: "Creating a disguise requires 1d3 × 10 minutes of work. Using magic (such as the disguise self spell) reduces this action to the time required to cast the spell or trigger the effect.",
// try_again: "Yes. You may try to redo a failed disguise, but once others know that a disguise was attempted, they’ll be more suspicious.",
// special: "Magic that alters your form, such as alter self, disguise self, polymorph, or shapechange, grants you a +10 bonus on Disguise checks (see the individual spell descriptions). Divination magic that allows people to see through illusions (such as true seeing) does not penetrate a mundane disguise, but it can negate the magical component of a magically enhanced one.\n\nYou must make a Disguise check when you cast a simulacrum spell to determine how good the likeness is.",
// skill_unlock_5: "You can create a disguise in 1d3 minutes.",
// skill_unlock_10: "You can create a disguise in 1d3 rounds. If you take the full normal amount of time to create your disguise, you take no penalty for disguising your gender, race, or age category.",
// skill_unlock_15: "You can create a disguise as a full-round action.",
// skill_unlock_20: "You can create a disguise as a standard action, or as a full-round action combined with a Bluff check to create a diversion to hide."
// },
// {
// name: "Finesse",
// ability_score: "Dexterity",
// description: "<underline>Disable Device</underline> You are skilled at disarming traps and opening locks. In addition, this skill lets you sabotage simple mechanical devices, such as catapults, wagon wheels, and doors. Your training allows you to pick pockets, draw hidden weapons, and take a variety of actions without being noticed.\n\nWhen disarming a trap or other device, the Disable Device check is made secretly, so that you don’t necessarily know whether you’ve succeeded.\n\nThe DC depends on how tricky the device is. If the check succeeds, you disable the device. If it fails by 4 or less, you have failed but can try again. If you fail by 5 or more, something goes wrong. If the device is a trap, you trigger it. If you’re attempting some sort of sabotage, you think the device is disabled, but it still works normally.\n\nYou also can rig simple devices such as saddles or wagon wheels to work normally for a while and then fail or fall off some time later (usually after 1d4 rounds or minutes of use).\n\n*If you attempt to leave behind no trace of your tampering, add 5 to the DC.\n\n<table>\n  <tr>\n    <th>Device</th>\n    <th>Time</th>\n    <th>Disable Device DC*</th>\n    <th>Example</th>\n  </tr>\n  <tr>\n    <td>Simple</td>\n    <td>1 Round</td>\n    <td>10</td>\n    <td>Jam a Lock</td>\n  </tr>\n  <tr>\n    <td>Tricky</td>\n    <td>1d4 Rounds</td>\n    <td>15</td>\n    <td>Sabotage a Wagon Wheel</td>\n  </tr>\n  <tr>\n    <td>Difficult</td>\n    <td>2d4 Rounds</td>\n    <td>20</td>\n    <td>Disarm a Trap, Reset a Trap</td>\n  </tr>\n  <tr>\n    <td>Extreme</td>\n    <td>2d4 Rounds</td>\n    <td>25</td>\n    <td>Disarm a Complex Trap, Cleverly Sabotage a Clockwork Device</td>\n  </tr>\n</table>\n\nOpen Locks: The DC for opening a lock depends on its quality. If you do not have a set of thieves’ tools, these DCs increase by 10.\n\n<table>\n  <tr>\n    <th>Lock Quality</th>\n    <th>Disable Device DC</th>\n  </tr>\n  <tr>\n    <td>Simple</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Average</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Good</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Superior</td>\n    <td>40</td>\n  </tr>\n</table>\n\n<underline>Sleight of Hand</underline> Your training allows you to pick pockets, draw hidden weapons, and take a variety of actions without being noticed.\n\nA DC 10 Sleight of Hand check lets you palm a coin-sized, unattended object. Performing a minor feat of legerdemain, such as making a coin disappear, also has a DC of 10 unless an observer is determined to note where the item went.\n\nWhen you use this skill under close observation, your skill check is opposed by the observer’s Perception check. The observer’s success doesn’t prevent you from performing the action, just from doing it unnoticed.\n\nYou can hide a small object (including a light weapon or an easily concealed ranged weapon, such as a dart, sling, or hand crossbow) on your body. Your Sleight of Hand check is opposed by the Perception check of anyone observing you or of anyone frisking you. In the latter case, the searcher gains a +4 bonus on the Perception check, since it’s generally easier to find such an object than to hide it. A dagger is easier to hide than most light weapons, and grants you a +2 bonus on your Sleight of Hand check to conceal it. An extraordinarily small object, such as a coin, shuriken, or ring, grants you a +4 bonus on your Sleight of Hand check to conceal it, and heavy or baggy clothing (such as a cloak) grants you a +2 bonus on the check.\n\nDrawing a hidden weapon is a standard action and doesn’t provoke an attack of opportunity.\n\nIf you try to take something from a creature, you must make a DC 20 Sleight of Hand check. The opponent makes a Perception check to detect the attempt, opposed by the Sleight of Hand check result you achieved when you tried to grab the item. An opponent who succeeds on this check no- tices the attempt, regardless of whether you got the item. You cannot use this skill to take an object from another creature during combat if the creature is aware of your presence.\n\nYou can also use Sleight of Hand to entertain an audience as though you were using the Perform skill. In such a case, your “act” encompasses elements of legerdemain, juggling, and the like.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Sleight of Hand DC</th>\n  </tr>\n  <tr>\n    <td>Palm a Coin-Sized Object, Make a Coin Disappear</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Lift a Small Object from a Person</td>\n    <td>20</td>\n  </tr>\n</table>",
// id: 37,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "This skill is from the Pathfinder Unchained material, and represent a combination of the skills Disable Device and Sleight of Hand. The text below outlines a consolidation of those skills' features with minimal edits.",
// action: "<underline>Disable Device</underline>: The amount of time needed to make a Disable Device check depends on the task, as noted above. Disabling a simple device takes 1 round and is a full-round action. An intricate or complex device requires 1d4 or 2d4 rounds. Attempting to open a lock is a full-round action.\n\n<underline>Sleight of Hand</underline>: Any Sleight of Hand check is normally a standard action. However, you may perform a Sleight of Hand check as a move action by taking a –20 penalty on the check.",
// try_again: "<underline>Disable Device</underline>: Varies. You can retry checks made to disable traps if you miss the check by 4 or less. You can retry checks made to open locks.\n\n<underline>Sleight of Hand</underline>: Yes, but after an initial failure, a second Sleight of Hand attempt against the same target (or while you are being watched by the same observer who noticed your previous attempt) increases the DC for the task by 10.",
// special: "<underline>Disable Device</underline>: A rogue who beats a trap’s DC by 10 or more can study the trap, figure out how it works, and bypass it without disarming it. A rogue can rig a trap so her allies can bypass it as well.\n\nCharacters with the trapfinding ability (like rogues) can disarm magic traps. A magic trap generally has a DC of 25 + the level of the spell used to create it.\n\nThe spells fire trap, glyph of warding, symbol, and teleportation circle also create traps that a rogue can disarm with a successful Disable Device check. Spike growth and spike stones, however, create magic hazards against which Disable Device checks do not succeed. See the individual spell descriptions for details.\n\n<underline>Sleight of Hand</underline>: An untrained Sleight of Hand check is simply a Dexterity check. Without actual training, you can’t succeed on any Sleight of Hand check with a DC higher than 10, except for hiding an object on your body.",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Handle Animal",
// ability_score: "Charisma",
// description: "The DC depends on what you are trying to do.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Handle Animal DC</th>\n  </tr>\n  <tr>\n    <td>Handle an Animal</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>'Push' an Animal</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Teach an Animal a Trick</td>\n    <td>15 - 20</td>\n  </tr>\n  <tr>\n    <td>Train an Animal for General Purpose</td>\n    <td>15 - 20</td>\n  </tr>\n  <tr>\n    <td>Rear a Wild Animal</td>\n    <td>15 + HD of Animal</td>\n  </tr>\n</table>\n\nHandle an Animal: This task involves commanding an animal to perform a task or trick that it knows. If the animal is wounded or has taken any nonlethal damage or ability score damage, the DC increases by 2. If your check succeeds, the animal performs the task or trick on its next action.\n\nPush an Animal: To push an animal means to get it to perform a task or trick that it doesn’t know but is physically capable of performing. This category also covers making an animal perform a forced march or forcing it to hustle for more than 1 hour between sleep cycles. If the animal is wounded or has taken any nonlethal damage or ability score damage, the DC increases by 2. If your check succeeds, the animal performs the task or trick on its next action.\n\nTeach an Animal a Trick: You can teach an animal a specific trick with one week of work and a successful Handle Animal check against the indicated DC. An animal with an Intelligence score of 1 can learn a maximum of three tricks, while an animal with an Intelligence score of 2 can learn a maximum of six tricks.The following tricks can be taught to animals by training the animal for a week and making a successful Handle Animal skill check against the listed DC.\n\nAid (DC 20): The animal can use the aid another action to aid a specific ally in combat by attacking a specific foe the ally is fighting. You point to a particular creature that you wish the animal to aid, and you point to another that you want it to make an attack roll against, and it will comply if able. The normal creature type restrictions governing the attack trick still apply.\n\nAttack (DC 20) The animal attacks apparent enemies. You may point to a particular creature that you wish the animal to attack, and it will comply if able. Normally, an animal will attack only humanoids, monstrous humanoids, giants, or other animals. Teaching an animal to attack all creatures (including such unnatural creatures as undead and aberrations) counts as two tricks.\n\nBombard (DC 20): A flying animal can deliver projectiles on command, attempting to drop a specified item that it can carry (often alchemist’s fire or a similar splash weapon) on a designated point or opponent, using its base attack bonus to determine its attack roll. The animal cannot throw the object, and it must be able to fly directly over the target.\n\nBreak Out (DC 20): On command, the animal attempts to break or gnaw through bars or bindings restricting it, its handler, or a person indicated by the handler. If the animal cannot break the restraints by itself, its attempts grant the restricted creature a +4 circumstance bonus on Escape Artist checks. Furthermore, the animal can take certain basic actions such as lifting a latch or bringing its master an unattended key. Weight and Strength restrictions still apply, and pickpocketing a key or picking any sort of lock is still far beyond the animal‘s ability.\n\nBuild Simple Structure (DC 25): The companion can build simple structures on command, limited by its natural abilities and inclinations. The companion is able to build only structures that creatures of its type would naturally build on their own, and this trick merely allows the handler to direct the companion on when and where to build such structures. For example, a spider could be commanded to spin a web between two trees, but it could not be made to create a hammock or a tent out of silk. Similarly, a beaver could be ordered to make a dam or lodge, an alligator a dome-shaped nest, and any burrowing creature a small tunnel or hole. In general, this process takes 10 minutes for each 5-foot square the structure occupies, but depending on the terrain and the type of structure, it might take as little as 1 minute or as much as 1 hour or more, at the GM’s discretion. Only companions that naturally build structures can learn this trick.\n\nBury (DC 15): an animal with this trick can be instructed to bury an object in its possession. The animal normally seeks a secluded place to bury its object. an animal that knows both the bury and fetch tricks can be instructed to fetch an item it has buried.\n\nCocoon (DC 15): The companion can cocoon an object or a helpless or willing Huge or smaller creature in webbing. The amount of time this takes depends on the size of the creature or object to be cocooned, as outlined on the following table. The cocoon has hardness 2 and 10 hit points. A creature trapped within the cocoon is effectively pinned, and it can attempt an Escape Artist check or combat maneuver check as a full-round action to escape (DC = 20 + the companion’s CMD). Alternatively, a DC 25 Strength check can break the cocoon. The companion must know the spin silk trick before it can learn this trick.\n\n<table>\n  <tr>\n    <th>Target Size</th>\n    <th>Time to Cocoon</th>\n  </tr>\n  <tr>\n    <td>Tiny or Smaller</td>\n    <td>1 Minute</td>\n  </tr>\n  <tr>\n    <td>Small or Medium</td>\n    <td>10 Minutes</td>\n  </tr>\n  <tr>\n    <td>Large</td>\n    <td>1 Hour</td>\n  </tr>\n  <tr>\n    <td>Huge</td>\n    <td>4 Hours</td>\n  </tr>\n</table>\n\nCome (DC 15) The animal comes to you, even if it normally would not do so.\n\nDefend (DC 20) The animal defends you (or is ready to defend you if no threat is present), even without any command being given. Alternatively, you can command the animal to defend a specific other character.\n\nDeliver (DC 15): The animal takes an object (one you or an ally gives it, or one that it recovers with the fetch trick) to a place or person you indicate. If you indicate a place, the animal drops the item and returns to you. If you indicate a person, the animal stays adjacent to the person until the item is taken. (Retrieving an item from an animal using the deliver trick is a move action.)\n\nDemolish (DC 15): The companion can be commanded to attack and damage objects and structures. A companion must know the attack trick before it can be taught the demolish trick, and the companion must be trained to attack creatures of all types. The companion’s handler can direct it either to make natural attacks against the object in question or to make a Strength check to attempt to break it (if applicable).\n\nDetect (DC 25): The animal is trained to seek out the smells of air currents, alchemical items and poisons, unusual noises or echoes, and other common elements that signify the presence of potential dangers or secret passages. When commanded, the animal uses its Perception skill to try to pinpoint the source of anything that strikes it as out of the ordinary about a room or location. Note that because the animal is not intelligent, any number of doors, scents, strange mechanisms, or unfamiliar objects might catch the animal’s attention, and it cannot attempt the same Perception check more than once in this way.\n\nDown (DC 15) The animal breaks off from combat or otherwise backs down. An animal that doesn’t know this trick continues to fight until it must flee (due to injury, a fear effect, or the like) or its opponent is defeated.\n\nEntertain (DC 25): The animal can dance, sing, or perform some other impressive and enjoyable trick to entertain those around it. At the command of its owner, the animal can attempt a Perform check (or a Charisma check if it has no ranks in Perform) to show off its talent. Willing onlookers or those who fail an opposed Sense Motive check take a –2 penalty on Perception checks to notice anything but the animal entertaining them. Once an onlooker observes an animal’s entertain trick, that creature cannot be distracted in this way by the same animal for 24 hours. Tricksters and con artists often teach their animals to perform this trick while they pickpocket viewers or sneak about unnoticed.\n\nExclusive (DC 20): The animal takes directions only from the handler who taught it this trick. If an animal has both the exclusive and serve tricks, it takes directions only from the handler that taught it the exclusive trick and those creatures indicated by the trainer’s serve command. An animal with the exclusive trick does not take trick commands from others even if it is friendly or helpful toward them (such as through the result of a charm animal spell), though this does not prevent it from being controlled by other enchantment spells (such as dominate animal), and the animal still otherwise acts as a friendly or helpful creature when applicable.\n\nFeint (DC 20): The companion is trained to feint against opponents. A companion must know the attack trick before it can be taught the feint trick, and it performs feints only against targets it would normally attack.\n\nFetch (DC 15): The animal goes and gets something. If you do not point out a specific item, the animal fetches a random object.\n\nFlank (DC 20): You can instruct an animal to attack a foe you point to and to always attempt to be adjacent to (and threatening) that foe. If you or an ally is also threatening the foe, the animal attempts to flank the foe, if possible. While animals following the attack trick will flank when convenient, this trick instructs them to flank even if doing so denies it a full attack or puts the animal companion at an inconvenience or at risk, such as from attacks of opportunity, dangerous positioning, or difficult terrain. The animal must know the attack trick before it can learn this trick, and it performs it only against foes it would normally attack.\n\nFlee (DC 20): The animal attempts to run away or hide as best it can, returning only when its handler commands it to do so. Until such a command is received, the animal does its best to track its handler and any accompanying creatures, remaining hidden but within range of its sight or hearing. This trick is particularly useful for adventurers and thieves in that it allows the animal to evade capture, and then return later to help free its friends.\n\nGet Help (DC 20): With this trick, a trainer can designate a number of creatures up to the animal’s Intelligence score as “help.” When the command is given, the animal attempts to find one of those creatures and bring it back to the handler, even if that means journeying a long distance to the last place it encountered the target creature.\n\nGuard (DC 20) The animal stays in place and prevents others from approaching.\n\nGuide (DC 15): The companion can serve as a guide to a character that is blinded or otherwise unable to see. While serving as a guide, the companion remains adjacent to the guided creature at all times, readying an action each round to move when that creature moves. This allows the guided creature to automatically succeed at Acrobatics checks to move at more than half speed while blinded. Additionally, the companion identifies obstacles in the guided creature’s path and pushes them, pulls them, or otherwise signals to the creature how to avoid them, allowing the guided creature to locate and move around obstacles such as hazards, opponents, and other terrain features as though she were able to see them (though she can’t distinguish between obstacles). Finally, while serving as a guide, the companion indicates to the guided creature the presence and direction of any adjacent allies, allowing the guided creature to pinpoint the locations of such creatures. The companion can serve as a guide only as long as it is able to see in some fashion, and its ability to detect and avoid creatures and obstacles is limited by what it is able to perceive normally.\n\nHeel (DC 15) The animal follows you closely, even to places where it normally wouldn’t go.\n\nHunt (DC 20): This trick allows an animal to use its natural stalking or foraging instincts to find food and return it to the animal’s handler. an animal with this trick can attempt Survival checks (or Wisdom checks, if the animal has no ranks in Survival) to provide food for others or lead them to water and shelter (as the “get along in the wild” use of the Survival skill). an animal with this trick can use the aid another action to grant a bonus on its handlers Survival checks for these purposes.\n\nIntimidate (DC 15): The companion bares its teeth, barks, bristles, growls, or otherwise threatens a creature you designate, or, alternatively, it can be trained to do so when it encounters any creature besides its handler. The companion takes a –4 penalty on Intimidate checks against creatures other than those with the animal or humanoid types unless it has also been trained to attack creatures of any type. A companion that knows this trick automatically uses the aid another action to assist Intimidate checks attempted by its handler, provided that it is within 15 feet of its handler at the time and has not been ordered to perform another task.\n\nManeuver (DC 20): The animal is trained to use a specific combat maneuver on command, even when it naturally wouldn’t do so (animals typically use combat maneuvers only when using a monster ability to make a free combat maneuver, since otherwise it would provoke an attack of opportunity). an animal must know the attack trick before it can be taught the maneuver trick, and it performs maneuvers only against targets it would normally attack. This trick can be taught to an animal multiple times. Each time it is taught, the animal can be commanded to use a different combat maneuver.\n\nMark Territory (DC 25): Whether by spraying musk, rubbing its back against trees and rocks, or simply howling loudly, the companion lets other nearby animals know that it has claimed an area. By spending 1 hour performing this trick, the companion can mark an area of up to half a square mile in this fashion. If it does so, after 24 hours, whenever there would be a random encounter within that area that involves a wild animal or other creature of Intelligence 2 or less (including vermin but not other mindless creatures, such as oozes and mindless undead), there is a 25% chance that the encounter doesn’t actually occur, as creatures might be warded off by the markings. The companion must renew any territorial markings at least once per week, or they lose their effectiveness. There is also a 10% chance per week that the markings attract the attention of a powerful predator, which actively seeks out the companion to challenge it (and its master) for the territory.\n\nMenace (DC 20): A menacing animal attempts to keep a creature you indicate from moving. It does its best to dissuade the target, but it attacks only if the target attempts to move from its present location or take any significant action (particularly a hostile-seeming action). As soon as the target stops moving, the animal ceases attacking but it continues to menace.\n\nMilk Venom (DC 20): The companion can be coaxed into providing a single dose of venom on command. This process takes 10 minutes, and it requires a vial or similar container in which to store the poison. A companion that has been specifically trained to be milked of its venom never bites, stings, or otherwise poisons its handler when being milked, although the handler must still succeed at a Handle Animal check to successfully harvest the venom. A companion must have the poison ability to be taught this trick.\n\nPerform (DC 15) The animal performs a variety of simple tricks, such as sitting up, rolling over, roaring or barking, and so on.\n\nPose as Scenery (DC 20): The companion freezes in place, seeming to be a mundane plant rather than a plant creature. The companion must have taken root in order to use this trick. It attempts a Disguise check with a +8 circumstance bonus, opposed by the Perception checks of observers. If it succeeds at the opposed check, the observer mistakes it for an ordinary, harmless plant. The companion must have the take root trick in order to learn this trick. Only plant companions can learn this trick.\n\nReceive Spell (DC 25): The companion has been trained to be the recipient of a specific spell (chosen at the time the animal is taught the trick), allowing it to fully take advantage of the spell’s effects. The spell should be one that grants the companion an ability it might not normally be intelligent enough to make use of or one that it might not even realize it has (such as air walk ). The companion is able to recognize when it has been affected by this spell and can take full advantage of the spell’s effects. At the GM’s discretion, a companion can also be trained to receive certain nonspell effects, such as those granted by an elixir of fire breathing. The companion can be taught this trick multiple times; each time it learns this trick, it becomes trained to utilize a different spell effect.\n\nRescue (DC 20): The companion has been trained to drag its handler or another creature that the handler designates out of danger and to a safe place in the event that the handler or creature is incapacitated. If a creature that the companion is defending is rendered helpless or is slain, the companion will carry, drag, or otherwise move that creature out of danger. If the companion knows the get help trick, it will attempt to bring the creature it is rescuing to one of the creatures designated as “help.” Otherwise, you can designate a single location in advance as a safe place, and the companion will attempt to bring the creature it is rescuing to that place. If it is unable to do either of these, the companion simply moves the creature to the nearest location of relative safety. A companion must have the deliver and guard tricks in order to learn this trick.\n\nSeek (DC 15) The animal moves into an area and looks around for anything that is obviously alive or animate.\n\nServe (DC 15): An animal with this trick willingly takes orders from a creature you designate. If the creature you tell the animal to serve knows what tricks the animal has, it can instruct the animal to perform these tricks using your Handle Animal bonus on the check instead of its own. The animal treats the designated ally as friendly. An animal can unlearn this trick with 1 week of training. This trick can be taught to an animal multiple times. Each time it is taught, the animal can serve an additional creature you designate.\n\nSneak (DC 15): The animal can be ordered to make Stealth checks in order to stay hidden and to continue using Stealth even when circumstances or its natural instincts would normally cause it to abandon secrecy.\n\nSpeak (DC 25): The companion is able to communicate very simple concepts through barks, gestures, whistles, or similar actions. The companion’s vocabulary is extremely limited, generally restricted to “yes,” “no,” and counting up to three. The companion is also able to recognize and respond to up to two specific questions per point of Intelligence. The companion does not so much understand the words as recognize the sound of them, and it responds accordingly. This trick does not actually increase the companion’s capacity to understand concepts and ideas; it can be taught a way to communicate the concept of “food,” for example, but it won’t distinguish cooked food from raw food, and it might not even recognize as food anything that is not part of its own diet. A companion must have an Intelligence score of 2 or higher to learn this trick.\n\nSpin Silk (DC 20): The companion can create strands of delicate yet incredibly strong silk. Harvesting the silk takes 10 minutes, and it can be done once per day. This silk functions identically to a silk rope. The companion can produce a total number of feet of silk equal to 10 times its Constitution score per day, which can be divided as the handler chooses in 10-foot increments. Silk produced in this way degrades into uselessness after 24 hours. Only companions with the web ability can learn this trick.\n\nStay (DC 15) The animal stays in place, waiting for you to return. It does not challenge other creatures that come by, though it still defends itself if it needs to.\n\nSubdue (DC 15): The companion can attempt to subdue opponents. Once the command is given, the companion makes all its natural attacks as nonlethal attacks (taking the typical –4 penalty on attack rolls when using normally lethal attacks) until ordered to do otherwise.\n\nTake Root (DC 15): The companion extends its roots into the soil beneath it, anchoring itself in place and drawing water and nutrients from the soil. Taking root is a full-round action that provokes attacks of opportunity. While rooted, the companion cannot move, but it can otherwise act normally and gains a +4 bonus to CMD to resist bull rush, drag, overrun, reposition, and trip attempts. If the companion remains rooted for at least 1 hour, it absorbs enough water and nutrients to feed itself for a day. A separate command causes the companion to uproot itself as a full-round action. The companion can take root only in areas of soft soil. Only plant companions can learn this trick.\n\nTrack (DC 20) The animal tracks the scent presented to it. (This requires the animal to have the scent ability)\n\nThrow Rider (DC 15): The animal can attempt to fling a creature riding it to the ground. Treat this as a trip combat maneuver that applies to all creatures riding the animal, and that does not provoke attacks of opportunity. An animal that knows the throw rider and exclusive tricks can be instructed to attempt to automatically throw anyone other than its trainer who attempts to ride it.\n\nWatch (DC 15): The animal can be commanded to keep watch over a particular area, such as a campsite, and to raise an alarm if it notices any dangerous or sizable creature entering the area.\n\nWithhold Venom (DC 20): The companion can be ordered to avoid injecting poison into creatures it strikes with whatever natural attack would normally deliver venom. As long as the companion has been ordered to withhold its venom, successful hits with that natural attack deal damage as normal and convey all other effects that they normally would, but they do not expose the target to the companion’s poison. Only companions with the poison special ability can learn this trick.\n\nWork (DC 15) The animal pulls or pushes a medium or heavy load.\n\nRather than teaching an animal individual tricks, you can simply train it for a general purpose. Essentially, an animal’s purpose represents a preselected set of known tricks that fit into a common scheme, such as guarding or heavy labor. The animal must meet all the normal prerequisites for all tricks included in the training package. If the package includes more than three tricks, the animal must have an Intelligence score of 2.\n\nAn animal can be trained for only one general purpose, though if the creature is capable of learning additional tricks (above and beyond those included in its general purpose), it may do so. Training an animal for a purpose requires fewer checks than teaching individual tricks does, but no less time.\n\nAir Support (DC 20): An animal trained in air support knows the attack, bombard, and deliver tricks.\n\nBurglar (DC 25): An animal trained as a burglar knows the come, fetch, maneuver (steal), seek, and sneak tricks. You can order it to steal a specific item you point out.\n\nCombat Training (DC 20) An animal trained to bear a rider into combat knows the tricks attack, come, defend, down, guard, and heel. Training an animal for combat riding takes 6 weeks. You may also “upgrade” an animal trained for riding to one trained for combat by spending 3 weeks and making a successful DC 20 Handle Animal check. The new general purpose and tricks completely replace the animal’s previous purpose and any tricks it once knew. Many horses and riding dogs are trained in this way.\n\nFighting (DC 20) An animal trained to engage in combat knows the tricks attack, down, and stay. Training an animal for fighting takes three weeks.\n\nGuarding (DC 20) An animal trained to guard knows the tricks attack, defend, down, and guard. Training an animal for guarding takes four weeks.\n\nHeavy Labor (DC 15) An animal trained for heavy labor knows the tricks come and work. Training an animal for heavy labor takes two weeks.\n\nHunting (DC 20) An animal trained for hunting knows the tricks attack, down, fetch, heel, seek, and track. Training an animal for hunting takes six weeks.\n\nLiberator (DC 25): An animal trained in liberating knows the break out, flee, and get help tricks.\n\nPerformance (DC 15) An animal trained for performance knows the tricks come, fetch, heel, perform, and stay. Training an animal for performance takes five weeks.\n\nRiding (DC 15) An animal trained to bear a rider knows the tricks come, heel, and stay. Training an animal for riding takes three weeks.\n\nServant (DC 20): An animal trained as a servant knows the deliver, exclusive, and serve tricks.\n\nRear a Wild Animal: To rear an animal means to raise a wild creature from infancy so that it becomes domesticated. A handler can rear as many as three creatures of the same kind at once.\n\nA successfully domesticated animal can be taught tricks at the same time it’s being raised, or it can be taught as a domesticated animal later.",
// id: 11,
// untrained: false,
// customizable: false,
// knowledge: false,
// blurb: "You are trained at working with animals, and can teach • them tricks, get them to follow your simple commands, or\neven domesticate them.",
// action: "Varies. Handling an animal is a move action, while “pushing” an animal is a full-round action. (A druid or ranger can handle an animal companion as a free action or push it as a move action.) For tasks with specific time frames noted above, you must spend half this time (at the rate of 3 hours per day per animal being handled) working toward completion of the task before you attempt the Handle Animal check. If the check fails, your attempt to teach, rear, or train the animal fails and you need not complete the teaching, rearing, or training time. If the check succeeds, you must invest the remainder of the time to complete the teaching, rearing, or training. If the time is interrupted or the task is not followed through to completion, the attempt to teach, rear, or train the animal automatically fails.",
// try_again: "Yes, except for rearing an animal.",
// special: "You can use this skill on a creature with an Intelligence score of 1 or 2 that is not an animal, but the DC of any such check increases by 5. Such creatures have the same limit on tricks known as animals do.\n\nA druid or ranger gains a +4 circumstance bonus on Handle Animal checks involving an animal companion.\n\nIn addition, a druid’s or ranger’s animal companion knows one or more bonus tricks, which don’t count against the normal limit on tricks known and don’t require any training time or Handle Animal checks to teach.\n\nIf you have no ranks in Handle Animal, you can use a Charisma check to handle and push domestic animals, but you can’t teach, rear, or train animals. A druid or ranger with no ranks in Handle Animal can use a Charisma check to handle and push her animal companion, but she can’t teach, rear, or train other nondomestic animals.",
// skill_unlock_5: "Creatures you have trained gain a +2 bonus on Will saves when adjacent to you.",
// skill_unlock_10: "Creatures you have trained gain a +2 bonus on Will saves whenever you are within 30 feet and clearly visible. You can teach a trick in 1 day by increasing the DC by 20.",
// skill_unlock_15: "You can train an animal to understand your speech (as speak with animals) with 1 week of effort and a successful DC 30 Handle Animal check. Its actions are still limited by its Intelligence. You can teach a trick in 1 day (increasing the DC by 10) or 1 hour (increasing the DC by 20).",
// skill_unlock_20: "You can make your speech understandable to any animal for 24 hours with a successful DC 30 Handle Animal check (DC 40 for magical beasts or vermin). You can teach a trick in 1 day, 1 hour (increasing the DC by 10), or 1 minute (increasing the DC by 20)."
// },
// {
// name: "Heal",
// ability_score: "Wisdom",
// description: "The DC and effect of a Heal check depend on the task you attempt.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Heal DC</th>\n  </tr>\n  <tr>\n    <td>First Aid</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Long-Term Care</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Wounds from Caltrops, spike growth, or spike stones</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Treat Deadly Wounds</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Treat Poison</td>\n    <td>Poison's Save DC</td>\n  </tr>\n  <tr>\n    <td>Treat Disease</td>\n    <td>Disease's Save DC</td>\n  </tr>\n</table>\n\nFirst Aid: You usually use first aid to save a dying character. If a character has negative hit points and is losing hit points (at the rate of 1 per round, 1 per hour, or 1 per day), you can make him stable. A stable character regains no hit points but stops losing them. First aid also stops a character from losing hit points due to effects that cause bleed.\n\nLong-Term Care: Providing long-term care means treating a wounded person for a day or more. If your Heal check is successful, the patient recovers hit points or ability score points lost to ability damage at twice the normal rate: 2 hit points per level for a full 8 hours of rest in a day, or 4 hit points per level for each full day of complete rest; 2 ability score points for a full 8 hours of rest in a day, or 4 ability score points for each full day of complete rest.\n\nYou can tend to as many as six patients at a time. You need a few items and supplies (bandages, salves, and so on) that are easy to come by in settled lands. Giving long-term care counts as light activity for the healer. You cannot give long-term care to yourself.\n\nTreat Wounds from Caltrops, Spike Growth, or Spike Stones: A creature wounded by stepping on a caltrop moves at half normal speed. A successful Heal check removes this movement penalty.\n\nA creature wounded by a spike growth or spike stones spell must succeed on a Ref lex save or take injuries that reduce his speed by one-third. Another character can remove this penalty by taking 10 minutes to dress the victim’s injuries and succeeding on a Heal check against the spell’s save DC.\n\nTreat Deadly Wounds: When treating deadly wounds, you can restore hit points to a damaged creature. Treating deadly wounds restores 1 hit point per level of the creature. If you exceed the DC by 5 or more, add your Wisdom modifier (if positive) to this amount. A creature can only benefit from its deadly wounds being treated within 24 hours of being injured and never more than once per day. You must expend two uses from a healer’s kit to perform this task. You take a –2 penalty on your Heal skill check for each use from the healer’s kit that you lack.\n\nTreat Poison: To treat poison means to tend to a single character who has been poisoned and who is going to take more damage from the poison (or suffer some other effect). Every time the poisoned character makes a saving throw against the poison, you make a Heal check. If your Heal check exceeds the DC of the poison, the character receives a +4 competence bonus on his saving throw against the poison.\n\nTreat Disease: To treat a disease means to tend to a single diseased character. Every time the diseased character makes a saving throw against disease effects, you make a Heal check. If your Heal check exceeds the DC of the disease, the character receives a +4 competence bonus on his saving throw against the disease.",
// id: 12,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at tending to wounds and ailments.",
// action: "Providing first aid, treating a wound, or treating poison is a standard action. Treating a disease or tending a creature wounded by a spike growth or spike stones spell takes 10 minutes of work. Treating deadly wounds takes 1 hour of work. Providing long-term care requires 8 hours of light activity.",
// try_again: "Varies. Generally speaking, you can’t try a Heal check again without witnessing proof of the original check’s failure. You can always retry a check to provide first aid, assuming the target of the previous attempt is still alive.",
// special: "A healer’s kit gives you a +2 circumstance bonus on Heal checks.",
// skill_unlock_5: "When you treat deadly wounds, the target recovers hit points and ability damage as if it had rested for a full day.",
// skill_unlock_10: "When you treat deadly wounds, the target recovers hit points as if it had rested for a full day with long-term care.",
// skill_unlock_15: "When you treat deadly wounds, the creature recovers hit point and ability damage as if it had rested for 3 days.",
// skill_unlock_20: "When you treat deadly wounds, the target recovers hit point and ability damage as if it had rested for 3 days with long-term care."
// },
// {
// name: "Intimidate",
// ability_score: "Charisma",
// description: "You can use Intimidate to force an opponent to act friendly toward you for 1d6 × 10 minutes with a successful check. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If successful, the target gives you the information you desire, takes actions that do not endanger it, or otherwise offers limited assistance. After the Intimidate expires, the target treats you as unfriendly and may report you to local authorities. If you fail this check by 5 or more, the target attempts to deceive you or otherwise hinder your activities.\n\nDemoralize: You can use this skill to cause an opponent to become shaken for a number of rounds. The DC of this check is equal to 10 + the target’s Hit Dice + the target’s Wisdom modifier. If you are successful, the target is shaken for 1 round. This duration increases by 1 round for every 5 by which you beat the DC. You can only threaten an opponent in this way if it is within 30 feet and can clearly see and hear you. Using demoralize on the same creature only extends the duration; it does not create a stronger fear condition.",
// id: 13,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You can use this skill to frighten your opponents or to get them to act in a way that benefits you. This skill includes verbal threats and displays of prowess.",
// action: "Using Intimidate to change an opponent’s attitude requires 1 minute of conversation. Demoralizing an opponent is a standard action.",
// try_again: "You can attempt to Intimidate an opponent again, but each additional check increases the DC by +5. This increase resets after 1 hour has passed.",
// special: "You also gain a +4 bonus on Intimidate checks if you are larger than your target and a –4 penalty on Intimidate checks if you are smaller than your target.",
// skill_unlock_5: "If you exceed the DC to demoralize a target by at least 10, it is frightened for 1 round and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened condition, but the target is still shaken, even if it has the stalwart ability.",
// skill_unlock_10: "If you exceed the DC to demoralize a target by at least 10, it is panicked for 1 round or frightened for 1d4 rounds (your choice) and shaken thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the frightened or panicked condition, but the target is still shaken, even if it has the stalwart ability.",
// skill_unlock_15: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1 round or panicked for 1d4 rounds (your choice) and frightened thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering, panicked, and frightened conditions, but the target is still shaken, even if it has the stalwart ability.",
// skill_unlock_20: "If you exceed the DC to demoralize a target by at least 20, it is cowering for 1d4 rounds and panicked thereafter. A Will save (DC = 10 + your number of ranks in Intimidate) negates the cowering and panicked conditions, but the target is still shaken, even if it has the stalwart ability."
// },
// {
// name: "Investigation",
// ability_score: "Intelligence",
// description: "",
// id: 39,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "",
// action: "",
// try_again: "",
// special: "",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Knowledge",
// ability_score: "Intelligence",
// description: "Arcana (ancient mysteries, magic traditions, arcane symbols, constructs, dragons, magical beasts)\n\nDungeoneering (aberrations, caverns, oozes, spelunking)\n\nEngineering (buildings, aqueducts, bridges, fortifications)\n\nGeography (lands, terrain, climate, people)\n\nHistory (wars, colonies, migrations, founding of cities)\n\nLocal (legends, personalities, inhabitants, laws, customs, traditions, humanoids)\n\nNature (animals, fey, monstrous humanoids, plants, seasons and cycles, weather, vermin)\n\nNobility (lineages, heraldry, personalities, royalty)\n\nPlanes (the Inner Planes, the Outer Planes, the Astral Plane, the Ethereal Plane, outsiders, planar magic)\n\nReligion (gods and goddesses, mythic history, ecclesiastic tradition, holy symbols, undead)\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Many of the Knowledge skills have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Knowledge Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Identify Auras While Using Detect Magic</td>\n    <td>Arcana</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell Effect That Is In Place</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify Materials Manufactured by Magic</td>\n    <td>Arcana</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell That Just Targeted You</td>\n    <td>Arcana</td>\n    <td>25 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify the Spells Cast Using a Specific Material Component</td>\n    <td>Arcana</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Underground Hazard</td>\n    <td>Dungeoneering</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify Mineral, Stone, or Metal</td>\n    <td>Dungeoneering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Slope</td>\n    <td>Dungeoneering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Depth Underground</td>\n    <td>Dungeoneering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Dangerous Construction</td>\n    <td>Engineering</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Style or Age</td>\n    <td>Engineering</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine a Structure's Weakness</td>\n    <td>Engineering</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Ethnicity or Accent</td>\n    <td>Geography</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Regional Terrain Features</td>\n    <td>Geography</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Location of Nearest Community or Noteworthy Site</td>\n    <td>Geography</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Recent or Historically Significant Date</td>\n    <td>History</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Approximate Date of Specific Event</td>\n    <td>History</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Obscure or Ancient Historical Event</td>\n    <td>History</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Local Laws, Rulers, and Popular Locations</td>\n    <td>Local</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know a Common Rumor or Local Tradition</td>\n    <td>Local</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Hidden Organizations, Rulers, and Locations</td>\n    <td>Local</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify Natural Hazard</td>\n    <td>Nature</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify a Common Plant or Animal</td>\n    <td>Nature</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Unnatural Weather Phenomenon</td>\n    <td>Nature</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Artifical Nature of Feature</td>\n    <td>Nature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Current Rulers and Their Symbols</td>\n    <td>Nobility</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Proper Etiquette</td>\n    <td>Nobility</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Line of Succession</td>\n    <td>Nobility</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know the Names of the Planes</td>\n    <td>Planes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Current Plane</td>\n    <td>Planes</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Planar Origin</td>\n    <td>Planes</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Recognize a Common Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Common Mythology and Tenets</td>\n    <td>Religion</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize an Obscure Deity's Symbol or Clergy</td>\n    <td>Religion</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>Varies</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
// id: 24,
// untrained: false,
// customizable: true,
// knowledge: true,
// blurb: "You are educated in a field of study and can answer both simple and complex questions. Like the Craft, Perform, and Profession skills, Knowledge actually encompasses a number of different specialties.",
// action: "Usually none. In most cases, a Knowledge check doesn’t take an action.",
// try_again: "No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
// special: "You cannot make an untrained Knowledge check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Knowledge checks in the fields that they cover.",
// skill_unlock_5: "When you successfully identify a creature, you gain one additional piece of information for every 5 ranks you possess in that Knowledge skill.",
// skill_unlock_10: "When you successfully identify a creature, you gain a +1 competence bonus on attack rolls, opposed ability checks, skill checks, and caster level checks against creatures of that kind (e.g., glabrezu demons, but not other demons or evil outsiders) for 1 minute. This bonus increases by 1 for every 5 ranks beyond 10 you possess in that Knowledge skill.",
// skill_unlock_15: "When you fail a Knowledge check, you can reroll the check at a –10 penalty. The competence bonus above also applies to saving throws against exceptional, spell-like, or supernatural abilities used by creatures you identify.",
// skill_unlock_20: "Whenever you attempt a Knowledge check, you can roll twice and take the better result."
// },
// {
// name: "Linguistics",
// ability_score: "Intelligence",
// description: "You can decipher writing in an unfamiliar language or a message written in an incomplete or archaic form. The base DC is 20 for the simplest messages, 25 for standard texts, and 30 or higher for intricate, exotic, or very old writing. If the check succeeds, you understand the general content of a piece of writing about one page long (or the equivalent). If the check fails, make a DC 5 Wisdom check to see if you avoid drawing a false conclusion about the text. (Success means that you do not draw a false conclusion; failure means that you do.)\n\nBoth the Linguistics check and (if necessary) the Wisdom check are made secretly by the GM, so that you can’t tell whether the conclusion you draw is true or false.\n\n<table>\n  <tr>\n    <th>Condition</th>\n    <th>Linguistics Check Modifier</th>\n  </tr>\n  <tr>\n    <td>Type of Document is Unknown to Reader</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Type of Document is Somewhat Known to Reader</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>Type of Document is Well Known to Reader</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Handwriting Not Known to Reader</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Handwriting Somewhat Known to Reader</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>Handwritin Intimately Known to Reader</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Reader Only Casually Reviews Document</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Document Contradicts Orders or Knowledge</td>\n    <td>+2</td>\n  </tr>\n</table>\n\nCreate or Detect Forgeries: Forgery requires writing materials appropriate to the document being forged. To forge a document on which the handwriting is not specific to a person, you need only to have seen a similar document before, and you gain a +8 bonus on your check. To forge a signature, you need an autograph of that person to copy, and you gain a +4 bonus on the check. To forge a longer document written in the hand of some particular person, a large sample of that person’s handwriting is needed.\n\nThe Linguistics check is made secretly, so that you’re not sure how good your forgery is. As with Disguise, you don’t make a check until someone examines the work. Your Linguistics check is opposed by the Linguistics check of the person who examines the document to verify its authenticity. The examiner gains modifiers if any of the conditions are listed on the table above.\n\nLearn a Language: Whenever you put a rank into this skill, you learn to speak and read a new language. Common languages (and their typical speakers) include the following.\n\nAbyssal (demons and other chaotic evil outsiders)\n\nAklo (derros, inhuman or otherworldly monsters, evil fey)\n\nAquan (aquatic creatures, water-based creatures)\n\nAuran (f lying creatures, air-based creatures)\n\nCelestial (angels and other good outsiders)\n\nCommon (humans and the core races)\n\nDraconic (dragons, reptilian humanoids)\n\nDruidic (druids only)\n\nDwarven (dwarves)\n\nElven (elves, half-elves)\n\nGiant (cyclopses, ettins, giants, ogres, trolls)\n\nGnome (gnomes)\n\nGoblin (bugbears, goblins, hobgoblins)\n\nGnoll (gnolls)\n\nHalf ling (half lings)\n\nIgnan (f ire-based creatures)\n\nInfernal (devils and other lawful evil outsiders)\n\nOrc (orcs, half-orcs)\n\nSylvan (centaurs, fey creatures, plant creatures, unicorns)\n\nTerran (earth-based creatures)\n\nUndercommon (drow, duergar, morlocks, svirfneblin)\n\nRead Lips: Any PC may learn to read lips with a rank in Linguistics as if they had learned a new language. When reading the lips of a speaking creature within 10 feet in normal lighting conditions, the reader need not make any skill checks. In situations of dim lighting, extreme distances, or to read the lips of someone trying to hide their words from the reader, the reader must make Perception checks (DC determined by the GM based on the situation). A lip reader may only understand spoken words in a language it knows.",
// id: 25,
// untrained: false,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at working with language, in both its spoken and written forms. You can speak multiple languages, and can decipher nearly any tongue given enough time. Your skill in writing allows you to create and detect forgeries as well.",
// action: "Varies. Deciphering a page of ordinary text takes 1 minute (10 consecutive rounds). Creating a forgery can take anywhere from 1 minute to 1d4 minutes per page. Detecting a forgery using Linguistics takes 1 round of examination per page.",
// try_again: "Yes.",
// special: "You must be trained to use this skill, but you can always attempt to read archaic and strange forms of your own racial bonus languages. In addition, you can also always attempt to detect a forgery.",
// skill_unlock_5: "You can use Linguistics instead of Sense Motive to intercept and interpret secret messages (as the Bluff skill). You gain a +1 insight bonus on Perception and Disable Device checks to detect or disarm written magical traps. This bonus increases by 1 for every 5 ranks beyond 5 you possess in Linguistics.",
// skill_unlock_10: "If you succeed at a Linguistics check by at least 10 when examining writing, you can learn the precise meaning rather than general content, and you never draw false conclusions on a failed check. A successful DC 30 Linguistics check reveals the general meaning of speech, a successful DC 35 check reveals 1d4 pieces of specific information, and a successful DC 40 check reveals exact meaning.",
// skill_unlock_15: "You can decipher magical writings (as read magic) by succeeding at a Linguistics check (DC = 25 + caster level). If you identify a written magical trap in this way, you gain a +2 circumstance bonus on Disable Device checks to disarm it.",
// skill_unlock_20: "You can attempt to decipher magical or non-magical text at a rate of one page per round. If you instead spend 1 minute per page, roll twice and take the better result."
// },
// {
// name: "Nature",
// ability_score: "Intelligence",
// description: "Dungeoneering includes aberrations, caverns, oozes, spelunking. Geography includes lands, terrain, climate, people. Used for astronomy. Nature includes animals, fey, monstrous humanoids, plants, seasons and cycles, weather, vermin.\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Nature can have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Nature DC</th>\n  </tr>\n  <tr>\n    <td>Identify Underground or Natural Hazard</td>\n    <td>15 + Hazard's CR</td>\n  </tr>\n  <tr>\n    <td>Identify Mineral, Stone, or Metal</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Ethnicity or Accent</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify a Common Plant or Animal</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Slope</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize Regional Terrain Features</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify Unnatural Weather Phenomenon</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Depth Underground</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Location of Nearest Community or Noteworthy Site</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine Artifical Nature of Feature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
// id: 38,
// untrained: true,
// customizable: false,
// knowledge: true,
// blurb: "This skill is from the Pathfinder Unchained material, and represent a combination of the skills Knowledge (dungeoneering), Knowledge (geography), and Knowledge (nature). The text below outlines a consolidation of those skills' features with minimal edits.",
// action: "Usually none. In most cases, a Nature check doesn’t take an action.",
// try_again: "No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
// special: "You cannot make an untrained Nature check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Nature checks in the fields that they cover.",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Perception",
// ability_score: "Wisdom",
// description: "Perception has a number of uses, the most common of which is an opposed check versus an opponent’s Stealth check to notice the opponent and avoid being surprised. If you are successful, you notice the opponent and can react accordingly. If you fail, your opponent can take a variety of actions, including sneaking past you and attacking you.\n\nPerception is also used to notice fine details in the environment. The DC to notice such details varies depending upon distance, the environment, and how noticeable the detail is. The following table gives a number of guidelines.\n\n<table>\n  <tr>\n    <th>Detail</th>\n    <th>Perception DC</th>\n  </tr>\n  <tr>\n    <td>Hear the Sound of Battle</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Notice the Stench of Rotting Garbage</td>\n    <td>-10</td>\n  </tr>\n  <tr>\n    <td>Detect the Smell of Smoke</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Conversation</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Notice a Visible Creature</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Determine if Food is Spoiled</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Creature Walking</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Hear the Details of a Whispered Conversation</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Find the Average Concealed Door</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Hear the Sound of a Key Being Turned in a Lock</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Find the Average Secret Door</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Hear a Bow Being Drawn</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Sense a Burrowing Creature Underneath You</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Notice a Pickpocket</td>\n    <td>Opposed by Sleight of Hand</td>\n  </tr>\n  <tr>\n    <td>Notice a Creature Using Stealth</td>\n    <td>Opposed by Stealth</td>\n  </tr>\n  <tr>\n    <td>Find a Hidden Trap</td>\n    <td>Varies by Trap</td>\n  </tr>\n  <tr>\n    <td>Identify the Powers of a Potion through Taste</td>\n    <td>15 + Potion's Caster Level</td>\n  </tr>\n</table>\n\n<table>\n  <tr>\n    <th>Perception Modifiers</th>\n    <th>DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Distance to the Source, Object, or Creature</td>\n    <td>+1 per 10 Feet</td>\n  </tr>\n  <tr>\n    <td>Through a Closed Door</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Through a Wall</td>\n    <td>+10 per Foot</td>\n  </tr>\n  <tr>\n    <td>Favorable Conditions</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>Unfavorable Conditions</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>Terrible Conditions</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Distracted</td>\n    <td>+5</td>\n  </tr>\n  <tr>\n    <td>Creature Making the Check is Asleep</td>\n    <td>+10</td>\n  </tr>\n  <tr>\n    <td>Creature or Object is Invisible</td>\n    <td>+20</td>\n  </tr>\n</table>",
// id: 26,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "Your senses allow you to notice fine details and alert you to danger. Perception covers all five senses, including sight, hearing, touch, taste, and smell.",
// action: "Most Perception checks are reactive, made in response to observable stimulus. Intentionally searching for stimulus is a move action.",
// try_again: "Yes. You can try to sense something you missed the first time, so long as the stimulus is still present.",
// special: "Creatures with the scent special quality have a +8 bonus on Perception checks made to detect a scent. Creatures with the tremorsense special quality have a +8 bonus on Perception checks against creatures touching the ground and automatically make any such checks within their range.",
// skill_unlock_5: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping is halved. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 20 feet.",
// skill_unlock_10: "The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 30 feet. In addition, you gain a +5 bonus on Perception checks to notice or locate an invisible creature or object.",
// skill_unlock_15: "You remain alert to sounds even in your sleep, and the normal DC increase to Perception checks when you are sleeping doesn’t apply to you. The distance modifier on the DC of your Perception checks is reduced to +1 per 40 feet.",
// skill_unlock_20: "You gain a +10 bonus on Perception checks to notice invisible creatures or objects. The distance modifier on the DC of Perception checks you attempt is reduced to +1 per 60 feet."
// },
// {
// name: "Perform",
// ability_score: "Charisma",
// description: "You can impress audiences with your talent and skill in your chosen performance type.\n\n<table>\n  <tr>\n    <th>Perform DC</th>\n    <th>Performance</th>\n  </tr>\n  <tr>\n    <td>10</td>\n    <td>Routine performance. Trying to earn money by playing in public is akin to begging. You can earn 1d10 cp/day.</td>\n  </tr>\n  <tr>\n    <td>15</td>\n    <td>Enjoyable performance. In a prosperous city, you can earn 1d10 sp/day.</td>\n  </tr>\n  <tr>\n    <td>20</td>\n    <td>Great performance. In a prosperous city, you can earn 3d10 sp/day. In time, you may be invited to join a professional troupe and may develop a regional reputation.</td>\n  </tr>\n  <tr>\n    <td>25</td>\n    <td>Memorable performance. In a prosperous city, you can earn 1d6 gp/day. In time, you may come to the attention of noble patrons and develop a national reputation.</td>\n  </tr>\n  <tr>\n    <td>30</td>\n    <td>Extraordinary performance. In a prosperous city, you can earn 3d6 gp/day. In time, you may draw attention from distant patrons, or even from extraplanar beings.</td>\n  </tr>\n</table>\n\nA masterwork musical instrument gives you a +2 circumstance bonus on all Perform checks that involve its use.\n\nIn addition to being able to put on a show, a performer knows the prominent works of their chosen type of performance.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Perform Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Mimic the Style of a Famous Performer</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recall or Recognize All the Notes, Lyrics, or Lines of a Popular Work</td>\n    <td>Varies</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recall or Recognize All the Notes, Lyrics, or Lines of an Obscure Work</td>\n    <td>Varies</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Improvise a Routine on a Specific Subject</td>\n    <td>Act, Comedy, Oratory, or Sing</td>\n    <td>20</td>\n  </tr>\n</table>",
// id: 27,
// untrained: true,
// customizable: true,
// knowledge: false,
// blurb: "You are skilled at one form of entertainment, from singing to acting to playing an instrument. Like Craft, Knowledge, and Profession, Perform is actually a number of separate skills. You could have several Perform skills, each with its own ranks.\n\nEach of the nine categories of the Perform skill includes a variety of methods, instruments, or techniques, a small sample of which is provided for each category below.\n\nAct (comedy, drama, pantomime)\n\nComedy (buffoonery, limericks, joke-telling)\n\nDance (ballet, waltz, jig)\n\nKeyboard instruments (harpsichord, piano, pipe organ)\n\nOratory (epic, ode, storytelling)\n\nPercussion instruments (bells, chimes, drums, gong)\n\nString instruments (fiddle, harp, lute, mandolin)\n\nWind instruments (flute, pan pipes, recorder, trumpet)\n\nSing (ballad, chant, melody)",
// action: "Varies. Trying to earn money by playing in public requires anywhere from an evening’s work to a full day’s performance. The bard’s special Perform-based abilities are described in that class’s description.",
// try_again: "Yes. Retries are allowed, but they don’t negate previous failures, and an audience that has been unimpressed in the past is likely to be prejudiced against future performances. (Increase the DC by 2 for each previous failure.)",
// special: "A bard must have ranks in specific Perform categories to use some of his Bardic Performance abilities.",
// skill_unlock_5: "Whenever you attempt a Bluff, Diplomacy, Handle Animal, or Intimidate check, you can attempt a DC 20 Perform check to gain a +2 circumstance bonus on the check.",
// skill_unlock_10: "Whenever you cast a spell with the emotion or language-dependent descriptor, you can attempt a DC 25 Perform check to increase the save DC by 1.",
// skill_unlock_15: "Whenever you cast a spell with the emotion or language-dependent descriptor, you can attempt a DC 30 Perform check to increase your caster level by 1. You must choose whether to use this ability or the ability unlocked at 10 ranks when casting the spell.",
// skill_unlock_20: "Choose one of the following skills: Bluff, Diplomacy, or Intimidate. When you attempt a skill check with that skill, you can also attempt a Perform check and use the better result to determine the success of that skill check."
// },
// {
// name: "Profession",
// ability_score: "Wisdom",
// description: "You can earn half your Profession check result in gold pieces per week of dedicated work. You know how to use the tools of your trade, how to perform the profession’s daily tasks, how to supervise helpers, and how to handle common problems. You can also answer questions about your Profession. Basic questions are DC 10, while more complex questions are DC 15 or higher.\n\nA profession often encompasses many smaller areas of expertise, and these auxiliary skills can come in handy in situations beyond just making money or answering trade-specific questions. Below are some sample additional uses for Profession skills, and GMs are encouraged to create their own.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Profession Skill</th>\n    <th>DC</th>\n  </tr>\n  <tr>\n    <td>Determine Hardness and Hit Points of a Structure</td>\n    <td>Architect or Engineer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Prepare Trail Rations (Takes 1 Hour Per Day's Worth of Rations)</td>\n    <td>Baker or Cook</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Obtain a Legal Permit</td>\n    <td>Barrister or Clerk</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Get Somone Released From Jail Who Has Been Imprisoned for a Minor Crime</td>\n    <td>Barrister</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Ask a Special Favor From a Judge (Such as Arresting Someone)</td>\n    <td>Barrister</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Brew Alcohol of Exceptional Quality</td>\n    <td>Brewer</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in a Beverage</td>\n    <td>Brewer</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Skin an Animal and Tan the Hide</td>\n    <td>Butcher, Shepherd, or Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Slaughter and Butcher an Animal</td>\n    <td>Butcher, Cook, or Shepherd</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Reduce a Legal Fine or Tax By Half the Result of the Check in gp (up to 75%)</td>\n    <td>Clerk</td>\n    <td>20+</td>\n  </tr>\n  <tr>\n    <td>Cook a Meal of Exceptional Quality</td>\n    <td>Cook</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Notice Poison in Food</td>\n    <td>Cook</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Find Potential Clients within an Establishment or Large Group</td>\n    <td>Courtesan</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Continue Steering a Vehicle When You Take Damage</td>\n    <td>Driver or Sailor</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Take Cover (As The Ride Skill) While Steering a Vehicle</td>\n    <td>Driver or Sailor</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Non-Creature Plant</td>\n    <td>Farmer or Gardener</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Rejuvinate Dying Plants</td>\n    <td>Farmer or Gardener</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Provide 1 Day's Worth of Food for Yourself and Others in the Wild</td>\n    <td>Fisherman or Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recall the Rules of a Game of Chance</td>\n    <td>Gambler</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Get a Hunch Regarding Whether a Game is Rigged</td>\n    <td>Gambler</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Reduce an Average or Lower Cost of Living by 50%</td>\n    <td>Innkeeper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Sate Hunger or Thirst for 1 Day</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Common Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Medicinal Herbs</td>\n    <td>Herbalist</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Aid Another on a Knowledge Check Using Reference Material</td>\n    <td>Librarian</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Recall the Name of a Rare Book</td>\n    <td>Librarian</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Determine Where an Item was Manufactured</td>\n    <td>Merchant</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Recall Where a Common Good Fetches a Higher Price</td>\n    <td>Merchant</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child</td>\n    <td>Midwife</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Safely Deliver a Child Despite Complications</td>\n    <td>Midwife</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Grind a Small Piece of Nonmagical Substance into Powder</td>\n    <td>Miller</td>\n    <td>10 + Hardness</td>\n  </tr>\n  <tr>\n    <td>Identify Common Metal or Semiprecious Stone</td>\n    <td>Miner</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Identify Rare Metal or Precious Gem</td>\n    <td>Miner</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking a Stone or Metal Object</td>\n    <td>Miner</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Increase Carrying Capacity for 8 Hours as if Strength were 2 Higher</td>\n    <td>Porter</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Unload a Vessel in Half the Normal Time</td>\n    <td>Porter</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Navigate a Ship in Fair Conditions</td>\n    <td>Sailor</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Pilot a Ship Safely Through a Hazardous Seaway</td>\n    <td>Sailor</td>\n    <td>25+</td>\n  </tr>\n  <tr>\n    <td>Determine Which Scribe Wrote a Document</td>\n    <td>Scribe</td>\n    <td>10+</td>\n  </tr>\n  <tr>\n    <td>Copy a Document (30 Minutes per Page; Requires a Blank Book)</td>\n    <td>Scribe</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Illuminate a Manuscript (1 Hour per Page)</td>\n    <td>Scribe</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Woolen Textiles</td>\n    <td>Shepherd</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Determine Whether a Weapon or Armor is of Masterwork Quality</td>\n    <td>Soldier</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Estimate the Size of a Military Force</td>\n    <td>Soldier</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify Advantages and Disadvantages of a Military Formation</td>\n    <td>Soldier</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Keep Horses Fed in the Wild</td>\n    <td>Stable Master</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Fit or Remove Barding in Half the Normal Time</td>\n    <td>Stable Master</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Recognize Damaged or Sabotaged Horse Tack</td>\n    <td>Stable Master</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Determine the Quality of Leatherwork (and Tell If It's Masterwork Quality)</td>\n    <td>Tanner</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Aid Another on an Skill Check to Get Out of a Trap or Snare</td>\n    <td>Trapper</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Reset a Trap in Half the Normal Amount of Time</td>\n    <td>Trapper</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Scavenge Wood Suitable for Campfire or Shelter</td>\n    <td>Woodcutter</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Ignore Half Hardness When Attacking Wooden Object</td>\n    <td>Woodcutter</td>\n    <td>20</td>\n  </tr>\n</table>",
// id: 28,
// untrained: false,
// customizable: true,
// knowledge: false,
// blurb: "You are skilled at a specific job. Like Craft, Knowledge, and Perform, Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. While a Craft skill represents ability in creating an item, a Profession skill represents an aptitude in a vocation requiring a broader range of less specific knowledge. The most common Profession skills are architect, baker, barrister, brewer, butcher, clerk, cook, courtesan, driver, engineer, farmer, f isherman, gambler, gardener, herbalist, innkeeper, librarian, merchant, midwife, miller, miner, porter, sailor, scribe, shepherd, stable master, soldier, tanner, trapper, and woodcutter.",
// action: "Not applicable. A single check generally represents a week of work.",
// try_again: "Varies. An attempt to use a Profession skill to earn income cannot be retried. You are stuck with whatever weekly wage your check result brought you. Another check may be made after a week to determine a new income for the next period of time. An attempt to accomplish some specific task can usually be retried.",
// special: "Untrained laborers and assistants (that is, characters without any ranks in Profession) earn an average of 1 silver piece per day.",
// skill_unlock_5: "When using Profession checks to earn income, you earn gold pieces equal to the result of your check each week.",
// skill_unlock_10: "When attempting Profession checks, you can roll twice and take the better result. When answering questions about your Profession, you can always take 10.",
// skill_unlock_15: "You can attempt checks to earn income once per day instead of once per week.",
// skill_unlock_20: "When attempting Profession checks, you can choose to roll once instead of twice. If you do and the result of the roll is less than 10, replace it with 10. When answering questions about your Profession, you can always take 20."
// },
// {
// name: "Religion",
// ability_score: "Intelligence",
// description: "Planes includes the Inner Planes, the Outer Planes, the Astral Plane, the Ethereal Plane, outsiders, planar magic. Religion includes gods and goddesses, mythic history, ecclesiastic tradition, holy symbols, undead.\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Religion can have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Religion DC</th>\n  </tr>\n  <tr>\n    <td>Know the Names of the Planes</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize a Common Deity's Symbol or Clergy</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Recognize Current Plane</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Common Mythology and Tenets</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Identify a Creature's Planar Origin</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Recognize an Obscure Deity's Symbol or Clergy</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
// id: 40,
// untrained: true,
// customizable: false,
// knowledge: true,
// blurb: "This skill is from the Pathfinder Unchained material, and represent a combination of the skills Knowledge (planes) and Knowledge (religion). The text below outlines a consolidation of those skills' features with minimal edits.",
// action: "Usually none. In most cases, a Religion check doesn’t take an action.",
// try_again: "No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
// special: "You cannot make an untrained Religion check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Nature checks in the fields that they cover.",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Sense Motive",
// ability_score: "Wisdom",
// description: "A successful check lets you avoid being bluffed (see the Bluff skill). You can also use this skill to determine when “something is up” (that is, something odd is going on) or to assess someone’s trustworthiness.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Sense Motive DC</th>\n  </tr>\n  <tr>\n    <td>Hunch</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Sense Enchantment</td>\n    <td>25 or 15</td>\n  </tr>\n  <tr>\n    <td>Discern Secret Message</td>\n    <td>Varies</td>\n  </tr>\n</table>\n\nHunch: This use of the skill involves making a gut assessment of the social situation. You can get the feeling from another’s behavior that something is wrong, such as when you’re talking to an impostor. Alternatively, you can get the feeling that someone is trustworthy.\n\nSense Enchantment: You can tell that someone’s behavior is being influenced by an enchantment effect even if that person isn’t aware of it. The usual DC is 25, but if the target is dominated (see dominate person), the DC is only 15 because of the limited range of the target’s activities.\n\nDiscern Secret Message: You may use Sense Motive to detect that a hidden message is being transmitted via the Bluff skill. In this case, your Sense Motive check is opposed by the Bluff check of the character transmitting the message. For each piece of information relating to the message that you are missing, you take a –2 penalty on your Sense Motive check. If you succeed by 4 or less, you know that something hidden is being communicated, but you can’t learn anything specific about its content. If you beat the DC by 5 or more, you intercept and understand the message. If you fail by 4 or less, you don’t detect any hidden communication. If you fail by 5 or more, you might infer false information.",
// id: 30,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at detecting falsehoods and true intentions.",
// action: "Trying to gain information with Sense Motive generally takes at least 1 minute, and you could spend a whole evening trying to get a sense of the people around you.",
// try_again: "No, though you may make a Sense Motive check for each Bluff check made against you.",
// special: "",
// skill_unlock_5: "If you were aware of an opponent before rolling initiative (such as when you ambush an enemy or negotiations break down into combat, but not when both sides happen upon each other or you are surprised), you can attempt a Sense Motive check as part of your initiative check (DC = 11 + the highest Bluff modifier among your opponents or DC 15, whichever is higher). If you succeed, you gain a +1 bonus on the initiative check, plus an additional +1 for every 5 by which you exceeded the DC.",
// skill_unlock_10: "After 1 minute of conversation, you can read a creature’s surface thoughts (as detect thoughts) by attempting a Sense Motive check at a –20 penalty opposed by the creature’s Bluff check.",
// skill_unlock_15: "You can read surface thoughts as above after 1 round. In addition, when attacked, you can attempt a Sense Motive check as an immediate action opposed by your target’s attack roll. A successful check grants a +2 insight bonus to your AC against attacks from that specific opponent for 1 minute.",
// skill_unlock_20: "You can read surface thoughts as above as a standard action. A successful check to gain an insight bonus to your AC also negates the attack that triggered it."
// },
// {
// name: "Society",
// ability_score: "Intelligence",
// description: "<underline>Appraise</underline>: You can evaluate the monetary value of an object. A DC 20 Appraise check determines the value of a common item. If you succeed by 5 or more, you also determine if the item has magic properties, although this success does not grant knowledge of the magic item’s abilities. If you fail the check by less than 5, you determine the price of that item to within 20% of its actual value. If you fail this check by 5 or more, the price is wildly inaccurate, subject to GM discretion. Particularly rare or exotic items might increase the DC of this check by 5 or more.\n\nYou can also use this check to determine the most valuable item visible in a treasure hoard. The DC of this check is generally 20 but can increase to as high as 30 for a particularly large hoard.\n\n<underline>Local and Nobility</underline>: Local includes legends, personalities, inhabitants, laws, customs, traditions, humanoids. Nobility includes lineages, heraldry, personalities, royalty.\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Society can have specific uses as noted on the below table.\n\n<table>\n  <tr>\n    <th>Tasks</th>\n    <th>Society DC</th>\n  </tr>\n  <tr>\n    <td>Know Local Laws, Rulers, and Popular Locations</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know Current Rulers and Their Symbols</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Know a Common Rumor or Local Tradition</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Proper Etiquette</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Know Hidden Organizations, Rulers, and Locations</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Know Line of Succession</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n</table>",
// id: 41,
// untrained: true,
// customizable: false,
// knowledge: true,
// blurb: "This skill is from the Pathfinder Unchained material, and represent a combination of the skills Appraise, Knowledge (local), and Knowledge (nobility). The text below outlines a consolidation of those skills' features with minimal edits.",
// action: "<underline>Appraise</underline>: Appraising an item takes 1 standard action. Determining the most valuable object in a treasure hoard takes 1 full-round action.\n\n<underline>Local and Nobility</underline>: Usually none. In most cases, a Society check doesn’t take an action.",
// try_again: "<underline>Appraise</underline>: Additional attempts to Appraise an item reveal the same result.\n\n<underline>Local and Nobility</underline>: No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.",
// special: "<underline>Local and Nobility</underline>: You cannot make an untrained Society check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Nature checks in the fields that they cover.",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Spellcraft",
// ability_score: "Intelligence",
// description: "<underline>Arcana</underline>: Arcana includes ancient mysteries, magic traditions, arcane symbols, constructs, dragons, magical beasts. Although robots are constructs, Knowledge (arcana) cannot be used to identify robots or their abilities and weaknesses.\n\nAnswering a question within your field of study has a DC of 10 (for really easy questions), 15 (for basic questions), or 20 to 30 (for really tough questions).\n\nYou can use this skill to identify monsters and their special powers or vulnerabilities. In general, the DC of such a check equals 10 + the monster’s CR. For common monsters, such as goblins, the DC of this check equals 5 + the monster’s CR. For particularly rare monsters, such as the tarrasque, the DC of this check equals 15 + the monster’s CR, or more. A successful check allows you to remember a bit of useful information about that monster. For every 5 points by which your check result exceeds the DC, you recall another piece of useful information. Arcana can have specific uses as noted on the below table.\n\n<underline>Spellcraft</underline>: You are skilled at the art of casting spells, identifying magic items, crafting magic items, and identifying spells as they are being cast.\n\nSpellcraft is used whenever your knowledge and skill of the technical art of casting a spell or crafting a magic item comes into question. This skill is also used to identify the properties of magic items in your possession through the use of spells such as detect magic and identify. The DC of this check varies depending upon the task at hand.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Spellcraft DC</th>\n  </tr>\n  <tr>\n    <td>Identify a Spell as It is Being Cast</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify Auras While Using detect magic</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify the Properties of a Magic Item using detect magic</td>\n    <td>15 + Item's Caster Level</td>\n  </tr>\n  <tr>\n    <td>Learn a Spell from a Spellbook or Scroll</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Prepare a Spell from a Borrowed Spellbook</td>\n    <td>15 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Decipher a Scroll</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell Effect That Is In Place</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify Materials Manufactured by Magic</td>\n    <td>20 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify the Spells Cast Using a Specific Material Component</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Identify a Spell That Just Targeted You</td>\n    <td>25 + Spell Level</td>\n  </tr>\n  <tr>\n    <td>Identify a Monster's Abilities and Weaknesses</td>\n    <td>Varies</td>\n    <td>10 + Monster's CR</td>\n  </tr>\n  <tr>\n    <td>Craft a Magic Item</td>\n    <td>Varies by Item</td>\n  </tr>\n</table>\n\n<underline>Use Magic Device</underline>: You are skilled at activating magic items, even if you are not otherwise trained in their use.\n\nYou can use this skill to read a spell or to activate a magic item. Use Magic Device lets you use a magic item as if you had the spell ability or class features of another class, as if you were a different race, or as if you were of a different alignment.\n\nYou make a Use Magic Device check each time you activate a device such as a wand. If you are using the check to emulate an alignment or some other quality in an ongoing manner, you need to make the relevant Use Magic Device check once per hour.\n\nYou must consciously choose which requirement to emulate. That is, you must know what you are trying to emulate when you make a Use Magic Device check for that purpose. The DCs for various tasks involving Use Magic Device checks are summarized on the table below.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Use Magic Device DC</th>\n  </tr>\n  <tr>\n    <td>Activate Blindly</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Use a Scroll</td>\n    <td>20 + Caster Level</td>\n  </tr>\n  <tr>\n    <td>Use a Wand</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Emulate a Class Feature</td>\n    <td>20</td>\n  </tr>\n  <tr>\n    <td>Emulate an Ability Score</td>\n    <td>See Text</td>\n  </tr>\n  <tr>\n    <td>Emulate an Ancestry</td>\n    <td>25</td>\n  </tr>\n  <tr>\n    <td>Emulate an Alignment</td>\n    <td>30</td>\n  </tr>\n</table>\n\nActivate Blindly: Some magic items are activated by special words, thoughts, or actions. You can activate such an item as if you were using the activation word, thought, or action, even when you’re not and even if you don’t know it. You do have to perform some equivalent activity in order to make the check. That is, you must speak, wave the item around, or otherwise attempt to get it to activate. You get a +2 bonus on your Use Magic Device check if you’ve activated the item in question at least once before. If you fail by 9 or less, you can’t activate the device. If you fail by 10 or more, you suffer a mishap. A mishap means that magical energy gets released but doesn’t do what you wanted it to do. The default mishaps are that the item affects the wrong target or that uncontrolled magical energy is released, dealing 2d6 points of damage to you. This mishap is in addition to the chance for a mishap that you normally risk when you cast a spell from a scroll that you could not otherwise cast yourself.\n\nEmulate an Ability Score: To cast a spell from a scroll, you need a high score in the appropriate ability (Intelligence for wizard spells, Wisdom for divine spells, or Charisma for sorcerer or bard spells). Your effective ability score (appropriate to the class you’re emulating when you try to cast the spell from the scroll) is your Use Magic Device check result minus 15. If you already have a high enough score in the appropriate ability, you don’t need to make this check.\n\nEmulate an Alignment: Some magic items have positive or negative effects based on the user’s alignment. Use Magic Device lets you use these items as if you were of an alignment of your choice. You can emulate only one alignment at a time.\n\nEmulate a Class Feature: Sometimes you need to use a class feature to activate a magic item. In this case, your effective level in the emulated class equals your Use Magic Device check result minus 20. This skill does not let you actually use the class feature of another class. It just lets you activate items as if you had that class feature. If the class whose feature you are emulating has an alignment requirement, you must meet it, either honestly or by emulating an appropriate alignment with a separate Use Magic Device check (see above).\n\nEmulate an Ancestry: Some magic items work only for members of certain ancestries, or work better for members of those ancestries. You can use such an item as if you were a member of an ancestry of your choice. You can emulate only one ancestry at a time.\n\nUse a Scroll: Normally, to cast a spell from a scroll, you must have the scroll’s spell on your class spell list. Use Magic Device allows you to use a scroll as if you had a particular spell on your class spell list. The DC is equal to 20 + the caster level of the spell you are trying to cast from the scroll. In addition, casting a spell from a scroll requires a minimum score (10 + spell level) in the appropriate ability. If you don’t have a sufficient score in that ability, you must emulate the ability score with a separate Use Magic Device check.\n\nThis use of the skill also applies to other spell completion magic items.\n\nUse a Wand, Staff, or Other Spell Trigger Item: Normally, to use a wand, you must have the wand’s spell on your class spell list. This use of the skill allows you to use a wand as if you had a particular spell on your class spell list. Failing the roll does not expend a charge.",
// id: 42,
// untrained: true,
// customizable: false,
// knowledge: true,
// blurb: "This skill is from the Pathfinder Unchained material, and represent a combination of the skills Knowledge (arcana), Spellcraft, and Use Magic Device. The text below outlines a consolidation of those skills' features with minimal edits. All Use Magic Device skillchecks are now based on Intelligence rather than Charisma.",
// action: "<underline>Arcana</underline>: Usually none. In most cases, a Knowledge check doesn’t take an action.\n\n<underline>Spellcraft</underline>: Identifying a spell as it is being cast requires no action, but you must be able to clearly see the spell as it is being cast, and this incurs the same penalties as a Perception skill check due to distance, poor conditions, and other factors. Learning a spell from a spellbook takes 1 hour per level of the spell (0-level spells take 30 minutes). Preparing a spell from a borrowed spellbook does not add any time to your spell preparation. Making a Spellcraft check to craft a magic item is made as part of the creation process. Attempting to ascertain the properties of a magic item takes 3 rounds per item to be identified and you must be able to thoroughly examine the object.\n\n<underline>Use Magic Device</underline>: None. The Use Magic Device check is made as part of the action (if any) required to activate the magic item.",
// try_again: "<underline>Arcana</underline>: No. The check represents what you know, and thinking about a topic a second time doesn’t let you know something that you never learned in the first place.\n\n<underline>Spellcraft</underline>: You cannot retry checks made to identify a spell. If you fail to learn a spell from a spellbook or scroll, you must wait at least 1 week before you can try again. If you fail to prepare a spell from a borrowed spellbook, you cannot try again until the next day. When using detect magic or identify to learn the properties of magic items, you can only attempt to ascertain the properties of an individual item once per day. Additional attempts reveal the same results.\n\n<underline>Use Magic Device</underline>: Yes, but if you ever roll a natural 1 while attempting to activate an item and you fail, then you can’t try to activate that item again for 24 hours.",
// special: "<underline>Arcana</underline>: You cannot make an untrained Knowledge check with a DC higher than 10. If you have access to an extensive library that covers a specific skill, this limit is removed. The time to make checks using a library, however, increases to 1d4 hours. Particularly complete libraries might even grant a bonus on Knowledge checks in the fields that they cover.\n\n<underline>Spellcraft</underline>: If you are a specialist wizard, you get a +2 bonus on Spellcraft checks made to identify, learn, and prepare spells from your chosen school. Similarly, you take a –5 penalty on similar checks made concerning spells from your opposition schools.\n\n<underline>Use Magic Device</underline>: You cannot take 10 with this skill. You can’t aid another on Use Magic Device checks. Only the user of the item may attempt such a check.",
// skill_unlock_5: "",
// skill_unlock_10: "",
// skill_unlock_15: "",
// skill_unlock_20: ""
// },
// {
// name: "Stealth",
// ability_score: "Dexterity",
// description: "Your Stealth check is opposed by the Perception check of anyone who might notice you. Creatures that fail to beat your Stealth check are not aware of you and treat you as if you had total concealment. You can move up to half your normal speed and use Stealth at no penalty. When moving at a speed greater than half but less than your normal speed, you take a –5 penalty. It’s impossible to use Stealth while attacking, running, or charging.\n\nCreatures gain a bonus or penalty on Stealth checks based on their size: Fine +16, Diminutive +12, Tiny +8, Small +4, Medium +0, Large –4, Huge –8, Gargantuan –12, Colossal –16.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.\n\nBreaking Stealth: When you start your turn using Stealth, you can leave cover or concealment and remain unobserved as long as you succeed at a Stealth check and end your turn in cover or concealment. Your Stealth immediately ends after you make an attack roll, whether or not the attack is successful (except when sniping as noted below).\n\nSniping: If you’ve already successfully used Stealth at least 10 feet from your target, you can make one ranged attack and then immediately use Stealth again. You take a –20 penalty on your Stealth check to maintain your obscured location.\n\nCreating a Diversion to Hide: You can use Bluff to allow you to use Stealth. A successful Bluff check opposed by the viewer’s Sense Motive can give you the momentary diversion you need to attempt a Stealth check while people are aware of you.",
// id: 33,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at avoiding detection, allowing you to slip past foes or strike from an unseen position. This skill covers hiding and moving silently.",
// action: "Usually none. Normally, you make a Stealth check as part of movement, so it doesn’t take a separate action. However, using Stealth immediately after a ranged attack (see Sniping, above) is a move action.",
// try_again: "",
// special: "If you are invisible, you gain a +40 bonus on Stealth checks if you are immobile, or a +20 bonus on Stealth checks if you’re moving.\n\nIf people are observing you using any of their senses (but typically sight), you can’t use Stealth. Against most creatures, finding cover or concealment allows you to use Stealth. If your observers are momentarily distracted (such as by a Bluff check), you can attempt to use Stealth. While the others turn their attention from you, you can attempt a Stealth check if you can get to an unobserved place of some kind. This check, however, is made at a –10 penalty because you have to move fast.",
// skill_unlock_5: "Reduce the Stealth penalty from sniping by 10.",
// skill_unlock_10: "Stealth check penalties for moving quickly are halved, including the ability unlocked at 5 ranks, moving full speed, and reaching concealment after creating a distraction.",
// skill_unlock_15: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the end of your turn.",
// skill_unlock_20: "If you attack after successfully using Stealth, your target is denied its Dexterity bonus against all attacks that you make before the beginning of your next turn."
// },
// {
// name: "Survival",
// ability_score: "Wisdom",
// description: "You can keep yourself and others safe and fed in the wild. See below for DCs for various tasks that require Survival checks.\n\n<table>\n  <tr>\n    <th>Task</th>\n    <th>Survival DC</th>\n  </tr>\n  <tr>\n    <td>Get along in the wild. Move up to half your overland speed while hunting and foraging (no food or water supplies needed). You can provide food and water for one other person for every 2 points by which your check result exceeds 10.</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Gain a +2 bonus on all Fortitude saves against severe weather while moving up to half your overland speed, or gain a +4 bonus if you remain stationary. You may grant the same bonus to one other character for every 1 point by which your Survival check result exceeds 15.</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Keep from getting lost or avoid natural hazards, such as quicksand.</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Predict the weather up to 24 hours in advance. For every 5 points by which your Survival check result exceeds 15, you can predict the weather for one additional day in advance.</td>\n    <td>15</td>\n  </tr>\n</table>\n\nTo find tracks or to follow them for 1 mile requires a successful Survival check. You must make another Survival check every time the tracks become difficult to follow. If you are not trained in this skill, you can make untrained checks to find tracks, but you can follow them only if the DC for the task is 10 or lower. Alternatively, you can use the Perception skill to find a footprint or similar sign of a creature’s passage using the same DCs, but you can’t use Perception to follow tracks, even if someone else has already found them.\n\nYou move at half your normal speed while following tracks (or at your normal speed with a –5 penalty on the check, or at up to twice your normal speed with a –20 penalty on the check). The DC depends on the surface and the prevailing conditions, as given on table.\n\n<table>\n  <tr>\n    <th>Surface</th>\n    <th>Survival DC</th>\n  </tr>\n  <tr>\n    <td>Very Soft Ground</td>\n    <td>5</td>\n  </tr>\n  <tr>\n    <td>Soft Ground</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Firm Ground</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Hard Ground</td>\n    <td>20</td>\n  </tr>\n</table>\n\nVery Soft Ground: Any surface (fresh snow, thick dust, wet mud) that holds deep, clear impressions of footprints.\nSoft Ground: Any surface soft enough to yield to pressure, but firmer than wet mud or fresh snow, in which a creature leaves frequent but shallow footprints.\nFirm Ground: Most normal outdoor surfaces (such as lawns, fields, woods, and the like) or exceptionally soft or dirty indoor surfaces (thick rugs and very dirty or dusty floors). The creature might leave some traces (broken branches or tufts of hair), but it leaves only occasional or partial footprints.\nHard Ground: Any surface that doesn’t hold footprints at all, such as bare rock or an indoor floor. Most streambeds fall into this category, since any footprints left behind are obscured or washed away. The creature leaves only traces (scuff marks or displaced pebbles).\n\n<table>\n  <tr>\n    <th>Condition</th>\n    <th>Survival DC Modifier</th>\n  </tr>\n  <tr>\n    <td>Every Three Creatures in the Group Being Tracked</td>\n    <td>-1</td>\n  </tr>\n  <tr>\n    <td>Size of the Largest Creature Being Tracked</td>\n    <td></td>\n  </tr>\n  <tr>\n    <td>  Fine</td>\n    <td>+8</td>\n  </tr>\n  <tr>\n    <td>  Diminutive</td>\n    <td>+4</td>\n  </tr>\n  <tr>\n    <td>  Tiny</td>\n    <td>+2</td>\n  </tr>\n  <tr>\n    <td>  Small</td>\n    <td>+1</td>\n  </tr>\n  <tr>\n    <td>  Medium</td>\n    <td>+0</td>\n  </tr>\n  <tr>\n    <td>  Large</td>\n    <td>-1</td>\n  </tr>\n  <tr>\n    <td>  Huge</td>\n    <td>-2</td>\n  </tr>\n  <tr>\n    <td>  Gargantuan</td>\n    <td>-4</td>\n  </tr>\n  <tr>\n    <td>  Colossal</td>\n    <td>-8</td>\n  </tr>\n  <tr>\n    <td>Every 24 Hours Since the Trail was Made</td>\n    <td>+1</td>\n  </tr>\n  <tr>\n    <td>Every Hour of Rain Since the Trail was Made</td>\n    <td>+1</td>\n  </tr>\n  <tr>\n    <td>Fresh Snow Since the Trail was Made</td>\n    <td>+10</td>\n  </tr>\n  <tr>\n    <td>Poor Vibility</td>\n    <td></td>\n  </tr>\n  <tr>\n    <td>  Overcast or Moonless Night</td>\n    <td>+6</td>\n  </tr>\n  <tr>\n    <td>  Moonlight</td>\n    <td>+3</td>\n  </tr>\n  <tr>\n    <td>  Fog or Precipitation</td>\n    <td>+3</td>\n  </tr>\n  <tr>\n    <td>Tracked Party Hides Trail (and Moves at Half Speed)</td>\n    <td>+5</td>\n  </tr>\n</table>",
// id: 34,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You are skilled at surviving in the wild and at navigating in the wilderness. You also excel at following trails and tracks left by others.",
// action: "Varies. A single Survival check may represent activity over the course of hours or a full day. A Survival check made to find tracks is at least a full-round action, and it may take even longer.",
// try_again: "Varies. For getting along in the wild or for gaining the Fortitude save bonus noted in the first table on page 107, you make a Survival check once every 24 hours. The result of that check applies until the next check is made. To avoid getting lost or avoid natural hazards, you make a Survival check whenever the situation calls for one. Retries to avoid getting lost in a specific situation or to avoid a specific natural hazard are not allowed. For finding tracks, you can retry a failed check after 1 hour (outdoors) or 10 minutes (indoors) of searching.",
// special: "If you are trained in Survival, you can automatically determine where true north lies in relation to yourself.",
// skill_unlock_5: "You reduce all nonlethal damage you take from heat, cold, starvation, or thirst by 1 point for every 5 ranks you possess in Survival.",
// skill_unlock_10: "You can track creatures that leave no tracks, including flying and swimming creatures and creatures using trackless step or pass without trace, taking a –20 penalty on your Survival check.",
// skill_unlock_15: "Once per day, you can spend 1 hour and attempt a DC 30 Survival check. Success grants you cold resistance or fire resistance 5 for 24 hours. You can share this with one ally for every 5 by which you exceeded the check.",
// skill_unlock_20: "You take only a –10 penalty when tracking creatures that leave no tracks."
// },
// {
// name: "Swim",
// ability_score: "Strength",
// description: "Make a Swim check once per round while you\nare in the water. Success means you may swim at up to half your speed (as a full-round action) or at a quarter of your speed (as a move action). If you fail by 4 or less, you make no progress. If you fail by 5 or more, you go underwater.\n\nIf you are underwater, either because you failed a Swim check or because you are swimming underwater intentionally, you must hold your breath. You can hold your breath for a number of rounds equal to twice your Constitution score, but only if you do nothing other than take move actions or free actions. If you take a standard action or a full-round action (such as making an attack), the remainder of the duration for which you can hold your breath is reduced by 1 round. (Effectively, a character in combat can hold his breath only half as long as normal.) After that period of time, you must make a DC 10 Constitution check every round to continue holding your breath. Each round, the DC for that check increases by 1. If you fail the Constitution check, you begin to drown. The DC for the Swim check depends on the water, as given on the table below.\n\n<table>\n  <tr>\n    <th>Water</th>\n    <th>Swim DC</th>\n  </tr>\n  <tr>\n    <td>Calm Water</td>\n    <td>10</td>\n  </tr>\n  <tr>\n    <td>Rough Water</td>\n    <td>15</td>\n  </tr>\n  <tr>\n    <td>Stormy Water</td>\n    <td>20</td>\n  </tr>\n</table>\n\nEach hour that you swim, you must make a DC 20 Swim check or take 1d6 points of nonlethal damage from fatigue.",
// id: 35,
// untrained: true,
// customizable: false,
// knowledge: false,
// blurb: "You know how to swim and can do so even in stormy water.",
// action: "A successful Swim check allows you to swim a quarter of your speed as a move action or half your speed as a full-round action.",
// try_again: "",
// special: "A creature with a swim speed can move through water at its indicated speed without making Swim checks. It gains a +8 racial bonus on any Swim check to perform a special action or avoid a hazard. The creature can always choose to take 10 on a Swim check, even if distracted or endangered when swimming. Such a creature can use the run action while swimming, provided that it swims in a straight line.\n\nYou can’t take 10 on a Swim check in stormy water, even if you aren’t otherwise being threatened or distracted.\n\nAny creature of Tiny or smaller size should use its Dex modifier instead of its Str modifier for Climb and Swim checks.",
// skill_unlock_5: "You gain a swim speed of 10 feet, but only in water with a Swim DC of 15 or lower.",
// skill_unlock_10: "You gain a swim speed (though you do not gain the +8 racial bonus on Swim checks) equal to your base speed in water with a Swim DC of 15 or lower, or 10 feet in all other water.",
// skill_unlock_15: "You ignore the penalties for using slashing or bludgeoning weapons underwater, as freedom of movement.",
// skill_unlock_20: "You gain a swim speed equal to your base speed in all water. If you have both hands free, you gain a +8 racial bonus on Swim checks."
// }
// ]
// },
// "character_klass_feature_usages": [],
// "character_known_spells": [],
// "klass_specializations": [
// {
// id: 8,
// name: "Fire",
// "klass_feature": {
// id: 123,
// klass_id: 15,
// name: "Elemental Focus",
// description: "At 1st level, a kineticist chooses one primary element on which to focus. This element determines how she accesses the raw power of the Ethereal Plane, and grants her access to specific wild talents (see below) and additional class skills. She gains her selected element’s basic utility wild talent (basic telekinesis, basic aerokinesis, etc.) as a bonus wild talent.",
// created_at: "2021-01-02T15:58:19.288Z",
// updated_at: "2021-01-02T15:58:19.288Z",
// specialization: true,
// choice_amount: 1,
// base_klass_feature_id: null,
// has_klass_feature_options: null
// },
// "klass_specialization_features": [],
// "character_klass_specialization_id": 2
// }
// ],
// "cast_spells": [],
// "character_choices": [],
// "character_klass_specialization_feature_usages": [],
// "pp": null,
// "gp": null,
// "sp": null,
// "cp": null,
// "archetypes": [],
// alternate_racial_traits: [
// {
// name: "Grapevine",
// description: "A vine leshy made from a grapevine can produce magically infused fruit that can heal her allies. She can cast goodberry once per day as a spell-like ability, with a caster level equal to her character level. This replaces pass without trace.",
// source: {
// id: 14,
// title: "Ultimate Wilderness",
// abbreviation: "UW",
// code: "PZO1140"
// },
// "alternate_trait_replace_racial_traits": [
// {
// id: 4,
// alternate_racial_trait_id: 3,
// racial_trait_id: 47
// }
// ],
// associated_spells: [
// {
// id: 219,
// name: "Goodberry",
// description: "Casting goodberry makes 2d4 freshly picked berries magical. You (as well as any other druid of 3rd or higher level) can immediately discern which berries are affected. Each transmuted berry provides nourishment as if it were a normal meal for a Medium creature. The berry also cures 1 point of damage when eaten, subject to a maximum of 8 points of such curing in any 24-hour period.",
// target: "2d4 fresh berries touched",
// saving_throw: "none",
// spell_resistance: false,
// magic_school_id: 8,
// action_id: 1,
// duration: "1 day/level",
// time: 1,
// unit_of_time: "day",
// increase_per_level: 1,
// dismissible: false,
// concentration: false,
// spell_range_id: 2,
// source_id: null
// }
// ]
// },
// {
// name: "Swamp Leshy",
// description: "Some vine leshys are made from plants that naturally grow in swamps. These leshys gain a +2 racial bonus on Swim checks and a +4 racial bonus on Stealth checks in swamps. This replaces climber and alters unassuming foliage.",
// source: {
// id: 14,
// title: "Ultimate Wilderness",
// abbreviation: "UW",
// code: "PZO1140"
// },
// "alternate_trait_replace_racial_traits": [
// {
// id: 5,
// alternate_racial_trait_id: 4,
// racial_trait_id: 51
// },
// {
// id: 6,
// alternate_racial_trait_id: 4,
// racial_trait_id: 50
// }
// ],
// associated_spells: []
// }
// ],
// "klass_feature_options": [],
// "items": [
// {
// id: 3,
// name: "Cup",
// "category": "mundane gear",
// description: "A common cup, carved of wood.",
// "weight": 0,
// "price_in_gp": 0.01,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 2,
// name: "Masterwork Backpack",
// "category": "adventuring gear",
// description: "This backpack has numerous pockets for storing items that might be needed while adventuring. Hooks are included for attaching items such as canteens, pouches, or even a rolled-up blanket. It has padded bands that strap across the chest and the waist to distribute its weight more evenly. Like a common backpack, it can hold about 2 cubic feet of material in its main container. When wearing a masterwork backpack, treat your Strength score as +1 higher than normal when calculating your carrying capacity.",
// "weight": 4,
// "price_in_gp": 50,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 8,
// name: "Bowl",
// "category": "mundane gear",
// description: "A cheap ceramic bowl.",
// "weight": 0,
// "price_in_gp": 0.1,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 7,
// name: "Plate",
// "category": "mundane gear",
// description: "A carved wooden plate.",
// "weight": 0,
// "price_in_gp": 0.1,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 6,
// name: "Knife",
// "category": "mundane gear",
// description: "A simple metal knife with no sharp edge.",
// "weight": 0,
// "price_in_gp": 0.01,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 5,
// name: "Fork",
// "category": "mundane gear",
// description: "A simple wooden fork.",
// "weight": 0,
// "price_in_gp": 0.01,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 4,
// name: "Spoon",
// "category": "mundane gear",
// description: "A simple wooden spoon.",
// "weight": 0,
// "price_in_gp": 0.01,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 9,
// name: "Garbage Mat",
// "category": "mundane gear",
// description: "A placemat made of refuse.",
// "weight": 0,
// "price_in_gp": 0,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 10,
// name: "Olive Oil",
// "category": "food and drink",
// description: "Tall, narrow, ceramic container of olive oil.",
// "weight": 1,
// "price_in_gp": 5,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 11,
// name: "Common Pot",
// "category": "adventuring gear",
// description: "This 8-inch diameter iron pot is sturdy and has feet, a lid, and a rounded handle. It can hold enough stew to feed one hungry human for one meal.",
// "weight": 4,
// "price_in_gp": 0.8,
// "craft_skill": null,
// "craft_dc": null
// },
// {
// id: 50,
// name: "Golgari Insignia Charm",
// "category": "clothing, outfits, accessories",
// description: "A Charm with the Golgari Insignia. Proof of your membership to the Golgari Swarm",
// "weight": 0,
// "price_in_gp": 10,
// "craft_skill": null,
// "craft_dc": null
// }
// ],
// "user": {
// "username": "clare_voyance",
// "avatar": null,
// "bio": null,
// id: 10,
// "admin": false,
// skillset_id: 3,
// "characters": [
// {
// id: 10,
// "user_id": 10,
// name: "Fire-Roasted Tomatoes",
// "alignment": "",
// "deity": null,
// "homeland": null,
// "gender": null,
// "age": null,
// "height": "2'3\"",
// "weight": "9 lbs",
// "hair": null,
// "eyes": null,
// "strength": 10,
// "dexterity": 12,
// "constitution": 14,
// "intelligence": 10,
// "wisdom": 4,
// "charisma": 9,
// description: "",
// "background": null,
// created_at: "2021-01-02T15:58:45.041Z",
// updated_at: "2021-01-02T16:27:35.762Z",
// race_id: 8,
// "any_bonus": null,
// skillset_id: 3,
// "lethal_damage": 0,
// "non_lethal_damage": 0,
// "temp_hp": 0,
// "is_done_preparing_spells": false,
// "full_name": null,
// "campaign_id": 3,
// "max_hp": 21,
// "pp": null,
// "gp": null,
// "sp": null,
// "cp": null
// }
// ]
// },
// "prepared_spells": [],
// "campaign": {
// id: 3,
// name: "Ravnica",
// "starting_weekday": null,
// "starting_month": null,
// "starting_day": null,
// "starting_age": null,
// "starting_year": null,
// "current_weekday": null,
// "current_month": null,
// "current_day": null,
// "current_age": null,
// "current_year": null,
// "characters": [
// {
// id: 13,
// name: "Natesse",
// "character_magic_items": [
// {
// id: 2,
// "magic_item": {
// id: 1,
// name: "Traveler's Any-Tool",
// description: "This implement at first seems to be nothing but a 12-inch iron bar lined with small plates and spikes. It can be folded, twisted, hinged, and bent, to form almost any known tool. Hammers, shovels, even a block and tackle (without rope) are possible. It can duplicate any tool the wielder can clearly visualize that contains only limited moving parts, such as a pair of scissors, but not a handloom. It cannot be used to replace missing or broken parts of machines or vehicles unless a mundane tool would have done the job just as well.\n\nThe any-tool counts as a set of masterwork artisan’s tools for most Craft or Profession skills (although very specialist crafts such as alchemy still require their own unique toolset). It is an ineffective weapon, always counting as an improvised weapon and never granting any masterwork bonus on attack rolls.",
// "slot": "none",
// "aura": "moderate transmutation",
// "caster_level": 9,
// "price_in_gp": 250,
// "weight": 2,
// "activatable": false,
// "expendable": false,
// "group": "Wondrous Item",
// "features": []
// },
// "discovered": true,
// "character_magic_item_feature_usages": [],
// "known": true,
// "equipped": false,
// "false_desc": null,
// "stored_character_magic_item": null,
// "container": null,
// "character_magic_item_feature_usage_options": []
// }
// ],
// "character_klasses": [
// {
// id: 46,
// "character_id": 13,
// klass_id: 16,
// created_at: "2021-01-02T15:58:46.499Z",
// updated_at: "2021-01-02T15:58:46.499Z",
// "hp": 8,
// "feat_id": 1,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 47,
// "character_id": 13,
// klass_id: 16,
// created_at: "2021-01-02T15:58:46.509Z",
// updated_at: "2021-01-02T15:58:46.509Z",
// "hp": 2,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// },
// {
// id: 9,
// name: "Majestik",
// "character_magic_items": [
// {
// id: 1,
// "magic_item": {
// id: 2,
// name: "Hand of the Mage",
// description: "This mummified elf hand hangs by a golden chain around a character’s neck (taking up space as a magic necklace would).\n\nIt allows the wearer to utilize the spell mage hand at will.",
// "slot": "neck",
// "aura": "faint transmutation",
// "caster_level": 2,
// "price_in_gp": 900,
// "weight": 2,
// "activatable": false,
// "expendable": false,
// "group": "Wondrous Item",
// "features": []
// },
// "discovered": true,
// "character_magic_item_feature_usages": [],
// "known": true,
// "equipped": false,
// "false_desc": null,
// "stored_character_magic_item": null,
// "container": null,
// "character_magic_item_feature_usage_options": []
// }
// ],
// "character_klasses": [
// {
// id: 38,
// "character_id": 9,
// klass_id: 21,
// created_at: "2021-01-02T15:58:44.004Z",
// updated_at: "2021-01-02T15:58:44.004Z",
// "hp": 6,
// "feat_id": 4,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 39,
// "character_id": 9,
// klass_id: 21,
// created_at: "2021-01-02T15:58:44.072Z",
// updated_at: "2021-01-02T15:58:44.072Z",
// "hp": 6,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// },
// {
// id: 11,
// name: "Iyugi",
// "character_magic_items": [],
// "character_klasses": [
// {
// id: 42,
// "character_id": 11,
// klass_id: 20,
// created_at: "2021-01-02T15:58:45.313Z",
// updated_at: "2021-01-02T15:58:45.313Z",
// "hp": 8,
// "feat_id": 5,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 43,
// "character_id": 11,
// klass_id: 20,
// created_at: "2021-01-02T15:58:45.320Z",
// updated_at: "2021-01-02T15:58:45.320Z",
// "hp": 6,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// },
// {
// id: 14,
// name: "Dz'eyn",
// "character_magic_items": [],
// "character_klasses": [
// {
// id: 48,
// "character_id": 14,
// klass_id: 18,
// created_at: "2021-01-02T15:58:47.207Z",
// updated_at: "2021-01-02T15:58:47.207Z",
// "hp": 10,
// "feat_id": 6,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 49,
// "character_id": 14,
// klass_id: 18,
// created_at: "2021-01-02T15:58:47.215Z",
// updated_at: "2021-01-02T15:58:47.215Z",
// "hp": 4,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// },
// {
// id: 10,
// name: "Fire-Roasted Tomatoes",
// "character_magic_items": [],
// "character_klasses": [
// {
// id: 40,
// "character_id": 10,
// klass_id: 15,
// created_at: "2021-01-02T15:58:45.070Z",
// updated_at: "2021-01-02T15:58:45.070Z",
// "hp": 8,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 41,
// "character_id": 10,
// klass_id: 15,
// created_at: "2021-01-02T15:58:45.086Z",
// updated_at: "2021-01-02T15:58:45.086Z",
// "hp": 7,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// },
// {
// id: 12,
// name: "Ildre",
// "character_magic_items": [],
// "character_klasses": [
// {
// id: 44,
// "character_id": 12,
// klass_id: 13,
// created_at: "2021-01-02T15:58:45.688Z",
// updated_at: "2021-01-02T15:58:45.688Z",
// "hp": 6,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 1,
// "favored_klass_bonus_id": null
// },
// {
// id: 45,
// "character_id": 12,
// klass_id: 13,
// created_at: "2021-01-02T15:58:45.700Z",
// updated_at: "2021-01-02T15:58:45.700Z",
// "hp": 3,
// "feat_id": null,
// "ability_score_improvement": null,
// "level": 2,
// "favored_klass_bonus_id": null
// }
// ]
// }
// ],
// "calendar": {
// id: 2,
// name: "Oum Calendar",
// "leap_year": false
// },
// "theme": "Espionage, social intrigue.\u000b\u000b There will combat, because that's the escapism we are here for, but I would love have just as much intrigue as combat. Whether that's finding out secrets at an exclusive party you snuck into, hiding behind a wall to catch your enemy in their bedroom, or planting evidence while you are currying favor with a warlord.\n\nYou are going to be a scrappy band of ne'er-do-wells, who are doing jobs for their sake or at the behest of others, where you may very well be underleveled or outmanned in a room. Cleverness, wit, and knowing when to run will be a good part of this one/two/three shot / campaign.",
// "setting": "Ravnica: City of Guilds\n\n10,000 years ago, a Guildpact was signed that prevented the ten guilds of Ravnica from warring each other to prevent the plane from being destroyed and consumed. The Pact outlined the roles that each guild was to have within the city. However, the guilds continue to be at odds with each other due to their base differences.",
// "starting_level": 2,
// "skillset": {
// id: 3,
// name: "Ravnica Custom"
// },
// "custom_notes": "Select a guild to be a part of. You automatically have proficiency with Knowledge checks for that guild, but you will have to put ranks into that skill in order to reflect your proficiency.",
// "races": [],
// "klasses": [],
// "websocket_code": "50388cf0-2f41-0139-aaf1-24d18cefbb5e",
// "encounters": []
// },
// "character_weapons": [
// {
// id: 10,
// name: "",
// description: null,
// "masterwork": true,
// "discovered": true,
// "known": true,
// "equipped": null,
// "weapon": {
// id: 78,
// name: "Traveling Kettle",
// "category": "Light",
// proficiency: "Simple",
// "weapon_type": "Melee",
// "price_in_gp": 5,
// "damage_dice": 6,
// "num_of_dice": 1,
// "critical": 2,
// "critical_range": 20,
// "range": 0,
// "thrown": 0,
// "weight": 2,
// "damage_type": "Bludgeoning",
// description: "These small tea kettles are made with clamping lids and heavily reinforced handles, allowing them to be swung like a club. A traveling kettle with boiling water inside deals an additional 1 point of fire damage on a hit. Boiling water cools to a non-damaging temperature after 5 minutes.",
// "double_weapon": null,
// "double_num_of_dice": 0,
// "double_damage_dice": 0,
// "double_damage_type": null,
// "ammunition": false,
// "ammunition_type": null,
// source: {
// id: 1,
// title: "Core Rulebook",
// abbreviation: "CR",
// code: "PZO1110"
// },
// "weapon_qualities": [
// {
// id: 3,
// name: "monk",
// description: "A monk weapon can be used by a monk to perform a flurry of blows."
// }
// ],
// "weapon_groups": [
// {
// id: 8,
// name: "Monk"
// }
// ],
// "weapon_hands": [
// {
// id: 24,
// "weapon_id": 78,
// "hands": "One",
// bonus: null
// }
// ],
// "attack_type": null,
// "features": []
// },
// "magazine": null,
// "ammunition_amount": null,
// "character_weapon_ammunition_id": null,
// "improvised_ammunition": false
// },
// {
// id: 11,
// name: "Chef's Knife",
// description: "Decently sharp, single-edged knife. Used primarily for preparing meals.",
// "masterwork": false,
// "discovered": true,
// "known": true,
// "equipped": null,
// "weapon": {
// id: 3,
// name: "Dagger",
// "category": "Light",
// proficiency: "Simple",
// "weapon_type": "Melee",
// "price_in_gp": 2,
// "damage_dice": 4,
// "num_of_dice": 1,
// "critical": 2,
// "critical_range": 19,
// "range": 10,
// "thrown": 1,
// "weight": 1,
// "damage_type": "Piercing or Slashing",
// description: "A dagger has a blade that is about 1 foot in length.\n\nYou get a +2 bonus on Sleight of Hand skill checks made to conceal a dagger on your body.",
// "double_weapon": null,
// "double_num_of_dice": 0,
// "double_damage_dice": 0,
// "double_damage_type": null,
// "ammunition": false,
// "ammunition_type": null,
// source: {
// id: 1,
// title: "Core Rulebook",
// abbreviation: "CR",
// code: "PZO1110"
// },
// "weapon_qualities": [],
// "weapon_groups": [
// {
// id: 7,
// name: "Light Blades"
// },
// {
// id: 10,
// name: "Thrown"
// },
// {
// id: 11,
// name: "Tribal"
// }
// ],
// "weapon_hands": [],
// "attack_type": null,
// "features": []
// },
// "magazine": null,
// "ammunition_amount": null,
// "character_weapon_ammunition_id": null,
// "improvised_ammunition": false
// },
// {
// id: 27,
// name: "",
// description: "",
// "masterwork": false,
// "discovered": true,
// "known": true,
// "equipped": null,
// "weapon": {
// id: 1,
// name: "Unarmed",
// "category": "Unarmed",
// proficiency: "Simple",
// "weapon_type": "Melee",
// "price_in_gp": 0,
// "damage_dice": 3,
// "num_of_dice": 1,
// "critical": 2,
// "critical_range": 20,
// "range": 0,
// "thrown": 0,
// "weight": 0,
// "damage_type": "Bludgeoning",
// description: "An unarmed strike is always considered a light weapon. Therefore, you can use the Weapon Finesse feat to apply your Dexterity modifier instead of your Strength modifier to attack rolls with an unarmed strike. Unarmed strikes do not count as natural weapons. The damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus on weapon damage rolls.\n\nA monk or any character with the Improved Unarmed Strike feat can deal lethal or nonlethal damage with unarmed strikes, at his discretion.",
// "double_weapon": null,
// "double_num_of_dice": 0,
// "double_damage_dice": 0,
// "double_damage_type": null,
// "ammunition": false,
// "ammunition_type": null,
// source: {
// id: 1,
// title: "Core Rulebook",
// abbreviation: "CR",
// code: "PZO1110"
// },
// "weapon_qualities": [
// {
// id: 4,
// name: "nonlethal",
// description: "These weapons deal nonlethal damage."
// }
// ],
// "weapon_groups": [
// {
// id: 2,
// name: "Close"
// }
// ],
// "weapon_hands": [],
// "attack_type": null,
// "features": []
// },
// "magazine": null,
// "ammunition_amount": null,
// "character_weapon_ammunition_id": null,
// "improvised_ammunition": false
// }
// ],
// "character_armors": [
// {
// id: 5,
// name: null,
// description: null,
// "armor": {
// id: 16,
// name: "Leaf Armor",
// proficiency: "Light",
// "price_in_gp": 500,
// bonus: 3,
// "bonus_type": "Armor",
// "max_dex_bonus": 5,
// "armor_check_penalty": 0,
// "arcane_spell_failure": 15,
// "spell_30": 30,
// "spell_20": 20,
// "weight": 20,
// source_id: 16,
// description: "Using alchemical compounds, elves or druidic orders treat special leaves for use in crafting armor. These leaves are stitched together in an overlapping pattern to create a leathery armor as strong and deflective as metal counterparts. Leaf armor jerkins, bracers, and leggings have been made through this process.",
// "don": "1 minute",
// "don_hastily": "5 rounds",
// "remove": "1 minute",
// "extra": false,
// "weapon": false,
// "bonus_price_in_gp": false,
// "damage_dice": null,
// "num_of_dice": null,
// "critical": 2,
// "critical_range": 20,
// "weapon_proficiency": null,
// "weapon_category": null
// },
// "masterwork": true,
// "discovered": true,
// "known": true,
// "equipped": true,
// "base_armor": null,
// "extra_armor_options": [],
// "armor_options": []
// }
// ]
