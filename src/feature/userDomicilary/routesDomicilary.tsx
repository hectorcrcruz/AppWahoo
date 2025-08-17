
import { CustomRouteObject } from '../core/types/routes'
import { lazyImport } from '../core/utils/lazyImport'







const { HomePage } = lazyImport(() => import('@/feature/userDomicilary/pages/homePage'), 'HomePage')
const {  ListOrderPage} = lazyImport(() => import('@/feature/userDomicilary/pages/listOrderPage'), 'ListOrderPage')




const deliveryRoutes: CustomRouteObject[] = [
  {
    name: '',
    path: '/home/domi',
    element: <HomePage />
  },

  {
    name: '',
    path: '/home/domi/list',
    element: <ListOrderPage />
  },
  
 
]


export default deliveryRoutes