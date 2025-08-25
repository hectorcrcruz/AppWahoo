import { ListComponent } from '@/feature/core/component'
import { BaseLayout } from '@/feature/core/ui/base-layout'

import {  DomicilioList } from '../services/servicesUserDomi'
import { useDomicilioContext } from '../contex/useContexDomicilio'


export const ListOrderPage = () => {
const {  domicilioList } = useDomicilioContext()
    
  return (
     <BaseLayout header navBar={true}>
      <div className='m-5'>
           <ListComponent<DomicilioList> dataList={domicilioList} module={'domi'} />
           </div>
     </BaseLayout>
   
  )
}

