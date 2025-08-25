export enum Roles {
  Soporte = 1,
  Administrador = 2,
  Servicio_al_cliente_PQRS = 3,
  Supervisor = 4,
  Proveedor = 5,
  Comercio = 6,
  Cliente = 7,
  Usuario_Nuevo = 8,
  Domiciliario_Propio = 9,
  Domiciliario_Externo = 10,
}

export const roleNames: Record<Roles, string> = {
  [Roles.Soporte]: "Soporte",
  [Roles.Administrador]: "Administrador",
  [Roles.Servicio_al_cliente_PQRS]: "Servicio al cliente PQRS",
  [Roles.Supervisor]: "Supervisor",
  [Roles.Proveedor]: "Proveedor",
  [Roles.Comercio]: "Comercio",
  [Roles.Cliente]: "Cliente",
  [Roles.Usuario_Nuevo]: "Usuario nuevo",
  [Roles.Domiciliario_Propio]: "Domiciliario Propio",
  [Roles.Domiciliario_Externo]: "Domiciliario Externo",
};
