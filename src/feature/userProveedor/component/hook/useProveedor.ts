

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const useProveedor = <T>(dataList: T[], filters: any) => {

     const filteredData = dataList.filter((item: any) => {
        return (
          (filters.descripcionTransaccion === "" ||
            item.descripcionTransaccion
              .toLowerCase()
              .includes(filters.descripcionTransaccion.toLowerCase())) &&
          (filters.tipoTransaccion === "" ||
            item.tipoTransaccion
              .toLowerCase()
              .includes(filters.tipoTransaccion.toLowerCase())) &&
          (filters.estado === "" || String(item.estado) === filters.estado)
        );
      });
    
      const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text("Transacciones", 14, 10);
    
        autoTable(doc, {
          head: [["ID", "Descripción", "TipoTransaccion", "Estado"]],
          body: filteredData.map((item: any) => [
            item.id,
            item.descripcionTransaccion,
            item.tipoTransaccion,
            item.estado,
          ]),
        });
    
        doc.save("transacciones.pdf");
      };
  return {
    handleExportPDF,
    filteredData,
   
  }
}

