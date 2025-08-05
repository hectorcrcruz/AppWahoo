
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
       <div className='bg-primary-50 h-auto p-2 rounded-md mr-4 ml-4 mt-5'> 
        <h1 className='w-full text-lg '>Promociones y descuentos especiales</h1>
        </div>
        <div className='grid  grid-cols-1     md:grid-cols-1  gap-4 h-14 md:h-40 lg:h-48 justify-center mx-auto mt-5' style={{
          backgroundImage: `url(${dataList[0]?.imagenPromocion})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
            
            <div className='text-center    w-48   leading-none mx-auto md:w-auto md:col-span-3   justify-center item-center  md:flex flex-col '> 
             <span className='text-center    font-medium text-xs  md:text-2xl md:w-5/12 justify-center mx-auto' >Promociones en   la Regatta en:
                Camarones 
                Langostas 
                Ostiones 
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

