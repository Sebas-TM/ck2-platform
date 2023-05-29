import { getUser, updateUser } from "../services/users"
import Formulario from "./Formulario"
import { Form, useLoaderData, useActionData, redirect } from 'react-router-dom'
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

export const action = async ({request, params}) =>{
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)

    await updateUser(params.usuarioId,datos)

    return redirect('/menu/usuarios')
}

const EditarUsuario = () => {

    const user = useLoaderData()

    return (
        <section className='contenedor_usuario'>
            <Toaster />            
            <Form
                method="post"
                noValidate
            >
                <Formulario user={user}/>
            </Form>
        </section>
    )
}

export default EditarUsuario