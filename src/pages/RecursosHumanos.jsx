import { Outlet, Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "../style/recursosHumanos.css";

const cookies = new Cookies();

const RecursosHumanos = () => {
  if (!cookies.get("username")) {
    window.location.href = "/";
  }

  const location = useLocation();

  return (
    <>
      <nav className="contenedor-navegacion">
        <ul className="navegacion">
          <li>
            <Link
              className={`${
                location.pathname === "/menu/recursos_humanos"
                  ? "link_rrhh_seleccionado"
                  : "link_rrhh"
              }`}
              to="/menu/recursos_humanos"
            >
              Personal
            </Link>
          </li>
          <li>
            <Link
              className={`${
                location.pathname === "/menu/recursos_humanos/asistencias"
                  ? "link_rrhh_seleccionado"
                  : "link_rrhh"
              }`}
              to="/menu/recursos_humanos/asistencias"
            >
              Asistencias
            </Link>
          </li>
          <li>
            <Link
              className={`${
                location.pathname === "/menu/recursos_humanos/postulaciones"
                  ? "link_rrhh_seleccionado"
                  : "link_rrhh"
              }`}
              to="/menu/recursos_humanos/postulaciones"
            >
              Postulaciones
            </Link>
          </li>
          <li>
            <Link
              className={`${
                location.pathname === "/menu/recursos_humanos/gestiones"
                  ? "link_rrhh_seleccionado"
                  : "link_rrhh"
              }`}
              to="/menu/recursos_humanos/gestiones"
            >
              Otras gestiones
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RecursosHumanos;
