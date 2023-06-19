import '../style/nuevoUsuario.css'
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState, useEffect } from 'react';
import { postUser, getUser, updateUser } from '../services/users';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import { useForm } from "react-hook-form";
import { BiImageAdd, BiImage } from "react-icons/bi";
import { config } from '../config';
import axios from 'axios'


const NuevoUsuario = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const { register, setValue, formState: { errors }, handleSubmit } = useForm()
    const { loading, callEndpoint } = useFetchAndLoad()
    const [imagen, setImagen] = useState('')


    const submitData = async (data) => {
        const formData = {
            'nombre': data.nombre,
            'apellido_paterno': data.apellido_paterno,
            'apellido_materno': data.apellido_materno,
            'dni': data.dni,
            'imagen': imagen,
            'username': data.username,
            'password': data.password,
            'isAdmin': data.isAdmin
        }
        if (!userId) {
            // try{
            //     callEndpoint(postUser(formData))
            //     .then(resp => resp.json())
            //     .then( resp => console.log(resp))
            // toast.success('Usuario creado correctamente')
            // }catch(error){
            //     console.log(error)
            // }
            await axios.post(`${config.API_URL}users/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Usuario creado correctamente')
        } else {
            // callEndpoint(updateUser(formData, parseInt(userId)))
            //     .then(resp => resp.json())
            await axios.post(`${config.API_URL}users/update/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Usuario editado correctamente')
        }

    }

    useEffect(() => {
        if (!userId) {
            return () => { }
        }
        callEndpoint(getUser(parseInt(userId)))
            .then(res => res.json())
            .then(res => {
                setValue('nombre', res.nombre)
                setValue('apellido_paterno', res.apellido_paterno)
                setValue('apellido_materno', res.apellido_materno)
                setValue('dni', res.dni)
                setValue('username', res.username)
                // setValue('password', res.password)
                setValue('isAdmin', res.isAdmin)
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
                <form onSubmit={handleSubmit(submitData)} encType="multipart/form-data">
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

                        </div>
                        <div className='subcontenedor-form'>
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
                                <label htmlFor="username">Usuario</label>
                                <input
                                    type="text"
                                    {...register('username',
                                        {
                                            required: true
                                        })
                                    }
                                    name='username'
                                    id='username'
                                    placeholder='Ingrese su usuario'
                                />
                                {errors.username?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="password">{userId && 'Nueva'} Contraseña</label>
                                <input
                                    type="password"
                                    {...register('password',
                                        {
                                            required: userId ? false : true
                                        })
                                    }
                                    name='password'
                                    id='password'
                                    placeholder={userId ? 'Ingrese su nueva contraseña' : 'Ingrese su contraseña'}
                                />
                                {errors.password?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                            <div className='form-group__input-group'>
                                <label htmlFor="isAdmin">Administrador</label>
                                <select
                                    className='select_admin'
                                    {...register('isAdmin',
                                        {
                                            required: true
                                        })
                                    }
                                    name='isAdmin'
                                    id='isAdmin'
                                >
                                    <option value="">--Seleccione--</option>
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