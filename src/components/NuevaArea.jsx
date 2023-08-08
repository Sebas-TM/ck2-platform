import { FiChevronLeft } from "react-icons/fi";
import "../style/formulario.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getArea, postArea, updateArea } from "../services/areas";
import { Toaster, toast } from "sonner";
import Spinner from "./Spinner";
import SpinnerIcono from "./SpinnerIcono";
import axios from "axios";
import { config } from "../config";
const NuevaArea = () => {
    const navigate = useNavigate();
    const { areaId } = useParams();
    const [cargando, setCargando] = useState(false);
    const [cargandoSubmit, setCargandoSubmit] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        if (areaId) {
            setCargando(true);
            obtenerArea();
            setCargando(false);
        } else {
            return () => {};
        }
    }, [areaId]);

    const obtenerArea = async () => {
        const res = await axios.get(
            `${config.API_URL}api/areas/list/${areaId}`
        );
        setValue("area", res.data.area);
    };
    const submitData = async (data) => {
        setCargandoSubmit(true);
        if (!areaId) {
            await axios.post(`${config.API_URL}api/areas/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Datos registrados!");
            setCargandoSubmit(false);
        } else {
            await axios.post(
                `${config.API_URL}api/areas/update/${areaId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Datos actualizados!");
            setCargandoSubmit(false);
        }
    };

    return (
        <section className="contenedor_nuevo-dato">
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className="contenedor-form">
                <div className="contenedor-form-header">
                    <button
                        onClick={() => navigate("/menu/areas")}
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
                    <h1 className="contenedor-form__texto">
                        {areaId ? "Editar" : "Nueva"} área
                    </h1>
                </div>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className="subcontenedor">
                        <div className="form-group__input-group input-area">
                            <label htmlFor="area">Área</label>
                            <input
                                type="text"
                                {...register("area", {
                                    required: true,
                                })}
                                name="area"
                                id="area"
                                placeholder="Ingresar área"
                            />
                            {errors.area?.type === "required" && (
                                <p className="error-message">
                                    Este campo es obligatorio
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="form-group__input-group input-area">
                        <button className="btn_registrar">
                            {cargandoSubmit ? (
                                <SpinnerIcono />
                            ) : employeeId ? (
                                "Guardar cambios"
                            ) : (
                                "Registrar área"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NuevaArea;
