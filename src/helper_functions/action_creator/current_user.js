import Store from '../../store'

const { getState, dispatch } = Store

export const removeEncounter = (campaignId, encounterId) => dispatch({type: 'REMOVE ENCOUNTER', campaignId, encounterId})
