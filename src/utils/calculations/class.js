
export const compositeKlassFeatures = (klassFeatures, chosenArchetypes) => {
	let features = []
	let newFeatures = []

	klassFeatures.forEach(kf => {
		let klassFeatureId = kf.id
		let isFeatureReplaced = false

		chosenArchetypes.forEach(arch => {
			arch.klass_archetype_features.forEach(archF => {
				archF.replaces_klass_features.forEach(replaceKF => {
					if (replaceKF.klass_feature_id === klassFeatureId){
						if (kf.has_klass_feature_options) {
							 if (shouldOptionsKlassFeatureBeRemoved(kf, chosenArchetypes)){
								 isFeatureReplaced = true
							 }
							 features.push(archF)
						} else if (replaceKF.replace_or_alter === "replace"){
							isFeatureReplaced = true
							features.push(archF)
						} else if (replaceKF.replace_or_alter === "alter"){
							features.push(archF)
						}
					}
				})
			})
		})
		// if (viewedArchetype.id){
		// 	viewedArchetype.klass_archetype_features.forEach(archF => {
		// 		archF.replaces_klass_features.forEach(replaceKF => {
		// 			if (replaceKF.klass_feature_id === klassFeatureId && !isFeatureReplaced){
		// 				features.push({...kf, color: "darkgrey"})
		// 				features.push({...archF, color: "forestgreen"})
		// 				isFeatureReplaced = true
		// 			}
		// 		})
		// 	})
		// }

		if (!isFeatureReplaced){
			features.push(kf)
		}
	})

	chosenArchetypes.forEach(arch => {
		arch.klass_archetype_features.forEach(archF => {
			archF.replaces_klass_features.forEach(replaceKF => {
				if (!replaceKF.klass_feature_id){
					features.push(archF)
				}
			})
		})
	})



	return features
}

export const sortCompositeKlassFeatures = (klassFeatures, chosenArchetypes) => {
	let features = compositeKlassFeatures(klassFeatures, chosenArchetypes)

	const sortedFeatures = features.sort((a, b) => {
		let lowestA = 20
		let aLevels = a.feature_levels || a.klass_archetype_feature_levels
		aLevels.forEach(fl => {
			if (fl.level < lowestA){lowestA = fl.level}
		})

		let lowestB = 20
		let bLevels = b.feature_levels || b.klass_archetype_feature_levels
		bLevels.forEach(fl => {
			if (fl.level < lowestB){lowestB = fl.level}
		})
		if (lowestA === lowestB) {
			if (a.klass_id && b.klass_id){return 0}
			else if (a.klass_id){return -1}
			else if (b.klass_id){return 1}
		}
		return lowestA - lowestB
	})

	return sortedFeatures
}

const shouldOptionsKlassFeatureBeRemoved = (klassFeature, chosenArchetypes) => {
	let klassFeatureLevels = klassFeature.feature_levels.map(fl => fl.level)

	chosenArchetypes.forEach(arch => {
		arch.klass_archetype_features.forEach(archF => {
			archF.replaces_klass_features.forEach(replaceKF => {
				if (replaceKF.klass_feature_id === klassFeature.id){
					if (replaceKF.affects_specific_level){
						let i = klassFeatureLevels.indexOf(replaceKF.affects_specific_level)
						klassFeatureLevels.splice(i, 1)
					}
				}
			})
		})
	})

	return !klassFeatureLevels.length
}

