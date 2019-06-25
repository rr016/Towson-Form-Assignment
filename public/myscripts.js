// Rafal Ryczek

function validation() {
    let check1 = checkField('firstName');
    let check2 = checkField('lastName');
    let check3 = checkField('email');
    let check4 = checkField('phone');
    let check5 = checkField('campus');

    if (check1 && check2 && check3 && check4 && check5) {
        return true;
    } else {
        return false;
    }
}

function checkField(name) {
    if (document.getElementById(name).value === '') {
        document.getElementById('require-' + name).innerHTML = 'This field is required.';
        return false;
    } else {
        document.getElementById('require-' + name).innerHTML = '';
        return true;
    }
}