import CustomerList from "./customerList";
import {Spinner} from 'react-bootstrap';
import React, {useEffect, useState} from "react";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";

const Customers = () => {

    const {data: customers, error, isPending} = useFetchWithToken(`${config.API_URL}/api/customer/current`);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };


    useEffect(() => {
        if (customers) {
            const results = customers.filter(customer =>
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }

    }, [searchTerm, customers]);

    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-2">Customer list</h4>
                </div>
            </div>

            <div className="container mt-3 me-0">
                <div className="row">
                    <div className="col-12 align-items-end align-middle">
                        <a href={"/user/customers/create"} className="btn btn-primary btn-lg rounded-pill float-end">
                            Add New
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-2 me-0 ms-0">
                <div className="row justify-content-between">
                    <div className="form-outline form-floating mb-3 col-12 col-lg-6">
                        <input type="text" className="form-control form-control-sm"
                               placeholder="filter items" value={searchTerm} onChange={handleChange}/>
                        <label className="form-label ms-2">Filter</label>
                    </div>
                </div>
            </div>

            <ol className="list-group list-group-numbered list-group-flush">
                {error && <>
                    <div className="alert alert-warning fs-3" role="alert">{error} </div>
                    <button className="text-decoration-none ms-3 fs-3" ref="" onClick={() => {
                        window.location.href = "/something"
                    }}> Click to refresh
                    </button>
                </>}
                {isPending &&
                <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
                {customers && <CustomerList customers={searchResults}/>}
            </ol>
        </>
    );
}

export default Customers;