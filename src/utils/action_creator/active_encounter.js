import Store from '../../store'

const { getState, dispatch } = Store

export const startEncounterAction = (encounter) => dispatch({type: "START ENCOUNTER", encounter})
export const endEncounterAction = () => dispatch({type: "END ENCOUNTER"})
