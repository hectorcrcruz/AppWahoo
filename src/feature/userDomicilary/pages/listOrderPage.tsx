import { ListComponent } from '@/feature/core/component'
import { BaseLayout } from '@/feature/core/ui/base-layout'
import  { useEffect, useState } from 'react'
import { getListFaseDomicilio, ListParams } from '../services/servicesUserDomi'

export const ListOrderPage = () => {
    const [dataTable, setDataTable] = useState<ListParams[]>([])
    const getListDomi = async () => {
       try {
        const resp = await getListFaseDomicilio()
        setDataTable(resp)
       } catch (error) {
        console.log(error)
       }
    }


    useEffect(() => {
      getListDomi()
    }, [])
    

  return (
     <BaseLayout header navBar={true}>
      <div className='m-5'>
           <ListComponent<ListParams> dataList={dataTable} module={'domi'} />
           </div>
     </BaseLayout>
   
  )
}

