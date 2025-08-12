import { Button } from '@/feature/core'
import { InputField } from '@/feature/core/ui/InputField'
import { SelectField } from '@/feature/core/ui/SelectField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { FormRegisterUser, buyRegister } from './login-schema'
import { FaUser } from "react-icons/fa"
import { GiShoppingCart } from "react-icons/gi"
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface RegisterUserFormProps {
  className: string
  onSuccess: (values: any) => void
  isLocation?: boolean
  onSucces?: (values: boolean) => void;
}

const optionTipeDocument = [
  { value: 1, label: 'Cédula de ciudadanía' },
  { value: 2, label: 'Cédula de extranjería' },
]



const classStyle = 'hover:!border-primary-500 focus:outline-none focus:ring focus:!border-primary-500'

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({ className, onSuccess, isLocation, onSucces }) => {

  // 1) Creamos una versión del esquema buyRegister sin el campo tipoFormaPago (runtime)
  const buyRegisterNoPayment = buyRegister.omit({ tipoFormaPago: true })

  // 2) Elegimos el esquema runtime según isLocation
  const schema = isLocation ? buyRegisterNoPayment : FormRegisterUser

  // 3) Tipos TypeScript derivados de cada esquema (usamos unión para cubrir ambos casos)
  type RegisterUserType = z.infer<typeof FormRegisterUser>
  type BuyRegisterType = z.infer<typeof buyRegisterNoPayment>
  type FormValues = RegisterUserType | BuyRegisterType

  // 4) Hook de formulario — el resolver usa el schema runtime correcto
  const { control, formState: { errors }, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  // 5) Extraemos los campos del esquema runtime y garantizamos que 'tipoFormaPago' quede fuera.
  const fields = (Object.keys((schema as any).shape)
    .filter((f) => f !== 'tipoFormaPago')) as Array<keyof RegisterUserType | keyof BuyRegisterType>;

  const clearLabel = (field: string) => {
    const labels: Record<string, string> = {
      nombreUsuario: 'Nombres',
      apellidoUsuario: 'Apellidos',
      tipoIdentificacionId: 'Tipo de documento',
      numberIdentification: 'Número de identificación',
      expeditionCedula: 'Expedición de Cédula',
      correo: 'Correo',
      rolId: 'Rol',
      telefonoUsuario: 'Teléfono',
      direccionUsuario: 'Dirección',
      login: 'Login',
    }
    return labels[field] ?? field
  }
  

const location = useLocation();

useEffect(() => {
    if (location.pathname.includes('home/voucher/:virtual')) {
      const authData = localStorage.getItem('auth-store');
      console.log(authData)
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          const state = parsed?.state;
          if (state) {
            setValue('nombreUsuario', state.nombreUsuario || '')
            setValue('apellidoUsuario', state.apellidoUsuario || '');
          }
        } catch (error) {
          console.error('Error parsing auth-store', error);
        }
      }
    }
  }, [location.pathname, setValue]);


  const isSelectField = (fieldName: string) => {
    return fieldName === 'tipoIdentificacionId'
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSuccess, (errors) => console.log(errors))}>
      <div className={`grid grid-cols-1 mt-10 md:mt-0 md:p-0 ${isLocation ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        {fields.map((field) => (
          <div className='col-span-1' key={String(field)}>
            <label className="block mb-1 font-medium">{clearLabel(String(field))}</label>
            <Controller
              name={field as any}
              control={control}
              render={({ field: controllerField }) => {
                if (isSelectField(String(field))) {
                  return (
                    <SelectField
                      {...controllerField}
                      options={optionTipeDocument}
                      className={classStyle}
                      error={(errors as any)[field]?.message}
                    />
                  );
                }

                // detección segura del tipo Zod para elegir input type
                const zodDef = (schema as any).shape?.[field]
                const zodTypeName = zodDef?._def?.typeName
                const type = String(field) === 'expeditionCedula' ? 'date'
                  : zodTypeName === 'ZodNumber'
                    ? 'number'
                    : 'text';

                return (
                  <InputField
                    {...controllerField}
                    className={classStyle}
                    type={type}
                    maxLength={String(field) === 'numberIdentification' || String(field) === 'telefonoUsuario' ? 10 : undefined}
                    label=""
                  />
                );
              }}
            />
            {(errors as any)[field]?.message && (
              <p className="text-red-500 text-sm">{(errors as any)[field]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className='flex items-center justify-around pt-10 pb-6'>
        {isLocation && (<Button type='button' onClick={() => onSucces?.(false)} className='w-44 rounded-md bg-gradient-to-b from-[#d1d356] to-[#d3e719] text-white transition-all hover:brightness-110' >
           Cancelar
        </Button>)}

        <Button className='w-44 rounded-md bg-gradient-to-b from-[#a20f5c] to-[#d53287] text-white transition-all hover:brightness-110' type='submit'>
           {isLocation ? <GiShoppingCart/> : <FaUser />}
          {isLocation ? 'Continuar ' : 'Crear Usuario'}
        </Button>
      </div>
    </form>
  )
}
