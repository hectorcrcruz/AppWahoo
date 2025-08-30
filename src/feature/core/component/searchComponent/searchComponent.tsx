
import { useForm } from "react-hook-form"
import { Button, Label } from "../../ui"


import { Search, SearchSchema } from "./search-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from "react-router-dom";
import { SelectField } from "../../ui/SelectField";
import { FaseDomicilio, getListFaseDomicilio } from "@/feature/userDomicilary/services/servicesUserDomi";
import { useEffect, useMemo, useState } from "react";
import { useDomicilioContext } from "@/feature/userDomicilary/contex/useContexDomicilio";
import { useAuthStore } from "@/feature/contex/AuthContext";




type SearchComponentProps = {
 label:string | undefined
}



export const SearchComponent:React.FC<SearchComponentProps> = ({label }) => {
  
  const [filterSelect, setFilterSelect] = useState<FaseDomicilio[]>([])
     const {  rolId } = useAuthStore();

    const {  setSearchFilter } = useDomicilioContext();

  const { register,  reset, watch} = useForm<Search>({
   resolver: zodResolver(SearchSchema)
  })
 

  const selectId  =  watch('id')

  useEffect(() => {
    if (selectId !== undefined) {
      setSearchFilter(selectId as number | undefined) 
    }
  }, [selectId]);


 const option = useMemo(
  () =>
    filterSelect.map(item => ({
      value: item.id,
      label: item.descripcionFaseDomicilio,
    })),
  [filterSelect]
);


   const selectData  = async () => {
       try {
           const response = await getListFaseDomicilio();
           setFilterSelect(response)
          
       } catch (error) {
           console.error('Error fetching select data:', error);
           return [];
       }
  }



  const location = useLocation()
  const locationSearch = location.pathname === '/home'

const handleReset = () => {
  reset({id: ''}) 
} 

useEffect(() => {
  selectData()
}, []);


  return (
    <div className="">
       <Label className="md:leading-3 text-xl font-normal  w-full mt-2   md:mx-3">{` Listado de ${label} `}</Label>  
      <div   className="justify-end mt-5 md:flex mx-auto w-full md:-mt-6  ">
      <div hidden={rolId !== 9}> 
      <SelectField
       options={option}
       {...register('id')}
        type="number"
        label={'Selecciona'} 
         className={'mt-[4px] md:mx-3  md:w-11/12 '} 
        />
      </div>
       <div className="mt-2" hidden={rolId !== 9} >

      <Button
       type="button"
       onClick={handleReset}
       className={` ${!locationSearch ? 'md:w-24' : 'md:w-auto w-full'} rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110`}>
       Limpiar
      </Button> 
       </div>
      </div>
    </div>
  )
}

