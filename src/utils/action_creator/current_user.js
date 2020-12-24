import Store from '../../store'

const { getState, dispatch } = Store

export const removeEncounterAction = (campaignId, encounterId) => dispatch({type: 'REMOVE ENCOUNTER', campaignId, encounterId})
export const updateEncounterAction = (campaignId, encounter) => dispatch({type: 'UPDATE ENCOUNTER', campaignId, encounter})
