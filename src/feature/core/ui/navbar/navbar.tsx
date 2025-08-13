

import { useAuth } from '@/feature/contex/AuthContext';
import DropList from '../dropList'
import { FaUserCircle } from "react-icons/fa";
import Tooltip from '../Tooltip/Tooltip';

export const Navbar: React.FC = () => {
   const { user } = useAuth()
   

  return (
    <nav className=' w-auto absolute top-5 left-4  '>
      <div className='col-span-1  flex  '>
          <DropList />
          <div className='flex justify-between  flex-row  w-auto '>
            <Tooltip text={user?.nombreUsuario ?? ''} position='bottom'> 
           <FaUserCircle  className='text-white w-7 h-7 mt-1  mx-3 md:mx-5 hover:text-gray-500 cursor-pointer' />
            
           </Tooltip>
           <span className=' hidden md:block text-white -mx-2 mt-2'>{`Hola ${user?.nombreUsuario ?? ''}`}</span>
           </div>
          </div> 

          
    </nav>
  )
}
