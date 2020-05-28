import localhost from './localhost'

export const fetchCharacter = (data) => {
  return (dispatch) => {
    data.character.character_magic_items.forEach(cmi => {
      if (cmi.equipped){
        cmi.magic_item.features.forEach(f => {
          if (!!f.skill_bonuses.length){
            f.skill_bonuses.forEach(sk => {
              const { skill_id, bonus, bonus_type, duration } = sk
              // const conditions = sk.feature_skill_bonus_conditions.map(c => {return {condition: c.condition}})
              dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: cmi.magic_item.name}})
            })
          }
          if (!!f.stat_bonuses.length){
            f.stat_bonuses.forEach(st => {
              const { statistic, bonus, bonus_type, duration } = st
              const conditions = st.feature_stat_bonus_conditions.map(c => {return {condition: c.condition}})
              dispatch({type: 'BONUS', bonus: {type: 'stat', statistic, bonus, bonus_type, duration, source: cmi.magic_item.name, conditions}})
            })
          }
          if (!!f.skill_notes.length){
            f.skill_notes.forEach(sk => {
              const { skill_id, note} = sk
              dispatch({type: 'BONUS', bonus: {type: 'note', skill_id, note, source: cmi.magic_item.name}})
            })
          }
          if (!!f.languages.length){
            f.languages.forEach(l => {
              const { language, note } = l
              dispatch({type: 'EFFECT', effect: {type: 'language', language, note, source: cmi.magic_item.name}})
            })
          }
        })
      }
    })
    data.character.uniq_klasses.forEach(kl => {
      kl.klass_features.forEach(kf => {
        kf.features.forEach(f =>{
          if (!!f.skill_bonuses.length){
            f.skill_bonuses.forEach(sk => {
              const { skill_id, bonus, bonus_type, duration } = sk
              // const conditions = sk.feature_skill_bonus_conditions.map(c => {return {condition: c.condition}})
              dispatch({type: 'BONUS', bonus: {type: 'skill', skill_id, bonus, bonus_type, duration, source: kf.name}})
            })
          }
          if (!!f.skill_notes.length){
            f.skill_notes.forEach(sk => {
              const { skill_id, note} = sk
              // debugger
              dispatch({type: 'BONUS', bonus: {type: 'note', skill_id, note, source: kf.name}})
            })
          }
        })
      })
    })
    data.character.applicable_klass_features.forEach((kf) => renderFeaturesFromClass(kf, dispatch))
  }
}

const renderFeaturesFromClass = (kf, dispatch) => {
  if (kf.features.length){
    kf.features.forEach(feature => {
      if (feature.weapon_proficiencies.length){
        feature.weapon_proficiencies.forEach((wp) => dispatchWeaponProficiencies(wp, dispatch))
      }
    })
  }
}

const dispatchWeaponProficiencies = (wp, dispatch) => {
  const { additive, proficiency_group, weapon_id } = wp
  dispatch({type: "PROFICIENCY", detail: {
    type: "weapon", additive, proficiency_group, weapon_id
  }})
}

export function changeAmmo(characterWeapon, stringAmmoId) {
  return function (dispatch) {
    let ammoId = parseInt(stringAmmoId)

    fetch(`${localhost}/api/v1/character_weapons_ammo/${characterWeapon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Response": "application/json"
      },
      body: JSON.stringify({ammo_id: ammoId})
    })
      .then(r => r.json())
      .then(data => {
        dispatch({type: "CHANGE AMMO", characterWeapon, ammoId})
      })
  }
}

export function expendAmmo(characterWeapon, characterWeaponAmmo){
  return function (dispatch){
    let ammunition_amount = characterWeaponAmmo ? characterWeaponAmmo.ammunition_amount - 1 : 0

    fetch(`${localhost}/api/v1/character_weapons_update_ammo/${characterWeapon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Response": "application/json"
      },
      body: JSON.stringify({magazine: characterWeapon.magazine - 1, ammunition_amount})
    })
      .then(r => r.json())
      .then(data => {
        dispatch({type: "UPDATE AMMO", cw: characterWeapon, magazine: characterWeapon.magazine - 1, ammunition_amount})
      })
  }
}

export function reloadAmmo(characterWeapon, magazine){
  return function (dispatch){
    fetch(`${localhost}/api/v1/character_weapons_update_ammo/${characterWeapon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Response": "application/json"
      },
      body: JSON.stringify({magazine: magazine})
    })
      .then(r => r.json())
      .then(data => {
        dispatch({type: "UPDATE AMMO", cw: characterWeapon, magazine})
      })
  }
}

export const exitModal = () => ({type: "MODAL", remove: true})
