
import { CustomRouteObject } from '../core/types/routes'
import { lazyImport } from '../core/utils/lazyImport'
import { DomicilioProvider } from './contex/useContexDomicilio'







const { HomePage } = lazyImport(() => import('@/feature/userDomicilary/pages/homePage'), 'HomePage')
const {  ListOrderPage} = lazyImport(() => import('@/feature/userDomicilary/pages/listOrderPage'), 'ListOrderPage')




const deliveryRoutes: CustomRouteObject[] = [
  {
    name: '',
    path: '/home/domi',
    element: (
       <DomicilioProvider>
         <HomePage />
       </DomicilioProvider>
         
    ) 
  },

  {
    name: '',
    path: '/home/domi/list',
    element:( 
    <DomicilioProvider>
    <ListOrderPage />
    </DomicilioProvider>
    )
  },
  
 
]


export default deliveryRoutes