import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById = (id:string | string[]) =>{
    const [call,setcall] = useState<Call>()
    const [isCallLoading, setisCallLoading]= useState(true)

    const client = useStreamVideoClient();

    useEffect(() => {
        if(!client) return;

        const loadCall = async () =>{
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        id,
                        type: 'default',
                    }
                });
                if(calls.length > 0) setcall(calls[0]);
            } catch (error) {
                console.error('Failed to load call by id:', error);
            } finally {
                setisCallLoading(false);
            }
        }

        loadCall();
    }, [client, id])

    return {call, isCallLoading};
}