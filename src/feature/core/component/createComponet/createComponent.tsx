import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner } from "../../ui";
import { InputField } from "../../ui/InputField";
import { CiSaveDown1 } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";
import { serviceSchemas } from "./createDinamicShema";
import { useCreateData } from "./useCreateData";
import { clearLabel } from "../../const/clearLabel";
import { useGetList } from "../../services/useGetList";
import { useParametrizacionContext } from "@/context/parametrizacionContext";



type CreateComponentProps = {
  label: string | undefined;
   idCustomer?: string | number;
   ModalOpen?: boolean;
};

export const CreateComponent: React.FC<CreateComponentProps> = ({ label, idCustomer, ModalOpen }) => {
  const location = useLocation();
  const isUpdatePage = location.pathname.includes("/actualizarPage");
   
   const { id } = useParams();
 

   const customerId = isUpdatePage ? id : idCustomer
 
    
   

  if (!label || !serviceSchemas[label]) {
    return <div>Error: No se encontró un esquema para "{label}"</div>;
  }

  const {dataList, isLoading} = useGetList<any>({moduleRour: label}) 
  const filterData = dataList.find((item: any) => item.id === Number(customerId));
  const { schema, postCreateForm } = useCreateData({ label , Update:isUpdatePage})
 
  type FormValues = z.infer<typeof schema>;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: {},
  });

   const { parametros} = useParametrizacionContext()


  if (!schema) {
    return <div>Error: No se encontró un esquema para "{label}"</div>;
  }

  
  const fields = schema instanceof z.ZodObject ? Object.keys(schema.shape) : [];

 

  const handleReset = () => {
    reset(); 
  };

 
 
  const onSubmit = async (data: FormValues) => {
     postCreateForm(data)
  };

  useEffect(() => {
    if (filterData) {
      reset(filterData);
    }
  }, [filterData, reset]);

  if(isLoading){
    return (<Spinner  className='fixed inset-0 flex items-center justify-center text-red-300' />)
  }
 

  return (
    <div className="mt-1">
       {!ModalOpen && ( <h1 className="text-xl bg-primary-50 h-11 pl-2 pt-2 rounded-md">
        {`${isUpdatePage ? "Actualizar" : "Crear"} ${label}`}
      </h1> )} 
      
      <form onSubmit={handleSubmit(onSubmit,errors => console.log(errors)) }>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-5 pt-8 md:border-2 p-3  ${isUpdatePage ? 'border-primary-200' : 'border-none'}  `}>
          {fields.map((field) => (
            <div key={field}>
              <label>{clearLabel(field)}</label>
              <Controller
                name={field}
                control={control}
                render={({ field }) => {
                  const fieldType =
                    schema instanceof z.ZodObject && schema.shape[field.name]._def.typeName === "ZodNumber"
                      ? "number"
                      : "text";
                  return (
                    <InputField
                      {...field}

                      type={fieldType}
                      disabled={!isUpdatePage}
                      className="border p-2 rounded w-full"
                      maxLength={fieldType === "text" ? 250 : 5}
                     
                    />
                  );
                }}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">
                  {errors[field]?.message?.toString()}
                </p>
              )}
            </div>
          ))}
        </div>
      
      {  !ModalOpen  &&  (<div  className="w-full justify-center space-x-3 md:space-x-0 md:justify-between mx-auto flex mt-10">
         
          <div>
            <Button
              onClick={handleReset}
              type="button"
              className={`w-44 h-14 rounded-md bg-[${parametros?.colorSecundario}] text-black transition-all hover:brightness-110`}
            >
              <ImCancelCircle /> Cancelar
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              className={`w-44 h-14 rounded-md bg-[${parametros?.colorSecundario}] text-black transition-all hover:brightness-110`}
            >
              <CiSaveDown1 /> Guardar
            </Button>
          </div>
        </div> )}
        
      </form>
    </div>
  );
};
