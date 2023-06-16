import {getEmployee} from "../services/employees"
import {  useNavigate, Link, useParams } from "react-router-dom"
import '../style/verEmpleado.css'
import { FiChevronLeft } from "react-icons/fi";
import EmpleadoCard from "./EmpleadoCard"
import useFetchAndLoad from "../hooks/useFetchAndLoad"
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const VerEmpleado = () => {

    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({})
    const [cargando, setCargando] = useState(false)
    const {loading, callEndpoint} = useFetchAndLoad()
    const navigate = useNavigate()

    useEffect(()=>{
        if(employeeId){
            setCargando(true)
            callEndpoint(getEmployee(parseInt(employeeId)))
            .then(res => res.json())
            .then(res=>{
                setEmployee(res)
                setCargando(false)
            })
        }else{
            return ()=>{}
        }
        
    },[])
    return(
        <>
        
        <section className="contenedor-ver-empleado">
            {cargando && <Spinner/>}
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
                <EmpleadoCard dato={'Celular:'} dato_info={employee.celular}/>
                <EmpleadoCard dato={'Área:'} dato_info={employee.area}/>
                <EmpleadoCard dato={'Nombre de contacto:'} dato_info={employee.nombre_contacto}/>
                <EmpleadoCard dato={'Número de contacto:'} dato_info={employee.numero_contacto}/>
                <EmpleadoCard dato={'Relación:'} dato_info={employee.relacion_contacto}/>
                <EmpleadoCard dato={'Puesto:'} dato_info={employee.puesto}/>
                <EmpleadoCard dato={'Jefe Inmediato:'} dato_info={employee.jefe_inmediato}/>
            </div>
        </section>
        </>
    )
}

export default VerEmpleado