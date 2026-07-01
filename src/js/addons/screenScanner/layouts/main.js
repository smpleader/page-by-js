import { safehtml as html, store } from '../../../pbj-fw.js';

import listRows from "./list.js"
import showMessage from "./messages.js"

export default () => {

    const { messages, list, current} = store.getState()

    return  `
<div class="container-fluid">
    <div class="row header">
        <div class="col">
            <h2>NFC Tag Writer 
                <a class="small text-right" href="https://www.jikometrix.net/">Jiko Developer Team</a>
            </h2>
        </div>
    </div>
    <div class="row main">
        <div class="col-12 col-lg-4">
            <h4>Device logs</h4> 
            <div class="overflow">
            ${  showMessage(messages) }
            </div>
        </div>
        <div class="col-12 col-lg-8">
            <h4>URL List <span class="small">${ current } Total: ${ list.length }</span></h4>
            <div class="overflow">
                <table class="table table-striped">
                    <tr>
                        <td>#</td>
                        <td>URL</td>
                        <td>Tag ID</td>
                        <td></td>
                    </tr>
                    ${ listRows(list) }
                </table>
            </div>
        </div>
    </div> 
    
    <div class="row">
        <div class="col-12">
            <p class="text-center"></p>
        </div>
    </div>
</div>`

}