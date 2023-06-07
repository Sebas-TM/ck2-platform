import '../style/formulario.css'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from "react"
import { getAreas } from '../services/areas';
import useFetchAndLoad from '../hooks/useFetchAndLoad';

const FormularioEmpleado = ({ employee }) => {

    const navigate = useNavigate()
    const { loading, callEndpoint } = useFetchAndLoad()
    const [areas, setAreas] = useState([])

    useEffect(() => {
        callEndpoint(getAreas())
            .then(res => res.json())
            .then(res => {
                setAreas(res)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console - log('Request has benn', error.message)
                }
            })
    }, [])
    return (
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
                <h1 className='contenedor-form__texto'>{employee?.nombre ? 'Editar personal' : 'Nuevo personal'}</h1>
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
                            defaultValue={employee?.nombre}
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
                            defaultValue={employee?.apellido_paterno}
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
                            defaultValue={employee?.apellido_materno}
                        // onChange={(e) => setApellidoMaterno(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="estado">Estado</label>
                        <select
                            className='estado'
                            name='estado'
                            id='estado'
                            defaultValue={employee?.estado}
                        >
                            <option value="" disabled>--Seleccione--</option>
                            <option value="Activo">Activo</option>
                            <option value="No activo">No activo</option>
                        </select>
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            name='dni'
                            id='dni'
                            placeholder='Ingrese su DNI'
                            defaultValue={employee?.dni}
                        // onChange={(e) => setDni(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="correo">Correo</label>
                        <input
                            type="email"
                            name='correo'
                            id='correo'
                            placeholder='Ingrese su correo'
                            defaultValue={employee?.correo}
                        // onChange={(e) => setDni(e.target.value)}
                        />
                    </div>
                </div>
                <div className='subcontenedor-form'>
                    <div className='form-group__input-group'>
                        <label htmlFor="telefono">Celular</label>
                        <input
                            type="text"
                            name='telefono'
                            id='telefono'
                            placeholder='Ingrese su teléfono'
                            defaultValue={employee?.telefono}
                        // onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="area">Área</label>
                        <input
                            type="text"
                            name='area'
                            id='area'
                            placeholder='Ingrese el área al que pertenece el empleado'
                            defaultValue={employee?.area}
                        // onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="sala">Área</label>
                        <select
                            className='sala'
                            name='sala'
                            id='sala'
                            defaultValue={employee?.area}
                        >
                            <option value="" disabled>--Seleccione--</option>
                            {areas.map(area => (
                                <option key={area.id}>{area.area}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="sala">Sala</label>
                        <select
                            className='sala'
                            name='sala'
                            id='sala'
                            defaultValue={employee?.sala}
                        >
                            <option value="" disabled>--Seleccione--</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="cargo">Puesto</label>
                        <input
                            type="text"
                            name='cargo'
                            id='arcargoea'
                            placeholder='Ingrese el cargo del empleado'
                            defaultValue={employee?.cargo}
                        // onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="jefe_directo">Supervisor</label>
                        <input
                            type="text"
                            name='jefe_directo'
                            id='jefe_directo'
                            placeholder='Ingrese el supervisor del empleado'
                            defaultValue={employee?.jefe_directo}
                        // onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value={employee?.nombre ? 'Guardar cambios' : 'Registrar personal'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormularioEmpleado
