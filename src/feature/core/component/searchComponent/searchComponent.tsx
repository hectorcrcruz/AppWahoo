
import { useForm } from "react-hook-form"
import { Button, Label } from "../../ui"
import { InputField } from "../../ui/InputField"

import { Search, SearchSchema } from "./search-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from "react-router-dom";




type SearchComponentProps = {
 label:string | undefined
 onSearch : (values:Search) => void 
 searchParams: string | number | undefined
}



export const SearchComponent:React.FC<SearchComponentProps> = ({label,onSearch, searchParams }) => {


  const { register,  handleSubmit , formState, reset} = useForm<Search>({
   resolver: zodResolver(SearchSchema),
   defaultValues: {
    id: searchParams?.toString() ?? ''
  }
  })
    
 
  const { errors } = formState 

  const location = useLocation()
  const locationSearch = location.pathname === '/home'

const handleReset = () => {
  reset({id: ''}) 
  onSearch({id: ''})
}


  return (
    <div className="md:flex  h-12 ">
       <Label className="leading-3 text-xl font-normal  w-full mt-2   mx-3">{` Listado de ${label} `}</Label>  
    <div className="justify-end flex mx-auto w-full  "> 
      <form  className={`flex  ${!locationSearch ? 'flex-row-reverse' : 'flex-row' }  `} onSubmit={handleSubmit(onSearch , (errors) => console.log(errors))}>
      <div> 
      <InputField {...register('id')}
       disabled={!!searchParams}
        type="number"
        label={locationSearch ? 'Buscar productos de interés ' : 'Buscar'}
        placeholder='Buscar por id'  className={`mt-[4px] mx-2 w-full ${locationSearch ?  'md:w-72' :'md:w-36'}`}
        error={searchParams ? ''  : errors.id?.message} />
      </div>
       <div className="mt-2" >
       {searchParams ? (
  <Button
    type="button"
    onClick={handleReset}
    className={` ${!locationSearch ? 'w-24' : 'w-auto'} rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110`}>
    Limpiar
  </Button>
) : (
  <Button
    type="submit"
    className={` ${!locationSearch ? 'w-24' : 'w-auto'} rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110`}>
    Buscar
  </Button>
)}
       </div>
      </form> 
      </div>
    </div>
  )
}

