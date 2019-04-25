
function changeto(num) {
    var pbar = document.getElementsByClassName("pbar");
    switch (num) {
        case 1:
            pbar[0].style.marginLeft = "0" ;
            break;
        case 2:
            pbar[0].style.marginLeft= "7vw";
            break;
        case 3:
            pbar[0].style.marginLeft = "14vw";
            break;
            case 4:
            pbar[0].style.marginLeft = "21vw";
            break;
            case 5:
            pbar[0].style.marginLeft = "28vw";
            break;
            case 6:
            pbar[0].style.marginLeft = "35vw";
            break;
            case 7:
            pbar[0].style.marginLeft = "42vw";
            break;
    }
};