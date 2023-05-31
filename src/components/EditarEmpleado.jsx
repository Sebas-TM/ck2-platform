import { getEmployee, updateEmployee } from "../services/employees"
import FormularioEmpleado from "./FormularioEmpleado"
import { Form, redirect, useLoaderData } from "react-router-dom"

export async function loader({ params }) {
    const employee = await getEmployee(params.empleadoId)
    if (Object.values(employee).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El empleado no fue encontrado'
        })
    }
    return employee
}

export const action = async ({request, params})=>{
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)

    await updateEmployee(params.empleadoId,datos)

    return redirect('/menu/recursos_humanos')
}

const EditarEmpleado = () => {

    const employee = useLoaderData()


    return (
        <section className='contenedor_nuevo-dato'>
            <Form
                method="post"
                noValidate
            >
                <FormularioEmpleado employee={employee}/>
            </Form>
        </section>
    )
}

export default EditarEmpleado