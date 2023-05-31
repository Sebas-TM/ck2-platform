import {getEmployee} from "../services/employees"
import { useLoaderData, useNavigate, Link } from "react-router-dom"
import '../style/verEmpleado.css'
import { FiChevronLeft } from "react-icons/fi";
import EmpleadoCard from "./EmpleadoCard"
export async function loader({params}){
    const employee = await getEmployee(params.empleadoId)
    if (Object.values(employee).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El empleado no fue encontrado'
        })
    }
    return employee
}

const VerEmpleado = () => {

    const employee = useLoaderData()
    const navigate = useNavigate()
    return(
        <>
        
        <section className="contenedor-ver-empleado">
            <div className="contenedor-ver-empleado__contenedor-boton">
                <button onClick={() => navigate(-1)}    className='btn_regresar'>
                        <FiChevronLeft />
                        <Link
                            className='btn_regresar_texto'
                        // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                </button>
            </div>
            <div className="ver-empleado-card">
                <EmpleadoCard dato={'Empleado:'} dato_info={`${employee.nombre} ${employee.apellido_paterno} ${employee.apellido_materno}`}/>
                <EmpleadoCard dato={'Estado:'} dato_info={employee.estado}/>
                <EmpleadoCard dato={'DNI:'} dato_info={employee.dni}/>
                <EmpleadoCard dato={'Correo:'} dato_info={employee.correo}/>
                <EmpleadoCard dato={'Teléfono:'} dato_info={employee.telefono}/>
                <EmpleadoCard dato={'Área:'} dato_info={employee.area}/>
                <EmpleadoCard dato={'Sala:'} dato_info={employee.sala}/>
                <EmpleadoCard dato={'Puesto:'} dato_info={employee.cargo}/>
                <EmpleadoCard dato={'Supervisor:'} dato_info={employee.jefe_directo}/>
            </div>
        </section>
        </>
    )
}

export default VerEmpleado