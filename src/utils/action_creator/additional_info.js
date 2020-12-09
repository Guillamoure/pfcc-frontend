import Store from '../../store'

const { getState, dispatch } = Store

export const tooltipAction = (message, target) => dispatch({type: 'TOOLTIP', message, target})
export const addToSkillsAction = (skill) => dispatch({type: 'ADD SKILL', skill})
