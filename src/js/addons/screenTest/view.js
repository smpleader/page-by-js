import { router, store, safehtml as html } from '../../pbj-fw.js';

import getContext from './context.js'

// Export a clean, standardized page controller object
export const ViewTest = {

  name:  getContext(),
  
  title: 'Test page',
  
  render() {

    const { messages } = store.getState();
    
    return html`
      <div class="d-flex h-100  w-100 text-center"> 
        <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <button class="btn btn-primary btn-lg" id="btnTest">Open Install</button>
            <div class="mt-5">
                <div class="alert alert-info" role="alert">`+ messages.join('<br/>') +`</div>
            </div>
        </div>
    </div>
    `;
  },

  initEvents() {

    const btnTest = document.getElementById("btnTest")
    if(btnTest)
    {
        btnTest.addEventListener('click', ()=>{
            router.navigate('/install')
        })
    }
  },

  runOnce() {}
};