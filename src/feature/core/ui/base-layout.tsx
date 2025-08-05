

import { useNavigate } from 'react-router-dom';
import { cn } from '../lib'
import { BaseLayoutProps } from '../types/base-layout'
import { Navbar } from './navbar'
import { Wrapper } from './wrapper'
import { IoMdPower, IoIosNotificationsOutline } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from '@/feature/contex/AuthContext';

import dayjs from 'dayjs';
import { useProductContext } from '@/feature/contex/buyNotifications';
import { ModalBuyEarrings } from '../component/modal';
import { useEffect, useState } from 'react';
import { useParametrizacionContext } from '@/context/parametrizacionContext';


export function BaseLayout({
  children,
  className = '',
  mainClassName = '',
  header,
  navBar = true,
}: Readonly<BaseLayoutProps>) {
 const [showModal, setShowModal] = useState(false)
 const [colorbg, setColorBg] = useState('blue')
  const date = new Date()
   const dateRep = ( dayjs(date).format('YYYY'))
  const { logout } = useAuth();
  const navigation = useNavigate();

  const handleNavigate = () => {
    navigation('/home'); 
  } 

  const handleLogout = () => {  
    logout();
    navigation('/login');
  }

  const { productNotificacion } = useProductContext();
   const { parametros} = useParametrizacionContext()
  

  const colorPrimary  = parametros?.colorPrimario

  useEffect(() => {
    if(colorPrimary !== undefined){
      setColorBg(colorPrimary)
    }
    
  }, [colorPrimary])
  

  


  return (
    <>
    <div className={cn('relative flex min-h-screen bg-primary-50/15', className)}>
       {navBar && (  <Navbar /> )}
      <div className='flex w-full flex-col '>
        {header && (
          <div style={{backgroundColor: colorbg}} className={` h-20 `}> 
           <button onClick={() => handleNavigate()} className='mx-auto flex justify-center mt-3 cursor-pointer' role='button' tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNavigate(); }}>
              <img  src={parametros?.logo} alt='Logo'  className=' w-24 pt-4  mr-10 md:mr-0 md:pt-0 md:w-48 h-auto'/>
           </button>
           <div className='flex justify-end '>
           <IoMdPower onClick={() => handleLogout()}  className='text-white w-7 h-7 absolute top-6 2xl:top-8 mx-5 hover:text-gray-500 cursor-pointer' />
           </div>

           <div className='flex justify-end '>
           <IoIosNotificationsOutline  className='text-white w-7 h-7 absolute top-6 2xl:top-8 mx-16 hover:text-gray-500 cursor-pointer' />
           
           </div>
          <div className='flex justify-end '>
           <GiShoppingCart   className='text-white w-7 h-7 absolute top-6 2xl:top-8 mx-28 hover:text-gray-500 cursor-pointer' />
           {productNotificacion.length > 0 && (
            <button 
              onClick={() => setShowModal(true)} 
              className='absolute top-5 md:top-6 2xl:top-7 right-32 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs font-bold'
              type='button'
            />
           )}
           </div>


          </div>
        )}
        <Wrapper>
          <main
            className={cn(
              'h-auto w-full overflow-y-auto ',
              mainClassName
            )}
          >
            {children}
          </main>

         
        </Wrapper>
        <div className='bg-primary-100 h-32 text-center '>
           <p className='mt-3'>Wahoo</p>
           <p>{dateRep}</p>
           <small>Todos los derechos reservados</small>
          </div>
      </div>
    </div>
    
    <div>
      <ModalBuyEarrings
        showModal={showModal} 
        onSucces={(values) => setShowModal(values)}
       />
      </div>
    </>
  )
}
