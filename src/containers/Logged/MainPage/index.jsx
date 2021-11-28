import Image from '../../../images/6685.jpg';

const MainPageLoged = () => {
    return (
        <div className="container-lg">
            <div className="mt-5 row g-4 justify-content-center align-items-center">
                <div className="col-md-5 text-center text-md-start">
                    <h1>
                        <div className="display-2">Welcome back!</div>
                        <div className="display-5 text-muted">Happy to see you</div>
                    </h1>
                    <p className="lead my-4 text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis dolore
                        temporibus reprehenderit culpa nulla labore aperiam recusandae eos tempora.</p>
                    <a href={"/user/invoices"} className="btn btn-primary btn-lg rounded-pill">Invoices</a>
                </div>
                <div className="col-md-6 text-center d-none d-md-block">
                    <span data-bs-placement="bottom" title="Welcome">
						<img src={Image} className="img-fluid" alt="welcome"/>
					</span>
                </div>
            </div>
        </div>
    );
}

export default MainPageLoged;