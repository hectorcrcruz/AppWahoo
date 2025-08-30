
import { Card } from '../core/ui'
import { FaList } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BaseLayout } from '../core/ui/base-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../contex/AuthContext';
import { Roles } from '../core/const/roles';

type CardContent = {
  id: number;
  title: string;
  icon: JSX.Element;
  route: string;
}

const titleCard: CardContent[] = [
  {
    id: 1,
    title: 'Listar',
    icon: <FaList className="text-4xl text-primary-500" /> ,
    route: 'listarPage'
  },
  {
    id: 2,
    title: 'Crear',
    icon: <IoIosCreate className="text-4xl text-green-500" />,
    route: 'crearPage'
  },

];

export  const CardComponentPage = () => {
  const { module } = useParams();
    const { rolId}  = useAuthStore();

  

  const navigate = useNavigate();

  const  handleNavigate = (route:string) => {
    if (rolId === Roles.Proveedor || rolId === Roles.Comercio) {
      navigate(`/home/${'Producto'}/${route}`); 
    } else if (module) {
       navigate(`/home/${module}/${route}`);
    } 
  }


  return (
      <BaseLayout
        header
        navBar={true}  
        
      >

        <h1 className="text-2xl text-center font-semibold md:mt-10 text-gray-500">Modulo de {module ?? 'Producto'}</h1>
       <div className=' space-y-10 md:space-y-0 md:flex gap-5 justify-center items-center mx-auto p-4 mt-5'>
        {titleCard.map((item) => (
        <Card className="w-72 h-44 flex mx-auto md:mx-0 flex-col items-center justify-center p-4 
        bg-white rounded-lg shadow-md cursor-pointer transition-all 
        hover:shadow-md hover:bg-gradient-to-b hover:from-[#a20f5c] hover:to-[#d53287] 
        hover:text-white hover:scale-105"
        
        onClick={() => handleNavigate(item.route)} 
         key={item.id}>
        {item.icon}
        <h1 className="mt-2 text-lg  hover:font-semibold ">{item.title}</h1>
      </Card>
        ))}
      </div>
      </BaseLayout>
  )
}

 