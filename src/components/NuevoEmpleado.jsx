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
import { BiImageAdd, BiImage } from "react-icons/bi";
import { config } from '../config';
import axios from 'axios';
const NuevoEmpleado = () => {

    const navigate = useNavigate()
    const { employeeId } = useParams()
    const [cargando, setCargando] = useState(false)
    const [areas, setAreas] = useState([])
    const { register, setValue, formState: { errors }, handleSubmit } = useForm()
    const { loading, callEndpoint } = useFetchAndLoad()
    const [imagen, setImagen] = useState("")

    useEffect(() => {
        obtenerAreas()
    }, [])

    const obtenerAreas = async () => {
        try {
            setCargando(true)
            const res = await axios.get(`${config.API_URL}areas/list`)
            setAreas(res.data)
            setCargando(false)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (employeeId) {
            setCargando(true)
            obtenerEmpleado()
            setCargando(false)
        } else {
            return () => { }
        }

    }, [employeeId])

    const obtenerEmpleado = async () => {
        const res = await axios.get(`${config.API_URL}employees/list/${employeeId}`)
        setValue('nombre', res.data.nombre)
        setValue('apellido_paterno', res.data.apellido_paterno)
        setValue('apellido_materno', res.data.apellido_materno)
        setValue('imagen', res.data.imagen)
        setValue('estado', res.data.estado)
        setValue('dni', res.data.dni)
        setValue('correo', res.data.correo)
        setValue('celular', res.data.celular)
        setValue('nombre_contacto', res.data.nombre_contacto)
        setValue('numero_contacto', res.data.numero_contacto)
        setValue('relacion_contacto', res.data.relacion_contacto)
        setValue('area', res.data.area)
        setValue('puesto', res.data.puesto)
        setValue('jefe_inmediato', res.data.jefe_inmediato)
    }

    const submitData = async (data) => {
        setCargando(true)
        const formData = {
            'nombre': data.nombre,
            'apellido_paterno': data.apellido_paterno,
            'apellido_materno': data.apellido_materno,
            'estado': data.estado,
            'dni': data.dni,
            'correo': data.correo,
            'celular': data.celular,
            'nombre_contacto': data.nombre_contacto,
            'numero_contacto': data.numero_contacto,
            'relacion_contacto': data.relacion_contacto,
            'area': data.area,
            'puesto': data.puesto,
            'jefe_inmediato': data.jefe_inmediato
        }

        if (imagen != "") {
            formData.imagen = imagen
        }

        if (!employeeId) {
            await axios.post(`${config.API_URL}employees/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(()=>{
                    toast.success('Datos registrados!')
                setCargando(false)

                })
                .catch(error =>{
                    toast.error(error.response.data.message)
                setCargando(false)

                })
        } else {
            await axios.post(`${config.API_URL}employees/update/${employeeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(()=>{
                toast.success('Datos actualizados!')
                setCargando(false)

            })
            .catch(error =>{
                toast.error(error.response.data.message)
                setCargando(false)

            })
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
                <form onSubmit={handleSubmit(submitData)} >
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
                                <label className="label_imagen" htmlFor="imagen">
                                    <p>{imagen != '' ? 'Imagen seleccionada' : 'Subir imagen'}</p>
                                    <div className="contenedor-icon_imagen">
                                        <BiImageAdd className={imagen != '' ? 'input_imagen BiImageAdd' : 'icon_imagen'} />
                                        <BiImage className={imagen != '' ? 'icon_imagen BiImage' : 'input_imagen'} />
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    {...register('imagen')}
                                    name='imagen'
                                    id='imagen'
                                    className='input_imagen'
                                    accept="image/jpeg, image/png"
                                    onChange={e => setImagen(e.target.files[0])}
                                />
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
                                    <option value="" >--Seleccione--</option>
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
                                <label htmlFor="celular">Celular</label>
                                <input
                                    type="tel"
                                    {...register('celular',
                                        {
                                            required: true,
                                            pattern: /^[0-9]+$/,
                                            maxLength: 9,
                                            minLength: 9
                                        })
                                    }
                                    name='celular'
                                    id='celular'
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
                                    <option value="">--Seleccione--</option>
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
                                    <option value=""  >--Seleccione--</option>
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