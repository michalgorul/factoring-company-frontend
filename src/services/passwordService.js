import {warningToast} from '../components/toast/makeToast';

const checkPasswordsMatch = (password, password2) => {
    if (password !== password2) {
        warningToast('Passwords are not the same!');
        return false
    }
    return true;
}
const hasCorrectLength = (password, min, max) => {
    return !(password.length < min || password.length > max);
}

const hasUppercase = (password) => {
    const regex = new RegExp('(.*[A-Z].*)');
    return regex.test(password);
}

const hasLowercase = (password) => {
    const regex = new RegExp('(.*[a-z].*)');
    return regex.test(password);
}

const hasDigits = (password) => {
    const regex = new RegExp('(.*\\d.*)');
    return regex.test(password);
}

const hasNotSpaces = (password) => {
    const regex = new RegExp('(.* .*)');
    return !regex.test(password);
}

const hasSymbols = (password) => {
    const regex = new RegExp('(.*\\W.*)');
    return regex.test(password);
}


const checkPassword = (password) => {

    if (hasCorrectLength(password, 8, 30) && hasLowercase(password) && hasUppercase(password) &&
        hasDigits(password) && hasNotSpaces(password) && hasSymbols(password)) {
        return true;
    } else {
        warningToast('Password is improper');
        return false;
    }

}

export {
    checkPasswordsMatch,
    checkPassword
};