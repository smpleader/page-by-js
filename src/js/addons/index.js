import { router } from './libraries/router.js';
import { store } from './libraries/store.js';
import registerGlobalEvents from './screen/events.js';
// plugin
import { pageOpen } from './screenOpen/index.js';
import { pageScanner } from './screenScanner/index.js';
import { pageInstall } from './screenInstall/index.js';
import { pageTest } from './screenTest/index.js';


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
  registerGlobalEvents()
  pageScanner.register();
  pageOpen.register();
  pageInstall.register()
  pageTest.register()

  // 4. Initial Run
  router.resolve({action: 'DOMContentLoaded'});
});
