function toInput() {
    var ip = document.querySelectorAll('#myInput');
    var tf = document.querySelectorAll('#tf');
    document.getElementById('editbtn').style.display='none';
    document.getElementById('savebtn').style.display='block';
    document.getElementById('cancelbtn').style.display='block';
    for (var i = 0; i < tf.length; i++) {
        if (ip[i].style.display === "none") {
            ip[i].value = tf[i].innerHTML;
            tf[i].style.display = "none";
            ip[i].style.display = "block";
        }
    }
}
function toSubmit() {
    var ip = document.querySelectorAll('#myInput');
    var tf = document.querySelectorAll('#tf');
    for (var i = 0; i < tf.length; i++) {
        if (ip[i].style.display != "none") {
            tf[i].innerHTML = ip[i].value;
            tf[i].style.display = "block";
            ip[i].style.display = "none";
        }
    }
    document.getElementById('editbtn').style.display='block';
    document.getElementById('cancelbtn').style.display='none';
    document.getElementById('savebtn').style.display='none';
}
function toCancel() {
    var ip = document.querySelectorAll('#myInput');
    var tf = document.querySelectorAll('#tf');
    for (var i = 0; i < tf.length; i++) {
        if (ip[i].style.display != "none") {
            tf[i].style.display = "block";
            ip[i].style.display = "none";
        }
    }
    document.getElementById('editbtn').style.display='block';
    document.getElementById('cancelbtn').style.display='none';
    document.getElementById('savebtn').style.display='none';
}