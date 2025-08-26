import { useAuthStore } from "@/feature/contex/AuthContext";
import { Spinner } from "@/feature/core";
import { Promotion } from "@/feature/core/component/promotion";

import { BaseLayout } from "@/feature/core/ui/base-layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderAssig } from "../componentes";




export const HomePage = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();


    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);
  
    if (!isAuthenticated) {
      return (
        <Spinner className='fixed inset-0 flex items-center justify-center text-red-300' />
      );
    }

  return (

      
          <BaseLayout header navBar={true}>
            <div className="p-0  relatived w-full min-h-screen overflow-y-scroll ">
              <div>
                <Promotion/>
              </div>
    
              <div className="p-4">
                <OrderAssig />
                </div>
    
              
            </div>
          </BaseLayout>
    
         
        
    
  );
};
