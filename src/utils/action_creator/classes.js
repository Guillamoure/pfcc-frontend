import Store from '../../store'

const { getState, dispatch } = Store

export const addArchetypesAction = (klassId, archetypes) => dispatch({type: 'STORE ARCHETYPES', klassId, archetypes})
export const addOptionsAction = (klassId, klassFeatureId, options) => dispatch({type: 'STORE OPTIONS', klassId, klassFeatureId, options})
