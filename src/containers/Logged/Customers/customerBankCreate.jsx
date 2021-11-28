import {useHistory, useParams} from "react-router-dom";
import {useState} from "react";
import config from "../../../services/config";
import {errorToast, infoToast} from "../../../components/toast/makeToast";

const CreateCustomerBankAccount = () => {
    const [bankName, setBankName] = useState('');
    const [bankAccountNumber, setNumber] = useState('');
    const [bankSwift, setSwift] = useState('');
    const [isPendingN, setIsPendingN] = useState(false);
    const history = useHistory();
    const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = {bankName, bankAccountNumber, bankSwift};
        setIsPendingN(true);

        fetch(`${config.API_URL}/api/bank-account/customer/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(account)
        })
            .then((response) => {
                setIsPendingN(false);
                if (response.ok) {
                    history.push('/user/customers/' + id);
                    window.location.reload();
                    return response;
                } else {
                    return response;
                }
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Your Bank account was added')
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
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-start align-items-center">
                    <div className="col-md-8 col-lg-8 col-xl-6">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mt-2 mb-3 display-4">Add customer's Bank Account</p>

                            </div>
                            <div className="form-outline form-floating mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter a valid email address" required value={bankName}
                                       onChange={(e) => setBankName(e.target.value)}/>
                                <label className="form-label">Bank name</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={bankAccountNumber}
                                       onChange={(e) => setNumber(e.target.value)}/>
                                <label className="form-label">Bank account number</label>
                            </div>

                            <div className="form-floating form-outline mb-3">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Enter password" required value={bankSwift}
                                       onChange={(e) => setSwift(e.target.value)}/>
                                <label className="form-label">SWIFT</label>
                            </div>

                            <div className="mb-3">
                                {!isPendingN &&
                                <button className="btn btn-primary rounded-pill btn-lg" type="submit">Add your Bank
                                    Account</button>}
                                {isPendingN &&
                                <button className="btn btn-primary rounded-pill btn-lg" disabled>Adding account...</button>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCustomerBankAccount;