import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Modulos from './pages/Modulos'
import NuevoUsuario,{action as nuevoUsuarioAction} from './components/NuevoUsuario'
import Usuarios,{loader as usuariosLoader, action as eliminarUsuarioAction} from './pages/Usuarios'
import EditarUsuario, {loader as usuarioLoader} from './components/EditarUsuario'

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
        loader:usuarioLoader
      },
      {
        path: '/menu/usuarios/:usuarioId/eliminar',
        action: eliminarUsuarioAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
    router={router}
  />
)
