import { createComponent } from '#/pbj-fw'
import headerProps from './header'
import headProps from './head'
import footerProps from './footer'

let justOnce = 1

export const registerComponents = () => {

    if(justOnce)
    {
        createComponent('cover.header', headerProps)
        createComponent('cover.footer', footerProps)
        createComponent('cover.head.1', headProps)
        createComponent('cover.head.2', headProps)
        justOnce--
    }
}