import { InputField } from "@/feature/core/ui/InputField";
import { SelectField } from "@/feature/core/ui/SelectField";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";

type FilterField = {
  name: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  icon?: React.ReactNode;
  options?: { value: string | number; label: string }[];
};

interface Props {
  filters: Record<string, any>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  fields: FilterField[];
}

export const ComponentFilter: React.FC<Props> = ({
  filters,
  handleChange,
  fields,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 w-full max-w-6xl backdrop-blur-md p-6 pt-3 rounded-2xl shadow-lg border border-gray-200 m-4"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <ListFilter className="w-5 h-5 text-primary-600" /> Filtros de búsqueda
      </h3>

      {/* Grid dinámico que se ajusta automáticamente */}
      <div
        className="
          grid gap-4
          [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
        "
      >
        {fields.map((field) => (
          <div key={field.name} className="relative">
            {field.type === "text" && (
              <>
                {field.icon && (
                  <span className="absolute left-3 top-3 text-gray-400">
                    {field.icon}
                  </span>
                )}
                <InputField
                  type="text"
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={filters[field.name] ?? ""}
                  onChange={handleChange}
                  className={`${
                    field.icon ? "pl-9" : ""
                  } rounded-xl border-gray-300 focus:ring-2 focus:ring-primary-400 transition-all`}
                />
              </>
            )}

            {field.type === "select" && (
              <SelectField
                label={field.label}
                name={field.name}
                options={field.options ?? []}
                value={filters[field.name] ?? ""}
                onChange={handleChange}
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-primary-400 transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
