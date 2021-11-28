import {useState} from 'react';
import {Marginer} from '../../../components/marginer'
import {errorToast, infoToast, successToast} from '../../../components/toast/makeToast';
import RegisterImage from '../../../images/register.png'
import PhoneInput from 'react-phone-number-input/input'
import {formatPhoneNumber, isPossiblePhoneNumber} from 'react-phone-number-input'
import {useHistory} from 'react-router';
import config from '../../../services/config'
import {checkPassword, checkPasswordsMatch} from '../../../services/passwordService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        let matchingPasswords = checkPasswordsMatch(password, password2);
        let isPhonePossible = phone && isPossiblePhoneNumber(phone) ? 'true' : 'false';
        let isPasswordProper = checkPassword(password);
        setPhone(formatPhoneNumber(phone).replaceAll(' ', ''));

        if (matchingPasswords && isPhonePossible && isPasswordProper) {

            const registration = {username, password, email, firstName, lastName, country, city, street, postalCode, phone};
            fetch(`${config.API_URL}/registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registration)
            })
                .then((response) => {
                    if (response.ok) {
                        successToast('Registration completed!');
                        infoToast('Confirm your email to be able to login!');
                    } else if (response.status === 409) {
                        errorToast('Email or username already in use');
                    } else if (response.status === 406) {
                        errorToast('Some of inputs were incorrect');
                    } else {
                        console.log(response);
                        errorToast('Something went wrong :(')
                    }
                    return response;
                })
                .then((response) => {
                    if (response.ok) {
                        setTimeout(() => {
                            history.push('/login');
                            window.location.reload();
                        }, 5000)
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }

    return (
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100 w-100">
                <div className="col-md-12 col-lg-5">
                    <img src={RegisterImage} className="img-fluid mt-5" alt="Sample"/>
                </div>
                <div className="col-md-12 col-lg-7">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mt-5 mb-5 me-3 display-3">Register</p>
                            </div>
                            <div className="form-row">
                                <div className="col-md-4 mb-3 ">
                                    <label form="validationServer01">First name</label>
                                    <input type="text" className="form-control" id="validationServer01" placeholder="First name"
                                           value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label form="validationServer02">Last name</label>
                                    <input type="text" className="form-control" id="validationServer02" placeholder="Last name"
                                           value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label form="validationServerUsername">Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend3">@</span>
                                        </div>
                                        <input type="text" className="form-control" id="validationServerUsername"
                                               placeholder="Username" aria-describedby="inputGroupPrepend3"
                                               value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-4 mb-3 ">
                                    <label form="validationServer01">Address</label>
                                    <input type="text" className="form-control" id="validationServer01" placeholder="Address"
                                           value={street} onChange={(e) => setStreet(e.target.value)} required/>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label form="validationServer02">City</label>
                                    <input type="text" className="form-control" id="validationServer02" placeholder="City"
                                           value={city} onChange={(e) => setCity(e.target.value)} required/>
                                </div>
                                <div className="col-md-2 mb-3 ">
                                    <label form="validationServer01">Postal code</label>
                                    <input type="text" className="form-control" id="validationServer01" placeholder="Postal code"
                                           value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required/>
                                </div>
                                <div className="col-md-3 mb-3 ">
                                    <label form="validationServer01">Country</label>
                                    <input type="text" className="form-control" id="validationServer01" placeholder="Country"
                                           value={country} onChange={(e) => setCountry(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="form-row justify-content-md-center">
                                <div className="col-md-7 mb-3 ">
                                    <label form="validationServer01">Email</label>
                                    <input type="email" className="form-control" id="validationServer01" placeholder="Address"
                                           value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className="col-md-5 mb-3">
                                    <label form="validationServer02">Phone number</label>
                                    <PhoneInput type="tel" className="form-control" id="phone" placeholder="123-456-789"
                                                country="PL" defaultCountry="PL" maxLength={11}
                                                value={phone} onChange={setPhone} rules={{required: true}} required/>
                                </div>

                            </div>

                            <div className="form-row justify-content-md-center">
                                <div className="col-md-6 mb-3 ">
                                    <label form="validationServer01">Password</label>
                                    <input type="password" className="form-control" id="validationServer01" placeholder="Password"
                                           value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        Your password must be 8-30 characters long, contain at least one uppercase character,
                                        numeric character and symbol.
                                    </small>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label form="validationServer02">Confirm password</label>
                                    <input type="password" className="form-control" id="validationServer02" placeholder="Password"
                                           value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox mb-3 mt-2 was-validated">
                                    <input type="checkbox" className="custom-control-input" id="terms"
                                           required/>
                                    <label className="custom-control-label" htmlFor="terms">
                                        I agree all statements in <a href={"/terms-of-use"} className="text-decoration-none">
                                        Terms of use</a></label>
                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                </div>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2 justify-content-md-center">
                                <button type="submit" className="btn btn-primary btn-lg rounded-pill"
                                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Register
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                                    <a href={"/login"} className="link-primary text-decoration-none">
                                        Sign In
                                    </a>
                                </p>
                            </div>
                            <Marginer direction="vertical" margin={20}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;