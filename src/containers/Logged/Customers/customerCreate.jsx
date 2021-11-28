import {useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {infoToast, warningToast} from "../../../components/toast/makeToast";
import config from "../../../services/config";

toast.configure();

const CustomerCreate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [countryInList, setCountryInList] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [blacklisted, setBlacklisted] = useState(false);
    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const options = useMemo(() => countryList().getData(), [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setBlacklisted(false);

        const customer = {firstName, lastName, companyName, country, city, street, postalCode, phone, blacklisted, email};
        setIsPending(true);

        fetch(`${config.API_URL}/api/customer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(customer)
        })
            .then((response) => {
                setIsPending(false);
                if (response.ok) {
                    history.push('/user/customers');
                    return response;
                } else {
                    return response
                }
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Customer was added')
                } else {
                    warningToast('Some of inputs are incorrect')
                }
            })
    }
    const changeHandler = country => {
        setCountryInList(country)
        setCountry(country.label)
    }

    return (
        <>

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-start align-items-center">
                    <div className="col-md-8 col-lg-8 col-xl-6">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mt-2 mb-3 display-4">New Customer</p>

                            </div>

                            <div className="form-outline form-floating mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter a valid email address" required value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>
                                <label className="form-label">First name</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>
                                <label className="form-label">Last name</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={companyName}
                                       onChange={(e) => setCompanyName(e.target.value)}/>
                                <label className="form-label">Company name</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <Select className="" options={options} value={countryInList} onChange={changeHandler}/>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={city}
                                       onChange={(e) => setCity(e.target.value)}/>
                                <label className="form-label">City</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={street}
                                       onChange={(e) => setStreet(e.target.value)}/>
                                <label className="form-label">Street</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={postalCode}
                                       onChange={(e) => setPostalCode(e.target.value)}/>
                                <label className="form-label">Postal code</label>
                            </div>

                            <div className="form-outline form-floating mb-3">
                                <input type="email" className="form-control form-control-lg"
                                       placeholder="Enter a valid email address" value={email}
                                       onChange={(e) => setEmail(e.target.value)} required/>
                                <label className="form-label">Email</label>
                            </div>

                            <div className="mb-3">
                                <label>Phone number</label>
                                <PhoneInput type="tel" className="form-control" id="phone" placeholder="123-456-789"
                                            country="PL" defaultCountry="PL" maxLength={11}
                                            value={phone} onChange={setPhone} rules={{required: true}} required/>
                            </div>

                            <div className="mb-3">
                                {!isPending && <button className="btn btn-primary rounded-pill btn-lg">Add Customer</button>}
                                {isPending &&
                                <button className="btn btn-primary rounded-pill btn-lg" disabled>Adding blog...</button>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerCreate;