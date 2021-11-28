import {useHistory} from "react-router-dom";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {useMemo, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import config from "../../../services/config";
import {errorToast, infoToast} from "../../../components/toast/makeToast";

const CompanyCreate = () => {
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [countryInList, setCountryInList] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [nip, setNip] = useState('');
    const [regon, setRegon] = useState('');
    const [isPendingN, setIsPendingN] = useState(false);
    const options = useMemo(() => countryList().getData(), [])

    let history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();

        const company = {companyName, country, city, street, postalCode, nip, regon};
        setIsPendingN(true);

        fetch(`${config.API_URL}/api/company/current`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(company)
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


    const changeHandler = country => {
        setCountryInList(country)
        setCountry(country.label)
    }


    return (
        <div>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-start align-items-center">
                    <div className="col-md-8 col-lg-8 col-xl-6">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mt-2 mb-3 display-4">Add your Company</p>

                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={companyName}
                                       onChange={(e) => setCompanyName(e.target.value)}/>
                                <label className="form-label">Company name</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <Select className="" required options={options} value={countryInList} onChange={changeHandler}/>
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
                                       placeholder="Enter password" value={postalCode}
                                       onChange={(e) => setPostalCode(e.target.value)}/>
                                <label className="form-label">Postal code</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={nip}
                                       onChange={(e) => setNip(e.target.value)}/>
                                <label className="form-label">Nip</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={regon}
                                       onChange={(e) => setRegon(e.target.value)}/>
                                <label className="form-label">Regon</label>
                            </div>

                            <div className="mb-3">
                                {!isPendingN && <button className="btn btn-primary rounded-pill btn-lg">Add your Company</button>}
                                {isPendingN &&
                                <button className="btn btn-primary rounded-pill btn-lg" disabled>Adding company...</button>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;