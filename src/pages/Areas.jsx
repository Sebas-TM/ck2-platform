import { useLoaderData, Form, useNavigate } from "react-router-dom"
import { getAreas } from "../services/areas"

export const loader = () => {
    const areas = getAreas()
    return areas
}
const Areas = () => {

    const areas = useLoaderData()
    console.log(areas);
  return (
    <div></div>
  )
}

export default Areas