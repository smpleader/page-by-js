export const actions = {
  'DEFAULT_VALUES':  (state, payload) =>{
    return {
      state,
      ...{messages: [], list: [], current: ''}
    };
  },
  'RECEIVE_DATA': (state, payload) =>{

    if('current' in payload)
    {
      state.current = payload.current
    }

    if('message' in payload)
    {
      state.messages.push(payload.message)
    }

    if('list' in payload)
    {
      state.list = payload.list
    }

    return  {
      ...state 
    }
  }
}