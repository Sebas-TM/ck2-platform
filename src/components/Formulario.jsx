import '../style/formulario.css'
import { Link } from 'react-router-dom'
import { FiChevronLeft } from "react-icons/fi";

const Formulario = ({ user }) => {

    // const navigate = useNavigate()

    return (
        <div className='contenedor-form'>
            <div className='contenedor-form-header'>
                <button className='btn_regresar'>
                    <FiChevronLeft />
                    <Link className='btn_regresar_texto' to='/menu/usuarios'>Regresar</Link>
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
                        // onChange={(e) => setNombre(e.target.value)}
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
                        // onChange={(e) => setApellidoPaterno(e.target.value)}
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
                        // onChange={(e) => setApellidoMaterno(e.target.value)}
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
                        // onChange={(e) => setDni(e.target.value)}
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
                        // onChange={(e) => setUsuario(e.target.value)}
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
                        // onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="isAdmin">Administrador</label>
                        {/* <select
                            className='select_admin'
                        >
                            <option value="" disabled>--Seleccione--</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                        </select> */}
                        <input
                            type="text"
                            name='isAdmin'
                            id='isAdmin'
                            placeholder='¿Es admin?'
                            defaultValue={user?.isAdmin}
                        // onChange={(e) => setAdmin(e.target.value)}
                        />
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