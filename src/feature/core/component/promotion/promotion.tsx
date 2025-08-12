
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
        <div className='grid  grid-cols-1     md:grid-cols-3  gap-4 h-14 md:h-40 lg:h-48 justify-center mx-auto mt-5' >
          <div className=' col-span-1  flex   justify-center item-center  '>
            <img src={dataList[0]?.imagenPrimariaPromocion} alt='Promoción' className=' h-14 md:h-32 lg:h-40  w-full  md:w-96 lg:w-full  mx-auto object-cover '/>
          </div>
            
            <div className=' col-span-1  text-center    w-48   leading-none mx-auto md:w-auto   justify-center item-center  md:flex flex-col '> 
             <span className='text-center    font-medium text-xs  md:text-2xl md:w-5/12 justify-center mx-auto' >{dataList[0]?.descripcionPromocion}</span>
      
             </div>
             <div className=' col-span-1  flex   justify-center item-center   '>
               <img src={dataList[0]?.imagenSecundariaPromocion} alt='Promoción' className=' h-14 md:h-32 lg:h-40  w-full  md:w-96 lg:w-full  mx-auto object-cover '/>
             </div>
            </div>
        <div className='bg-primary-50  md:h-16 p-2 rounded-md mr-4 ml-4 mt-32 md:mt-10  '>  
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

