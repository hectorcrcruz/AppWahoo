

import mariscos from '../assets/img/mariscos.png'
import langosta from '../assets/img/langosta.png'
import ostiones from '../assets/img/ostiones.jpg'




type CaroselProps = {
  title: string,
  label:string
  img: string,
  
}



export const dataCarousel: CaroselProps[] = [
  {
     title: 'Cazuela de Mariscos',
     label:'240,000',
     img: mariscos
  },
  {
    title: 'Langosta',
    label:'1,200,000',
    img: langosta
 },
 {
  title: 'Ostiones',
  label:'1,100,000',
  img: ostiones
}

]


