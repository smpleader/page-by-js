import { router, store } from '#/pbj-fw.js'

import { ViewSEFTest } from  "./view.js"
import { actions } from  "./actions.js"
import getContext from './context.js'

export const pageSEFTest = {

    register() {

        store.registerActions(getContext(), actions);
        
        // Inject routing path
        router.registerRoutes(getContext(), {
            '/open/:id': ViewSEFTest
        });

        console.log('✅ SEF Test  plugged in successfully.');
    }

} 