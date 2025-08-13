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
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { dataList } = useGetList<DropListProps>({ moduleRour: "CategoriaProducto" });
  const { user } = useAuth();

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

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
        {dataList.map((module) => (
          <DropdownMenuItem key={module.id}
                            className="hover:!bg-primary-200 hover:text-white cursor-pointer">
            <h1 className="text-lg hover:text-xl">{module.descripcionCategoriaProducto}</h1>
            <span>›</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-2" />

       
        <DropdownMenuItem
         
          className=" mx-auto items-end"
        >
          <h1 className="text-md">
            {`Bienvenido ${user?.nombreUsuario }`}</h1>
         
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
