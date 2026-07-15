import { createTemplate, getComponent } from '#/pbj-fw.js'
import { registerComponents } from "#/demo2/components" 

registerComponents()

const registerDefaultCom = () => {
    //tplPlain.add("main", "cover.footer", {link: "#", title: "PBJ Team"})
}

const createPage = () => {

    console.log("this will run verytime view render !")
    
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
    layout,
    `
    <div class=""> 
        {layout}
    </div>
    `
]
