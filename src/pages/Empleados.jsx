import { useLoaderData, Form, Link, Outlet, useNavigate } from "react-router-dom"
import { deleteEmployee, getEmployees } from "../services/employees"
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { ImWhatsapp } from "react-icons/im";
import { FiUserPlus, FiTrash, FiEdit, FiEye } from "react-icons/fi";
import Cookies from 'universal-cookie'
import useFetchAndLoad from "../hooks/useFetchAndLoad"
import swal from 'sweetalert';
import Spinner from '../components/Spinner';
import employee_foto from '../image/foto-personal-ejemplo.jpg'
import '../style/empleados.css'
const cookies = new Cookies()



const Empleados = () => {

    const isAdmin = cookies.get('isAdmin')
    const { loading, callEndpoint } = useFetchAndLoad()
    const [employees, setEmployees] = useState([])
    const [cargando, setCargando] = useState(false)
    const [tabla, setTabla] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCargando(true)
        callEndpoint(getEmployees())
            .then(res => res.json())
            .then(res => {
                setEmployees(res)
                setTabla(res)
                setCargando(false)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message);
                }
            })
    }, [])

    const sortedEmployees = employees.sort((a, b) => b.id - a.id)

    const eliminarEmpleado = employeeId => {
        swal({
            text: "¿Estás seguro de eliminar este empleado?",
            buttons: ["No", "Si"]
        }).then(respuesta => {
            if (respuesta) {
                callEndpoint(deleteEmployee(parseInt(employeeId)))
                    .then(res => res.json())
                    .then(res => console.log(res))
                    .catch(error => {
                        if (error.code === 'ERR_CANCELED') {
                            console.log('Request has been', error.message)
                        }
                    })
                toast.success('Empleado eliminado correctamente')
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
            }
        })
    }

    const handleChange = e => {
        filtrar(e.target.value)
    }

    const filtrar = terminoBusqueda => {
        var resultadoBusqueda = tabla.filter((e) => {
            if (e.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || e.apellido_paterno.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || e.apellido_materno.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || e.dni.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || e.estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return e
            }
        })
        setEmployees(resultadoBusqueda)
    }

    return (
        <div className="form-group">
            {cargando && <Spinner />}
            <Toaster position='top-center' richColors />
            <div className="form-group-header">
                <h1>Personal</h1>
                <div className='contenedor-input'>
                    <input
                        className='busqueda'
                        type="text"
                        onChange={handleChange}
                        placeholder="Realizar búsqueda" />
                    <button className='btn_add' onClick={() => navigate(`/menu/recursos_humanos/empleado/crear`)}><FiUserPlus className='icon' /></button>
                </div>
            </div>
            <div className='contenedor-tabla '>
                <table cellSpacing="0" cellPadding="0" className='tabla tabla-empleados'>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Apellido paterno</td>
                            <td>Apellido materno</td>
                            <td>DNI</td>
                            <td>Estado</td>
                            <td>Foto</td>
                            <td>Opciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedEmployees.map((sortedEmployee, index) => (
                                <tr key={sortedEmployee.id}>
                                    <td className='data data_nombre'>{sortedEmployee.nombre}</td>
                                    <td className='data data_apaterno'>{sortedEmployee.apellido_paterno}</td>
                                    <td className='data data_amaterno'>{sortedEmployee.apellido_materno}</td>
                                    <td align="center" className='data data_amaterno'>{sortedEmployee.dni}</td>
                                    <td align="center" className='data data_amaterno'>{sortedEmployee.estado}</td>
                                    <td align="center">
                                        <img className="img_empleados" src={`http://127.0.0.1:8000/${sortedEmployee.imagen}`} alt="foto_personal" />
                                    </td>
                                    <td align="center" className='data data_opciones'>
                                        <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${sortedEmployee.id}`)} className="btn_option view"><FiEye className="icon" /></button>
                                        <button className="btn_option wsp">
                                            <Link target="blank" to={`https://wa.me/51${sortedEmployee.celular}`}>
                                                <ImWhatsapp className="icon" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => navigate(`/menu/recursos_humanos/empleado/${sortedEmployee.id}/editar`)}
                                            className={isAdmin == 1 ? 'btn_option edit' : 'disable-button'}><FiEdit className='icon' />
                                        </button>

                                        <button
                                            onClick={() => eliminarEmpleado(sortedEmployee.id)}
                                            className={isAdmin == 1 ? 'btn_option delete' : 'disable-button'}
                                        ><FiTrash className='icon' /></button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
            <div className="contenedor-general-cards">
                {
                    sortedEmployees.map((sortedEmployee, index) => (
                        <div key={index} className="contenedor-cards">
                            <div className="cards cards-employee">
                                <div className="contenedor-foto">
                                    <img src={`http://127.0.0.1:8000/${sortedEmployee.imagen}`} alt="foto_personal" />
                                </div>
                                <div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Nombre:</p>
                                        <p className="dato-info">{sortedEmployee.nombre}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Apellido paterno:</p>
                                        <p className="dato-info">{sortedEmployee.apellido_paterno}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Apellido materno:</p>
                                        <p className="dato-info">{sortedEmployee.apellido_materno}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">DNI:</p>
                                        <p className="dato-info">{sortedEmployee.dni}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Estado:</p>
                                        <p className="dato-info">{sortedEmployee.estado}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='data data_opciones'>
                                <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${sortedEmployee.id}`)} className="btn_option view"><FiEye className="icon" /></button>
                                <button className="btn_option wsp">
                                    <Link to={`https://wa.me/51${sortedEmployee.telefono}`}>
                                        <ImWhatsapp className="icon" />
                                    </Link>
                                </button>
                                <button
                                    onClick={() => navigate(`/menu/recursos_humanos/empleado/${sortedEmployee.id}/editar`)}
                                    className={isAdmin == 1 ? 'btn_option edit' : 'disable-button'}><FiEdit className='icon' />
                                </button>
                                <button
                                    onClick={() => eliminarEmpleado(sortedEmployee.id)}
                                    className={isAdmin == 1 ? 'btn_option delete' : 'disable-button'}
                                ><FiTrash className='icon' /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Empleados