// description

import { sitename } from "./sitename"
import  createMenu from "./menu"

let content = ''
const processData = (params) => {
        if( typeof params === "object" )
        {
            content +=  "sitename" in params ? sitename(params.sitename) : sitename()
            
            if( "menu" in params)
                content += createMenu(params.menu)
        }
    }

const renderHtml = (...params) =>{

        if(params.length > 0)
        {
            processData (...params)
        }

        return content
    }

export default  {
    data: processData,
    render:  renderHtml
}