import { getTemplate, getComponent } from '#/pbj-fw.js'
import { registerComponents } from "#/demo2/components"
import  './style.scss'


const registerDefaultCom = () => {
    registerComponents()
    getTemplate('cover').add("header", "cover.header")
    getTemplate('cover').add("footer", "cover.footer")
}

const createPage = () => {

    console.log("Template Cover  run verytime view render !")
    
}

const layout = /*html*/  `
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"> 
    <header class="mb-auto"> 
        <div> 
            {header}
        </div> 
    </header> 
    <main class="px-3"> 
        {content}
    </main>
    <footer class="mt-auto text-white-50"> 
        {footer}
    </footer>
</div>
`

export default [
    {
        render: createPage,
        runOnce: registerDefaultCom
    }, 
    layout
]