export const tableDescriptionsByLevel = (klassFeatures, viewedArchetype, chosenArchetypes) => {
	let obj = {}

	chosenArchetypes.forEach(arch => {
		if (arch.id === viewedArchetype.id){
			viewedArchetype = {}
		}
	})

	klassFeatures.forEach(kf => {
		kf.feature_levels.forEach(fl => {
			if (!(fl.table_description === "" || fl.table_description === "none")){

				if (obj[fl.level] === undefined){obj[fl.level] = []}

				let slug = kf.name.toLowerCase().split(" ").join("-")
				obj[fl.level].push({klassFeatureId: kf.id, slug, tableDescription: fl.table_description, color: "black"})

			}
		})
	})

	chosenArchetypes.forEach(arch => {
		arch.klass_archetype_features.forEach(archF => {
			archF.klass_archetype_feature_levels.forEach(archFL => {
				if (!(archFL.table_description === "" || archFL.table_description === "none")){

					if (obj[archFL.level] === undefined){obj[archFL.level] = []}


						archF.replaces_klass_features.forEach(replaceKF => {
							if (replaceKF.replace_or_alter === "replace"){
								if (replaceKF.klass_feature_id){

									adjustExistingTableDescription(replaceKF.klass_feature_id, obj, "remove", replaceKF.affects_specific_level)

								}
							} else if (replaceKF.replace_or_alter === "alter"){
								adjustExistingTableDescription(replaceKF.klass_feature_id, obj, "alter", replaceKF.affects_specific_level)
							}
						})

						let slug = archF.name.toLowerCase().split(" ").join("-")
						obj[archFL.level].push({slug, tableDescription: archFL.table_description, color: "darkblue"})

					}
				})

		})
	})

	if (viewedArchetype.id){
		viewedArchetype.klass_archetype_features.forEach(archF => {
			archF.klass_archetype_feature_levels.forEach(archFL => {
				if (!(archFL.table_description === "" || archFL.table_description === "none")){

					if (obj[archFL.level] === undefined){obj[archFL.level] = []}

					let featureWasFoundAndAdjusted = false

					archF.replaces_klass_features.forEach(replaceKF => {
							if (replaceKF.klass_feature_id){

								featureWasFoundAndAdjusted = adjustExistingTableDescription(replaceKF.klass_feature_id, obj, "strikethrough", replaceKF.affects_specific_level)

							} else {
								featureWasFoundAndAdjusted = true

							}
					})

						let slug = archF.name.toLowerCase().split(" ").join("-")
						let color = featureWasFoundAndAdjusted ? "forestgreen" : "red"
						obj[archFL.level].push({slug, tableDescription: archFL.table_description, color})

				}
			})
		})
	}

	return obj
}

const adjustExistingTableDescription = (klassFeatureId, obj, action, specificLevel) => {

	let adjustmentMade = false

	for (let i = 1; i < 21; i++) {

		let j = obj[i].findIndex(td => td.klassFeatureId === klassFeatureId)
		if (j > -1){
			if (specificLevel === i || specificLevel === null){

				if (action === "remove"){
					obj[i].splice(j, 1)
				} else if (action === "strikethrough" && !obj[i][j].altered){
					obj[i][j] = {...obj[i][j], strikethrough: true, color: "darkgrey"}
					adjustmentMade = true
				} else if (action === "alter"){
					obj[i][j] = {...obj[i][j], altered: true}
				}

			}
		}

	}

	return adjustmentMade
}

export const tableDescriptionPerLevel = (lvl, klassFeatures, viewedArchetype, chosenArchetypes) => {
	let features = tableDescriptionsByLevel(klassFeatures, viewedArchetype, chosenArchetypes)

	let descriptions = []

	features.forEach(f => {
		let fls = f.feature_levels || f.klass_archetype_feature_levels
		let strikethrough = false;
		if (f.color === "darkgrey"){
			strikethrough = true
		}

		fls.forEach(fl => {
			if (fl.level === lvl && (fl.table_description !== "none" && fl.table_description !== "")){
				let slug = f.name.toLowerCase().split(" ").join("-")

				descriptions.push({slug, tableDescription: fl.table_description, color: f.color, strikethrough})
			}
		})
	})

	return descriptions
}

export const archetypeClassSkillNodes = (chosenArchetypes) => {
	let arr = []

	chosenArchetypes.forEach(arch => {
		arch.klass_archetype_features.forEach(archF => {
			archF.replaces_klass_features.forEach(replaceKF => {
				if (replaceKF.alters_class_skills){
					arr.push(archF.description)
				}
			})
		})
	})

	return arr
}

export const doesKlassFeatureHaveOptions = (klass) => {
	let id = 0

	klass.klass_features.forEach(kf => {
		if (kf.has_klass_feature_options){
			id = kf.id
		}
	})

	return id
}
