
import { SearchComponent } from '../searchComponent/searchComponent'

import { useGetList } from '../../services/useGetList';

interface PromotionItem {
  imagenPromocion?: string;
  codigoPromocional: string;
  descripcionPromocion: string;
  usuarioAdd?: string;
  usuarioUp?: string;
  // agrega aquí otras propiedades si es necesario
}

interface PromotionProps {
OnchagueValues: (values: string | number) => void;
searchValues: string | number | undefined
}

export const Promotion:React.FC<PromotionProps> = ({OnchagueValues, searchValues}) => {
  


   const {dataList} = useGetList({moduleRour: 'Promoción'}) as { dataList: PromotionItem[], isLoading: boolean };
 

  return (
    <div>
       <div className='bg-primary-50 h-12 p-2 rounded-md mr-4 ml-4 mt-5'> 
        <h1 className='w-full text-lg '>Promociones y descuentos especiales</h1>
        </div>
        <div className='grid  grid-cols-1 md:grid-cols-3 gap-4 justify-center mx-auto mt-5' style={{
          backgroundImage: `url(${dataList[0]?.imagenPromocion})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
            
            <div className='text-center   col-span-3 justify-center mx-auto '> 
             <span className='text-center font-medium' >Promociones en  <br /> la Regatta en:
                Camarones <br />
                Langostas <br />
                Ostiones <br />
                Cazuelas de Mariscos

             </span>
             </div>
            </div>
        <div className='bg-primary-50  md:h-16 p-2 rounded-md mr-4 ml-4 mt-10  '>  
             <SearchComponent  
               onSearch={(values) => {
                OnchagueValues(values.id)
               }} 
               label={'Categorías +  | Ofertas | Mís Compras'} 
               searchParams={searchValues} 
             />
            </div>
       </div>

   
  )
}

