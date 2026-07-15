import getContext from './context.js';

import { store, createContent, validComponent, getComponent, router, getTemplate, setTemplate } from '#/pbj-fw.js'; 
import allLayouts from './layouts' 

let count = 0

export const ViewHome = {

  name: getContext(),

  render() {

    let tplCover = getTemplate('cover')

    window.title =  'Home page'
    
    return tplCover.renderPage()
  
  },

  runOnceBefore()
  {
    // create layout
    Object.entries(allLayouts() ).forEach( ( [k, v] ) => {
        createContent(k, v)
    });

    setTemplate('cover')
    let tplCover = getTemplate('cover') 

    tplCover.add('content', 'home.main')
    tplCover.add('content', createContent( `<button id="btnOpen">Open</button>` ))

  },

  afterRender()
  {
    console.log("screenhome cout:", count++);
    
    const btn = document.getElementById("btnOpen") 
    btn.addEventListener("click", ()=>{
      router.navigate("/open")
    })
  }

};