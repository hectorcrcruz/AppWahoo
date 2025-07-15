
import './App.css'
import { AppRoutes } from './routes'
import { AppProvider } from './provider';
import { ProductProvider } from './feature/contex/buyNotifications';
import { ParametrizacionProvider } from './context/parametrizacionContext';
import { useEffect, useState } from 'react';
import { ModalSelectParametrizacion } from './feature/core/component/modal';

function App() {
    const [idParam, setIdParam] = useState<number>(() => {
  const stored = localStorage.getItem("id");
  return stored ? Number(stored) : 0;
})
    const showModal = true
 
    
  // Mostrar modal si aún no se ha seleccionado una parametrización

  useEffect(() => {
  if (idParam !== 0) {
    localStorage.setItem("id", String(idParam));
  }
}, [idParam, ]);
  
 if (idParam === 0 ) {
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
