import { useNavigate } from "react-router-dom";
import { deleteArea, getAreas } from "../services/areas";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import "../style/areas.css";
import { Toaster, toast } from "sonner";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import axios from "axios";
import { config } from "../config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Areas = () => {
    const rol = cookies.get("rol");

    if (rol == 3) {
        window.location.href = "/menu";
    }

    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const { loading, callEndpoint } = useFetchAndLoad();
    const [areas, setAreas] = useState([]);

    const obtenerAreas = async () => {
        try {
            setCargando(true);
            const res = await axios.get(`${config.API_URL}areas/list`);
            setAreas(res.data);
            setCargando(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        obtenerAreas();
    }, []);

    const sortedAreas = areas.sort((a, b) => b.id - a.id);

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

            <div className="form-group">
                <div className="form-group-header">
                    <button
                        className={rol != 3 ? "btn_add" : "disable-button"}
                        onClick={() => navigate(`/menu/areas/crear`)}>
                        <FiPlus className="icon" />
                        <p>Agregar</p>
                    </button>
                </div>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tablaActive">
                    <thead>
                        <tr>
                            <th>Área</th>
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
                                            navigate(
                                                `/menu/areas/${sortedArea.id}/editar`
                                            )
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
