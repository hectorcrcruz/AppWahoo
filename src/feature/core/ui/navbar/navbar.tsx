

import { useAuth } from '@/feature/contex/AuthContext';
import DropList from '../dropList'
import { FaUserCircle } from "react-icons/fa";
import Tooltip from '../Tooltip/Tooltip';

export const Navbar: React.FC = () => {
   const { user } = useAuth()
   

  return (
    <nav className=' w-auto absolute top-5 left-4 '>
      <div className='col-span-1  flex '>
          <DropList />
          <div className='flex justify-end '>
            <Tooltip text={user?.nombreUsuario ?? ''} position='bottom'> 
           <FaUserCircle  className='text-white w-7 h-7 mt-1  mx-3 md:mx-10 hover:text-gray-500 cursor-pointer' />
           </Tooltip>
           </div>
          </div> 

          
    </nav>
  )
}
