import { useEffect, useState } from "react";
import { ifTokenCannotBeTrusted } from "./authenticationService";
import config from "./config";

const useFetchWithTokenInvoice = (id) => {
    const [invoice, setInvoice] = useState(null);
    const [isPendingI, setIsPendingI] = useState(true);
    const [errorI, setErrorI] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [isPendingC, setIsPendingC] = useState(true);
    const [errorC, setErrorC] = useState(null);
    const [paymentType, setPaymentType] = useState(null);
    const [isPendingP, setIsPendingP] = useState(true);
    const [errorP, setErrorP] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [isPendingCu, setIsPendingCu] = useState(true);
    const [errorCu, setErrorCu] = useState(null);

    const [invoiceAvailable, setInvoiceAvailable] = useState(false)

    useEffect(() => {

        fetch(`${config.API_URL}/api/invoice/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch the data for that resource");
                }
                return res.json();
            })
            .then(data => {
                setInvoice(data);
                setIsPendingI(false);
                setErrorI(null);
                setInvoiceAvailable(true);
            })
            .catch(err => {
                setIsPendingI(false);
                setErrorI(err.message);
                ifTokenCannotBeTrusted(err);
            })

        if (invoiceAvailable) {

            fetch(`${config.API_URL}/api/customer/${invoice.customerId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resource");
                    }
                    return res.json();

                })
                .then(data => {
                    ifTokenCannotBeTrusted(data);
                    setCustomer(data);
                    setIsPendingC(false);
                    setErrorC(null);

                })
                .catch(err => {
                    setIsPendingC(false);
                    setErrorC(err.message);
                });

            fetch(`${config.API_URL}/api/payment-type/${invoice.paymentTypeId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resource");
                    }
                    return res.json();

                })
                .then(data => {
                    ifTokenCannotBeTrusted(data);
                    setPaymentType(data);
                    setIsPendingP(false);
                    setErrorP(null);

                })
                .catch(err => {
                    setIsPendingP(false);
                    setErrorP(err.message);
                });

            fetch(`${config.API_URL}/api/currency/${invoice.currencyId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resource");
                    }
                    return res.json();

                })
                .then(data => {
                    ifTokenCannotBeTrusted(data);
                    setCurrency(data);
                    setIsPendingCu(false);
                    setErrorCu(null);

                })
                .catch(err => {
                    setIsPendingCu(false);
                    setErrorCu(err.message);
                });
        }

    }, [id, invoiceAvailable]);


    return {
        invoice, isPendingI, errorI,
        customer, errorC, isPendingC,
        paymentType, errorP, isPendingP,
        currency, errorCu, isPendingCu,
    };
}

export default useFetchWithTokenInvoice;