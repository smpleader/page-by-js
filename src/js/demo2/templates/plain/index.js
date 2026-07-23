import { createTemplate, getComponent } from '#/pbj-fw.js'
import { registerComponents } from "#/demo2/components" 

registerComponents()

const registerDefaultCom = () => {
    //tplPlain.add("main", "cover.footer", {link: "#", title: "PBJ Team"})
}

const createPage = () => {

    console.log("Template Plain:  function run verytime view render !")
    
}

const layout = /*html*/  
`
<div class=""> 
    {layout}
</div>
`
export default [
    {
        render: createPage,
        runOnce: registerDefaultCom
    }, 
    layout
]
