export const actions = {
  'DEFAULT_VALUES':  (state, payload) =>{
    return {
      ...state,
      messages: [],
      ready: -1
    };
  },
  'RECEIVE_MESSAGE': (state, payload) =>{

    state.messages.push(payload)
    return {
      ...state
    };
  },
  'BUTTON_READY': (state, payload) =>{

    state.ready = payload
    return {
      ...state
    };
  },
}