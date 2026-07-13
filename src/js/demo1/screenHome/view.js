import getContext from './context.js';

import { store, createContent, validComponent, getComponent, router } from '#/pbj-fw.js';
import { tplCover } from '#/demo2/templates/cover'
import allLayouts from './layouts'

let count = 0

export const ViewHome = {

  name: getContext(),

  render() {

    window.title =  'Home page'
    
    return tplCover.renderPage()
  
  },

  runOnceBefore()
  {
    // create layout
    Object.entries(allLayouts() ).forEach( ( [k, v] ) => {
        createContent(k, v)
    });

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