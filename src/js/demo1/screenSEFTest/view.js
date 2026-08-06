import { useComponent, getComponent, useModel, createContent, createView, useTemplate, router } from '#/pbj-fw'

import getContext from './context'
import { registerModel } from './model'

// Export a clean, standardized page controller object
export const ViewSEFTest = createView({

  context:  getContext(), 

  runOnceBefore() {
    registerModel()
  },

  beforeRender(){
    useModel("modelTest")
    const tpl = useTemplate('cover')
    tpl.resetPosition("content")
    getComponent('cover.footer').data({title: "Oh new", link: "#"})

    // get id from slug
    const {data} = router.getParams()

    tpl.add('content', createContent("We are having ID "+ data.id))
    tpl.add('content', createContent("<button id='btnOpen'>Go to Open page</button>"))
    
  },

  render() {
    document.title = "Page Test 2"
  },

  afterRender()
  {
    const btn = document.getElementById("btnOpen") 
    btn.addEventListener("click", ()=>{
      console.log("Click from Open Detail to screen Open");
      router.navigate("/open")
    })
  }
})