import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button
} from "@/feature/core/ui";
import { IoIosMenu } from "react-icons/io";

import { useParametrizacionContext } from "@/context/parametrizacionContext";
import { useGetList } from "../services/useGetList";
import { useAuth } from "@/feature/contex/AuthContext";
import { useNavigate } from "react-router-dom";
import { roleNames } from "../const/roles";
import { arrayModules } from "../const/modules";



export interface DropListProps {
   descripcionCategoriaProducto:string
    id: number
    estado:number
    usuarioAdd: string
    usuarioUp: string
    fechaAdd: string  
    fechaUp: string

}



export default function DropList() {
  const { parametros } = useParametrizacionContext();
  const { dataList } = useGetList<DropListProps>({ moduleRour: "CategoriaProducto" });
  const { user } = useAuth();


  const navigate = useNavigate()

 

  const handleNavigate = () => {
    navigate('/home/domi/list');
  }

  const handleNavigateProvee = () => {
    navigate('/home/provee');
  }

  const handleNavigateAdmin = (module:string) => {
    navigate(`/home/${module}`);
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button style={{ backgroundColor: parametros?.colorPrimario }}
                className="px-4 py-2 text-white rounded-md shadow-none md:text-lg">
          <IoIosMenu size={24} /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="
          w-60 bg-white rounded-md shadow-xl
          h-screen overflow-y-auto
          
          transition-all duration-300 ease-in-out
          max-h-0 data-[state=open]:max-h-screen
        "
        onCloseAutoFocus={(e) => e.preventDefault()} // evita el foco al cerrar:contentReference[oaicite:1]{index=1}
      >
        {user.rolId === 7 && dataList.map((module) => (
          <DropdownMenuItem key={module.id}
                            className="hover:!bg-primary-200 hover:text-white cursor-pointer">
            <h1 className="text-lg hover:text-xl">{module.descripcionCategoriaProducto}</h1>
            <span>›</span>
            

          </DropdownMenuItem>
          
        ))}
        {user.rolId === 9 && (
          <DropdownMenuItem  onClick={handleNavigate} className="hover:!bg-primary-200 hover:text-white cursor-pointer">
            <h1 className="text-lg">Ver listado de Pedidos</h1>
            <span>›</span>
          </DropdownMenuItem>
        )}


       {(user.rolId === 5 || user.rolId === 6 || user.rolId === 4 || user.rolId === 3) && (
          <DropdownMenuItem onClick={handleNavigateProvee} className="hover:!bg-primary-200 hover:text-white cursor-pointer">
            <h1 className="text-lg">{user.rolId === 4 || user.rolId === 3 ? "PQRS" : "Productos"}</h1>
            <span>›</span>
          </DropdownMenuItem>
        )}


         {(user.rolId === 1 || user.rolId === 2) && arrayModules.map((module) => (
          <DropdownMenuItem onClick={() => handleNavigateAdmin(module.name)} key={module.id}
            className="hover:!bg-primary-200 hover:text-white cursor-pointer">
            <h1 className="text-lg hover:text-xl">{module.name}</h1>
            <span>›</span> 
          </DropdownMenuItem>
          
        ))}


        <DropdownMenuSeparator className="my-2" /> 
        <DropdownMenuItem
          className=" mx-auto items-end"
        >
          <h1 className="text-md">
             {`Bienvenido ${user?.rolId ? roleNames[user.rolId] : "Invitado"}`}</h1>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
