import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "../core";
import { ListComponent } from "../core/component";
import { BaseLayout } from "../core/ui/base-layout";
import { useGetList } from "../core/services/useGetList";
import { useAuthStore } from "../contex/AuthContext";
import { Roles } from "../core/const/roles";
import { useState } from "react";
import { ComponentFilter } from "../userProveedor/component/componentFilter";
import { Search } from "lucide-react";

export const ListPage = <T extends { id: number }>() => {
  const { module = "" } = useParams();
  const { rolId } = useAuthStore();

  // Si es Proveedor o Comercio, siempre es "Producto"
  const modules =
    rolId === Roles.Proveedor || rolId === Roles.Comercio ? "Producto" : module;

  const navigate = useNavigate();

  // Definición dinámica de los campos del filtro
  const fields =
    modules === "PQRS"
      ? [
          {
            name: "descripcionPQRS",
            label: "Descripción PQRS",
            type: "text" as const,
            placeholder: "Buscar descripción...",
            icon: <Search className="w-4 h-4" />,
          },
        ]
      : [
          {
            name: "descripcionProducto",
            label: "Descripción",
            type: "text" as const,
            placeholder: "Buscar descripción...",
            icon: <Search className="w-4 h-4" />,
          },
          {
            name: "detalleProducto",
            label: "Detalle de Producto",
            type: "text" as const,
            placeholder: "Ej: Compra, Venta...",
          },
        ];

  // Estado inicial dinámico según el módulo
  const [filters, setFilters] = useState(
    modules === "PQRS"
      ? {
          descripcionPQRS: "",
        }
      : {
          descripcionProducto: "",
          detalleProducto: "",
        }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const { dataList, isLoading } = useGetList<T>({ moduleRour: modules });

  // Filtro dinámico según el módulo
  const filteredData = dataList.filter((item: any) => {
    if (modules === "PQRS") {
      return (
        filters.descripcionPQRS === "" ||
        item.descripcionPQRS
          ?.toLowerCase()
          .includes((filters.descripcionPQRS ?? "").toLowerCase())
      );
    }

    return (
      (filters.descripcionProducto === "" ||
        item.descripcionProducto
          ?.toLowerCase()
          .includes((filters.descripcionProducto ?? "").toLowerCase())) &&
      (filters.detalleProducto === "" ||
        item.detalleProducto
          ?.toLowerCase()
          .includes((filters.detalleProducto ?? "").toLowerCase()))
    );
  });

  if (isLoading) {
    return (
      <Spinner className="fixed inset-0 flex items-center justify-center text-red-300" />
    );
  }

  return (
    <BaseLayout header navBar={true}>
      <div className="p-10">
        <div>
          <Button
            onClick={handleReturn}
            className="rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110"
          >
            Volver
          </Button>
        </div>

        <div>
          <ComponentFilter
            fields={fields}
            handleChange={handleChange}
            filters={filters}
          />
        </div>

        <div className="mt-10 md:mt-5">
          <ListComponent<T> dataList={filteredData} module={modules} />
        </div>
      </div>
    </BaseLayout>
  );
};
