import {useEffect, useState} from "react";
import {ifTokenCannotBeTrusted} from "./authenticationService";
import config from './config';

const useGetUsedCredit = () => {
    const [usedCredit, setUsedCredit] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        fetch(`${config.API_URL}/api/credit/left`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("could not fetch the data for that resource");
                }
                return response.text();
            })
            .then(data => {
                ifTokenCannotBeTrusted(data);
                setUsedCredit(data);
                setIsPending(false);
            })
            .catch(err => {
                console.log(err.message);
                setError(err);
            })

    }, []);


    return {
        usedCredit, error, isPending,
    };
}

export default useGetUsedCredit;