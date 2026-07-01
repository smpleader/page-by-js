import '../scss/style.scss'
import { router, store } from './pbj-fw.js';

// plugin
import { pageOpen } from './addons/screenOpen/index.js';
import { pageScanner } from './addons/screenScanner/index.js';
import { pageInstall } from './addons/screenInstall/index.js';
import { pageTest } from './addons/screenTest/index.js';

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'
//import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
// import { Tooltip, Toast, Popover } from 'bootstrap';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Core routing listeners
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('a[data-link]')) {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
    }
  });

  // 2. Core Subsystems
  store.subscribe((data) => router.resolve(data));

  // 3. Load Pluggable Modules
  pageScanner.register();
  pageOpen.register();
  pageInstall.register()
  pageTest.register()

  // 4. Initial Run
  router.resolve({action: 'DOMContentLoaded'});
  
});
 