import { createComponent } from '#/pbj-fw'
import headerProps from './header'
import footerProps from './footer'


export const registerComponents = () => {

    createComponent('cover.header', headerProps)
    createComponent('cover.footer', footerProps)
}