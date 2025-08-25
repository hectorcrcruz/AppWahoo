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

type descripcionFaseDomicilio = {
  Domicilio_Creado: string;
  Domicilio_en_Proceso: string;
  Domicilio_Cancelado: string;
  Domicilio_en_camino: string;
  Domicilio_Peindiente: string;
  Domicilio_Aceptado: string;
  Domicilio_Entregado: string;
}


export interface DomicilioList {
  descripcionDomicilio: string;
  usuarioId:number;
  faseDomicilioId:number;
  productoId: number;
  fechaAceptaDomiciliario: string;
  fechaAceptaEntidad: string;
  fechaEntrega:string;
  aceptaEntidad:number;
  aceptaDomiciliario:number;
  domicilioExitoso:boolean;
  faseDomicilio: descripcionFaseDomicilio;
  direccion:string;
  id:number;
  estado: number;
  usuarioAdd:string;
  fechaAdd:string;
  fechaUp:string | null;
  usuarioUp:string | null;
}

export type UpdateDomicilioDTO = Pick<
  DomicilioList,
  | "id"
  | "descripcionDomicilio"
  | "usuarioId"
  | "faseDomicilioId"
  | "direccion"
  | "estado"
  | "usuarioUp"
  | "fechaUp"
>;

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


type ListResponseDomicilio = {
   IdDomicilio?: number,
}

export const getDomicilioList = async (params?: ListResponseDomicilio) : Promise<DomicilioList[]> => {
    return await wahooApi.get('/Domicilio/ListDomicilio', { params });
}




export const upDomiciliosList = async (data: UpdateDomicilioDTO): Promise<any> => {
  return await wahooApi.put('/Domicilio/UpdateDomicilio', data)
}