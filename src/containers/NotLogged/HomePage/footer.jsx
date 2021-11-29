import {
    EnvelopeFill,
    Facebook,
    Github,
    Google,
    HouseFill,
    Instagram,
    Linkedin,
    PrinterFill,
    TelephoneFill,
    Twitter
} from "react-bootstrap-icons"
import styled from 'styled-components'
import {Marginer} from "../../../components/marginer";
import Copyright from "./copyright";

const Footer = () => {

    const FullWidth = styled.div`
      width: 100%;
    `;
    return (
        <FullWidth>
            <footer className="text-center text-lg-start bg-primary text-white">
                <div className="d-flex justify-content-center p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                    <span>
                        <Marginer direction="horizontal" margin={200}/>
                        Get connected with us on social networks:
                        <Marginer direction="horizontal" margin={200}/>

                    </span>
                    </div>

                    <div>
                        <a href="https://www.facebook.com" className="me-4 text-reset">
                            <Facebook/>
                        </a>
                        <a href="https://twitter.com/" className="me-4 text-reset">
                            <Twitter/>
                        </a>
                        <a href="https://google.com/" className="me-4 text-reset">
                            <Google/>
                        </a>
                        <a href="https://instagram.com/" className="me-4 text-reset">
                            <Instagram/>
                        </a>
                        <a href="https://linkedin.com/" className="me-4 text-reset">
                            <Linkedin/>
                        </a>
                        <a href="https://github.com/" className="me-4 text-reset">
                            <Github/>
                        </a>
                    </div>
                </div>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"> </i>Factoring Company
                                </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem reprehenderit deleniti
                                    ratione necessitatibus, voluptate, earum, sapiente minima libero corporis beatae soluta quasi
                                    quibusdam sunt. Iste officia veniam illum esse et.
                                    <div style={{fontSize: "12px"}} className="mt-2">
                                        <a href="http://www.freepik.com" className="text-white text-decoration-none">Graphics and
                                            icons designed by Freepik</a>
                                    </div>
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Products
                                </h6>
                                <p>
                                    <a href={"/factoring"} className="text-reset text-decoration-none">Factoring</a>
                                </p>
                                <p>
                                    <a href={"/payments"} className="text-reset text-decoration-none">Payments</a>
                                </p>
                                <p>
                                    <a href={"/banking"} className="text-reset text-decoration-none">Banking</a>
                                </p>
                                <p>
                                    <a href={"/credit"} className="text-reset text-decoration-none">Credit</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href={"/pricing"} className="text-reset text-decoration-none">Pricing</a>
                                </p>
                                <p>
                                    <a href={"/terms-of-use"} className="text-reset text-decoration-none">Terms of use</a>
                                </p>
                                <p>
                                    <a href={"/orders"} className="text-reset text-decoration-none">Orders</a>
                                </p>
                                <p>
                                    <a href={"/help"} className="text-reset text-decoration-none">Help</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                <p><HouseFill className="me-2"/>New York, NY 10012, US</p>
                                <p><EnvelopeFill className="me-2"/>info@fc.com</p>
                                <p><TelephoneFill className="me-2"/>+ 01 234 567 88</p>
                                <p><PrinterFill className="me-2"/>+ 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Copyright/>
            </footer>
        </FullWidth>

    );
}

export default Footer;