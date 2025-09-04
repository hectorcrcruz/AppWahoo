import { Button, Spinner } from "@/feature/core";
import { ListComponent } from "@/feature/core/component";
import { useGetList } from "@/feature/core/services/useGetList";
import { BaseLayout } from "@/feature/core/ui/base-layout";
import { CiSaveDown1 } from "react-icons/ci";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useState } from "react";
import { ComponentFilter } from "../component/componentFilter";
import { Search } from "lucide-react";
import { useProveedor } from "../component/hook/useProveedor";
import { useAuthStore } from "@/feature/contex/AuthContext";

export const HomePage = <T extends { id: number }>(): JSX.Element => {
  const { rolId } = useAuthStore();

  // Asigno módulo dinámico
  const isRoleId = rolId === 3 || rolId === 4 ? "Domicilio" : "Transacción";
  console.log("Modulo activo:", isRoleId);

  const { dataList, isLoading } = useGetList<T>({ moduleRour: isRoleId });

  // Estado inicial según el módulo
  const [filters, setFilters] = useState(
    isRoleId === "Domicilio"
      ? {
          descripcionDomicilio: "",
          cliente: "",
          estado: "",
        }
      : {
          descripcionTransaccion: "",
          tipoTransaccion: "",
          estado: "",
        }
  );

  const { handleExportPDF, filteredData } = useProveedor(dataList, filters);

  // Campos del filtro según módulo
  const fields =
    isRoleId === "Domicilio"
      ? [
          {
            name: "descripcionDomicilio",
            label: "Descripción Domicilio",
            type: "text" as const,
            placeholder: "Buscar descripción...",
            icon: <Search className="w-4 h-4" />,
          },
          {
            name: "cliente",
            label: "Cliente",
            type: "text" as const,
            placeholder: "Ej: Juan Pérez...",
          },
          {
            name: "estado",
            label: "Estado",
            type: "select" as const,
            options: [
              { value: "", label: "Todos" },
              { value: "2", label: "Activo" },
              { value: "1", label: "Inactivo" },
            ],
          },
        ]
      : [
          {
            name: "descripcionTransaccion",
            label: "Descripción Transacción",
            type: "text" as const,
            placeholder: "Buscar descripción...",
            icon: <Search className="w-4 h-4" />,
          },
          {
            name: "tipoTransaccion",
            label: "Tipo de transacción",
            type: "text" as const,
            placeholder: "Ej: Compra, Venta...",
          },
          {
            name: "estado",
            label: "Estado",
            type: "select" as const,
            options: [
              { value: "", label: "Todos" },
              { value: "2", label: "Activo" },
              { value: "1", label: "Inactivo" },
            ],
          },
        ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transacciones");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "transacciones.xlsx");
  };

  if (isLoading) {
    return (
      <Spinner className="fixed inset-0 flex items-center justify-center text-red-300" />
    );
  }

  return (
    <BaseLayout header navBar={true}>
      <h2 className="text-xl font-semibold ml-5 mt-5">{isRoleId}</h2>

      <ComponentFilter
        filters={filters}
        handleChange={handleChange}
        fields={fields}
      />

      {/* Tabla */}
      <div className="mt-5 mr-4 ml-4">
        <ListComponent<T>
          dataList={filteredData}
          module={isRoleId}
          showColums={true}
        />
      </div>

      {/* Botones exportar */}
      <div className="flex justify-center mx-auto md:justify-end md:mr-10 mb-10 mt-6 gap-4">
        <Button
          onClick={handleExportPDF}
          type="button"
          className="bg-primary-500 hover:bg-primary-700 flex items-center gap-2 md:px-4 py-2 rounded-xl shadow-md"
        >
          <CiSaveDown1 />
          Descargar PDF
        </Button>

        <Button
          onClick={handleExportExcel}
          type="button"
          className="bg-green-500 hover:bg-green-700 flex items-center gap-2 md:px-4 py-2 rounded-xl shadow-md"
        >
          <CiSaveDown1 />
          Descargar Excel
        </Button>
      </div>
    </BaseLayout>
  );
};
