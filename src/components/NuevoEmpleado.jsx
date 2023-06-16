import '../style/nuevoUsuario.css'
import '../style/formulario.css'
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState, useEffect } from 'react';
import { postEmployee, getEmployee, updateEmployee } from '../services/employees';
import { getAreas } from '../services/areas';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import { useForm } from "react-hook-form";
import Spinner from './Spinner';

const NuevoEmpleado = () => {

    const navigate = useNavigate()
    const { employeeId } = useParams()
    const [employees, setEmployees] = useState([])
    const [cargando, setCargando] = useState(false)
    const [areas, setAreas] = useState([])
    const { register, setValue, formState: { errors }, handleSubmit } = useForm()
    const { loading, callEndpoint } = useFetchAndLoad()

    useEffect(() => {
        callEndpoint(getAreas())
            .then(res => res.json())
            .then(res => {
                setAreas(res)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message)
                }
            })
    }, [])

    useEffect(() => {
        if (employeeId) {
            setCargando(true)
            callEndpoint(getEmployee(parseInt(employeeId)))
                .then(res => res.json())
                .then(res => {
                    setValue('nombre', res.nombre)
                    setValue('apellido_paterno', res.apellido_paterno)
                    setValue('apellido_materno', res.apellido_materno)
                    setValue('imagen', res.imagen)
                    setValue('estado', res.estado)
                    setValue('dni', res.dni)
                    setValue('correo', res.correo)
                    setValue('celular', res.celular)
                    setValue('nombre_contacto', res.nombre_contacto)
                    setValue('numero_contacto', res.numero_contacto)
                    setValue('relacion_contacto', res.relacion_contacto)
                    setValue('area', res.area)
                    setValue('puesto', res.puesto)
                    setValue('jefe_inmediato', res.jefe_inmediato)
                    setCargando(false)
                })
        } else {
            return () => { }
        }

    }, [])

    const submitData = data => {
        if (!employeeId) {
            callEndpoint(postEmployee(data))
                .then(res => res.json())
            toast.success('Empleado agregado correctamente')
        } else {
            callEndpoint(updateEmployee(data, parseInt(employeeId)))
                .then(res => res.json())
            toast.success('Empleado actualizado correctamente')
        }

    }

    return (
        <section className='contenedor_nuevo-dato'>
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className='contenedor-form'>
                {/* <Toaster /> */}
                <div className='contenedor-form-header'>
                    <button onClick={() => navigate(-1)} className='btn_regresar'>
                        <FiChevronLeft />
                        <Link
                            className='btn_regresar_texto'
                        // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                    </button>
                    <h1 className='contenedor-form__texto'>{employeeId ? 'Editar personal' : 'Nuevo personal'}</h1>
                </div>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className='subcontenedor'>
                        <div className='subcontenedor-form'>
                            <div className='form-group__input-group'>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    {...register('nombre',
                                        {
                                            required: true
                                        })
                                    }
                                    name='nombre'
                                    id='nombre'
                                    placeholder='Ingrese su nombre'
                                />
                                {errors.nombre?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="apellido_paterno">Apellido paterno</label>
                                <input
                                    type="text"
                                    {...register('apellido_paterno',
                                        {
                                            required: true
                                        })
                                    }
                                    name='apellido_paterno'
                                    id='apellido_paterno'
                                    placeholder='Ingrese su apellido paterno'
                                />
                                {errors.apellido_paterno?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="apellido_materno">Apellido materno</label>
                                <input
                                    type="text"
                                    {...register('apellido_materno',
                                        {
                                            required: true
                                        })
                                    }
                                    name='apellido_materno'
                                    id='apellido_materno'
                                    placeholder='Ingrese su apellido materno'
                                />
                                {errors.apellido_materno?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="imagen">Foto</label>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    {...register('imagen',
                                        {
                                            required: true
                                        })
                                    }
                                    name='imagen'
                                    id='imagen'
                                />
                                {errors.imagen?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="estado">Estado</label>
                                <select
                                    className='estado'
                                    {...register('estado',
                                        {
                                            required: true
                                        })
                                    }
                                    name='estado'
                                    id='estado'
                                >
                                    <option value="" disabled>--Seleccione--</option>
                                    <option value="Activo">Activo</option>
                                    <option value="No activo">No activo</option>
                                </select>
                                {errors.estado?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    {...register('dni',
                                        {
                                            required: true,
                                            pattern: /^[0-9]+$/,
                                            maxLength: 8,
                                            minLength: 8
                                        })
                                    }
                                    name='dni'
                                    id='dni'
                                    placeholder='Ingrese su DNI'
                                />
                                {errors.dni?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                                {errors.dni?.type === 'maxLength' && <p className="error-message">Ingresar DNI correcto</p>}
                                {errors.dni?.type === 'minLength' && <p className="error-message">Ingresar DNI correcto</p>}
                                {errors.dni?.type === 'pattern' && <p className="error-message">Ingresar DNI correcto</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="email"
                                    {...register('correo',
                                        {
                                            required: true
                                        })
                                    }
                                    name='correo'
                                    id='correo'
                                    placeholder='Ingrese su correo'
                                />
                                {errors.correo?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>

                        </div>
                        <div className='subcontenedor-form'>
                            <div className='form-group__input-group'>
                                <label htmlFor="telefono">Celular</label>
                                <input
                                    type="text"
                                    {...register('celular',
                                        {
                                            required: true,
                                            pattern: /^[0-9]+$/,
                                            maxLength: 9,
                                            minLength: 9
                                        })
                                    }
                                    name='telefono'
                                    id='telefono'
                                    placeholder='Ingrese su número de celular'
                                />
                                {errors.celular?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                                {errors.celular?.type === 'maxLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.celular?.type === 'minLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.celular?.type === 'pattern' && <p className="error-message">Ingresar número de celular correcto</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="nombre_contacto">Nombre de contacto de emergencia</label>
                                <input
                                    type="text"
                                    {...register('nombre_contacto')}
                                    name='nombre_contacto'
                                    id='nombre_contacto'
                                    placeholder='Ingrese el dato'
                                />
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="numero_contacto">Número de contacto de emergencia</label>
                                <input
                                    type="text"
                                    {...register('numero_contacto',
                                        {
                                            pattern: /^[0-9]+$/,
                                            maxLength: 9,
                                            minLength: 9
                                        })
                                    }
                                    name='numero_contacto'
                                    id='numero_contacto'
                                    placeholder='Ingrese el número de celular'
                                />
                                {errors.telefono?.type === 'maxLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.telefono?.type === 'minLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.telefono?.type === 'pattern' && <p className="error-message">Ingresar número de celular correcto</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="relacion_contacto">Relación del contacto</label>
                                <select
                                    className='relacion_contacto'
                                    {...register('relacion_contacto')}
                                    name='relacion_contacto'
                                    id='relacion_contacto'
                                >
                                    <option value="" disabled>--Seleccione--</option>
                                    <option value="Padre">Padre</option>
                                    <option value="Madre">Madre</option>
                                    <option value="Esposo(a)">Esposo(a)</option>
                                    <option value="Hijo(a)">Hijo(a)</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="area">Área</label>
                                <select
                                    className='area'
                                    {...register('area',
                                        {
                                            required: true
                                        })
                                    }
                                    name='area'
                                    id='area'
                                >
                                    <option value="" disabled >--Seleccione--</option>
                                    {areas.map(area => (
                                        <option value={area.area} key={area.id}>{area.area}</option>
                                    ))}
                                </select>
                                {errors.area?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="puesto">Puesto</label>
                                <input
                                    type="text"
                                    {...register('puesto',
                                        {
                                            required: true
                                        })
                                    }
                                    name='puesto'
                                    id='puesto'
                                    placeholder='Ingrese el puesto del empleado'
                                />
                                {errors.puesto?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="jefe_inmediato">Jefe inmediato</label>
                                <input
                                    type="text"
                                    {...register('jefe_inmediato',
                                        {
                                            required: true
                                        })
                                    }
                                    name='jefe_inmediato'
                                    id='jefe_inmediato'
                                    placeholder='Ingrese el jefe inmediato'
                                />
                                {errors.jefe_inmediato?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>

                        </div>

                    </div>
                    <div className='form-group__input-group'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value={employeeId ? 'Guardar cambios' : 'Registrar personal'}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default NuevoEmpleado