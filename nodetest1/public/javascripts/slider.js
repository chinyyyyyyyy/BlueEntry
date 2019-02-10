function slider(){
    var slider = document.getElementById("slider");
    var val=document.getElementById("value");
    val.innerHTML=slider.value;
    slider.oninput=function(){
        val.innerHTML=this.value;
    }
}