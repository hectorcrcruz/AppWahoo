
import './App.css'
import { AppRoutes } from './routes'
import { AppProvider } from './provider';
import { ProductProvider } from './feature/contex/buyNotifications';
import { ParametrizacionProvider } from './context/parametrizacionContext';
import { useState } from 'react';
import { ModalSelectParametrizacion } from './feature/core/component/modal';

function App() {

    const [idParam, setIdParam] = useState<number | null>(null);
    const showModal = true

  // Mostrar modal si aún no se ha seleccionado una parametrización
  if (!idParam) {
    return <ModalSelectParametrizacion onSelect={setIdParam}  showModal={showModal} />;
  }


  return (
    
    <ParametrizacionProvider  idParametrizacion={idParam}> 
    <AppProvider>
    <ProductProvider> 
    <AppRoutes />
    </ProductProvider>
  </AppProvider>
  </ParametrizacionProvider>

  )
}

export default App
