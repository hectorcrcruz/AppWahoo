
import './App.css'
import { AppRoutes } from './routes'
import { AppProvider } from './provider';
import { ProductProvider } from './feature/contex/buyNotifications';

function App() {


  return (
    <AppProvider>
    <ProductProvider> 
    <AppRoutes />
    </ProductProvider>
  </AppProvider>
  )
}

export default App
