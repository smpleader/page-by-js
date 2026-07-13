import { router, safehtml as html } from '../../pbj-fw.js';

let count = 0
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

  afterRender() {
    //const {router} = window.PBJ 
    console.log("s open cout:", count++);
    
    const btnOpen = document.getElementById("btnOpen")
    if(btnOpen)
    { 
    
      btnOpen.addEventListener('click', async () => {
        console.log("button from screen open");
        router.navigate('/')
      })
        
         
    }
  },

  runOnceBefore() {}
};