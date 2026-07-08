import { router, store } from '../../pbj-fw.js';

import { ViewTest } from  "./view.js"
import { actions } from  "./actions.js"
import getContext from './context.js'

export const pageTest2 = {

    register() {

        store.registerActions(getContext(), actions);
        
        // Inject routing path
        router.registerRoutes(getContext(), {
            '/test2': ViewTest
        });

        console.log('✅ Main Screen  plugged in successfully.');
    }

} 