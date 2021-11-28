const CustomerList = ({customers}) => {
    return (
        <div className="customer-list">
            {customers.map(customer => (
                <li key={customer.id} className="list-group-item list-group-item list-group-item-action d-flex align-items-start">
                    <div className="ms-2 me-auto fs-5">
                        <div className="fw-bold">
                            <a href={'/user/customers/' + customer.id}
                               className="text-decoration-none stretched-link">{customer.firstName + ' ' + customer.lastName}</a>
                        </div>
                        {customer.companyName}
                    </div>
                </li>
            ))}
        </div>
    );
}

export default CustomerList;