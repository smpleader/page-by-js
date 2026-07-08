import { pageOpen } from './screenOpen'
import { pageHome } from './screenHome'
import { pageTest1 } from './screenTest1'
import { pageTest2 } from './screenTest2'

/**
 * This plugins for features
 * - register endpoint and how its behaviors
 * - Each screen is a mini application
 */
export default () => 
{
  pageHome.register()
  pageOpen.register()
  pageTest1.register()
  pageTest2.register()
}