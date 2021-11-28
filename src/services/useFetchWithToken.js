import {useEffect, useState} from "react";
import {ifTokenCannotBeTrusted} from "./authenticationService";

const useFetchWithToken = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setTimeout(() => {
            fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    if (!ifTokenCannotBeTrusted(data)) {
                        setData(data);
                        setIsPending(false);
                        setError(null);
                    }

                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 0);


    }, [url]);

    return {data, isPending, error};
}

export default useFetchWithToken;