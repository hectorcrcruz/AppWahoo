// src/pages/ListPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "../core";
import { ListComponent } from "../core/component";
import { BaseLayout } from "../core/ui/base-layout";
import { useGetList } from "../core/services/useGetList";
import { useAuthStore } from "../contex/AuthContext";
import { Roles } from "../core/const/roles";
import { useMemo, useState } from "react";
import { ComponentFilter } from "../userProveedor/component/componentFilter";
import { EntityMap } from "../core/types/entityTypes";
import { filterConfig } from "../core/types/filterCampus";


export const ListPage = <T extends { id: number }>() => {
  const { module = "" } = useParams();
  const { rolId } = useAuthStore();
  const navigate = useNavigate();

  
  const modules =
    rolId === Roles.Proveedor || rolId === Roles.Comercio ? "Producto" : module;


  const fields = useMemo(() => {
    if (rolId === Roles.Administrador || rolId === Roles.Soporte) {
      return filterConfig[modules as keyof EntityMap] ?? [];
    }
   
    return filterConfig[modules as keyof EntityMap] ?? [];
  }, [rolId, modules]);

  // Estado de filtros dinámico
  const [filters, setFilters] = useState<Record<string, string>>(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
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


  const filteredData = dataList.filter((item: any) =>
    fields.every((f) => {
      const filterValue = filters[f.name]?.toLowerCase() || "";
      return (
        filterValue === "" ||
        String(item[f.name] ?? "").toLowerCase().includes(filterValue)
      );
    })
  );

  if (isLoading) {
    return (
      <Spinner className="fixed inset-0 flex items-center justify-center text-red-300" />
    );
  }

  return (
    <BaseLayout header navBar={true}>
      <div className="p-10">
        {/* Botón volver */}
        <div>
          <Button
            onClick={handleReturn}
            className="rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110"
          >
            Volver
          </Button>
        </div>

        {/* Filtros dinámicos */}
        {fields.length > 0 && (
          <div className="mt-6">
            <ComponentFilter
              fields={fields}
              handleChange={handleChange}
              filters={filters}
            />
          </div>
        )}

        {/* Listado */}
        <div className="mt-10 md:mt-5">
          <ListComponent<T> dataList={filteredData} module={modules} />
        </div>
      </div>
    </BaseLayout>
  );
};
