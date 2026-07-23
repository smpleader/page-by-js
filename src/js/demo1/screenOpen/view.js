import { router,  createContent, getTemplate, createView, useTemplate } from '#/pbj-fw.js'

let count = 0

// Export a clean, standardized page controller object
export const ViewOpen = createView({
  context: 'Dashboard',
  runOnceBefore()
  {
    const tpl = useTemplate('plain')

    tpl.add('layout',
      createContent(/*html*/ `
      <div class="d-flex h-100  w-100 text-center"> 
        <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <button class="btn btn-primary btn-lg" id="btnOpen">Open file</button>
            <div class="mt-5 red">  Should be red !!!  </div>
        </div>
      </div>
    `)
    )
  },
  render(){
    useTemplate('plain') 
    // do sth
    document.title = "Screen Open"
    console.log("Screen Open render") 
  }, 

  afterRender() {
    //const {router} = window.PBJ 
    console.log("Screen Open after render:", count++);
    
    const btnOpen = document.getElementById("btnOpen")
    if(btnOpen)
    { 
    
      btnOpen.addEventListener('click', async () => {
        console.log("Click From Screen open   move to Home");
        router.navigate('/')
      })
         
    }
  },

})