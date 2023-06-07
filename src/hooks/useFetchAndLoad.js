import { useEffect, useState } from 'react';

const useFetchAndLoad = () => {
    const [ loading, setLoading ] = useState(false)
    let controller

    const callEndpoint = async(fetch) => {
        if(fetch?.controller) controller = fetch?.controller
        
        setLoading(true)

        let result

        try {
            
            result = await fetch?.call;
            
        } catch (error) {
            setLoading(false)
            throw error
        }

        setLoading(false)

        return result
        
    }

    const cancelEndpoint = () => {
        setLoading(false)
        // console.log(controller)

        controller && controller?.abort()
    }

    useEffect(() => {
        return () => {
            cancelEndpoint()
        }
    }, [])

    return { loading, callEndpoint }
}

export default useFetchAndLoad