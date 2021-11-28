import {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import config from "../../../services/config";
import useFetchWithToken from "../../../services/useFetchWithToken";

const Profile = () => {

    const {data: user, error: errorU, isPending: isPendingU} = useFetchWithToken(`${config.API_URL}/api/user/current`);
    const [bank, setBank] = useState(null);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        fetch(`${config.API_URL}/api/company/current`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCompany(data);
                return data;

            })
            .then(() => {
                fetch(`${config.API_URL}/api/bank-account/current`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        setBank(data);
                    })
                    .catch(err => {
                        if (err.name === "AbortError") {
                            console.log('fetch aborted');
                        }
                    })
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted');
                }
            })
    }, [])

    const showBankAccountDetails = (bank) => {
        if (bank != null) {
            return (
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">{bank.bankName}</li>
                    <li className="list-group-item list-group-item-action">{bank.bankAccountNumber}</li>
                    <li className="list-group-item list-group-item-action">{bank.bankSwift}</li>
                </ul>
            );
        } else {
            return (
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                </ul>
            )
        }
    }

    const showCompanyDetails = (company) => {
        if (company != null) {
            return (
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item list-group-item-action">{company.companyName}</li>
                    <li className="list-group-item list-group-item-action">{company.country}</li>
                    <li className="list-group-item list-group-item-action">{company.city}</li>
                    <li className="list-group-item list-group-item-action">{company.street}</li>
                    <li className="list-group-item list-group-item-action">{company.postalCode}</li>
                    <li className="list-group-item list-group-item-action">{company.nip}</li>
                    <li className="list-group-item list-group-item-action">{company.regon}</li>
                </ul>
            );
        } else {
            return (
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                </ul>
            )
        }
    }

    const showEditBankAccount = (bank, company) => {
        if (bank != null && company != null) {
            return (
                <a href={"/user/bank-account/edit/" + bank.id} className="text-decoration-none ml-auto h6">Edit your bank
                    account</a>
            )
        } else if (bank != null && company == null) {
            return (
                <a href={"/user/profile/bank/create"} className="text-decoration-none ml-auto h6 disabled">Add your bank
                    account</a>
            )
        } else if (bank == null && company != null) {
            return (
                <a href={"/user/profile/bank/create"} className="text-decoration-none ml-auto h6">Add your bank account</a>
            )
        } else {
            return (
                <a href={"/user/profile/bank/create"} className="text-decoration-none ml-auto h6">Add your bank account</a>
            )
        }
    }

    const showEditCompany = (company) => {
        if (company != null) {
            return (
                <a href={"/user/profile/company/edit/" + company.id} className="text-decoration-none ml-auto h6">Edit your
                    company</a>
            )
        } else {
            return (
                <a href={"/user/profile/company/create"} className="text-decoration-none ml-auto h6">Add your company</a>
            )
        }

    }


    return (
        <>
            {isPendingU &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorU && <div>{errorU}</div>}
            {user && (
                <div className="container container-p-y" style={{marginLeft: "0"}}>

                    <div className="media align-items-center py-3 ">
                        <div className="ml-4">
                            <h4 className="font-weight-bold display-2">Your profile</h4>
                            <h4 className="display-3 mt-5">{user.firstName + ' ' + user.lastName}</h4>
                            <h4 className="lead display-6">{user.email}</h4>
                        </div>
                    </div>


                    <h5 className="mt-4 mb-3">Address & Phone</h5>
                    <div className="container">
                        <div className="row align-items-start ms-3">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Country:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">City:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Street:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Postal code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Phone number:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action">{user.country}</li>
                                    <li className="list-group-item list-group-item-action">{user.city}</li>
                                    <li className="list-group-item list-group-item-action">{user.street}</li>
                                    <li className="list-group-item list-group-item-action">{user.postalCode}</li>
                                    <li className="list-group-item list-group-item-action">{user.phone}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                        <a href={"/user/profile/edit"} className="text-decoration-none ml-auto h6">Edit your profile</a>
                    </div>


                    <h5 className="mt-4 mb-3">Bank account</h5>
                    <div className="container">
                        <div className="row align-items-start ms-3">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Bank name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Bank account number:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">SWIFT:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                {showBankAccountDetails(bank)}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                        {showEditBankAccount(bank, company)}
                    </div>


                    <h5 className="mt-4 mb-3">Company</h5>
                    <div className="container">
                        <div className="row align-items-start ms-3">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Company name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Country:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">City:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Street:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Postal code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">NIP:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">REGON:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                {showCompanyDetails(company)}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                        {showEditCompany(bank, company)}
                    </div>

                </div>)}
        </>
    );
}

export default Profile;