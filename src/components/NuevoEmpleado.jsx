import "../style/nuevoUsuario.css";
import "../style/formulario.css";
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { BiImageAdd, BiImage } from "react-icons/bi";
import { config } from "../config";
import axios from "axios";

const NuevoEmpleado = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [cargando, setCargando] = useState(false);
    const [areas, setAreas] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [imagen, setImagen] = useState("");
    // useEffect(() => {
    //   obtenerAreas();
    // }, []);

    const obtenerAreas = async () => {
        try {
            setCargando(true);
            const res = await axios.get(`${config.API_URL}api/areas/list`);
            setAreas(res.data);
            setCargando(false);
        } catch (e) {
            console.log(e);
        }
    };

    const obtenerPuestos = async () => {
        setCargando(true);
        const res = await axios.get(`${config.API_URL}api/positions/list`);
        setPuestos(res.data);
        setCargando(false);
    };

    const obtenerEmpleado = async () => {
        const res = await axios.get(
            `${config.API_URL}api/employees/list/${employeeId}`
        );
        setValue("nombre", res.data.nombre);
        setValue("apellido_paterno", res.data.apellido_paterno);
        setValue("apellido_materno", res.data.apellido_materno);
        setValue("imagen", res.data.imagen);
        setValue("estado", res.data.estado);
        setValue("dni", res.data.dni);
        setValue("correo", res.data.correo);
        setValue("celular", res.data.celular);
        setValue("nombre_contacto", res.data.nombre_contacto);
        setValue("numero_contacto", res.data.numero_contacto);
        setValue("relacion_contacto", res.data.relacion_contacto);
        setValue("area", res.data.area);
        setValue("puesto", res.data.puesto);
        setValue("jefe_inmediato", res.data.jefe_inmediato);
        setValue("fecha_certificacion", res.data.fecha_certificacion);
        setValue("grupo", res.data.grupo);
        setValue("sede", res.data.sede);
    };
    useEffect(() => {
        const fetchData = async () => {
            if (employeeId) {
                try {
                    await obtenerAreas();
                    await obtenerPuestos();
                    await obtenerEmpleado();
                } catch (error) {
                    console.log(error);
                }
            } else {
                await obtenerAreas();
                await obtenerPuestos();
            }
        };
        // if (employeeId) {
        //   setCargando(true);
        //   obtenerEmpleado();
        //   setCargando(false);
        // } else {
        //   return () => {};
        // }
        fetchData();
    }, [employeeId]);

    const submitData = async (data) => {
        setCargando(true);
        const formData = {
            nombre: data.nombre,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            estado: data.estado,
            dni: data.dni,
            correo: data.correo,
            celular: data.celular,
            nombre_contacto: data.nombre_contacto,
            numero_contacto: data.numero_contacto,
            relacion_contacto: data.relacion_contacto,
            area: data.area,
            puesto: data.puesto,
            jefe_inmediato: data.jefe_inmediato,
            fecha_certificacion: data.fecha_certificacion,
            grupo: data.grupo,
            sede: data.sede,
        };

        if (imagen != "") {
            formData.imagen = imagen;
        }

        if (!employeeId) {
            await axios
                .post(`${config.API_URL}api/employees/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    toast.success("Datos registrados!");
                    setCargando(false);

                    setValue("nombre", "");
                    setValue("apellido_paterno", "");
                    setValue("apellido_materno", "");
                    setValue("imagen", "");
                    setValue("estado", "");
                    setValue("dni", "");
                    setValue("correo", "");
                    setValue("celular", "");
                    setValue("nombre_contacto", "");
                    setValue("numero_contacto", "");
                    setValue("relacion_contacto", "");
                    setValue("area", "");
                    setValue("puesto", "");
                    setValue("jefe_inmediato", "");
                    setValue("fecha_certificacion", "");
                    setValue("grupo", "");
                    setValue("sede", "");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    setCargando(false);
                });
        } else {
            await axios
                .post(
                    `${config.API_URL}api/employees/update/${employeeId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then(() => {
                    toast.success("Datos actualizados!");
                    setCargando(false);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    setCargando(false);
                });
        }
    };

    return (
        <section className="contenedor_nuevo-dato">
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className="contenedor-form">
                {/* <Toaster /> */}
                <div className="contenedor-form-header">
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
                    <h1 className="contenedor-form__texto">
                        {employeeId ? "Editar personal" : "Nuevo personal"}
                    </h1>
                </div>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className="subcontenedor">
                        <div className="subcontenedor-form">
                            <div className="form-group__input-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    {...register("nombre", {
                                        required: true,
                                    })}
                                    name="nombre"
                                    id="nombre"
                                    placeholder="Ingrese su nombre"
                                />
                                {errors.nombre?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="apellido_paterno">
                                    Apellido paterno
                                </label>
                                <input
                                    type="text"
                                    {...register("apellido_paterno", {
                                        required: true,
                                    })}
                                    name="apellido_paterno"
                                    id="apellido_paterno"
                                    placeholder="Ingrese su apellido paterno"
                                />
                                {errors.apellido_paterno?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="apellido_materno">
                                    Apellido materno
                                </label>
                                <input
                                    type="text"
                                    {...register("apellido_materno", {
                                        required: true,
                                    })}
                                    name="apellido_materno"
                                    id="apellido_materno"
                                    placeholder="Ingrese su apellido materno"
                                />
                                {errors.apellido_materno?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="imagen">Foto</label>
                                <label
                                    className="label_imagen"
                                    htmlFor="imagen"
                                >
                                    <p>
                                        {imagen != ""
                                            ? "Imagen seleccionada"
                                            : "Subir imagen"}
                                    </p>
                                    <div className="contenedor-icon_imagen">
                                        <BiImageAdd
                                            className={
                                                imagen != ""
                                                    ? "input_imagen BiImageAdd"
                                                    : "icon_imagen"
                                            }
                                        />
                                        <BiImage
                                            className={
                                                imagen != ""
                                                    ? "icon_imagen BiImage"
                                                    : "input_imagen"
                                            }
                                        />
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    {...register("imagen")}
                                    name="imagen"
                                    id="imagen"
                                    className="input_imagen"
                                    accept="image/jpeg, image/png"
                                    onChange={(e) =>
                                        setImagen(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="estado">Estado</label>
                                <select
                                    className="estado"
                                    {...register("estado", {
                                        required: true,
                                    })}
                                    name="estado"
                                    id="estado"
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="Activo">Activo</option>
                                    <option value="No activo">No activo</option>
                                </select>
                                {errors.estado?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    {...register("dni", {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        maxLength: 8,
                                        minLength: 8,
                                    })}
                                    name="dni"
                                    id="dni"
                                    placeholder="Ingrese su DNI"
                                />
                                {errors.dni?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                                {errors.dni?.type === "maxLength" && (
                                    <p className="error-message">
                                        Ingresar DNI correcto
                                    </p>
                                )}
                                {errors.dni?.type === "minLength" && (
                                    <p className="error-message">
                                        Ingresar DNI correcto
                                    </p>
                                )}
                                {errors.dni?.type === "pattern" && (
                                    <p className="error-message">
                                        Ingresar DNI correcto
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="subcontenedor-form">
                            <div className="form-group__input-group">
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="email"
                                    {...register("correo", {
                                        required: true,
                                    })}
                                    name="correo"
                                    id="correo"
                                    placeholder="Ingrese su correo"
                                />
                                {errors.correo?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="celular">Celular</label>
                                <input
                                    type="tel"
                                    {...register("celular", {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        maxLength: 9,
                                        minLength: 9,
                                    })}
                                    name="celular"
                                    id="celular"
                                    placeholder="Ingrese su número de celular"
                                />
                                {errors.celular?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                                {errors.celular?.type === "maxLength" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                                {errors.celular?.type === "minLength" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                                {errors.celular?.type === "pattern" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="nombre_contacto">
                                    Nombre de contacto de emergencia
                                </label>
                                <input
                                    type="text"
                                    {...register("nombre_contacto", {
                                        required: true,
                                    })}
                                    name="nombre_contacto"
                                    id="nombre_contacto"
                                    placeholder="Ingrese el dato"
                                />
                                {errors.nombre_contacto?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="numero_contacto">
                                    Número de contacto de emergencia
                                </label>
                                <input
                                    type="text"
                                    {...register("numero_contacto", {
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        maxLength: 9,
                                        minLength: 9,
                                    })}
                                    name="numero_contacto"
                                    id="numero_contacto"
                                    placeholder="Ingrese el número de celular"
                                />
                                {errors.numero_contacto?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                                {errors.numero_contacto?.type === "maxLength" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                                {errors.numero_contacto?.type === "minLength" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                                {errors.numero_contacto?.type === "pattern" && (
                                    <p className="error-message">
                                        Ingresar número de celular correcto
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="relacion_contacto">
                                    Relación del contacto
                                </label>
                                <select
                                    className="relacion_contacto"
                                    {...register("relacion_contacto",{
                                        required: true
                                    })}
                                    name="relacion_contacto"
                                    id="relacion_contacto"
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="Padre">Padre</option>
                                    <option value="Madre">Madre</option>
                                    <option value="Esposo(a)">Esposo(a)</option>
                                    <option value="Hijo(a)">Hijo(a)</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                {errors.relacion_contacto?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="area">Área</label>
                                <select
                                    className="area"
                                    {...register("area", {
                                        required: true,
                                    })}
                                    name="area"
                                    id="area"
                                >
                                    <option value="">--Seleccione--</option>
                                    {areas.map((area) => (
                                        <option value={area.area} key={area.id}>
                                            {area.area}
                                        </option>
                                    ))}
                                </select>
                                {errors.area?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="subcontenedor-form">
                            <div className="form-group__input-group">
                                <label htmlFor="puesto">Puesto</label>
                                <select
                                    name="puesto"
                                    id="puesto"
                                    {...register("puesto", {
                                        required: true,
                                    })}
                                >
                                    <option value="">--Seleccione--</option>
                                    {puestos.map((puesto) => (
                                        <option
                                            value={puesto.puesto}
                                            key={puesto.id}
                                        >
                                            {puesto.puesto}
                                        </option>
                                    ))}
                                </select>
                                {errors.puesto?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="jefe_inmediato">
                                    Jefe inmediato
                                </label>
                                <input
                                    type="text"
                                    {...register("jefe_inmediato", {
                                        required: true,
                                    })}
                                    name="jefe_inmediato"
                                    id="jefe_inmediato"
                                    placeholder="Ingrese el jefe inmediato"
                                />
                                {errors.jefe_inmediato?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="fecha_certificacion">
                                    Fecha de certificación
                                </label>
                                <input
                                    type="month" min="AAAA-MM" max="AAAA-MM" step="1"
                                    {...register("fecha_certificacion", {
                                        required: true,
                                    })}
                                    name="fecha_certificacion"
                                    id="fecha_certificacion"
                                    placeholder="Ingrese el mes de certificación"
                                />
                                {errors.fecha_certificacion?.type ===
                                    "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="grupo">Grupo</label>
                                <select
                                    name="grupo"
                                    id="grupo"
                                    {...register("grupo", {
                                        required: true,
                                    })}
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="COMUNIK2">COMUNIK2</option>
                                    <option value="GLOBAL">GLOBAL</option>
                                </select>
                                {errors.grupo?.type === "required" && (
                                    <p className="error-message">Este campo es obligatorio</p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="sede">Sede</label>
                                <select
                                    name="sede"
                                    id="sede"
                                    {...register("sede", {
                                        required: true,
                                    })}
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="Lima">Lima</option>
                                    <option value="Trujillo">Trujillo</option>
                                </select>
                                {errors.sede?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group__input-group">
                        <input
                            type="submit"
                            className="btn_registrar"
                            value={
                                employeeId
                                    ? "Guardar cambios"
                                    : "Registrar personal"
                            }
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NuevoEmpleado;
