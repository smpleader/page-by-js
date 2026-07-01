import { router, store } from '../../pbj-fw.js';

import { ViewTest } from  "./view.js"
import { actions } from  "./actions.js"
import getContext from './context.js'

export const pageTest = {

    register() {

        store.registerActions(getContext(), actions);
        
        // Inject routing path
        router.registerRoutes(getContext(), {
            '/test': ViewTest
        });

        console.log('✅ Main Screen  plugged in successfully.');
    }

} 