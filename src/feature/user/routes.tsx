import { ListProvider } from '../core/context/listContext'
import { CustomRouteObject } from '../core/types/routes'
import { lazyImport } from '../core/utils/lazyImport'







const { HomePage } = lazyImport(() => import('@/feature/pages/homePage'), 'HomePage')
const { CardComponentPage } = lazyImport(() => import('@/feature/pages/cardComponentPage'), 'CardComponentPage')

const { ListPage } = lazyImport(() => import('@/feature/pages/listPage'), 'ListPage')
const { NotFoundPage } = lazyImport(() => import('@/feature/pages/notFoundPage'), 'NotFoundPage')
const { CreatePage } = lazyImport(() => import('@/feature/pages/createPage'), 'CreatePage')



const adminRoutes: CustomRouteObject[] = [
  {
    name: '',
    path: '/home',
    element: <HomePage />
  },
  {
    name: '',
    path: '/home/:module',
    element: <CardComponentPage />
  },

  {
    name: '',
    path: '/home/:module/listarPage',
    element: (
      <ListProvider> 
    <ListPage />
    </ListProvider> 
  )

  },

  {
    name: '',
    path: '/home/:module/crearPage',
    element: <CreatePage />
  },
 
  {
    name: '',
    path: '/home/:module/actualizarPage/:id',
    element: <CreatePage />
  },


  {
    name: '',
    path: '*',
    element: <NotFoundPage />
  },

 
]


export default adminRoutes
