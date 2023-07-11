import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import "../style/areas.css";
import { Toaster, toast } from "sonner";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
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

    const navigate = useNavigate();
    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState();
    const [cargando, setCargando] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const obtenerAreas = async () => {
        try {
            const res = await axios.get(`${config.API_URL}areas/list`);
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
        const res = await axios.get(`${config.API_URL}areas/list/${areaId}`);
        setValue("area", res.data.area);
    };

    const sortedAreas = areas.sort((a, b) => b.id - a.id);

    const submitData = async (data) => {
        if (!areaId) {
            await axios.post(`${config.API_URL}areas/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Dato registrado!");
            obtenerAreas();
            setValue("area", "");
        } else {
            await axios.post(`${config.API_URL}areas/update/${areaId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Dato actualizado!");
            obtenerAreas();
            setAreaId();
            setValue("area", "");
        }
    };

    const eliminarArea = (areaId) => {
        swal({
            text: "¿Estás seguro de eliminar esta área?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                try {
                    axios.delete(`${config.API_URL}areas/delete/${areaId}`);
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
            <Toaster position="top-center" richColors />
            {cargando && <Spinner />}

            <div className="form-group form-group-table">
                <div className="form-group-header form-group-header-table">
                    <form
                        onSubmit={handleSubmit(submitData)}
                        className="form-table">
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
                            <input
                                type="submit"
                                className="btn_registrar btn_registrar-table"
                                value={
                                    areaId
                                        ? "Guardar cambios"
                                        : "Registrar area"
                                }
                            />
                        </div>
                    </form>
                </div>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tablaActive">
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
                                        className="btn_option edit">
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
                                        }>
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
