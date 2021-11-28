import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import {BrandLogo} from "../../../components/brandLogo";
import {Marginer} from '../../../components/marginer'
import {errorToast} from '../../../components/toast/makeToast'
import config from '../../../services/config'
import {useHistory} from 'react-router'
import {checkPassword, checkPasswordsMatch} from '../../../services/passwordService'

const PasswordResetChange = ({location}) => {

    const queryString = require('query-string');
    const parsed = queryString.parse(location.search);
    const token = parsed.token;
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        let matchingPasswords = checkPasswordsMatch(password, password2);
        let isPasswordProper = checkPassword(password);

        if (matchingPasswords && isPasswordProper) {

            const resetPassword = {token, password};


            fetch(`${config.API_URL}/password/reset`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resetPassword)
            })
                .then((response) => {
                    if (response.ok) {
                        history.push('/password/reset/change/success');
                    } else {
                        errorToast('Something went wrong :(')
                    }
                    return response;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

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
                                    <Card.Title><span className="h2">Change your password</span></Card.Title>

                                    <form onSubmit={handleSubmit}>
                                        <Marginer direction="vertical" margin={20}/>

                                        <Form.Label>Ented new password</Form.Label>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Password"
                                            className="mb-3">
                                            <Form.Control type="password" placeholder="name@example.com"
                                                          value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </FloatingLabel>
                                        <Form.Label>Confirm your new password</Form.Label>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Password"
                                            className="mb-3">
                                            <Form.Control type="password" placeholder="name@example.com"
                                                          value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                                        </FloatingLabel>

                                        <Button type="submit" className="btn-lg rounded-pill">Reset password</Button>
                                    </form>
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

export default PasswordResetChange;