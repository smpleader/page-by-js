export default (msgs) => {

    let colLeft = `<ul class="text-left small">`
    for( let i = msgs.length -1; i>0; i--)
    {
        colLeft += `<li>${ msgs[i] }</li>`
    }

    colLeft += `</ul>`

    return colLeft
}