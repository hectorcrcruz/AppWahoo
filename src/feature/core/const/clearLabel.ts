export const  clearLabel = (label: string) => {
 const patrones = ["DESCRIPCION", "IMAGEN", "FECHA", "TIPO", "VALOR", "ESTADO", "DETALLE", "CATEGORIA"];

 const nombre = label.toUpperCase();
 const match = patrones.find((patron) => nombre.includes(patron));


 if (match) {
    // Primera letra en mayúscula, resto en minúscula
    return match.charAt(0) + match.slice(1).toLowerCase();
  }
 
  return label;

}