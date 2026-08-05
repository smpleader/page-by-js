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
    const {data} = router.getRouteState()

    tpl.add('content', createContent("We are having ID "+ data.id))
    
  },

  render() {
    document.title = "Page Test 2"
  }
})