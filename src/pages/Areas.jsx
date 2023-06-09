import {  useNavigate } from "react-router-dom"
import { deleteArea, getAreas } from "../services/areas"
import useFetchAndLoad from "../hooks/useFetchAndLoad"
import { useEffect, useState } from "react"
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import '../style/areas.css'
import { Toaster, toast } from "sonner";
import swal from "sweetalert"

const Areas = () => {

  const navigate = useNavigate()
  const { loading, callEndpoint } = useFetchAndLoad()
  const [areas, setAreas] = useState([])

  useEffect(() => {
    callEndpoint(getAreas())
      .then(res => res.json())
      .then(res => {
        setAreas(res)
      })
      .catch(error => {
        if (error.code === 'ERR_CANCELED') {
          console.log('Request has been', error.message);
        }
      })

  }, [])


  const eliminarArea = (areaId) => {
    swal({
      title: "Eliminar",
      text: "¿Estás seguro de eliminar este registro?",
      icon: "warning",
      buttons: ["No", "Si"]
    }).then(respuesta => {
      if (respuesta) {
        callEndpoint(deleteArea(parseInt(areaId)))
          .then(resp => resp.json())
          .then(res => console.log(res))
          .catch(error => {
            if (error.code === 'ERR_CANCELED') {
              console.log('Request has been', error.message)
            }
          })

        toast.success('Área eliminada correctamente')
        setAreas(prevAreas => prevAreas.filter(area => area.id !== areaId));
      }
    })
  }


  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="form-group">
        <div className="form-group-header">
          <h1>Administrar áreas</h1>
          <div className='contenedor-input'>
            <button className='btn_add btn_add_areas' onClick={() => navigate(`/menu/areas/crear`)}><FiPlus className='icon' /></button>
            {/* <button className='btn_add btn_add_areas' onClick={handleShowModal}><FiPlus className='icon' /></button> */}
          </div>
        </div>
        <div className='contenedor-tabla tablaActive'>
          <table cellSpacing="0" cellPadding="0" className='tabla'>
            <thead>
              <tr>
                <td>#</td>
                <td>Área</td>
                <td>Opciones</td>
              </tr>
            </thead>
            <tbody>
              {areas.map((area, index) => (
                <tr key={area.id}>
                  <td className='data data_id'>{index + 1}</td>
                  <td className='data data_nombre'>{area.area}</td>
                  <td className='data data_opciones'>
                    <button onClick={() => navigate(`/menu/areas/${area.id}/editar`)} className='btn_option edit'><FiEdit className='icon' /></button>
                    <button onClick={() => eliminarArea(area.id)} className='btn_option delete'><FiTrash className='icon' /></button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>

        </div>
      </div>

    </>
  )
}

export default Areas