import { wahooApi } from "@/feature/core/api/wahoo"



export interface ListParams {
    id: number,
    descripcionFaseDomicilio: string,
    estado:number,
    usuarioUp:string | null,
    fechaAdd:string,
    fechaUp: string | null
}

export interface BaseEntity {
  id: number;
  estado: number;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}

export interface FaseDomicilio extends BaseEntity {
  descripcionFaseDomicilio: string;
  usuarioAdd?: string;
  
}

export interface Notificacion extends BaseEntity {
  descripcionNotificacion: string;
  enviada: boolean;
  usuarioId: number;
  usuarioAdd: string;
}


type ListResponse = {
   IdFaseDomicilio?: number,
}

type ListResponseNotificacion = {
   IdNotificacion?: number,
}

export const getListFaseDomicilio = async (params?:ListResponse) : Promise<FaseDomicilio[]> =>{
    return await wahooApi.get('/FaseDomicilio/ListFaseDomicilio', { params })
} 


export const getNotificaciones = async (params?:ListResponseNotificacion) : Promise<Notificacion[]> =>{
    return await wahooApi.get('/Notificacion/ListNotificacion', { params })
} 