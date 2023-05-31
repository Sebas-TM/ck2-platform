import { useActionData, useLoaderData, Form, Link, Outlet ,useNavigate } from "react-router-dom"
import { getEmployees } from "../services/employees"
import {useState} from 'react'
import { FiUserPlus, FiTrash, FiEdit, FiEye } from "react-icons/fi";

export function loader(){
    const empleados = getEmployees()
    return empleados
}

const Empleados = () => {

    const empleados = useLoaderData()
    const [employees, setEmployees] = useState(empleados)

    const navigate = useNavigate()

    return(
        <div className="form-group">
        {/* <Toaster position='top-center'/> */}
        <div className="form-group-header">
            <h1>Personal</h1>
            <div className='contenedor-input'>
                <input 
                className='busqueda' 
                type="text" 
                // onChange={handleChange} 
                placeholder="Realizar búsqueda" />
                <button className='btn_add' onClick={() => navigate(`/menu/usuarios/crear`)}><FiUserPlus className='icon' /></button>
            </div>
        </div>
        <div className='contenedor-tabla contenedor-tabla-empleados'>
            <table cellSpacing="0" cellPadding="0" className='tabla'>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Nombre</td>
                        <td>Apellido paterno</td>
                        <td>Apellido materno</td>
                        <td>Estado</td>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.length ?(
                        employees.map((employee,index) => (
                            <tr key={employee.id}>
                                <td className='data data_id'>{index+1}</td>
                                <td className='data data_nombre'>{employee.nombre}</td>
                                <td className='data data_apaterno'>{employee.apellido_paterno}</td>
                                <td className='data data_amaterno'>{employee.apellido_materno}</td>
                                <td className='data data_amaterno'>{employee.estado}</td>
                                <td className='data data_opciones'>
                                    <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} className="btn_option view"><FiEye className="icon"/></button>
                                    <button 
                                    // onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} 
                                    className='btn_option edit'><FiEdit className='icon' /></button>
                                    <Form
                                        method='post'
                                        // action={`/menu/usuarios/${user.id}/eliminar`}
                                        onSubmit={(e) => {
                                            if (!confirm('¿Deseas eliminar este registro?')) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        <button className='btn_option delete'><FiTrash className='icon' /></button>
                                    </Form>

                                </td>
                            </tr>
                        ))
                    ):(
                        <h2>No hay resultados</h2>
                    )}
                </tbody>
            </table>

        </div>
        <div className="contenedor-cards-employees">
            {
                employees.map((employee,index)=>(
                    <div key={index} className="cards-employee">
                        <div className="cards-employees-contenedor">
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
                                <p className="dato">Estado:</p>
                                <p className="dato-info">{employee.estado}</p>
                            </div>
                        </div>
                        <div className='data data_opciones'>
                                    <button onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} className="btn_option view"><FiEye className="icon"/></button>
                                    <button 
                                    // onClick={() => navigate(`/menu/recursos_humanos/empleado/${employee.id}`)} 
                                    className='btn_option edit'><FiEdit className='icon' /></button>
                                    <Form
                                        method='post'
                                        // action={`/menu/usuarios/${user.id}/eliminar`}
                                        onSubmit={(e) => {
                                            if (!confirm('¿Deseas eliminar este registro?')) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        <button className='btn_option delete'><FiTrash className='icon' /></button>
                                    </Form>

                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    )
}

export default Empleados