import {useState} from "react";
import {useHistory, useParams} from "react-router";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {useEffect} from "react";
import {errorToast, infoToast} from "../../../components/toast/makeToast";
import {Spinner} from "react-bootstrap";
import Select from 'react-select'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import TextField from '@material-ui/core/TextField';


const GeneralInfoEdit = () => {

    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [saleDate, setSaleDate] = useState('');
    const [paymentDeadline, setPaymentDeadline] = useState('');
    const [toPay, setToPay] = useState('');
    const [paid, setPaid] = useState('');
    const [remarks, setRemarks] = useState('');
    const [status, setStatus] = useState('')
    const [sellerId, setSellerId] = useState('')
    const [customerId, setCustomerId] = useState('')
    const [paymentTypeId, setPaymentTypeId] = useState('')
    const [currencyId, setCurrencyId] = useState('')
    const [isPendingN, setIsPendingN] = useState('')


    const {id} = useParams();
    const {data: invoice, error, isPending} = useFetchWithToken(`${config.API_URL}/api/invoice/${id}`);
    const {data: statuses, errorS, isPendingS} = useFetchWithToken(`${config.API_URL}/api/invoice/statuses`);
    const history = useHistory();

    useEffect(() => {
        getInvoiceGeneralInfo();
    }, [invoice])


    const getInvoiceGeneralInfo = () => {

        if (invoice) {
            setInvoiceNumber(invoice.invoiceNumber);
            setCreationDate(invoice.creationDate);
            setSaleDate(invoice.saleDate);
            setPaymentDeadline(invoice.paymentDeadline);
            setToPay(invoice.toPay);
            setPaid(invoice.paid);
            setRemarks(invoice.remarks);
            setStatus(invoice.status);
            setSellerId(invoice.sellerId);
            setCustomerId(invoice.customerId);
            setPaymentTypeId(invoice.paymentTypeId);
            setCurrencyId(invoice.currencyId);
        }
    }

    const makeStatusOptions = (statuses) => {
        let statusArray = [];

        if (statuses) {
            statuses.forEach((item) => {
                let it = {
                    value: item.toString(),
                    label: item.toString(),
                };
                statusArray.push(it);
            })
        }
        return statusArray;
    }

    const optionsStatus = makeStatusOptions(statuses);


    const handleSubmit = (e) => {
        e.preventDefault();

        const invoice = {
            invoiceNumber, creationDate, saleDate, paymentDeadline, toPay, paid,
            remarks, status, sellerId, customerId, paymentTypeId, currencyId
        };

        setIsPendingN(true);

        fetch(`${config.API_URL}/api/invoice/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(invoice)
        })
            .then((response) => {
                setIsPendingN(false);
                if (response.ok) {
                    history.push('/user/invoices');
                    window.location.reload();
                    return response;
                } else {
                    return response;
                }
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Invoice general info was updated');
                } else {
                    errorToast('Some of inputs were incorrect');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div>
            {isPending && isPendingS &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {error && <div>{error}</div>}
            {errorS && <div>{error}</div>}
            {invoice && (
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-start align-items-center">
                        <div className="col-md-8 col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit}>
                                <div
                                    className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mt-2 mb-3 display-4">Edit General Invoice Information</p>

                                </div>

                                <div className="form-floating form-outline mb-3">
                                    <p style={{marginLeft: "5px"}} className="h5">Date of issue</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker clearable ampm={false}
                                                        renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                                        value={creationDate} onChange={(newValue) => {
                                            setCreationDate(newValue);
                                        }}/>
                                    </LocalizationProvider>
                                </div>

                                <div className="form-floating form-outline mb-3">
                                    <p style={{marginLeft: "5px"}} className="h5">Date of delivery/performance</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker clearable ampm={false}
                                                        renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                                        value={saleDate} onChange={(newDate) => {
                                            setSaleDate(newDate);
                                        }}/>
                                    </LocalizationProvider>
                                </div>

                                <div className="form-floating form-outline mb-3">
                                    <p style={{marginLeft: "5px"}} className="h5">Date of payment deadline</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker clearable ampm={false}
                                                        renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                                        value={paymentDeadline} onChange={(newValue) => {
                                            setPaymentDeadline(newValue);
                                        }}/>
                                    </LocalizationProvider>
                                </div>

                                <div className="mb-3">
                                    <span style={{marginLeft: "5px"}} className="h5">To pay</span>
                                    <input type="number" min="0" step="0.01" className="form-control"
                                           placeholder="e.g. 123,45" required value={toPay}
                                           onChange={(e) => setToPay(e.target.value)}/>

                                </div>

                                <div className="mb-3">
                                    <span style={{marginLeft: "5px"}} className="h5">Paid</span>
                                    <input type="number" min="0" step="0.01" className="form-control"
                                           placeholder="e.g. 123,45" required value={paid}
                                           onChange={(e) => setPaid(e.target.value)}/>
                                </div>

                                <div className="form-floating form-outline mb-3">
                                    <span style={{marginLeft: "5px"}} className="h5">Status</span>
                                    <Select value={{value: status, label: status}} onChange={(e) => setStatus(e.value)}
                                            options={optionsStatus}/>
                                </div>

                                <div className="form-group mt-3" style={{marginLeft: "5px"}}>
                                    <label className="h5">Remarks</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={remarks}
                                              onChange={(e) => setRemarks(e.target.value)}> </textarea>
                                </div>


                                <div className="mb-3">
                                    {!isPendingN &&
                                    <button className="btn btn-primary rounded-pill btn-lg">Edit invoice info</button>}
                                    {isPendingN &&
                                    <button className="btn btn-primary rounded-pill btn-lg" disabled>Editing invoice
                                        info...</button>}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}

export default GeneralInfoEdit;