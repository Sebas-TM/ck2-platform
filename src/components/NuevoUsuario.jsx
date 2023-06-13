import '../style/nuevoUsuario.css'
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState, useEffect } from 'react';
import { postUser, getUser, updateUser } from '../services/users';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import { useForm } from "react-hook-form";


const NuevoUsuario = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const [users, setUsers] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { loading, callEndpoint } = useFetchAndLoad()

    const submitData = data => {
        if (!userId) {
            callEndpoint(postUser(data))
                .then(resp => resp.json())

            toast.success('Usuario creado correctamente')
        }else{
            callEndpoint(updateUser(data, parseInt(userId)))
                .then(resp => resp.json())
            toast.success('Usuario editado correctamente')
        }
        // console.log(data);
    }

    useEffect(() => {
        if (!userId) {
            return () => { }
        }
        callEndpoint(getUser(parseInt(userId)))
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message)
                }
            })
    }, [userId])
    return (
        <section className='contenedor_nuevo-dato'>
            <Toaster position="top-center" richColors />
            <div className='contenedor-form'>
                <div className='contenedor-form-header'>
                    <button onClick={() => navigate("/menu/usuarios")} className='btn_regresar'>
                        <FiChevronLeft />
                        <Link
                            className='btn_regresar_texto'
                        // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                    </button>
                    <h1 className='contenedor-form__texto'>{userId ? 'Editar' : 'Nuevo'} usuario</h1>
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
                                            required:true
                                        })
                                    }
                                    name='nombre'
                                    id='nombre'
                                    placeholder='Ingrese su nombre'
                                    // defaultValue={users?.nombre}
                                    defaultValue={users?.nombre}
                                />
                                {errors.nombre?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="apellido_paterno">Apellido paterno</label>
                                <input
                                    type="text"
                                    {...register('apellido_paterno',
                                        {
                                            required:true
                                        })
                                    }
                                    name='apellido_paterno'
                                    id='apellido_paterno'
                                    placeholder='Ingrese su apellido paterno'
                                    defaultValue={users?.apellido_paterno}
                                />
                                {errors.apellido_paterno?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="apellido_materno">Apellido materno</label>
                                <input
                                    type="text"
                                    {...register('apellido_materno',
                                        {
                                            required:true
                                        })
                                    }
                                    name='apellido_materno'
                                    id='apellido_materno'
                                    placeholder='Ingrese su apellido materno'
                                    defaultValue={users?.apellido_materno}
                                />
                                {errors.apellido_materno?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    {...register('dni',
                                        {
                                            required:true,
                                            pattern: /^[0-9]+$/,
                                            maxLength:8,
                                            minLength: 8
                                        })
                                    }
                                    name='dni'
                                    id='dni'
                                    placeholder='Ingrese su DNI'
                                    defaultValue={users?.dni}
                                />
                                {errors.dni?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                                {errors.dni?.type === 'maxLength' && <p className="error-message">Ingresar DNI correcto</p>}
                                {errors.dni?.type === 'minLength' && <p className="error-message">Ingresar DNI correcto</p>}
                                {errors.dni?.type === 'pattern' && <p className="error-message">Ingresar DNI correcto</p>}
                            </div>
                        </div>
                        <div className='subcontenedor-form'>
                            <div className='form-group__input-group'>
                                <label htmlFor="username">Usuario</label>
                                <input
                                    type="text"
                                    {...register('username',
                                        {
                                            required:true
                                        })
                                    }
                                    name='username'
                                    id='username'
                                    placeholder='Ingrese su usuario'
                                    defaultValue={users?.username}
                                />
                                {errors.username?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    {...register('password',
                                        {
                                            required:true
                                        })
                                    }
                                    name='password'
                                    id='password'
                                    placeholder='Ingrese su contraseña'
                                    defaultValue={users?.password}
                                />
                                {errors.password?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="isAdmin">Administrador</label>
                                <select
                                    className='select_admin'
                                    {...register('isAdmin',
                                        {
                                            required:true
                                        })
                                    }
                                    name='isAdmin'
                                    id='isAdmin'
                                    defaultValue={users?.isAdmin}
                                >
                                    <option value="" disabled>--Seleccione--</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                                {errors.isAdmin?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                        </div>
                    </div>
                    <div className='form-group__input-group input-area'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value={userId ? 'Guardar cambios' : 'Registrar usuario'}
                        />
                    </div>
                </form>
            </div>

        </section>
    )
}

export default NuevoUsuario