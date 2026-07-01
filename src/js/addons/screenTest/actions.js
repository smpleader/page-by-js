export const actions = {
  'DEFAULT_VALUES':  (state, payload) =>{
    return {
      ...state,
      messages: []
    };
  },
  'RECEIVE_MESSAGE': (state, payload) =>{

    state.messages.push(payload)
    return {
      ...state
    };
  }
}