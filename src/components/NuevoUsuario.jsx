import "../style/nuevoUsuario.css";
import { FiChevronLeft } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { postUser, getUser, updateUser } from "../services/users";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { useForm } from "react-hook-form";
import { BiImageAdd, BiImage } from "react-icons/bi";
import { config } from "../config";
import axios from "axios";
import Spinner from "./Spinner";

const NuevoUsuario = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [imagen, setImagen] = useState("");
    const [cargando, setCargando] = useState(false);

    const submitData = async (data) => {
        setCargando(true);
        const formData = {
            nombre: data.nombre,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            dni: data.dni,
            username: data.username,
            password: data.password,
            rol: data.rol,
        };

        if (imagen != "") {
            formData.imagen = imagen;
        }

        if (!userId) {
            await axios
                .post(`${config.API_URL}users/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    toast.success("Usuario creado correctamente");
                    setCargando(false);
                    
                    setValue("nombre", "");
                    setValue("apellido_paterno", "");
                    setValue("apellido_materno", "");
                    setValue("dni", "");
                    setValue("username", "");
                    setValue("password", "");
                    setValue("rol", "");
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error(error.response.data.message);
                    setCargando(false);
                });
        } else {
            await axios
                .post(`${config.API_URL}users/update/${userId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    toast.success("Datos actualizados!");
                    setCargando(false);
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error(error.response.data.message);
                    setCargando(false);
                });
        }
    };

    useEffect(() => {
        if (!userId) {
            return () => {};
        }
        obtenerUsuario();
    }, [userId]);

    const obtenerUsuario = async () => {
        setCargando(true);
        const res = await axios.get(`${config.API_URL}users/list/${userId}`);
        setValue("nombre", res.data.nombre);
        setValue("apellido_paterno", res.data.apellido_paterno);
        setValue("apellido_materno", res.data.apellido_materno);
        setValue("dni", res.data.dni);
        setValue("username", res.data.username);
        setValue("rol", res.data.rol);
        setCargando(false);
    };

    return (
        <section className="contenedor_nuevo-dato pt-10">
            <Toaster position="top-center" richColors />
            {cargando && <Spinner />}
            <div className="contenedor-form">
                <div className="contenedor-form-header">
                    <button
                        onClick={() => navigate("/menu/usuarios")}
                        className="btn_regresar">
                        <FiChevronLeft />
                        <Link
                            className="btn_regresar_texto"
                            // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                    </button>
                    <h1 className="contenedor-form__texto">
                        {userId ? "Editar" : "Nuevo"} usuario
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(submitData)}
                    encType="multipart/form-data">
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
                                <label htmlFor="imagen">Foto</label>
                                <label
                                    className="label_imagen"
                                    htmlFor="imagen">
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
                                <label htmlFor="username">Usuario</label>
                                <input
                                    type="text"
                                    {...register("username", {
                                        required: true,
                                    })}
                                    name="username"
                                    id="username"
                                    placeholder="Ingrese su usuario"
                                />
                                {errors.username?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="password">
                                    {userId && "Nueva"} Contraseña
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: userId ? false : true,
                                    })}
                                    name="password"
                                    id="password"
                                    placeholder={
                                        userId
                                            ? "Ingrese su nueva contraseña"
                                            : "Ingrese su contraseña"
                                    }
                                />
                                {errors.password?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="form-group__input-group">
                                <label htmlFor="rol">Rol</label>
                                <select
                                    className="select_admin"
                                    {...register("rol", {
                                        required: true,
                                    })}
                                    name="rol"
                                    id="rol">
                                    <option value="">--Seleccione--</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Usuario</option>
                                    <option value="3">Lector</option>
                                </select>
                                {errors.rol?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group__input-group input-area">
                        <input
                            type="submit"
                            className="btn_registrar"
                            value={
                                userId ? "Guardar cambios" : "Registrar usuario"
                            }
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NuevoUsuario;
