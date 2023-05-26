import { getUser } from "../services/users"
import Formulario from "./Formulario"
import { Form, useLoaderData } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

export async function loader({ params }) {
    const user = await getUser(params.usuarioId)
    if (Object.values(user).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El usuario no fue encontrado'
        })
    }
    return user
}

const EditarUsuario = () => {

    const user = useLoaderData()

    return (
        <section className='contenedor_usuario'>
            <Toaster />            
            {/* <Form
                method="post"
                noValidate
            > */}
                <Formulario user={user}/>
            {/* </Form> */}
        </section>
    )
}

export default EditarUsuario