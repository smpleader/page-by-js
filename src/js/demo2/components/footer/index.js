import './footer.css'
// description:

let link = '#'
let title = "--" 

const processData = (params) => {

    console.log("footer received", params);
    
    
        if( typeof params === "object" )
        {
            if( "link" in params)
                link = params.link
            
            if( "title" in params)
                title =  params.title 
        }
    }

const renderHtml = (...params) =>{

        /*if(params.length > 0)
        {
            processData (...params)
        }*/

        return `<p class="red">Cover template for <a href="${link}" class="text-white">${title}</a>.</p>`
    }

const dataStructure = () => {
    return {
        link: 'link',
        title: ['heading', {min: 20, max: 25}]
    }
}

export default {
    dataStructure: dataStructure,
    data: processData,
    render:  renderHtml,
    afterRender: () => { 
        console.log("after render of component here");
    }
}