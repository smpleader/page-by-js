import { currentComponent } from "#/pbj-fw";
// description:

let data = {} 

const processData = (...params) => {

    if(params.length)
    {
        const key = currentComponent('_name')
        data[key] = params[0]
    }
    // console.log("head received",  params)
     
}

const renderHtml = (...params) =>{

    const key = currentComponent('_name') 

    let title = "No heading"
    title = data[key]?.title

    return `<h2>${title}</h2>`
}

const dataStructure = () => {
    return {
        title: ['heading', {min: 20, max: 25}]
    }
}

export default {
    dataStructure: dataStructure,
    data: processData,
    render:  renderHtml,
    afterRender: () => { 
        //console.log("after render of component head");
    }
}