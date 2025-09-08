// src/core/config/filterConfig.ts
import { EntityMap } from "./entityTypes";

export const filterConfig: {
  [K in keyof EntityMap]?: {
    name: keyof EntityMap[K];
    label: string;
    placeholder: string;
    type: "text" | "select";
    options?: { value: string | number; label: string }[];
  }[];
} = {
  Calificacion: [
    { name: "puntajeCalificacion", label: "Puntaje", placeholder: "Buscar puntaje...", type: "text" },
  ],
  Catalogo: [
    { name: "descripcionCatalogo", label: "Catálogo", placeholder: "Buscar catálogo...", type: "text" },
  ],
  CategoriaLog: [
    { name: "descripcionCategoriaLog", label: "Categoría Log", placeholder: "Buscar categoría...", type: "text" },
  ],
  CategoriaProducto: [
    { name: "descripcionCategoriaProducto", label: "Categoría", placeholder: "Buscar categoría...", type: "text" },
  ],
  Chat: [
    { name: "mensaje", label: "Mensaje", placeholder: "Buscar mensaje...", type: "text" },
  ],
  Ciudad: [
    { name: "nombreCiudad", label: "Ciudad", placeholder: "Buscar ciudad...", type: "text" },
  ],
  CriterioEvaluacion: [
    { name: "descripcionCriterioEvaluacion", label: "Criterio", placeholder: "Buscar criterio...", type: "text" },
  ],
  Departamento: [
    { name: "nombreDepartamento", label: "Departamento", placeholder: "Buscar departamento...", type: "text" },
  ],
  Dia: [
    { name: "descripcionDiaLaboral", label: "Día", placeholder: "Buscar día...", type: "text" },
  ],
  Domicilio: [
    { name: "descripcionDomicilio", label: "Domicilio", placeholder: "Buscar domicilio...", type: "text" },
  ],
  Entidad: [
    { name: "descripcionEntidad", label: "Entidad", placeholder: "Buscar entidad...", type: "text" },
  ],
  Estado: [
    { name: "descripcionEstado", label: "Estado", placeholder: "Buscar estado...", type: "text" },
  ],
  FaseDomicilio: [
    { name: "descripcionFaseDomicilio", label: "Fase", placeholder: "Buscar fase...", type: "text" },
  ],
  Horario: [
    { name: "descripcionHorario", label: "Horario", placeholder: "Buscar horario...", type: "text" },
  ],
  Item: [
    { name: "descripcionItem", label: "Item", placeholder: "Buscar item...", type: "text" },
  ],
  Log: [
    { name: "descripcionLog", label: "Log", placeholder: "Buscar log...", type: "text" },
  ],
  MedioPago: [
    { name: "descripcionMedioPago", label: "Medio de Pago", placeholder: "Buscar medio de pago...", type: "text" },
  ],
  Modulo: [
    { name: "descripcionModulo", label: "Módulo", placeholder: "Buscar módulo...", type: "text" },
  ],
  Notificacion: [
    { name: "descripcionNotificacion", label: "Notificación", placeholder: "Buscar notificación...", type: "text" },
  ],
  Pais: [
    { name: "nombrePais", label: "País", placeholder: "Buscar país...", type: "text" },
  ],
  ParametroEvaluacion: [
    { name: "descripcionParametro", label: "Parámetro", placeholder: "Buscar parámetro...", type: "text" },
  ],
  Permiso: [
    { name: "descripcionPermiso", label: "Permiso", placeholder: "Buscar permiso...", type: "text" },
  ],
  PQRS: [
    { name: "descripcionPQRS", label: "Descripción PQRS", placeholder: "Buscar PQRS...", type: "text" },
  ],
  Producto: [
    { name: "descripcionProducto", label: "Producto", placeholder: "Buscar producto...", type: "text" },
  ],
  Promocion: [
    { name: "descripcionPromocion", label: "Promoción", placeholder: "Buscar promoción...", type: "text" },
    { name: "codigoPromocional", label: "Código", placeholder: "Buscar código...", type: "text" },
  ],
  Rol: [
    { name: "descripcionRol", label: "Rol", placeholder: "Buscar rol...", type: "text" },
  ],
  Saldo: [
    { name: "saldoActual", label: "Saldo Actual", placeholder: "Buscar saldo...", type: "text" },
  ],
  TiempoFase: [
    { name: "horaCambioFase", label: "Hora de Fase", placeholder: "Buscar hora...", type: "text" },
  ],
  TipoEntidad: [
    { name: "descripcionTipoEntidad", label: "Tipo Entidad", placeholder: "Buscar tipo entidad...", type: "text" },
  ],
  TipoIdentificacion: [
    { name: "descripcionTipoIdentificacion", label: "Tipo Identificación", placeholder: "Buscar identificación...", type: "text" },
  ],
  TipoPQRS: [
    { name: "descripcionTipoPQRS", label: "Tipo PQRS", placeholder: "Buscar tipo PQRS...", type: "text" },
  ],
  TipoPromocion: [
    { name: "descripcionTipoPromocion", label: "Tipo Promoción", placeholder: "Buscar tipo promoción...", type: "text" },
  ],
  TipoTransaccion: [
    { name: "descripcionTipoTransaccion", label: "Tipo Transacción", placeholder: "Buscar transacción...", type: "text" },
  ],
  Transaccion: [
    { name: "descripcionTransaccion", label: "Transacción", placeholder: "Buscar transacción...", type: "text" },
    { name: "descripcionAdicional", label: "Adicional", placeholder: "Buscar adicional...", type: "text" },
  ],
  Usuario: [
    { name: "nombreUsuario", label: "Nombre", placeholder: "Buscar nombre...", type: "text" },
    { name: "correo", label: "Correo", placeholder: "Buscar correo...", type: "text" },
  ],
};
