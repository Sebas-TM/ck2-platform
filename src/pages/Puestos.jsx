import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";
import { Toaster, toast } from "sonner";
import Spinner from "../components/Spinner";
import { FiEdit, FiTrash } from "react-icons/fi";
import Cookies from "universal-cookie";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const cookies = new Cookies();

const Puestos = () => {
    const rol = cookies.get("rol");

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
        // setCargando(true);
        const res = await axios.get(`${config.API_URL}positions/list`);
        setPuestos(res.data);
        // setCargando(false);
    };

    useEffect(() => {
        obtenerPuestos();
    }, []);

    const obtenerPuesto = async (puestoId) => {
        setPuestoId(puestoId);
        const res = await axios.get(
            `${config.API_URL}positions/list/${puestoId}`
        );
        setValue("puesto", res.data.puesto);
    };

    const sortedPuestos = puestos.sort((a, b) => b.id - a.id);

    const submitData = async (data) => {
        if (!puestoId) {
            await axios.post(`${config.API_URL}positions/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Dato registrado!");
            obtenerPuestos();
            setValue("puesto", "");
        } else {
            await axios.post(
                `${config.API_URL}positions/update/${puestoId}`,
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
                        `${config.API_URL}positions/delete/${puestoId}`
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
            <div className="form-group">
                <div className="form-group-header">
                    <form onSubmit={handleSubmit(submitData)}>
                        <div className="subcontenedor">
                            <div className="form-group__input-group input-area">
                                <label htmlFor="puesto">Puesto</label>
                                <input
                                    type="text"
                                    {...register("puesto", {
                                        required: true,
                                    })}
                                    name="puesto"
                                    id="puesto"
                                    placeholder="Ingresar área"
                                />
                                {errors.puesto?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-group__input-group input-area">
                            <input
                                type="submit"
                                className="btn_registrar"
                                value={puestoId ? 'Guardar cambios' : 'Registrar puesto'}
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
                            <th>Puesto</th>
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
                                        className="btn_option edit">
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

export default Puestos;
