// description:

let link = '#'
let title = "--" 

const processData = (params) => {
    
        if( typeof params === "object" )
        {
            if( "link" in params)
                link = params.link
            
            if( "title" in params)
                title =  params.title 
        }
    }

const renderHtml = (...params) =>{

        if(params.length > 0)
        {
            processData (...params)
        }

        return `<p>Cover template for <a href="${link}" class="text-white">${title}</a>.</p>`
    }

export default {
    data: processData,
    render:  renderHtml
}