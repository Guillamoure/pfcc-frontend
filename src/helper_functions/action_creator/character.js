import Store from '../../store'

const { getState, dispatch } = Store


export const characterAction = (character) => dispatch({type: 'CHARACTER', character })

export const characterClassesAction = (array) => dispatch({type: 'CHARACTER_CLASSES', classes: array})

export const abilityScoreAction = ({ability, score}) => dispatch({type: 'ABILITY SCORE', ability, score })

export const abilityScoreImprovementAction = (ability_score) => dispatch({type: "ABILITY SCORE IMPROVEMENT", ability_score})
