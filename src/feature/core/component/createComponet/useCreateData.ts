import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { postList, putList } from '../../services/createDocumentService'; // Ensure these functions return Promises
import { arrayModules } from '../../const/modules';
import { z } from "zod";
import { serviceSchemas } from './createDinamicShema';


type useProps = {
    label: string ;
    Update:boolean;
}

export const useCreateData = ({ label, Update }: useProps) => {

  console.log(Update)
     const navigate = useNavigate()
     const newUrlGet = arrayModules.find(module => module.name === label)
     const paramFilter = Update ?  newUrlGet?.pathPut: newUrlGet?.pathPost
      const numberIdentification = localStorage.getItem('user');
      const originalSchema = serviceSchemas[label];
      const schema = originalSchema.omit({ fechaAdd: true, usuarioAdd: true , id: !Update });
    

      const labelProps  = Update ? 'actualizado' : 'creado'
    
      type FormValues = z.infer<typeof schema>;
    

          const postCreateForm = async (data: FormValues) =>{
             try {
               const finalData = {
                 ...data,
                 fechaAdd: new Date().toISOString(),
                 usuarioAdd: numberIdentification, 
               } 
                 Update ? await putList<FormValues>(finalData, paramFilter as string) :
                 await postList<FormValues>(finalData, paramFilter as string);
                const result = await Swal.fire({
                 title: `${labelProps} de manera  exitosa`,
                 text: `El ${label} se ha ${labelProps} correctamente.`,
                 icon: "success",
                 confirmButtonText: "Aceptar",
               });
           
               if (result.isConfirmed) {
                 navigate(`/home/${label}/listarPage`);
               }
             } catch (error) {
              console.error(error);
               Swal.fire({
                 title: "Ups!",
                 text: `Error al ${labelProps} el ${label}. Por favor, tenemos problemas con el servidor`,
                 icon: "error",
               });
             }
           }
         


    return {
        postCreateForm,
        schema,
        

    }
}