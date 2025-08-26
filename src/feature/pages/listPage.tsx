
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Spinner } from '../core'
import { ListComponent } from '../core/component'
import { SearchComponent } from '../core/component/searchComponent/searchComponent'
import { BaseLayout } from '../core/ui/base-layout'
import { useGetList } from '../core/services/useGetList'


export const ListPage = <T extends { id: number }>() => {

  const { module = '' } = useParams();
  const navigate = useNavigate()
  
  const hadleReturn = () =>{
    navigate(-1)
  }
  const {dataList, isLoading} = useGetList<T>({moduleRour: module}) 
  


  if(isLoading){
    return (<Spinner  className='fixed inset-0 flex items-center justify-center text-red-300' />)
  }
 
  
  return (
    <BaseLayout
    header

    
  >
  <div className="p-10"> 
    <div>
      <Button  onClick={() => hadleReturn()}  className=' rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110'>
         Volver
      </Button>
    </div>
    <div> 
    <SearchComponent 
    label={module} />
    </div>
    <div className=' mt-10 md:mt-5'>
     <ListComponent<T> dataList={dataList} module={module} />
     </div>
  </div>
    </BaseLayout>

  )
}

