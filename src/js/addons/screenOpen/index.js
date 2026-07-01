import { router, store } from '../../pbj-fw.js';
import { ViewOpen } from  "./view.js"
import getContext from './context.js'

export const pageOpen = {

    register()
    {
        // Inject routing path
        router.registerRoutes(getContext(), {
            '/': ViewOpen
        }); 

        console.log('✅ Open Screen  plugged in successfully.')
    }
}