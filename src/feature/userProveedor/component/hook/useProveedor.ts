import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Filters {
  descripcionTransaccion?: string;
  tipoTransaccion?: string;
  estado?: string;
  descripcionDomicilio?: string;
  cliente?: string;
}

export const useProveedor = <T extends object>(dataList: T[], filters: Filters) => {
  const filteredData = dataList.filter((item: any) => {
    // Si es Transacción
    if ("descripcionTransaccion" in item) {
      return (
        (filters.descripcionTransaccion === "" ||
          item.descripcionTransaccion
            ?.toLowerCase()
            .includes(filters.descripcionTransaccion?.toLowerCase() ?? "")) &&
        (filters.tipoTransaccion === "" ||
          item.tipoTransaccion
            ?.toLowerCase()
            .includes(filters.tipoTransaccion?.toLowerCase() ?? "")) &&
        (filters.estado === "" || String(item.estado) === filters.estado)
      );
    }

    // Si es Domicilio
    if ("descripcionDomicilio" in item) {
      return (
        (filters.descripcionDomicilio === "" ||
          item.descripcionDomicilio
            ?.toLowerCase()
            .includes(filters.descripcionDomicilio?.toLowerCase() ?? "")) &&
        (filters.cliente === "" ||
          item.cliente
            ?.toLowerCase()
            .includes(filters.cliente?.toLowerCase() ?? "")) &&
        (filters.estado === "" || String(item.estado) === filters.estado)
      );
    }

    return true;
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte", 14, 10);

    if (filteredData.length > 0 && "descripcionTransaccion" in filteredData[0]) {
      autoTable(doc, {
        head: [["ID", "Descripción", "TipoTransaccion", "Estado"]],
        body: filteredData.map((item: any) => [
          item.id,
          item.descripcionTransaccion,
          item.tipoTransaccion,
          item.estado,
        ]),
      });
    } else if (
      filteredData.length > 0 &&
      "descripcionDomicilio" in filteredData[0]
    ) {
      autoTable(doc, {
        head: [["ID", "Descripción Domicilio", "Cliente", "Estado"]],
        body: filteredData.map((item: any) => [
          item.id,
          item.descripcionDomicilio,
          item.cliente,
          item.estado,
        ]),
      });
    }

    doc.save("reporte.pdf");
  };

  return {
    handleExportPDF,
    filteredData,
  };
};
