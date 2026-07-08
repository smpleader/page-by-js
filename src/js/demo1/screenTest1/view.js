import { router, store, safehtml as html } from '../../pbj-fw.js';
import getContext from './context.js';

// Export a clean, standardized page controller object
export const ViewTest1 = {

  title: 'Test1 Page',

  name: getContext(),

  render() {
    const { messages, ready } = store.getState();
    
    return html`
      <div class="container-fluid">
          <div class="row header">
            <h1> Hello ! </h1>
            <h2> Let recheck the system before we can use the application.. </h2>
            <div id="msgBoard">
            `+ messages.join('<br/>') +`
            ${{
              "-1": "<br/>Loading..",
              "0": `<p>There is a technical issue, please contact admin to get a support</p>`,
              "1": `<br/>Check done !`
            }[ready]}
            </div>
          </div>
      </div>
    `;
  },

  initEvents() {

    const { ready } = store.getState();

    if( ready == "1")
    {
      setTimeout(()=>{ router.navigate('/') }, 500)
    }
  },

  runOnce() {
    

    // get update from OS
    //    store.dispatch('RECEIVE_MESSAGE', newData.msg )
 
  }
};