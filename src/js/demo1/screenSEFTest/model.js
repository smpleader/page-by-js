import { createModel, getComponent } from "#/pbj-fw.js";

export const registerModel = () => createModel('modelTest', (structure, com)=>{

    // NOTICE: model should work on structure, not based com name like this
    let result = {}
    console.log(structure, com);
    
    switch (com) {
        case 'cover.footer':
            return  {link: "https://mds.com", title: "Data is from model"}
        case 'cover.header':
            return {
                menu: [
                    ["Demo1", "#"],
                    ["Demo2", "#"],
                    ["Demo2", "#"],
                    ["Demo2", "#"],
                    ["Demo2", "#"]
                ]
            }
    }

    return result
})