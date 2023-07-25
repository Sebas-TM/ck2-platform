import "../style/login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import { Toaster, toast } from "sonner";
import Spinner from "../components/Spinner";
import logo_texto from "../image/logo_texto_ver2.png";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/users";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import login from "../image/Login.png";

const cookies = new Cookies();
const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [cargando, setCargando] = useState(false);
    const { loading, callEndpoint } = useFetchAndLoad();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (cookies.get("username")) {
        window.location.href = "./menu";
    }
    const onSubmit = (data) => {
        try {
            setCargando(true);
            callEndpoint(loginUser(data))
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp != 0) {
                        cookies.set("id", resp.id, { path: "/" });
                        cookies.set("apellido_paterno", resp.apellido_paterno, {
                            path: "/",
                        });
                        cookies.set("apellido_materno", resp.apellido_materno, {
                            path: "/",
                        });
                        cookies.set("nombre", resp.nombre, { path: "/" });
                        cookies.set("imagen", resp.imagen, { path: "/" });
                        cookies.set("username", resp.username, { path: "/" });
                        cookies.set("rol", resp.rol, { path: "/" });
                        setCargando(false);
                        navigate("/menu");
                    } else {
                        setCargando(false);
                        toast.error("Usuario y/o contraseña incorrecta");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="contenedor-login">
            <div className="contenedor-principal">
                {cargando && <Spinner />}
                <Toaster position="top-center" richColors />
                <div className="contenedor-uno">
                    <img
                        className="form-group__logo"
                        src={logo_texto}
                        alt="logo"
                    />

                    <form
                        className="form-group"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h1 className="form-group__titulo">
                            ¡Bienvenido a Ck2!
                        </h1>
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
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                })}
                                name="password"
                                id="password"
                                placeholder="Ingrese su contraseña"
                            />
                            {errors.password?.type === "required" && (
                                <p className="error-message">
                                    Este campo es obligatorio
                                </p>
                            )}
                            <div className="contenedor_checkbox">
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="checkbox"
                                    checked={showPassword}
                                    onChange={handleShowPassword}
                                />
                                <label htmlFor="checkbox">
                                    Mostrar contraseña
                                </label>
                            </div>
                        </div>
                        <input
                            className="form-group__boton"
                            type="submit"
                            value="Ingresar"
                        />
                    </form>
                    <div className="texto-siguenos texto-siguenos-768px">
                        <p>Síguenos en:</p>
                        <Link
                            target="blank"
                            to="https://www.facebook.com/CK2.PE/"
                            className="link_logo_social_media"
                        >
                            <FaFacebookF className="logo_social_media" />
                        </Link>
                        <Link
                            target="blank"
                            to="https://www.instagram.com/comunik2peru/"
                            className="link_logo_social_media"
                        >
                            <FaInstagram className="logo_social_media" />
                        </Link>
                        <Link
                            target="blank"
                            to="http://tiktok.com/@grupo.ck2"
                            className="link_logo_social_media"
                        >
                            <FaTiktok className="logo_social_media" />
                        </Link>
                    </div>
                </div>
                <div className="contenedor-dos">
                    <div className="subcontenedor-dos">
                        <img src={login} alt="" />
                    </div>
                </div>
            </div>
            <div className="contenedor-rojo"></div>
            <div className="texto-siguenos disable">
                <p>Síguenos en:</p>
                <Link
                    target="blank"
                    to="https://www.facebook.com/CK2.PE/"
                    className="link_logo_social_media"
                >
                    <FaFacebookF className="logo_social_media" />
                </Link>
                <Link
                    target="blank"
                    to="https://www.instagram.com/comunik2peru/"
                    className="link_logo_social_media"
                >
                    <FaInstagram className="logo_social_media" />
                </Link>
                <Link
                    target="blank"
                    to="http://tiktok.com/@grupo.ck2"
                    className="link_logo_social_media"
                >
                    <FaTiktok className="logo_social_media" />
                </Link>
            </div>
        </div>
    );
};

export default Login;
