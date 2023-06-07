import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Modulos from './pages/Modulos'
import NuevoUsuario,{action as nuevoUsuarioAction} from './components/NuevoUsuario'
import Usuarios,{loader as usuariosLoader, action as eliminarUsuarioAction} from './pages/Usuarios'
import EditarUsuario, {loader as usuarioLoader, action as actualizarUsuarioAction} from './components/EditarUsuario'
import RecursosHumanos  from './pages/RecursosHumanos'
import Empleados, {loader as empleadosLoader, action as eliminarEmpleadoAction} from './pages/Empleados'
import VerEmpleado, {loader as verEmpleadoLoader} from './components/VerEmpleado'
import NuevoEmpleado, {action as nuevoEmpleadoAction} from './components/NuevoEmpleado'
import EditarEmpleado, {loader as empleadoLoader, action as actualizarEmpleadoAction} from './components/EditarEmpleado'
import Postulaciones from './pages/Postulaciones'
import Gestiones from './pages/Gestiones'
import Areas, {loader as areasLoader} from './pages/Areas'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/menu',
    element: <Menu/>, children:[
      {
        index:true,
        element:<Modulos/>
      },
      {
        path:'/menu/usuarios',
        element: <Usuarios/>,
        loader: usuariosLoader
      },
      {
        path:'/menu/usuarios/crear',
        element:<NuevoUsuario/>,
        action: nuevoUsuarioAction,
      },
      {
        path:'/menu/usuarios/:usuarioId/editar',
        element:<EditarUsuario/>,
        loader:usuarioLoader,
        action: actualizarUsuarioAction
      },
      {
        path: '/menu/usuarios/:usuarioId/eliminar',
        action: eliminarUsuarioAction
      },
      {
        path: '/menu/recursos_humanos',
        element: <RecursosHumanos/>, children:[
          {
            index:true,
            element: <Empleados/>,
            loader: empleadosLoader
          },
          {
            path: '/menu/recursos_humanos/empleado/:empleadoId',
            element: <VerEmpleado/>,
            loader: verEmpleadoLoader
          },
          {
            path: '/menu/recursos_humanos/empleado/crear',
            element: <NuevoEmpleado/>,
            action: nuevoEmpleadoAction
          },
          {
            path: '/menu/recursos_humanos/empleado/:empleadoId/editar',
            element: <EditarEmpleado/>,
            loader: empleadoLoader,
            action:actualizarEmpleadoAction
          },
          {
            path:'menu/recursos_humanos/empleado/:empleadoId/editar',
            action: eliminarEmpleadoAction,            
          },
          {
            path:'/menu/recursos_humanos/postulaciones',
            element: <Postulaciones/>
          },
          {
            path:'/menu/recursos_humanos/gestiones',
            element: <Gestiones/>
          }
        ]
      },
      {
        path:'/menu/areas',
        element: <Areas/>,
        loader: areasLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
    router={router}
  />
)
