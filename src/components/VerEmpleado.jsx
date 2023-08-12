import { Link } from "react-router-dom";
import "../style/verEmpleado.css";
import { FiX } from "react-icons/fi";
import EmpleadoCard from "./EmpleadoCard";
import { useState, useEffect } from "react";
import foto_personal from "../image/foto_personal.webp";
import { config } from "../config";
import axios from "axios";
import SpinnerContenido from "./SpinnerContenido";

const VerEmpleado = ({ handleModal, setHandleModal, employeeId }) => {
    const [employee, setEmployee] = useState({});
    const [cargando, setCargando] = useState(false);
    useEffect(() => {
        if (employeeId) {
            obtenerEmpleado(employeeId);
        } else {
            return () => {};
        }
    }, []);
    const obtenerEmpleado = async (employeeId) => {
        setCargando(true);
        const res = await axios.get(
            `${config.API_URL}api/employees/list/${employeeId}`
        );
        setEmployee(res.data);
        setCargando(false);
    };

    return (
        <div className="modal-ver-empleado">
            <section className="contenedor-ver-empleado">
                <div className="ver-empleado-card">
                    {cargando && <SpinnerContenido />}
                    {!cargando && (
                        <div className="container container-ver-empleado">
                            <div className="contenedor-foto contenedor_foto_modal">
                                <div className="contenedor-redondo-foto contenedor_redondo_foto_modal">
                                    <img
                                        loading="lazy"
                                        className="img_empleados"
                                        src={
                                            employee.imagen
                                                ? `${config.API_URL}${
                                                      employee.imagen_hd
                                                  }?${Date.now()}`
                                                : foto_personal
                                        }
                                        alt="foto_personal"
                                    />
                                </div>
                            </div>
                            <div className="datos-principales">
                                <p className="datos-principales_nombre datos-principales_nombre_modal">{`${employee.nombre} ${employee.apellido_paterno} ${employee.apellido_materno}`}</p>
                                <p className="datos-principales_dni datos-principales_dni_modal">
                                    {employee.dni}
                                </p>
                            </div>
                        </div>
                    )}
                    {!cargando && (
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
                    )}
                </div>
                <div className="contenedor-ver-empleado__contenedor-boton">
                    <button
                        onClick={() => setHandleModal(!handleModal)}
                        className="btn_cerrar"
                    >
                        Cerrar
                    </button>
                </div>
            </section>
        </div>
    );
};

export default VerEmpleado;
