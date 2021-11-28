import Card from 'react-bootstrap/Card'
import {BrandLogo} from "../../../components/brandLogo";
import {Marginer} from '../../../components/marginer'

const PasswordResetConfirmation = () => {

    setTimeout(function () {
        window.location.replace('/login');
    }, 6000);

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
                                    <Card.Title><span className="h2">Email was sent!</span></Card.Title>
                                    <Card.Text>
                                        <span className="h4">
                                            Please check your mailbox
                                        </span>
                                        <br/>
                                        <span className="h5"><Marginer direction="vertical" margin={10}/>
                                            If an account with this email address exists on our site
                                            <br/>
                                            you will receive an email with a link to reset your password
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

export default PasswordResetConfirmation;