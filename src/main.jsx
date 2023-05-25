import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Modulos from './pages/Modulos'
import {action as nuevoUsuarioAction} from './components/NuevoUsuario'
import Usuarios,{loader as usuariosLoader} from './pages/Usuarios'

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
        action: nuevoUsuarioAction,
        loader: usuariosLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
    router={router}
  />
)
