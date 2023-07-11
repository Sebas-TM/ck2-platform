import { getEmployee } from "../services/employees";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/verEmpleado.css";
import { FiChevronLeft } from "react-icons/fi";
import EmpleadoCard from "./EmpleadoCard";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import foto_personal from "../image/foto_personal.webp";
import { config } from "../config";

const VerEmpleado = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const [cargando, setCargando] = useState(false);
    const { loading, callEndpoint } = useFetchAndLoad();
    const navigate = useNavigate();

    useEffect(() => {
        if (employeeId) {
            setCargando(true);
            callEndpoint(getEmployee(parseInt(employeeId)))
                .then((res) => res.json())
                .then((res) => {
                    setEmployee(res);
                    setCargando(false);
                });
        } else {
            return () => {};
        }
    }, []);
    return (
        <>
            <section className="contenedor-ver-empleado">
                {cargando && <Spinner />}
                <div className="contenedor-ver-empleado__contenedor-boton">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn_regresar"
                    >
                        <FiChevronLeft />
                        <Link
                            className="btn_regresar_texto"
                            // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                    </button>
                </div>
                <div className="ver-empleado-card">
                    <div className="container container-ver-empleado">
                        <div className="contenedor-foto">
                            <div className="contenedor-redondo-foto">
                                <img
                                    loading="lazy"
                                    className="img_empleados"
                                    src={
                                        employee.imagen
                                            ? `${config.API_URL}${employee.imagen}`
                                            : foto_personal
                                    }
                                    alt="foto_personal"
                                />
                            </div>
                        </div>
                        <div className="datos-principales">
                            <p className="datos-principales_nombre">{`${employee.nombre} ${employee.apellido_paterno} ${employee.apellido_materno}`}</p>
                            <p className="datos-principales_dni">
                                {employee.dni}
                            </p>
                        </div>
                    </div>
                    <div className="contenedor-empleado">
                        <EmpleadoCard
                            dato={"Estado:"}
                            dato_info={employee.estado}
                        />
                        <EmpleadoCard
                            dato={"Correo:"}
                            dato_info={employee.correo}
                        />
                        <Link
                            target="blank"
                            to={`https://wa.me/51${employee.celular}`}
                        >
                            <EmpleadoCard
                                dato={"Celular:"}
                                dato_info={employee.celular}
                            />
                        </Link>
                        <EmpleadoCard
                            dato={"Nombre de contacto:"}
                            dato_info={
                                !employee.nombre_contacto
                                    ? "Sin datos"
                                    : employee.nombre_contacto
                            }
                        />
                        <EmpleadoCard
                            dato={"Número de contacto:"}
                            dato_info={
                                !employee.numero_contacto
                                    ? "Sin datos"
                                    : employee.numero_contacto
                            }
                        />
                        <EmpleadoCard
                            dato={"Relación:"}
                            dato_info={
                                !employee.relacion_contacto
                                    ? "Sin datos"
                                    : employee.relacion_contacto
                            }
                        />
                        <EmpleadoCard
                            dato={"Área:"}
                            dato_info={employee.area}
                        />
                        <EmpleadoCard
                            dato={"Puesto:"}
                            dato_info={employee.puesto}
                        />
                        <EmpleadoCard
                            dato={"Jefe Inmediato:"}
                            dato_info={employee.jefe_inmediato}
                        />
                        <EmpleadoCard
                            dato={"Fecha de certificación:"}
                            dato_info={employee.fecha_certificacion}
                        />
                        <EmpleadoCard
                            dato={"Grupo:"}
                            dato_info={employee.grupo}
                        />
                        <EmpleadoCard
                            dato={"Sede:"}
                            dato_info={employee.sede}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default VerEmpleado;
