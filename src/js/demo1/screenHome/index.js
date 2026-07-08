import { router, store, createContent } from '#/pbj-fw.js';
import { actions } from "./actions.js"
import { routers } from "./routers.js"
import getContext from './context.js'

export const pageHome = {

    register()
    {
        store.registerActions(getContext(), actions);
        // Inject routing path
        router.registerRoutes(getContext(), routers);

        console.log('✅ Home plugged in successfully.');
    }
}