import Image from '../../../images/6685.jpg';

const MainPageLoged = () => {
    return (
        <div className="container-lg">
            <div className="mt-5 row g-4 justify-content-center align-items-center">
                <div className="col-md-5 text-center text-md-start">
                    <h1>
                        <div className="display-2">Welcome</div>
                        <div className="display-5 text-muted">Happy to see you!</div>
                    </h1>
                    <blockquote className="blockquote">
                        <p className="lead my-4">By pursuing his own interest he frequently promotes that of the society
                            more effectually than when he really intends to promote it.</p>
                        <footer className="blockquote-footer">Adam Smith in <cite title="Source Title">The Wealth of Nations</cite>
                        </footer>
                    </blockquote>

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