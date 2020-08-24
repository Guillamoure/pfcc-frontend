import store from '../../store'
import { endTurnAction } from '../action_creator/character'
import { incrementFeatureUsage } from '../calculations/feature_usage'

export const endTurn = async () => {
	// NEW DATA
	// STORED DATA
	const { character, character_info } = store.getState()

	// CALCULATED DATA
	//
	// character.character_klass_feature_usages.forEach(ckfu => {
	// 	incrementFeatureUsage(ckfu)
	// })
	character.applicable_klass_features.forEach(akf => {
		akf.features.forEach(async f => {
			if (f.usage?.limit || f.usage?.limit_frequency && !f.usage?.destroy_after_use && character_info.activeFeatures.find(af => af.sourceId === akf.id && af.source === "applicable_klass_features" && af.featureId === f.id)){
				let ckfus = character.character_klass_feature_usages.filter(fu => fu.klass_feature_id === akf.id)
				await incrementFeatureUsage({...f, sourceId: akf.id, klassFeatureName: akf.name, klassId: akf.klass_id, character_klass_feature_usages: ckfus, source: "applicable_klass_features"})
			}
		})
	})

	// {...f, sourceId: akf.id, klassFeatureName: akf.name, klassId: akf.klass_id, character_klass_feature_usages: ckfus, source: "applicable_klass_features"}
	// character_info.activeFeatures.forEach(af => {
	// 	let ability = character[af.source].find(ability => ability.id === af.sourceId)
	// 	let feature = ability.features.find(f => f.id === af.featureId)
	// 	incrementFeatureUsage({...feature, klassId: ability.id})
	// })

	endTurnAction()
}
