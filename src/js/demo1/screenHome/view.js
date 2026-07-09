import getContext from './context.js';

import { store, createContent, validComponent, getComponent } from '#/pbj-fw.js';
import { tplCover } from '#/demo2/templates/cover'
import allLayouts from './layouts'

export const ViewHome = {

  title: 'Home page',

  name: getContext(),

  render() {

    // create layout
    Object.entries(allLayouts() ).forEach( ( [k, v] ) => {
        createContent(k, v)
    });

    const com1 = createContent({
      render: () => `A dumb line html without variable`
    })    

    tplCover.add('content', 'home.main')
    tplCover.add('content', com1)
    
    return tplCover.renderPage()
  
  }

};