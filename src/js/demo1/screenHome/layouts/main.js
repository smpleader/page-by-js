import { safehtml as html, store } from '#/pbj-fw.js';
import { validTemplate, createContent, createClassTest, validComponent } from '#/pbj-fw.js';

export default () => {
  //const {list} = store.getState()
  //console.log(list)
  
/** 

    const testClass = createClassTest("test1", {
      generate(x) {

        this.abc = (x) => "Hello " +x
        this.name2 = "xxx"
        this.name1 = "heheehe"
        return "You added "+x+" AND " + this.name1 + " AND " +  this.abc('name2') 
      },
      name1: "ahhh"
    })

    ${testClass.generate("This is a test")} getName shown ${ testClass._get('_name') }
    console.log( validComponent(testClass));
    */

    return  /*html*/ `
    <h1>Cover your page.</h1> 
    <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p> 
    <p class="lead"> <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a> </p> `

}