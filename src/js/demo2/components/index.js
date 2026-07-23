import { createComponent } from '#/pbj-fw'
import headerProps from './header'
import footerProps from './footer'

let justOnce = 1

export const registerComponents = () => {

    if(justOnce)
    {
        createComponent('cover.header', headerProps)
        createComponent('cover.footer', footerProps)
        justOnce--
    }
}