import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";
import { Toaster, toast } from "sonner";
import Spinner from "../components/Spinner";
import { FiEdit, FiTrash,FiChevronLeft } from "react-icons/fi";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../style/puestos.css";

const cookies = new Cookies();

const Puestos = () => {
    const rol = cookies.get("rol");
    const navigate = useNavigate()
    const [puestos, setPuestos] = useState([]);
    const [puestoId, setPuestoId] = useState();
    const [cargando, setCargando] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const obtenerPuestos = async () => {
        const res = await axios.get(`${config.API_URL}api/positions/list`);
        setPuestos(res.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            await obtenerPuestos();
            setCargando(false);
        };

        fetchData();
    }, []);

    const obtenerPuesto = async (puestoId) => {
        setPuestoId(puestoId);
        const res = await axios.get(
            `${config.API_URL}api/positions/list/${puestoId}`
        );
        setValue("puesto", res.data.puesto);
    };

    const sortedPuestos = puestos.sort((a, b) => b.id - a.id);

    const submitData = async (data) => {
        if (!puestoId) {
            await axios.post(`${config.API_URL}api/positions/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Dato registrado!");
            obtenerPuestos();
            setValue("puesto", "");
        } else {
            await axios.post(
                `${config.API_URL}api/positions/update/${puestoId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Dato actualizado!");
            obtenerPuestos();
            setPuestoId();
            setValue("puesto", "");
        }
    };

    const eliminarPuesto = (puestoId) => {
        swal({
            text: "¿Estás seguro de eliminar esta puesto?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                try {
                    axios.delete(
                        `${config.API_URL}api/positions/delete/${puestoId}`
                    );
                } catch (e) {
                    console.log(e);
                }
                toast.success("Dato eliminado!");
                setPuestos((prevPuestos) =>
                    prevPuestos.filter((puesto) => puesto.id !== puestoId)
                );
            }
        });
    };
    return (
        <>
            <Toaster position="top-center" richColors />
            {cargando && <Spinner />}
            <div className="form-group form-group-table">
                <div className="form-group-header form-group-header-table">
                    <form
                        onSubmit={handleSubmit(submitData)}
                        className="form-table"
                    >
                        <div className="subcontenedor">
                            <div className="form-group__input-group input-area input-area-table">
                            <button className="btn_regresar btn_regresar_area" onClick={()=>navigate(-1)}>
                                    <FiChevronLeft />
                                    <p>Regresar</p>
                                </button>
                                <label htmlFor="puesto">
                                    {puestoId
                                        ? "Editar"
                                        : "Agregar"} puesto
                                </label>
                                <input
                                    type="text"
                                    {...register("puesto", {
                                        required: true,
                                    })}
                                    name="puesto"
                                    id="puesto"
                                    placeholder="Ingresar puesto"
                                />
                                {errors.puesto?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-group__input-group input-area input-area-table">
                            <input
                                type="submit"
                                className="btn_registrar btn_registrar-table"
                                value={
                                    puestoId
                                        ? "Guardar cambios"
                                        : "Registrar puesto"
                                }
                            />
                        </div>
                    </form>
                </div>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tablaActive"
                >
                    <thead>
                        <tr>
                            <th>PUESTOS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPuestos.map((sortedPuesto) => (
                            <tr key={sortedPuesto.id}>
                                <td className="data data_nombre">
                                    {sortedPuesto.puesto}
                                </td>
                                <td className="data data_opciones">
                                    <button
                                        onClick={() =>
                                            obtenerPuesto(sortedPuesto.id)
                                        }
                                        className="btn_option edit"
                                    >
                                        <FiEdit className="icon" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            eliminarPuesto(sortedPuesto.id)
                                        }
                                        className={
                                            rol == 1
                                                ? "btn_option delete"
                                                : "disable-button"
                                        }
                                    >
                                        <FiTrash className="icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Puestos;
