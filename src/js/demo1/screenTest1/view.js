import { router, store, generateComponentData, getComponent } from '#/pbj-fw.js';
import getContext from './context.js';

// Export a clean, standardized page controller object
export const ViewTest1 = {

  title: 'Test1 Page',

  name: getContext(),

  render() {
    const { messages, ready } = store.getState();

    const comFooter = getComponent('cover.footer')

    generateComponentData('cover.footer', (structure)=>{

      console.log("data structure of component cover.footer", structure);
      if(structure)
      {
        console.log("create data for link and title here");
      }

      return {link: "https://google.com", title: "Yes, it get generated"}
    })
    
    return /*html*/`
      <div class="container-fluid">
          <div class="row header">
            <h1> Hello ! </h1>
            <h2> Here we put a demo  </h2>
            <h3>Demo auto generate "generateComponentData"</h3>

            ${comFooter.render()}

            <div id="msgBoard">
            <h3>Demo message list from "store"</h3>
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

  afterRender() {
 
  }
};