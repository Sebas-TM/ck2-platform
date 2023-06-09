import { config } from '../config'
import { loadAbort } from '../utils/loadAbort'
export const getAreas = () => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}areas/list`, { signal: controller.signal }),
        controller
    }
}

export const postArea = (area) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}areas/create`, {
            signal: controller.signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        }),
        controller
    }
}

export const getArea = (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}areas/list/${id}`, { signal: controller.signal }),
        controller
    }
}

export const updateArea = (area, id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}areas/update/${id}`,
            {
                signal: controller.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(area)
            }),
        controller
    }
}

export const deleteArea = (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}areas/delete/${id}`,
            {
                signal: controller.signal,
                method: 'DELETE'
            }),
        controller
    }
}