import { createContext, useContext,  useEffect,  useMemo, useState, } from 'react';
import { DomicilioList, getDomicilioList } from '../services/servicesUserDomi';




type DomicilioType = {
    domicilioList: DomicilioList[]
    setDomicilioList: React.Dispatch<React.SetStateAction<DomicilioList[]>>
     fetchDomicilios: () => Promise<void>;
     searchFilter: number | undefined;
     setSearchFilter: React.Dispatch<React.SetStateAction<number | undefined>>;
}



const DomicilioContex = createContext<DomicilioType | undefined>(undefined)



export const DomicilioProvider = ({children}: {children: React.ReactNode}) => {
    
    const [domicilioList, setDomicilioList] = useState<DomicilioList[]>([]);
    const [searchFilter, setSearchFilter] = useState<number | undefined>(undefined);

   

    const fetchDomicilios = async () => {
    try {
      const data = await getDomicilioList({ IdDomicilio: searchFilter } );
      setDomicilioList(data);
    } catch (err) {
      console.error("Error al obtener domicilios", err);
    }
  };

   useEffect(() => {
    fetchDomicilios();
  }, [searchFilter]);

    const contextValue = useMemo(() => ({ domicilioList, setDomicilioList, fetchDomicilios, searchFilter, setSearchFilter }), [domicilioList, setDomicilioList, searchFilter, setSearchFilter]);

      return (
        <DomicilioContex.Provider value={contextValue}>
            {children}
        </DomicilioContex.Provider> 
    )
}


export const useDomicilioContext = () => {
    const context = useContext(DomicilioContex);
    if (!context) {
        throw new Error("useDomicilioContext debe usarse dentro de un DomicilioProvider");
    }
    return context;
}