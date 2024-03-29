import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus, FiChevronLeft } from "react-icons/fi";
import "../style/areas.css";
import { toast } from "sonner";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import SpinnerIcono from "../components/SpinnerIcono";
import axios from "axios";
import { config } from "../config";
import Cookies from "universal-cookie";
import "../style/puestos.css";
import { useForm } from "react-hook-form";
const cookies = new Cookies();

const Areas = () => {
    const rol = cookies.get("rol");

    if (rol == 3) {
        window.location.href = "/menu";
    }

    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState();
    const [cargando, setCargando] = useState(false);
    const [cargandoSubmit, setCargandoSubmit] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();
    const obtenerAreas = async () => {
        try {
            const res = await axios.get(`${config.API_URL}api/areas/list`);
            setAreas(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            await obtenerAreas();
            setCargando(false);
        };
        fetchData();
    }, []);

    const obtenerArea = async (areaId) => {
        setAreaId(areaId);
        const res = await axios.get(
            `${config.API_URL}api/areas/list/${areaId}`
        );
        setValue("area", res.data.area);
    };

    const sortedAreas = areas.sort((a, b) => b.id - a.id);

    const submitData = async (data) => {
        setCargandoSubmit(true);
        if (!areaId) {
            await axios.post(`${config.API_URL}api/areas/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Dato registrado!");
            obtenerAreas();
            setValue("area", "");
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
            toast.success("Dato actualizado!");
            obtenerAreas();
            setAreaId();
            setValue("area", "");
            setCargandoSubmit(false);
        }
    };

    const eliminarArea = (areaId) => {
        swal({
            text: "¿Estás seguro de eliminar esta área?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                try {
                    axios.delete(`${config.API_URL}api/areas/delete/${areaId}`);
                } catch (e) {
                    console.log(e);
                }
                toast.success("Dato eliminado!");
                setAreas((prevAreas) =>
                    prevAreas.filter((area) => area.id !== areaId)
                );
            }
        });
    };

    return (
        <>
            {cargando && <Spinner />}

            <div className="form-group form-group-table">
                <div className="form-group-header form-group-header-table">
                    <div className="container_btn_regresar">
                        <button
                            className="btn_regresar btn_regresar_area"
                            onClick={() => navigate(-1)}
                        >
                            <FiChevronLeft />
                            <p>Regresar</p>
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit(submitData)}
                        className="form-table"
                    >
                        <div className="subcontenedor">
                            <div className="form-group__input-group input-area input-area-table">
                                <label htmlFor="area">
                                    {areaId ? "Editar" : "Agregar"} area
                                </label>
                                <input
                                    type="text"
                                    {...register("area", {
                                        required: true,
                                    })}
                                    name="area"
                                    id="area"
                                    placeholder="Ingresar area"
                                />
                                {errors.area?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-group__input-group input-area input-area-table">
                            <button className="btn_registrar">
                                {cargandoSubmit ? (
                                    <SpinnerIcono />
                                ) : areaId ? (
                                    "Guardar cambios"
                                ) : (
                                    "Registrar área"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tablaActive "
                >
                    <thead>
                        <tr>
                            <th>ÁREAS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAreas.map((sortedArea) => (
                            <tr key={sortedArea.id}>
                                <td className="data data_nombre">
                                    {sortedArea.area}
                                </td>
                                <td className="data data_opciones">
                                    <button
                                        onClick={() =>
                                            obtenerArea(sortedArea.id)
                                        }
                                        className="btn_option edit"
                                    >
                                        <FiEdit className="icon" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            eliminarArea(sortedArea.id)
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

export default Areas;
