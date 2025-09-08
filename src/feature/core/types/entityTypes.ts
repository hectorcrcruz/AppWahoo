// src/types/entities.ts

// =====================
// Interfaces y Responses
// =====================

export interface Calificacion {
  puntajeCalificacion: number;
  parametroEvaluacionId: number;
  criterioEvaluacionId: number;
  usuarioId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type CalificacionResponse = Calificacion[];

export interface Catalogo {
  descripcionCatalogo: string;
  itemId: number;
  entidadId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type CatalogoResponse = Catalogo[];

export interface CategoriaLog {
  descripcionCategoriaLog: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type CategoriaLogResponse = CategoriaLog[];

export interface CategoriaProducto {
  descripcionCategoriaProducto: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type CategoriaProductoResponse = CategoriaProducto[];

export interface Chat {
  mensaje: string;
  documentoSoporte: number;
  emisor: number;
  receptor: number;
  documento: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type ChatResponse = Chat[];

export interface Ciudad {
  nombreCiudad: string;
  departamentoId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type CiudadResponse = Ciudad[];

export interface CriterioEvaluacion {
  descripcionCriterioEvaluacion: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type CriterioEvaluacionResponse = CriterioEvaluacion[];

export interface Departamento {
  nombreDepartamento: string;
  paisId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type DepartamentoResponse = Departamento[];

export interface Dia {
  descripcionDiaLaboral: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type DiaResponse = Dia[];

export interface Domicilio {
  descripcionDomicilio: string;
  usuarioId: number;
  faseDomicilioId: number;
  productoId: number;
  fechaAceptaDomiciliario: string | null;
  fechaAceptaEntidad: string | null;
  fechaEntrega: string | null;
  aceptaEntidad: number;
  aceptaDomiciliario: number;
  domicilioExitoso: boolean;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string | null;
  fechaAdd: string;
  fechaUp: string | null;
}
export type DomicilioResponse = Domicilio[];

export interface Entidad {
  descripcionEntidad: string;
  tipoEntidadId: number;
  medioPagoId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type EntidadResponse = Entidad[];

export interface Estado {
  descripcionEstado: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type EstadoResponse = Estado[];

export interface FaseDomicilio {
  descripcionFaseDomicilio: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type FaseDomicilioResponse = FaseDomicilio[];

export interface Horario {
  descripcionHorario: string;
  franjasHorario: any;
  horaInicio: string;
  horaFin: string;
  diasLaborales: string;
  usuarioId: number;
  diaId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type HorarioResponse = Horario[];

export interface Item {
  descripcionItem: string;
  cantidadItem: number;
  unidadMedidaItem: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type ItemResponse = Item[];

export interface Log {
  descripcionLog: string;
  categoriaLogId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type LogResponse = Log[];

export interface MedioPago {
  descripcionMedioPago: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type MedioPagoResponse = MedioPago[];

export interface Modulo {
  descripcionModulo: string;
  permisoId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type ModuloResponse = Modulo[];

export interface Notificacion {
  descripcionNotificacion: string;
  enviada: boolean;
  usuarioId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type NotificacionResponse = Notificacion[];

export interface Pais {
  nombrePais: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type PaisResponse = Pais[];

export interface ParametroEvaluacion {
  descripcionParametro: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type ParametroEvaluacionResponse = ParametroEvaluacion[];

export interface Permiso {
  descripcionPermiso: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type PermisoResponse = Permiso[];

export interface PQRS {
  descripcionPQRS: string;
  usuarioId: number;
  tipoPQRSId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type PQRSResponse = PQRS[];

export interface Producto {
  descripcionProducto: string;
  stock: number;
  valorProducto: number;
  imagenProducto: number;
  categoriaProductoId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type ProductoResponse = Producto[];

export interface Promocion {
  descripcionPromocion: string;
  productoId: number;
  fechaInicioPromocion: string;
  fechaFinPromocion: string;
  imagenPromocion: number;
  codigoPromocional: string;
  tipoPromocionId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type PromocionResponse = Promocion[];

export interface Rol {
  descripcionRol: string;
  moduloId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type RolResponse = Rol[];

export interface Saldo {
  saldoInicial: number;
  saldoFinal: number;
  saldoActual: number;
  usuarioId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type SaldoResponse = Saldo[];

export interface TiempoFase {
  horaCambioFase: string;
  domicilioId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TiempoFaseResponse = TiempoFase[];

export interface TipoEntidad {
  descripcionTipoEntidad: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TipoEntidadResponse = TipoEntidad[];

export interface TipoIdentificacion {
  descripcionTipoIdentificacion: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TipoIdentificacionResponse = TipoIdentificacion[];

export interface TipoPQRS {
  descripcionTipoPQRS: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TipoPQRSResponse = TipoPQRS[];

export interface TipoPromocion {
  descripcionTipoPromocion: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TipoPromocionResponse = TipoPromocion[];

export interface TipoTransaccion {
  descripcionTipoTransaccion: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TipoTransaccionResponse = TipoTransaccion[];

export interface Transaccion {
  descripcionTransaccion: string;
  tipoTransaccionId: number;
  entidadId: number;
  domicilioId: number;
  tipoTransaccion: string;
  descripcionAdicional: string;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type TransaccionResponse = Transaccion[];

export interface Usuario {
  nombreUsuario: string;
  apellidoUsuario: string;
  telefonoUsuario: number;
  expedicionCedula: string;
  direccionUsuario: string;
  placaMoto: string;
  licenciaConduccion: string;
  horarioUsuario: number;
  formaPago: number;
  login: string;
  password: string;
  documentos: string;
  correo: string;
  circulacion: number;
  causacionPagos: string;
  rolId: number;
  tipoIdentificacionId: number;
  id: number;
  estado: number;
  usuarioAdd: string;
  usuarioUp: string;
  fechaAdd: string;
  fechaUp: string;
}
export type UsuarioResponse = Usuario[];

// =====================
// Mapa centralizado
// =====================
export type EntityMap = {
  Calificacion: Calificacion;
  Catalogo: Catalogo;
  CategoriaLog: CategoriaLog;
  CategoriaProducto: CategoriaProducto;
  Chat: Chat;
  Ciudad: Ciudad;
  CriterioEvaluacion: CriterioEvaluacion;
  Departamento: Departamento;
  Dia: Dia;
  Domicilio: Domicilio;
  Entidad: Entidad;
  Estado: Estado;
  FaseDomicilio: FaseDomicilio;
  Horario: Horario;
  Item: Item;
  Log: Log;
  MedioPago: MedioPago;
  Modulo: Modulo;
  Notificacion: Notificacion;
  Pais: Pais;
  ParametroEvaluacion: ParametroEvaluacion;
  Permiso: Permiso;
  PQRS: PQRS;
  Producto: Producto;
  Promocion: Promocion;
  Rol: Rol;
  Saldo: Saldo;
  TiempoFase: TiempoFase;
  TipoEntidad: TipoEntidad;
  TipoIdentificacion: TipoIdentificacion;
  TipoPQRS: TipoPQRS;
  TipoPromocion: TipoPromocion;
  TipoTransaccion: TipoTransaccion;
  Transaccion: Transaccion;
  Usuario: Usuario;
};

// Helper para tipar listas
export type EntityResponse<K extends keyof EntityMap> = EntityMap[K][];
