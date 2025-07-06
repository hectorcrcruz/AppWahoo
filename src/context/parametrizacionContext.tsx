import React, { createContext, useContext, useEffect, useState } from "react";
import { ListParams, getListParametrizacion } from "@/feature/core/services/listParametrizacionService";

interface ParametrizacionContextType {
  parametros: ListParams | null;
  setParametros: (params: ListParams) => void;
  loading: boolean;
  error: string | null;
}

const ParametrizacionContext = createContext<ParametrizacionContextType | undefined>(undefined);

export const ParametrizacionProvider = ({
  children,
  idParametrizacion,
}: {
  children: React.ReactNode;
  idParametrizacion: number;
}) => {
  const [parametros, setParametros] = useState<ListParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const localStorageKey = `parametros-${idParametrizacion}`;
    const fetchParametros = async () => {
      try {
        setLoading(true);
        const data = await getListParametrizacion({ IdParametrizacion: idParametrizacion });
        setParametros(data[0]);
        
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        setError(null);
      } catch (e) {
        setError("Error cargando la parametrización");
      } finally {
        setLoading(false);
      }
    };

    fetchParametros();
  }, [idParametrizacion]);

  const value = React.useMemo(() => ({ parametros, setParametros, loading, error }), [parametros, loading, error]);

  return (
    <ParametrizacionContext.Provider value={value}>
      {children}
    </ParametrizacionContext.Provider>
  );
};

export const useParametrizacionContext = () => {
  const context = useContext(ParametrizacionContext);
  if (!context) {
    throw new Error("useParametrizacionContext debe usarse dentro de un ParametrizacionProvider");
  }
  return context;
};
