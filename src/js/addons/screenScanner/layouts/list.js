const showRow = (item) => {

    return `<tr id="tr${ item.id }" class="${ item.selected }">
    <td>${ item.id }</td>
    <td>${ item.URL }</td>
    <td>${ item.tid }</td>
    <td></td>
</tr>`
}

export default (list) => {

    let rows = ''
    for( let i = 0; i < list.length; i++)
    {
        rows += showRow( list[i] )
    }

    return rows
}