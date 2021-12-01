import Card from "react-bootstrap/Card";
import {BrandLogo} from "../../../components/brandLogo";
import {Marginer} from "../../../components/marginer";
import axios from "axios";
import {useParams} from "react-router-dom";

const RegisterSuccess = () => {
    const {token} = useParams();
    axios.get(`https://factoring-company-backend.herokuapp.com/registration/confirm?token=${token}`).then(() => console.log(''));

    setTimeout(function () {
        window.location.replace('/login');
    }, 6000);

    console.log(token);
    return (
        <>
            <div className="jumbotron d-flex align-items-center min-vh-100">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-lg-2">
                        </div>
                        <div className="col-md-auto">
                            <Card className="text-center">
                                <Card.Header className="bg-primary"><BrandLogo logoSize={120} textSize={35}
                                                                               className="d-none d-md-block"/></Card.Header>
                                <Card.Body>
                                    <Card.Title><span className="h2">Account was confirmed</span></Card.Title>
                                    <Card.Text>
                                        <span className="h4">
                                            You can login now with your credentials
                                        </span>
                                        <br/>
                                        <span className="h6"><Marginer direction="vertical" margin={10}/>
                                            If you need any help please contact our support
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col col-lg-2">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterSuccess;