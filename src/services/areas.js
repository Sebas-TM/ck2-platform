import {config} from '../config'
import {loadAbort} from '../utils/loadAbort'
export const getAreas =  () => {
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}areas/list`,{signal: controller.signal}),
        controller
    }
}