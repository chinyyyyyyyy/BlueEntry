
function changeto(num) {
    var pbar = document.getElementsByClassName("pbar");
    switch (num) {
        case 1:
            pbar[0].style.marginLeft = "0" ;
            break;
        case 2:
            pbar[0].style.marginLeft= "14.28%";
            break;
        case 3:
            pbar[0].style.marginLeft = "28.56%";
            break;
            case 4:
            pbar[0].style.marginLeft = "42.84%";
            break;
            case 5:
            pbar[0].style.marginLeft = "57.12%";
            break;
            case 6:
            pbar[0].style.marginLeft = "71.4%";
            break;
            case 7:
            pbar[0].style.marginLeft = "85.68%";
            break;
    }
};