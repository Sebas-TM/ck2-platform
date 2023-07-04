import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Modulos from './pages/Modulos'
import NuevoUsuario from './components/NuevoUsuario'
import Usuarios from './pages/Usuarios'
import RecursosHumanos from './pages/RecursosHumanos'
import Empleados from './pages/Empleados'
import VerEmpleado from './components/VerEmpleado'
import NuevoEmpleado from './components/NuevoEmpleado'
import Asistencias from './pages/Asistencias'
import Postulaciones from './pages/Postulaciones'
import Gestiones from './pages/Gestiones'
import Areas from './pages/Areas'
import NuevaArea from './components/NuevaArea'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/menu',
    element: <Menu />, children: [
      {
        index: true,
        element: <Modulos />
      },
      {
        path: '/menu/usuarios',
        element: <Usuarios />
      },
      {
        path: '/menu/usuarios/crear',
        element: <NuevoUsuario />
      },
      {
        path: '/menu/usuarios/:userId/editar',
        element: <NuevoUsuario />
      },
      {
        path: '/menu/recursos_humanos',
        element: <RecursosHumanos />, children: [
          {
            index: true,
            element: <Empleados />
          },
          {
            path: '/menu/recursos_humanos/empleado/:employeeId',
            element: <VerEmpleado />
          },
          {
            path: '/menu/recursos_humanos/empleado/crear',
            element: <NuevoEmpleado />
          },
          {
            path: '/menu/recursos_humanos/empleado/:employeeId/editar',
            element: <NuevoEmpleado />
          },
          {
            path: '/menu/recursos_humanos/postulaciones',
            element: <Postulaciones />
          },
          {
            path: '/menu/recursos_humanos/asistencias',
            element: <Asistencias/>
          },
          {
            path: '/menu/recursos_humanos/gestiones',
            element: <Gestiones />
          }
        ]
      },
      {
        path: '/menu/areas',
        element: <Areas />
      },
      {
        path: '/menu/areas/crear',
        element: <NuevaArea />
      },
      {
        path: '/menu/areas/:areaId/editar',
        element: <NuevaArea />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
    router={router}
  />
)
