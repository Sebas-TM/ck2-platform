import {Toaster, toast} from 'sonner'

const Error = ({children}) => {

    toast.error(children)
  return (
    <Toaster richColors position="top-center"/>
  )
}

export default Error