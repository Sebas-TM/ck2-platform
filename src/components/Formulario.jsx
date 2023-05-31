import '../style/formulario.css'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from "react-icons/fi";

const Formulario = ({ user }) => {

    const navigate = useNavigate()

    return (
        <div className='contenedor-form'>
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
                <h1 className='contenedor-form__texto'>{user?.nombre ? 'Editar usuario' : 'Nuevo usuario'}</h1>
            </div>
            <div className='subcontenedor'>
                <div className='subcontenedor-form'>
                    <div className='form-group__input-group'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            name='nombre'
                            id='nombre'
                            placeholder='Ingrese su nombre'
                            defaultValue={user?.nombre}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="apellido_paterno">Apellido paterno</label>
                        <input
                            type="text"
                            name='apellido_paterno'
                            id='apellido_paterno'
                            placeholder='Ingrese su apellido paterno'
                            defaultValue={user?.apellido_paterno}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="apellido_materno">Apellido materno</label>
                        <input
                            type="text"
                            name='apellido_materno'
                            id='apellido_materno'
                            placeholder='Ingrese su apellido materno'
                            defaultValue={user?.apellido_materno}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            name='dni'
                            id='dni'
                            placeholder='Ingrese su DNI'
                            defaultValue={user?.dni}
                        />
                    </div>
                </div>
                <div className='subcontenedor-form'>
                    <div className='form-group__input-group'>
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            name='username'
                            id='username'
                            placeholder='Ingrese su usuario'
                            defaultValue={user?.username}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            placeholder='Ingrese su contraseña'
                            defaultValue={user?.password}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="isAdmin">Administrador</label>
                        <select
                            className='select_admin'
                            name='isAdmin'
                            id='isAdmin'
                            defaultValue={user?.isAdmin}
                        >
                            <option value="" disabled>--Seleccione--</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div className='form-group__input-group'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value={user?.nombre ? 'Guardar cambios' : 'Registrar usuario'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formulario