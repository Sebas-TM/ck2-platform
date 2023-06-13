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

const cookies = new Cookies()



const Empleados = () => {

    const isAdmin = cookies.get('isAdmin')
    const { loading, callEndpoint } = useFetchAndLoad()
    const [employees, setEmployees] = useState([])
    const [tabla, setTabla] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        callEndpoint(getEmployees())
            .then(res => res.json())
            .then(res => {
                setEmployees(res)
                setTabla(res)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message);
                }
            })
    }, [])

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
            {employees.length < 1 && <Spinner />}
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
                <table cellSpacing="0" cellPadding="0" className='tabla'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Nombre</td>
                            <td>Apellido paterno</td>
                            <td>Apellido materno</td>
                            <td>DNI</td>
                            <td>Estado</td>
                            <td>Opciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td align="center" className='data data_id'>{index + 1}</td>
                                    <td className='data data_nombre'>{employee.nombre}</td>
                                    <td className='data data_apaterno'>{employee.apellido_paterno}</td>
                                    <td className='data data_amaterno'>{employee.apellido_materno}</td>
                                    <td align="center" className='data data_amaterno'>{employee.dni}</td>
                                    <td align="center" className='data data_amaterno'>{employee.estado}</td>
                                    <td align="center" className='data data_opciones'>
                                        <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} className="btn_option view"><FiEye className="icon" /></button>
                                        <button className="btn_option wsp">
                                            <Link to={`https://wa.me/51${employee.telefono}`}>
                                                <ImWhatsapp className="icon" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}/editar`)}
                                            className='btn_option edit'><FiEdit className='icon' />
                                        </button>

                                        <button
                                            onClick={() => eliminarEmpleado(employee.id)}
                                            className="btn_option delete"
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
                    employees.map((employee, index) => (
                        <div key={index} className="contenedor-cards">
                            <div className="cards">
                                <div className="contenedor-datos">
                                    <p className="dato">Nombre:</p>
                                    <p className="dato-info">{employee.nombre}</p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Apellido paterno:</p>
                                    <p className="dato-info">{employee.apellido_paterno}</p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Apellido materno:</p>
                                    <p className="dato-info">{employee.apellido_materno}</p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">DNI:</p>
                                    <p className="dato-info">{employee.dni}</p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Estado:</p>
                                    <p className="dato-info">{employee.estado}</p>
                                </div>
                            </div>
                            <div className='data data_opciones'>
                                <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} className="btn_option view"><FiEye className="icon" /></button>
                                <button className="btn_option wsp">
                                    <Link to={`https://wa.me/51${employee.telefono}`}>
                                        <ImWhatsapp className="icon" />
                                    </Link>
                                </button>
                                <button
                                    onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}/editar`)}
                                    className='btn_option edit'><FiEdit className='icon' />
                                </button>
                                <button
                                    onClick={() => eliminarEmpleado(employee.id)}
                                    className="btn_option delete"
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