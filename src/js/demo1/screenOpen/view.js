import { router, safehtml as html } from '../../pbj-fw.js';

// Export a clean, standardized page controller object
export const ViewOpen = {
  title: 'Dashboard',
  
  render() {
    
    return html`
      <div class="d-flex h-100  w-100 text-center"> 
        <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <button class="btn btn-primary btn-lg" id="btnOpen">Open file</button>
            <div class="mt-5">  
            </div>
        </div>
    </div>
    `;
  },

  initEvents() {
    //const {router} = window.PBJ 
    
    const btnOpen = document.getElementById("btnOpen")
    if(btnOpen)
    {
      const openResult = document.getElementById("openResult")
      const smallLine = document.querySelector("i.small")
      btnOpen.addEventListener('click', async () => {
        router.navigate('/')
      })
        
         
    }
  },

  runOnce() {}
};