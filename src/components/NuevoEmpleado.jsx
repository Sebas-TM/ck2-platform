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

const NuevoEmpleado = () => {

    const navigate = useNavigate()
    const { employeeId } = useParams()
    const [employees, setEmployees] = useState([])
    const [areas, setAreas] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm()
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

    const submitData = data => {
        console.log(data);
    }

    return (
        <section className='contenedor_nuevo-dato'>
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
                    <h1 className='contenedor-form__texto'>{employees?.nombre ? 'Editar personal' : 'Nuevo personal'}</h1>
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
                                    defaultValue={employees?.nombre}
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
                                    defaultValue={employees?.apellido_paterno}
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
                                    defaultValue={employees?.apellido_materno}
                                />
                                {errors.apellido_materno?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
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
                                    defaultValue={employees?.estado}
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
                                    defaultValue={employees?.dni}
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
                                            required:true
                                        })
                                    }
                                    name='correo'
                                    id='correo'
                                    placeholder='Ingrese su correo'
                                    defaultValue={employees?.correo}
                                // onChange={(e) => setDni(e.target.value)}
                                />
                                {errors.correo?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                        </div>
                        <div className='subcontenedor-form'>
                            <div className='form-group__input-group'>
                                <label htmlFor="telefono">Celular</label>
                                <input
                                    type="text"
                                    {...register('telefono',
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
                                    defaultValue={employees?.telefono}
                                // onChange={(e) => setUsuario(e.target.value)}
                                />
                                {errors.telefono?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                                {errors.telefono?.type === 'maxLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.telefono?.type === 'minLength' && <p className="error-message">Ingresar número de celular correcto</p>}
                                {errors.telefono?.type === 'pattern' && <p className="error-message">Ingresar número de celular correcto</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="area">Área</label>
                                <select
                                    className='area'
                                    {...register('area',
                                        {
                                            required:true
                                        })
                                    }
                                    name='area'
                                    id='area'
                                    defaultValue={employees?.area}
                                >
                                    <option value="" disabled >--Seleccione--</option>
                                    {areas.map(area => (
                                        <option key={area.id}>{area.area}</option>
                                    ))}
                                </select>
                                {errors.area?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="sala">Sala</label>
                                <select
                                    className='sala'
                                    {...register('sala',
                                        {
                                            required:true
                                        })
                                    }
                                    name='sala'
                                    id='sala'
                                    defaultValue={employees?.sala}
                                >
                                    <option value="" disabled>--Seleccione--</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                {errors.sala?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="cargo">Puesto</label>
                                <input
                                    type="text"
                                    {...register('cargo',
                                        {
                                            required:true
                                        })
                                    }
                                    name='cargo'
                                    id='cargo'
                                    placeholder='Ingrese el cargo del empleado'
                                    defaultValue={employees?.cargo}
                                // onChange={(e) => setContraseña(e.target.value)}
                                />
                                {errors.cargo?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="jefe_directo">Jefe inmediato</label>
                                <input
                                    type="text"
                                    {...register('jefe_directo',
                                        {
                                            required:true
                                        })
                                    }
                                    name='jefe_directo'
                                    id='jefe_directo'
                                    placeholder='Ingrese el jefe inmediato'
                                    defaultValue={employees?.jefe_directo}
                                // onChange={(e) => setContraseña(e.target.value)}
                                />
                                {errors.jefe_directo?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <input
                                    type='submit'
                                    className='btn_registrar'
                                    value={employeeId ? 'Guardar cambios' : 'Registrar personal'}
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default NuevoEmpleado