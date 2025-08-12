import { useProductContext } from "@/feature/contex/buyNotifications";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Modal } from "../../ui/Modal"
import Slider from 'react-slick';
import { Button, Card } from "../../ui";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast'
import { CustomNextArrow, CustomPrevArrow } from "../carruselHome/carruselHome";

import Tooltip from "../../ui/Tooltip/Tooltip";
import { MdDelete } from "react-icons/md";
import { FaShopify} from "react-icons/fa6";
import { ModalTypePay } from "../modal/modaltypePay";
import { useNavigate } from "react-router-dom";



interface ModalBuyProductProps {
    showModal: boolean;
    onSucces: (values:boolean) => void;
}


export const ModalBuyEarrings:React.FC<ModalBuyProductProps> = ({showModal,onSucces}) => {
    const {  totalProduct, productNotificacion , setProductNotificacion , setTotalProductos ,setTotalCantidad } = useProductContext();

        
     const [showModalBuy, setShowModalBuy] = useState(false)
    const [cantidades, setCantidades] = useState<{ [id: string]: number }>({});
       
   const navigate = useNavigate();
       
  const handleInputChange = (id: number, value: string) => {
    const numero = parseInt(value);
    if (!isNaN(numero) && numero > 0) {
      setCantidades((prev) => ({ ...prev, [id]: numero }));
      setTotalCantidad((prev) => ({ ...prev, [id]: numero }));
    } else {
      toast.error("Ingrese un número válido mayor que 0");
    }
  };

  const handleNavigate = (method:string) => {
    navigate(`/home/voucher/:${method}`);
  }

  useEffect(() => {
    const inicial = Object.fromEntries(productNotificacion.map(p => [p.id, 1]));
    setCantidades(inicial);
   
  }, [productNotificacion]);

  useEffect(() => {
    const total = productNotificacion.reduce((acc, item) => {
      const cantidad = cantidades[item.id] || 1;
      return acc + item.valorProducto * cantidad;
    }, 0);
    setTotalProductos(total);
  }, [cantidades, productNotificacion, setTotalProductos]);
   

  const settings = {
          dots: true,  // Muestra los puntos de navegación
          infinite: productNotificacion.length > 2,  // Permite el desplazamiento infinito
          speed: 500,  // Velocidad de transición
          slidesToShow: Math.min(2, productNotificacion.length),  // Número de slides visibles
          slidesToScroll: 1,  // Número de slides que se desplazan
          autoplay: true,  // Activa el auto-slide
          autoplaySpeed: 3000,  // Tiempo entre cada slide
          prevArrow: <CustomNextArrow  />,
          nextArrow: <CustomPrevArrow  />,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: Math.min(2, productNotificacion.length),
                slidesToScroll: 2,
                infinite: productNotificacion.length > 2,
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

  return (
    <>
    <Modal
      show={showModal}
      size="sm"
      className="shadow-2xl w-full rounded-3xl max-h-[90vh] overflow-y-auto"
    >
      <Modal.Body>
        <div className="flex justify-between items-center  pb-2">
          <h1 className="text-lg font-semibold text-primary-700">
            {productNotificacion.length > 0
              ? "Compras pendientes en el carrito"
              : "No tienes compras pendientes"}
          </h1>
          <IoCloseCircleOutline
            onClick={() => onSucces(false)}
            className="text-2xl text-red-600 hover:scale-105 transition-transform cursor-pointer"
          />
        </div>

        <div className="mt-4">
          {productNotificacion.length === 0 && (
            <div className="text-center text-gray-500">
              No tienes productos en el carrito.
            </div>
          )}
          <Slider {...settings}>
            {productNotificacion.map((item) => (
              <div  key={item.id} className="mx-1"> 
                <Card  className="w-[250px] mx-auto border-none shadow-none   flex flex-col justify-between p-4 ">
                  <div className="text-center mb-2">
                    <img
                      src={item.imagenProducto}
                      alt={item.descripcionProducto}
                      className="w-72 h-48 object-cover transform transition-transform duration-300
                      hover:scale-105 hover:shadow-md hover:cursor-pointer"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h2 className="font-medium text-base">
                      {item.descripcionProducto}
                    </h2>
                    <p className="text-primary-700 font-bold text-lg">
                      ${item.valorProducto.toFixed(0)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Cantidad:{" "}
                      <input
                        placeholder="1"
                        defaultValue={cantidades[item.id] || ""}
                        onChange={(e) =>{
                          handleInputChange(item.id, e.target.value)
                         
                        }
                        }
                        className="w-10 text-center text-black border border-gray-300 rounded"
                        maxLength={2}
                      />
                    </p>
                  </div>
                  <div className="mt-4 flex flex-row justify-center  gap-2 ">
                  <Tooltip text="Eliminar" >
                  <Button
                    type="button"
                    onClick={() =>
                        setProductNotificacion((prev) =>
                          prev.filter((i) => i.id !== item.id)
                        )
                      }
                    className="w-10 h-10 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full flex items-center justify-center transition-shadow shadow-sm hover:shadow-lg"
                  >
                    <MdDelete  />
                  </Button>
                  </Tooltip>
                   <Tooltip text="Comprar" >
                  <Button
                    type="button"
                    onClick={() => 
                      setShowModalBuy(true)
                    }
                    className="w-10 h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transition-shadow shadow-sm hover:shadow-lg"
                  >
                    <FaShopify />
                  </Button>
                  </Tooltip>
                  </div>
                </Card>
                </div>
             
            ))}
          </Slider>
        </div>

              

        {productNotificacion.length > 0 && (
          <div className="mt-6 text-right text-sm">
            <span className="text-gray-700">Total compra:</span>{" "}
            <span className="font-bold text-primary-700">
              ${totalProduct.toFixed(0)}
            </span>
          </div>
        )}
      </Modal.Body>
    </Modal>

  
              <ModalTypePay 
               showModal={showModalBuy} 
              onClose={() => setShowModalBuy(false)}  
              onSelect={(method) => {
                if (method === 'virtual') {
                  toast.success('Pago virtual seleccionado', {
                    icon: '✅',
                  });
                  handleNavigate(method);
                } else {
                  toast.success('Pago en efectivo seleccionado', {
                    icon: '✅',
                  });
                  handleNavigate(method);
                }
                setShowModalBuy(false);
              }}
              
              />
             

    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  </>
  )
}

