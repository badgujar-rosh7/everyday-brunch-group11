var validator = require('validator');
var moment = require('moment');
moment().format();

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const validateArgumentsCheckuser = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 2;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};
const validateArgumentsCreateUser = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 8;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Error: All fields need to have valid values.'
        );
    }
};

const validateUsername = (name) => {
    name = name.trim();
    isArgumentString(name, 'username');
    isStringEmpty(name, 'username');
    checkspace(name);
    let checkvaliduser = /[A-Za-z0-9]{4,}/g;
    if (!checkvaliduser.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Username or Password provided'
        );
    }
    return name.trim();
};

const validatePassword = (pass) => {
    pass = pass.trim();
    isArgumentString(pass, 'pass');
    isStringEmpty(pass, 'pass');
    checkspace(pass);
    let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;
    if (!checkvalidpass.test(pass)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Username or Password provided'
        );
    }
    return pass.trim();
};
const validateFirstname = (name) => {
    name = name.trim();
    isArgumentString(name, 'Firstname');
    isStringEmpty(name, 'Firstname');
    checkspace(name);
    let validnameregex = /[a-zA-Z]/g;
    if (!validnameregex.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid first name. Expected alphabets only'
        );
    }
    return name.trim();
};
const validateLastname = (name) => {
    name = name.trim();
    isArgumentString(name, 'Lastname');
    isStringEmpty(name, 'Lastname');
    checkspace(name);
    let validnameregex = /[a-zA-Z]/g;
    if (!validnameregex.test(name)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid last name. Expected alphabets only'
        );
    }
    return name.trim();
};
const validateEmail = (email) => {
    email = email.trim();
    isArgumentString(email, 'Email');
    isStringEmpty(email, 'Email');
    if (!validator.isEmail(email)) {
        throwError(ErrorCode.BAD_REQUEST, 'Invalid Email provided');
    }
    return email.trim();
};
const validateDob = (dob) => {
    dob = dob.trim();
    isArgumentString(dob, 'DateofBirth');
    isStringEmpty(dob, 'DateofBirth');
    const date = moment(dob, 'MM-DD-YYYY').isValid();
    if (!date) {
        throwError(
            ErrorCode.BAD_REQUEST,
            'Invalid Date Format in provided variable. Expected in MM/DD/YYYY format'
        );
    }
    // let TODAY = new Date(Date.now());
    // let EIGHTEEN_YEARS_BACK = new Date(
    //     new Date(TODAY).getDate() +
    //         '/' +
    //         new Date(TODAY).getMonth() +
    //         '/' +
    //         (new Date(TODAY).getFullYear() - 18)
    // );
    // let USER_INPUT = new Date(dob);
    // // Validate Now
    // let result = EIGHTEEN_YEARS_BACK > USER_INPUT; // true if over 18, false if less than 18

    return dob.trim();
};
const validateCity = (city) => {
    city = city.trim();
    isArgumentString(city, 'City');
    isStringEmpty(city, 'City');
    let regex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if (!regex.test(city)) {
        throwError(ErrorCode.BAD_REQUEST, 'Invalid City format provided');
    }
    return city.trim();
};
const validateState = (state) => {
    state = state.trim();
    isArgumentString(state, 'state');
    isStringEmpty(state, 'state');
    let regex = /(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/mu;
    if (!regex.test(state)) {
        throwError(ErrorCode.BAD_REQUEST, 'Invalid State format provided');
    }
    return state.trim();
};

const isArgumentString = (str, variableName) => {
    if (typeof str !== 'string') {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed for ${
                variableName || 'provided variable'
            }. Expected string.`
        );
    }
};
const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || 'provided variable'
            }.`
        );
    }
};
const checkspace = (string, variableName) => {
    let checkspace = /(\s)/g;
    if (checkspace.test(string))
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed, spaces not allowed `
        );
};
const validateObjectId = (id) => {
    //should match 24 length Hex string
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;

    if (!ObjectId.isValid(id) || !objectIdRegex.test(id)) {
        throwError(ErrorCode.BAD_REQUEST, 'Error: id is not a valid ObjectId.');
    }

    return ObjectId(id);
};
const throwError = (code = 404, message = 'Not found') => {
    throw { code, message };
};
const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        'Error: Internal server error.'
    );
};

module.exports = {
    validateArgumentsCheckuser,
    validateArgumentsCreateUser,
    isArgumentString,
    isStringEmpty,
    validateObjectId,
    throwCatchError,
    throwError,
    validateUsername,
    checkspace,
    validatePassword,
    validateFirstname,
    validateLastname,
    validateEmail,
    validateDob,
    validateCity,
    validateState,
};