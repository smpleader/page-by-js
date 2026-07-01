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
                <i class="small">Let open tcsv or csv file to start.</i>
                <div id="openResult" class="alert " role="alert" style="display:none"></div>
            </div>
        </div>
    </div>
    `;
  },

  initEvents() {
    const btnOpen = document.getElementById("btnOpen")
    if(btnOpen)
    {
      const openResult = document.getElementById("openResult")
      const smallLine = document.querySelector("i.small")
      btnOpen.addEventListener('click', async () => {
        
        const reader = await window.electronAPI.selectLocalFile();
        
        if (reader) {
          openResult.style.display = "block"

          if(reader.success)
          {
            smallLine.style.display = "none"
            btnOpen.disabled = true
            openResult.classList.add("alert-success")
            openResult.classList.remove("alert-warning")
            openResult.innerText = reader.message
            //console.log("Absolute file path fetched:", reader.file)
            setTimeout(() => {
              router.navigate("/scanner")
            }, 2000);
          }
          else
          {
            smallLine.style.display = "block"
            openResult.classList.remove("alert-success")
            openResult.classList.add("alert-warning")
            openResult.innerText = reader.error
          }

        } else {
          openResult.style.display = "none"
          console.log("User canceled the selection.");
        }
      });
    }
  },

  runOnce() {}
};