const CustomerReports = () => {
    return (
        <div className="container h-100">
            <div className="row equal d-flex justify-content-center align-items-center h-100">
                <div className="col-8 col-xl-4">
                    <div className="card card-block border-primary">
                        <div className="card-body text-center">
                            <h3 className="card-title">VAT white list report</h3>
                            <p className="card-text d-none d-sm-block"> List of entities registered for VAT, unregistered and
                                removed and restored to VAT register. Entities may be checked on the list as of a selected date,
                                falling not earlier than within 5 years preceding the year in which the entity is checked. The
                                list includes, among others, the numbers of settlement accounts or registered accounts in a
                                cooperative savings and credit union, of which the entity is a member.</p>
                            <p className="card-text d-block d-sm-none">List of entities registered for VAT, unregistered and
                                removed and restored to VAT register</p>
                            <a href={"/user/reports/customers/vat"} className="stretched-link"> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CustomerReports;