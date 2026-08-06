import getContext from './context.js';

import { store, createContent, validComponent, getComponent, router, getTemplate, useTemplate, createView, useComponent, useModel } from '#/pbj-fw.js'; 
import allLayouts from './layouts' 
import context from './context.js';

let count = 0 

export const ViewHome = createView({

  context: getContext(),

  beforeRender() {
    //console.log("home to open");
    // router.navigate('/open')
  },

  render() { 

    let tplCover = useTemplate('cover') 
    tplCover.resetPosition('content')

    tplCover.add('content', 'home.main')
    tplCover.add('content', createContent( `<button id="btnOpen">Open</button>` ))
    tplCover.add('content', createContent( `<button id="btnSEFTest">SEF test</button>` ))
    tplCover.add('content', 'cover.head.1', {title: "the first"})
    tplCover.add('content', 'cover.head.2', {title: "the second"})

    getComponent('cover.footer').data({link: '###', title: "ohhhh"})
    
    document.title =  'Home page'  
  },

  runOnceBefore()
  {
    // create layout
    Object.entries(allLayouts() ).forEach( ( [k, v] ) => {
        createContent(k, v)
    });
    

  },

  afterRender()
  {
    console.log("Screen Home after render:", count++);
    
    const btn = document.getElementById("btnOpen") 
    btn.addEventListener("click", ()=>{
      console.log("Click from Screen Home to screen Open");
      router.navigate("/open")
    })

    const btn2 = document.getElementById("btnSEFTest") 
    btn2.addEventListener("click", ()=>{
      console.log("Click from Screen Home to screen SEF Test");
      router.navigate("/open/122")
    })
  }

})