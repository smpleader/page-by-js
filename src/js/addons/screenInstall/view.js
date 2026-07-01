import { router, store, safehtml as html } from '../../pbj-fw.js';
import getContext from './context.js';

// Export a clean, standardized page controller object
export const ViewInstall = {

  title: 'Installation Page',

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
    // trigger start once 
    window.electronAPI.startCheckInstall();

    // get update from OS
    window.electronAPI.onContentUpdate((newData) => {
                    
        store.dispatch('RECEIVE_MESSAGE', newData.msg )
        
        console.log('RECEIVE_MESSAGE FROM OS', newData.msg);
    })

    // listen on the final result
    window.electronAPI.checkInstallResult((result) => {
        const { ready } =  store.getState()

        if( ready == -1)
        {
          store.dispatch('BUTTON_READY', result.res)
        }

        if( result.res == "0" && typeof result.debug == "string" )
        {
          const msg = document.getElementById("msgBoard")
          msg.innerHTML += "<br/>Issue found:" + result.debug
        }
     
        console.log("FINAL", result);
    })
  }
};