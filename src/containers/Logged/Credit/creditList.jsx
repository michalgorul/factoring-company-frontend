import Table from 'react-bootstrap/Table'
import {Spinner} from 'react-bootstrap';
import useFetchWithToken from '../../../services/useFetchWithToken';
import config from '../../../services/config';
import {compareId} from "../../../services/compare";

const CreditList = ({whatCredits}) => {
    const {error, isPending, data: credits} = useFetchWithToken(`${config.API_URL}/api/credit/current`)

    return (
        <Table striped borderless hover responsive>
            <caption>List of {whatCredits} credits</caption>
            <thead>
            <tr>
                <th>#</th>
                <th>Credit number</th>
                <th>Draw Date</th>
                <th>Amount</th>
                <th>Next Payment</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            {error && <>
                <div className="alert alert-warning fs-3" role="alert">{error} </div>
                <button className="text-decoration-none ms-3 fs-3" onClick={() => {
                    window.location.href = "/something"
                }}> Click to refresh
                </button>
            </>}
            {isPending &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {credits && credits
                .filter(credit => credit.status === whatCredits)
                .sort(compareId)
                .map(credit => (
                    <tr key={credit.id} className="clickable" onClick="#">
                        <th>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {credit.id}
                            </a>
                        </th>
                        <td>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {credit.creditNumber}
                            </a>
                        </td>
                        <td>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {new Date(credit.creationDate).toDateString()}
                            </a>
                        </td>
                        <td>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {credit.amount.toFixed(2)}
                            </a>
                        </td>
                        <td>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {credit.nextPayment.toFixed(2)}
                            </a>
                        </td>
                        <td>
                            <a href={"/user/credit/" + credit.id} className="text-decoration-none text-dark d-block">
                                {credit.balance.toFixed(2)}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CreditList;