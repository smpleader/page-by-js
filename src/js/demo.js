import '../scss/style.scss'
import { router, store } from './pbj-fw';

// plugin
import plugin1Register from './demo1'

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
  plugin1Register()
  
  // 4. Initial Run
  router.resolve({action: 'DOMContentLoaded'});

console.log();
  
});
 