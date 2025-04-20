import { Button } from '@/feature/core'
import { InputField } from '@/feature/core/ui/InputField'
import { SelectField } from '@/feature/core/ui/SelectField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { FormRegisterUser, InfoRegisterUser, buyRegister, InfoBuyRegister } from './login-schema'
import { FaUser } from "react-icons/fa"
import { GiShoppingCart } from "react-icons/gi";


interface RegisterUserFormProps {
  className: string
  onSuccess: (values: InfoRegisterUser | InfoBuyRegister) => void
  isLocation?: boolean
  onSucces?: (values:boolean) => void;
}

const optionTipeDocument = [
  { value: 1, label: 'Cédula de ciudadanía' },
  { value: 2, label: 'Cédula de extranjería' },
]

const optionTipeFormaPago = [
  { value: 1, label: 'Pse' },
  { value: 2, label: 'Otro' },
]



const classStyle = 'hover:!border-primary-500 focus:outline-none focus:ring focus:!border-primary-500'

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({ className, onSuccess, isLocation, onSucces }) => {

  const schema = isLocation ? buyRegister : FormRegisterUser
  const { control, formState: { errors }, handleSubmit } = useForm<InfoRegisterUser | InfoBuyRegister>({
    resolver: zodResolver(schema),
  })

  const fields = Object.keys(schema.shape) as Array<keyof InfoRegisterUser | keyof InfoBuyRegister>

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
      tipoFormaPago: 'Tipo de Forma de Pago'
    }
    return labels[field] ?? field
  }

  const isSelectField = (fieldName: string) => {
    return fieldName === 'tipoIdentificacionId' || fieldName === 'tipoFormaPago'
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSuccess, (errors) => console.log(errors))}>
      <div className={`grid grid-cols-1 mt-10 md:mt-0 md:p-0 ${isLocation ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
        {fields.map((field) => (
          <div className='col-span-1' key={field}>
            <label className="block mb-1 font-medium">{clearLabel(field)}</label>
            <Controller
              name={field as any}
              control={control}
              render={({ field: controllerField }) => {
                if (isSelectField(field)) {
                  return (
                    <SelectField
                      {...controllerField}
                      options={controllerField.name === 'tipoIdentificacionId' ? optionTipeDocument : optionTipeFormaPago}
                      className={classStyle}
                      error={(errors as any)[field]?.message}
                      label="Seleccione"
                    />
                  )
                }

                const type = field === 'expeditionCedula' ? 'date' :
                  typeof schema.shape[field]._def.typeName === 'string' && schema.shape[field]._def.typeName === 'ZodNumber'
                    ? 'number'
                    : 'text'

                return (
                  <InputField
                    {...controllerField}
                    className={classStyle}
                    type={type}
                    maxLength={field === 'numberIdentification' || field === 'telefonoUsuario' ? 10 : undefined}
                   
                    label=""
                  />
                )
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
