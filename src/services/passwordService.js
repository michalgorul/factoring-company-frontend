import {warningToast} from '../components/toast/makeToast';
const checkPasswordsMatch = (password, password2) => {
    if (password !== password2) {
        warningToast('Passwords are not the same!');
        return false
    }
    return true;
}

const checkPassword = (password) => {
    let passwordValidator = require('password-validator');

    // Create a schema
    let schema = new passwordValidator();

    // Add properties to it
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(30)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                // Must have digits
        .has().not().spaces()                           // Should not have spaces
        .has().symbols()																// Must have symbols

    if (!schema.validate(password)) {
        warningToast('Password is improper');
        return false;
    }

    return true;
}

export {
    checkPasswordsMatch,
    checkPassword
};