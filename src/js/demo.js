import { bootup } from './pbj-fw';

// plugin
import registerPlugin from './demo1'

// template
import registerTemplate from './demo2/templates'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'
//import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
// import { Tooltip, Toast, Popover } from 'bootstrap';

bootup( ()=>{
    registerTemplate() 
    registerPlugin()
})
