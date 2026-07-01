import { router, store } from '../../pbj-fw.js';

import { actions } from "./actions.js"
import { routers } from "./routers.js"
import getContext from './context.js'

export const pageInstall = {

    register()
    {
        store.registerActions(getContext(), actions);
        // Inject routing path
        router.registerRoutes(getContext(), routers);

        console.log('✅ Install Feature plugged in successfully.');
    }
}