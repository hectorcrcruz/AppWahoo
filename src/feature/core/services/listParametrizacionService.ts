import {  wahooApi } from '@/feature/core/api/wahoo'


export interface ListParams {
    id: number,
    estado: number,
    usuarioAdd: string,
    usuarioUp: string,
    fechaAdd: string,
    fechaUp: string,
    nombreApp:string,
    footer: string,
    logo: string,
    colorPrimario: string,
    colorSecundario: string,
    colorTerciario: string,
    colorBotonCrear: string,
    colorBotonActualizar: string,
    colorBotonEliminar: string,
    backgroundImagen:string,
    colorTexto: string,
    tipoLetra: string,
    textoPrimario: string,
    textoSecundario: string,
    textoTerciario: string,
    textoCuaternario: string
    
  
}


type ListResponse = {
   IdParametrizacion?: number,
}

export const getListParametrizacion = async (params?:ListResponse) : Promise<ListParams[]> =>{
    return await wahooApi.get('/Parametrizacion/ListParametrizacion', { params })
} 