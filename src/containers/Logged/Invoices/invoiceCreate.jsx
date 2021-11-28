import {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Select from 'react-select'
import {Spinner} from 'react-bootstrap';
import config from '../../../services/config';
import useFetchWithToken from '../../../services/useFetchWithToken';
import {errorToast, infoToast, warningToast} from '../../../components/toast/makeToast';
import {useHistory} from 'react-router';


const InvoiceCreate = () => {
    const [performanceDate, setPerformanceDate] = useState(new Date());
    const [issueDate, setIssueDate] = useState(new Date());
    const [quantity, setQuantity] = useState('');
    const [net, setNet] = useState('');
    const [vat, setVat] = useState('');
    const [months, setMonths] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isPendingN, setIsPendingN] = useState(false);

    const [customerPhone, setCustomerPhone] = useState('');
    const [customer, setCustomer] = useState(null);
    const [productName, setProductName] = useState('');
    const [product, setProduct] = useState(null);
    const [currencyName, setCurrencyName] = useState('');
    const [paymentTypeName, setPaymentTypeName] = useState('');

    const history = useHistory();


    const {data: products, error, isPending} = useFetchWithToken(`${config.API_URL}/api/product`);
    const {data: customers, errorC, isPendingC} = useFetchWithToken(`${config.API_URL}/api/customer/current`);
    const {data: currencies, errorCu, isPendingCu} = useFetchWithToken(`${config.API_URL}/api/currency`);
    const {data: paymentTypes, errorP, isPendingP} = useFetchWithToken(`${config.API_URL}/api/payment-type`);


    useEffect(() => {

        fetch(`${config.API_URL}/api/customer/phone/${customerPhone}`, {
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
                setCustomer(data);
            })
            .catch(err => {
                console.log(err);
            })

        fetch(`${config.API_URL}/api/product/name/${productName}`, {
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
                setProduct(data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [customerPhone, productName])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productName || !vat || !performanceDate || !issueDate || !customerPhone || !currencyName ||
            !paymentTypeName || !quantity || !net || !months) {
            warningToast('Please fill all fields');
        } else {
            const invoice = {
                customerPhone, productName, quantity, vat, net, currencyName, paymentTypeName,
                performanceDate, issueDate, months, remarks
            };

            setIsPendingN(true);

            fetch(`${config.API_URL}/api/invoice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(invoice)
            })
                .then((response) => {
                    setIsPendingN(false);
                    if (response.ok) {
                        history.goBack();
                        return response;
                    } else {
                        return response
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        infoToast('Company was updated')
                    } else {
                        errorToast('Some of inputs were incorrect')
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    const makeCustomerOptions = (customers) => {
        let customersArray = [];

        if (customers) {
            customers.forEach((item) => {
                let it = {
                    value: item.phone.toString(),
                    label: item.firstName.toString() + ' ' + item.lastName.toString() + ', phone: ' + item.phone.toString()
                };
                customersArray.push(it);
            })
        }
        return customersArray;
    }

    const makeProductOptions = (products) => {
        let productArray = [];

        if (products) {
            products.forEach((item) => {
                let it = {
                    value: item.name.toString(),
                    label: item.name.toString(),
                };
                productArray.push(it);
            })
        }
        return productArray;
    }

    const makeCurrencyOptions = (currencies) => {
        let currercyArray = [];

        if (currencies) {
            currencies.forEach((item) => {
                let it = {
                    value: item.code.toString(),
                    label: item.name.toString(),
                };
                currercyArray.push(it);
            })
        }
        return currercyArray;
    }

    const makePaymentOptions = (paymentTypes) => {
        let paymentArray = [];

        if (paymentTypes) {
            paymentTypes.forEach((item) => {
                let it = {
                    value: item.paymentTypeName.toString(),
                    label: item.paymentTypeName.toString(),
                };
                paymentArray.push(it);
            })
        }
        return paymentArray;
    }


    const optionsProduct = makeProductOptions(products);
    const optionsCustomers = makeCustomerOptions(customers);
    const optionsCurrencies = makeCurrencyOptions(currencies);
    const optionsPaymentTypes = makePaymentOptions(paymentTypes);

    const showCustomersDetails = (customer) => {
        if (customer) {
            return (
                <>
                    <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name: <b>{customer.firstName + ' ' + customer.lastName} </b></li>
                            <li className="list-group-item">Email: <b> {customer.email} </b></li>
                            <li className="list-group-item">Country: <b>{customer.country}</b></li>
                            <li className="list-group-item">City: <b>{customer.city}</b></li>
                            <li className="list-group-item">Street: <b>{customer.street} </b></li>
                            <li className="list-group-item">Postal code: <b>{customer.postalCode}</b></li>
                            <li className="list-group-item">Phone: <b>{customer.phone}</b></li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <a href={"/user/customers/edit/" + customer.id} className="text-decoration-none ml-auto">Edit customer's
                            details</a>
                    </div>
                    <div className="d-flex mb-5">
                        <a href={"/user/customers/create"} className="text-decoration-none ml-auto">Create new customer</a>
                    </div>
                </>
            )
        }
        return (
            <div className="d-flex mb-4">
                <a href={"/user/customers/create"} className="text-decoration-none ml-auto">Create new customer</a>
            </div>
        )
    }

    const showProductDetails = (product) => {
        if (product) {
            return (
                <>
                    <div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Name: <b>{product.name} </b></li>
                            <li className="list-group-item">PKWIU: <b> {product.pkwiu} </b></li>
                            <li className="list-group-item">Measure unit: <b>{product.measureUnit}</b></li>
                        </ul>
                    </div>
                    <div className="d-flex">
                        <a href={`/user/product/edit/${product.id}`} className="text-decoration-none ml-auto">Edit product's
                            details</a>
                    </div>
                    <div className="d-flex mb-5">
                        <a href={"/user/product/create"} className="text-decoration-none ml-auto">Create new product</a>
                    </div>
                </>
            )
        }
        return (
            <div className="d-flex mb-4">
                <a href={"/user/product/create"} className="text-decoration-none ml-auto">Create new product</a>
            </div>
        )
    }

    return (

        <>
            <div>
                {isPending && isPendingC && isPendingN && isPendingCu && isPendingP &&
                <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
                {error && <div>{error}</div>}
                {errorC && <div>{errorC}</div>}
                {errorCu && <div>{errorCu}</div>}
                {errorP && <div>{errorP}</div>}
                {products && customers && currencies && paymentTypes && (

                    <div className="container-fluid">
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="col-md-8 col-lg-8 col-xl-6">
                                <div
                                    className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mt-2 mb-4 display-4">New Invoice</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-2">
                                        <div className="col-12">
                                            <span style={{marginLeft: "5px"}} className="h5">Customer</span>
                                            <Select onChange={(e) => setCustomerPhone(e.value)} options={optionsCustomers}/>
                                        </div>
                                    </div>

                                    {showCustomersDetails(customer)}

                                    <div className="row mb-2">
                                        <div className="col-12">
                                            <span style={{marginLeft: "5px"}} className="h5">Product</span>
                                            <Select onChange={(e) => setProductName(e.value)} options={optionsProduct}/>
                                        </div>
                                    </div>

                                    {showProductDetails(product)}

                                    <div className="row mb-5">

                                        <div className="col-12 col-sm-3">
                                            <span style={{marginLeft: "5px"}} className="h5">Quentity</span>
                                            <input type="number" min="1" className="form-control"
                                                   placeholder="e.g. 3" required value={quantity}
                                                   onChange={(e) => setQuantity(e.target.value)}/>
                                        </div>

                                        <div className="col-12 col-sm-4">
                                            <span style={{marginLeft: "5px"}} className="h5">VAT rate %</span>
                                            <input type="number" min="0" max="100" step="0.1" className="form-control"
                                                   placeholder="e.g. 23,0" required value={vat}
                                                   onChange={(e) => setVat(e.target.value)}/>
                                        </div>

                                        <div className="col-12 col-sm-5">
                                            <span style={{marginLeft: "5px"}} className="h5">Unit net value</span>
                                            <input type="number" min="0" step="0.01" className="form-control"
                                                   placeholder="e.g. 123,45" required value={net}
                                                   onChange={(e) => setNet(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12 col-sm-5">
                                            <span style={{marginLeft: "5px"}} className="h5">Currency</span>
                                            <Select onChange={(e) => setCurrencyName(e.label)} options={optionsCurrencies}/>
                                        </div>

                                        <div className="col-12 col-sm-7">
                                            <span style={{marginLeft: "5px"}} className="h5">Payment type</span>
                                            <Select onChange={(e) => setPaymentTypeName(e.value)} options={optionsPaymentTypes}/>
                                        </div>
                                    </div>

                                    <div className="mb-3 col-12">
                                        <p style={{marginLeft: "5px"}} className="h5">Date of delivery/performance</p>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker clearable ampm={false}
                                                            renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                                            value={performanceDate} onChange={(newDate) => {
                                                setPerformanceDate(newDate);
                                            }}/>
                                        </LocalizationProvider>
                                    </div>

                                    <div className="mb-3 col-12">
                                        <p style={{marginLeft: "5px"}} className="h5">Date of issue</p>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker clearable ampm={false}
                                                            renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                                            value={issueDate} onChange={(newValue) => {
                                                setIssueDate(newValue);
                                            }}/>
                                        </LocalizationProvider>
                                    </div>

                                    <div className="col-12 col-sm-6 mb-3">
                                        <span style={{marginLeft: "5px"}} className="h5">Payment deadline</span>
                                        <input type="number" min="1" className="form-control"
                                               placeholder="How many months?" required value={months}
                                               onChange={(e) => setMonths(e.target.value)}/>
                                    </div>

                                    <div className="form-group mt-3" style={{marginLeft: "5px"}}>
                                        <label form="exampleFormControlTextarea1" className="h5">Remarks</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                                                  value={remarks} onChange={(e) => setRemarks(e.target.value)}> </textarea>
                                    </div>

                                    <div className="mb-3 mt-3 ms-3">
                                        {!isPendingN &&
                                        <button className="btn btn-primary rounded-pill btn-lg">Add Invoice</button>}
                                        {isPendingN && <button className="btn btn-primary rounded-pill btn-lg" disabled>Adding
                                            invoice...</button>}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>)}
            </div>

        </>


    );
}

export default InvoiceCreate;