import { useComponent, useModel, createContent, createView, useTemplate } from '#/pbj-fw'

import getContext from './context'
import {registerModel} from './model'

// Export a clean, standardized page controller object
export const ViewTest = createView({

  context:  getContext(), 

  runOnceBefore() {
    registerModel()
  },

  beforeRender(){
    useModel("modelTest")
    useTemplate('cover') 
    useComponent('cover.footer')
  },

  render() {
    document.title = "Page Test 2"
  }
})