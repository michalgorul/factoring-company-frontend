import {useHistory, useParams} from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {useState, useEffect, useMemo} from "react";
import {Spinner} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input/input'
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {errorToast, infoToast} from "../../../components/toast/makeToast";

const CustomerEdit = () => {

    const [email, setEmail] = useState('');
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
    const [isPendingN, setIsPendingN] = useState(false);
    const options = useMemo(() => countryList().getData(), [])

    const {id} = useParams();
    const {data: editCustomer, error, isPending} = useFetchWithToken(`${config.API_URL}/api/customer/${id}`);
    const history = useHistory();

    useEffect(() => {
        getCustomer();
    }, [editCustomer])

    function getCustomer() {
        if (editCustomer) {
            const countryObject = {value: countryList().getValue(editCustomer.country), label: editCustomer.country};
            setEmail(editCustomer.email);
            setFirstName(editCustomer.firstName);
            setLastName(editCustomer.lastName)
            setCompanyName(editCustomer.companyName);
            setCountryInList(countryObject);
            setCountry(editCustomer.country);
            setCity(editCustomer.city);
            setStreet(editCustomer.street);
            setPostalCode(editCustomer.postalCode);
            setPhone(editCustomer.phone);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setBlacklisted(false);
        const customer = {email, firstName, lastName, companyName, country, city, street, postalCode, phone, blacklisted};
        setIsPendingN(true);
        fetch(`${config.API_URL}/api/customer/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(customer)
        })
            .then((response) => {
                setIsPendingN(false);
                if (response.ok) {
                    history.push('/user/customers');
                    return response;
                } else {
                    return response;
                }
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Customer was updated');
                } else {
                    errorToast('Some of inputs were incorrect');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const changeHandler = country => {
        setCountryInList(country)
        setCountry(country.label)
    }

    return (
        <div>
            {isPending && isPendingN &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {error && <div>{error}</div>}
            {editCustomer && (
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-start align-items-center">
                        <div className="col-md-8 col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit}>
                                <div
                                    className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mt-2 mb-3 display-4">Edit Customer</p>

                                </div>
                                <div className="form-outline form-floating mb-3">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Enter a valid email address" required value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    <label className="form-label">Email</label>
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
                                    <Select className="" required options={options} value={countryInList}
                                            onChange={changeHandler}/>
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

                                <div className="mb-3">
                                    <label>Phone number</label>
                                    <PhoneInput type="tel" className="form-control" id="phone" placeholder="123-456-789"
                                                country="PL" defaultCountry="PL" maxLength={11}
                                                value={phone} onChange={setPhone} rules={{required: true}} required/>
                                </div>
                                <div className="mb-3">
                                    {!isPending && <button className="btn btn-primary rounded-pill btn-lg">Edit Customer</button>}
                                    {isPending &&
                                    <button className="btn btn-primary rounded-pill btn-lg" disabled>Editing customer...</button>}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>)}
        </div>

    );
}

export default CustomerEdit;