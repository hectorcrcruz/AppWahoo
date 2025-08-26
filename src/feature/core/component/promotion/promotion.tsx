import  { useEffect, useState } from 'react'
import { SearchComponent } from '../searchComponent/searchComponent'
import { useGetList } from '../../services/useGetList'


interface PromotionItem {
  imagenPrimariaPromocion?: string;
  imagenSecundariaPromocion?: string;
  codigoPromocional: string;
  descripcionPromocion: string;
  usuarioAdd?: string;
  usuarioUp?: string;
}



export const Promotion = () => {
  const { dataList } = useGetList({ moduleRour: 'Promoción' }) as { dataList: PromotionItem[], isLoading: boolean };

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!dataList || dataList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dataList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [dataList]);

  const currentPromotion = dataList[currentIndex];

  return (
    <div >
      <div className='bg-primary-50 h-auto p-2 rounded-md mr-4 ml-4 mt-5'>
        <h1 className='w-full text-lg'>Promociones y descuentos especiales</h1>
      </div>

      {/* SLIDER */}
      <div className="relative mr-5 ml-5 h-40 md:h-60 lg:h-72 mt-5 px-5 ">
        {currentPromotion && (
          <img
            src={currentPromotion.imagenPrimariaPromocion}
            alt="Promoción"
            className="w-full h-full object-cover rounded-lg transition duration-1000 ease-in-out"
          />
        )}

        {/* Capa oscura y texto */}
        <div className="absolute inset-0 bg-black bg-opacity-40 mr-5 ml-5 flex items-center justify-center rounded-lg">
          <span className="text-white font-bold text-center text-lg md:text-3xl px-2">
            {currentPromotion?.descripcionPromocion}
          </span>
        </div>

        {/* Controles manuales */}
        <button
          className="absolute -left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? dataList.length - 1 : prevIndex - 1
            )
          }
        >
          ‹
        </button>
        <button
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              (prevIndex + 1) % dataList.length
            )
          }
        >
          ›
        </button>
      </div>

      {/* Search Component */}
      <div  className='bg-primary-50 md:h-16 p-2 rounded-md mr-4 ml-4 mt-10'>
        <SearchComponent
          label={'Categorías +  | Ofertas | Mís Compras'}
        />
      </div>
    </div>
  )
}
