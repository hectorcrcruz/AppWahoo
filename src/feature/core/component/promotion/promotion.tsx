
import { SearchComponent } from '../searchComponent/searchComponent'

import { useGetList } from '../../services/useGetList';

interface PromotionItem {
  imagenPrimariaPromocion?: string;
  imagenSecundariaPromocion?: string;
  codigoPromocional: string;
  descripcionPromocion: string;
  usuarioAdd?: string;
  usuarioUp?: string;

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
        <div className="relative w-12/12 mr-5 ml-5 justify-center mx-auto h-40 md:h-60 lg:h-72 mt-5 content">
  {/* Imagen del banner */}
  <img
    src={dataList[0]?.imagenPrimariaPromocion}
    alt="Promoción"
    className="w-full h-full object-cover rounded-lg"
  />

  {/* Capa oscura semitransparente para mejorar contraste del texto */}
     <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <span className="text-white font-bold text-center text-lg md:text-3xl px-2">
      {dataList[0]?.descripcionPromocion}
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

