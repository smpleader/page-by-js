import getContext from './context.js';
import layoutMain from './layouts/main.js'
import { store } from '../../pbj-fw.js';


export const ViewScanner = {

  title: 'NFC SCan',

  name: getContext(),

  render() { return layoutMain() },

  initEvents() {},

  runOnce() {
    // trigger start scan
    window.electronAPI.startScanner();

    // listen to scanner
    window.electronAPI.onScanUpdate((newData) => {
            
        store.dispatch('RECEIVE_DATA', newData )
        
        console.log('RECEIVE_DATA FROM OS', newData);
    })
 
    // Resize the window to 1200px width and 800px height
    window.electronAPI.resizeWindow(1200, 700); 
  }
};