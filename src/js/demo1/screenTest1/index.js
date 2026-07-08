import { router, store } from '../../pbj-fw.js';

import { actions } from "./actions.js"
import { routers } from "./routers.js"
import getContext from './context.js'

export const pageTest1 = {

    register()
    {
        store.registerActions(getContext(), actions);
        // Inject routing path
        router.registerRoutes(getContext(), routers);

        console.log('✅ Test1 Feature plugged in successfully.');
    }
}