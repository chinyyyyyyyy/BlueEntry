
function isCardnumber(evt) {
    var ch = String.fromCharCode(evt.which);
    var ip = document.querySelectorAll('#ip');
    if (!(/[0-9]/.test(ch)) | ip[0].value.length >= 16) {
        evt.preventDefault();
    }
}
function isCvv(evt) {
    var ch = String.fromCharCode(evt.which);
    var ip = document.querySelectorAll('#ip');
    if (!(/[0-9]/.test(ch)) | ip[2].value.length >= 3) {
        evt.preventDefault();
    }
}
function isTel(evt) {
    var ch = String.fromCharCode(evt.which);
    var ip = document.querySelectorAll('#ip');

    if (!(/[0-9]/.test(ch)) | ip[0].value.length >= 10) {
        evt.preventDefault();
    }
    var myinput = document.getElementsByName('tel');
    // if (!(/[0-9]/.test(ch)) | myinput.value.length >= 10) {
    //     evt.preventDefault();
    // }


}
function isNum(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}