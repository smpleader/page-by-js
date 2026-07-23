import getContext from './context.js';

import { store, createContent, validComponent, getComponent, router, getTemplate, useTemplate, createView, useComponent, useModel } from '#/pbj-fw.js'; 
import allLayouts from './layouts' 
import context from './context.js';

let count = 0 

export const ViewHome = createView({

  context: getContext(),

  render() { 
    getComponent('cover.footer').data('name_here', {link: '###', title: "ohhhh"})
    useTemplate('cover') 
    document.title =  'Home page'  
  },

  runOnceBefore()
  {
    // create layout
    Object.entries(allLayouts() ).forEach( ( [k, v] ) => {
        createContent(k, v)
    });
    
    let tplCover = getTemplate('cover') 

    tplCover.add('content', 'home.main')
    tplCover.add('content', createContent( `<button id="btnOpen">Open</button>` ))

  },

  afterRender()
  {
    console.log("Screen Home after render:", count++);
    
    const btn = document.getElementById("btnOpen") 
    btn.addEventListener("click", ()=>{
      console.log("Click from Screen Home to screen Open");
      router.navigate("/open")
    })
  }

})