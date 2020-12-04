import Store from '../../store'

const { getState, dispatch } = Store

export const addArchetypesAction = (klassId, archetypes) => dispatch({type: 'STORE ARCHETYPES', klassId, archetypes})
