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
  });

  useEffect(() => {
    if (idParam !== 0) {
      localStorage.setItem("id", String(idParam));
    }
  }, [idParam]);

  // Si no hay parametrización seleccionada, mostrar el modal
  if (idParam === 0) {
    return (
      <ModalSelectParametrizacion 
        onSelect={setIdParam}  
        showModal={true} 
      />
    );
  }

  return (
    <ParametrizacionProvider idParametrizacion={idParam}> 
      <AppProvider>
        <ProductProvider> 
          <AppRoutes />
        </ProductProvider>
      </AppProvider>
    </ParametrizacionProvider>
  );
}

export default App;
