import Store from '../../store'

const { getState, dispatch } = Store

export const settingsAction = (settings) => dispatch({type: 'SET SETTINGS', settings})
export const characterAction = (character) => dispatch({type: 'CHARACTER', character })

export const characterClassesAction = (array) => dispatch({type: 'CHARACTER_CLASSES', classes: array})

export const abilityScoreAction = ({ability, score}) => dispatch({type: 'ABILITY SCORE', ability, score })

export const abilityScoreImprovementAction = (ability_score) => dispatch({type: "ABILITY SCORE IMPROVEMENT", ability_score})

export const endTurnAction = () => dispatch({type: "NEW TURN"})

export const replaceCharacterArrayAction = (adjust, value) => dispatch({type: "ADJUST CHARACTER REPLACE VALUE IN ARRAY", adjust, value})

// export const replaceCharacterInfoArrayAction = (adjust, value) => dispatch({type: "ADJUST CHARACTER INFO REPLACE VALUE IN ARRAY", adjust, value})

export const replaceCharacterInfoAction = (adjust, value, options) => dispatch({type: 'ADJUST CHARACTER INFO', adjust, value})

export const replaceCharacterAction = (adjust, value) => dispatch({type: 'ADJUST CHARACTER', adjust, value})

export const triggerTurnActionAction = action => dispatch({type: 'TRIGGER ACTION', action})

export const discoverEquipmentAction = (detail, id) => dispatch({type: 'DISCOVER EQUIPMENT', detail, id})
