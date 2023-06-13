import { FiChevronLeft } from "react-icons/fi";
import '../style/formulario.css'
import '../style/nuevaArea.css'
import { useEffect, useState } from "react"
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import { Link, useNavigate, redirect, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { getArea, postArea, updateArea } from "../services/areas";
import { Toaster, toast } from "sonner";

const NuevaArea = () => {
    const navigate = useNavigate()
    const { areaId } = useParams()
    const [areas, setAreas] = useState([])
    const { loading, callEndpoint } = useFetchAndLoad()
    const [data, setData] = useState(6)
    useEffect(() => {
        if (!areaId) {
            return () => { }
        }
        callEndpoint(getArea(parseInt(areaId)))
            .then(res => res.json())
            .then(res => {
                setAreas(res)
                setData(res.area);
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message)
                }
            })

    }, [areaId])
    console.log(areas.id);

    const preloadedValues = {
        area: `${areaId}`
    }

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: preloadedValues
    })


    const submitData = (data) => {
        if (!areaId) {
            callEndpoint(postArea(data))
                .then(resp => resp.json())
            // .then(res => console.log(res))

            toast.success('Área creada correctamente')

        } else {
            callEndpoint(updateArea(data, parseInt(areaId)))
                .then(resp => resp.json())
            // .then(res => console.log(res))

            toast.success('Área actualizada correctamente')
        }
    }



    return (
        <section className='contenedor_nuevo-dato'>
            <Toaster position="top-center" richColors />
            <div className='contenedor-form'>
                <div className='contenedor-form-header'>
                    <button onClick={() => navigate("/menu/areas")} className='btn_regresar'>
                        <FiChevronLeft />
                        <Link
                            className='btn_regresar_texto'
                        // to='/menu/usuarios'
                        >
                            Regresar
                        </Link>
                    </button>
                    <h1 className='contenedor-form__texto'>{areaId ? 'Editar' : 'Nueva'} área</h1>
                </div>
                <form onSubmit={handleSubmit(submitData)}>
                    <div className='subcontenedor'>
                        <div className='form-group__input-group input-area'>
                            <label htmlFor="area">Área</label>
                            <input
                                type="text"
                                {...register('area',
                                    {
                                        required: true
                                    })
                                }
                                name='area'
                                id='area'
                                placeholder='Ingresar área'
                                // defaultValue={areas?.area}
                            // onChange={(e) => setNombre(e.target.value)}
                            />
                            {errors.area?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                        </div>

                    </div>
                    <div className='form-group__input-group input-area'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value={areaId ? 'Guardar cambios' : 'Registrar área'}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default NuevaArea