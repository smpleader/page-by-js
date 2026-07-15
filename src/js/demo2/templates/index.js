import { createTemplate } from '#/pbj-fw'
import coverProps  from './cover'
import plainProps from './plain'

export default () => {

    createTemplate( 'cover', ...coverProps)
    createTemplate( 'plain', ...plainProps)
    
}