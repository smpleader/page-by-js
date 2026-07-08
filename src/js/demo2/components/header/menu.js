export default (list) => { 

    //todo: check which is current page <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>

    let ls = ''
    let link, title
    if(Array.isArray(list))
    {
        list.forEach(item => { 
        
            if(Array.isArray(item))
            {
                const [title, link] = item
                ls += `<a class="nav-link fw-bold py-1 px-0" href="${link}">${title}</a> `
            }
            else{
                const {title, link} = item
                ls += `<a class="nav-link fw-bold py-1 px-0" href="${link}">${title}</a> `
            }
        })
    }
                 
    return `<nav class="nav nav-masthead justify-content-center float-md-end">${ls}</nav>` 
}