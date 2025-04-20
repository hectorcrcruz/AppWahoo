import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button, Card } from '../../ui';
import { FaClipboardQuestion } from "react-icons/fa6";


import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { ModalDetailProduct } from '../modal';
import { useState } from 'react';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaAngleDoubleRight
    className={`${className} !text-primary-700`}
      style={{ ...style,  fontSize: '30px' }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaAngleDoubleLeft
    className={`${className} !text-primary-700`}
      style={{ ...style,  fontSize: '30px' }}
      onClick={onClick}
    />
  );
};


interface Producto {
  id: number;
  descripcionProducto: string;
  stock: number;
  valorProducto: number;
  imagenProducto: number;
  categoriaProductoId: number;
  detalleProducto:string
  usuarioAdd: string;
  estado: number;
  fechaAdd: string;
}

interface CarruselHomeProps {
  Producto: Producto[];
}

export const CarruselHome:React.FC<CarruselHomeProps> = ({Producto}) => {
    

  const [idProducto, setIdProducto] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const productForId = Producto.find((item) => item.id === idProducto);

    const settings = {
        dots: true,  // Muestra los puntos de navegación
        infinite: Producto.length > 3,  // Permite el desplazamiento infinito
        speed: 500,  // Velocidad de transición
        slidesToShow: Math.min(3, Producto.length),  // Número de slides visibles
        slidesToScroll: 1,  // Número de slides que se desplazan
        autoplay: true,  // Activa el auto-slide
        autoplaySpeed: 3000,  // Tiempo entre cada slide
        prevArrow: <CustomNextArrow  />,
        nextArrow: <CustomPrevArrow  />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(2, Producto.length),
              slidesToScroll: 2,
              infinite: Producto.length > 2,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          }
        ]

      };

      const handleClick = (itemId: number) => {
        setIdProducto(itemId)
        setShowModal(true)

      }

  return (
    <> 
    <div className="w-10/12 justify-center mx-auto p-6  mt-5 mb-5">
    <Slider {...settings }  className='  mr-4 '  >
       { Producto.length > 0 ?  Producto.map((item) => (
          <Card  key={item.id}  className="md:!w-10/12 justify-center md:mx-4 rounded-b-none !rounded-t-2xl border-primary-700">
            <div className="flex justify-center pt-4">
                {/* <img src={item.img} alt={item.title} className="w-72 h-48 object-cover rounded-md" /> */}
                <span>{item.imagenProducto}</span>
            </div>
            <div className='text-center mt-3'>
                <h1>{item.descripcionProducto}</h1>
                <p className='font-medium'>{item.valorProducto}</p>
                <p onClick={() => handleClick(item.id)}>Mas información <span className='font-bold hover:cursor-pointer'>aquí</span></p>
            </div>
            <div className='flex justify-center mt-4  '>
                <Button className='bg-gradient-to-b from-[#a20f5c] to-[#d53287] rounded-l-none rounded-r-none'>Añadir al carrito</Button>
                <Button className='w-40 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-r-none rounded-l-none'>Comprar</Button>
            </div>
          </Card>
      )): <div className='flex justify-center items-center h-96 w-full '>
      <h1 className='text-2xl font-bold text-primary-700 text-center'>No hay productos disponibles</h1>
      </div>}
    </Slider>
    </div>
    <div>
      <ModalDetailProduct
      idProducto={idProducto}
        showModal={showModal} 
        onSucces={() => setShowModal(false)} 
        nombre={productForId?.descripcionProducto ?? ''}
        description={productForId?.detalleProducto ?? ''}
        valor={productForId?.valorProducto ?? 0}
        icon={<FaClipboardQuestion  />} 
      />
    </div>
    </>
  )}


