
window.onresize = function() {
    const links = document.getElementsByTagName('a');
    if((document.body.clientWidth / document.body.clientHeight) > 1.37){
        links[0].style.top = '35%';
        links[1].style.top = '42.5%';
        links[2].style.top = '50%';
        const left = (document.body.clientWidth - document.body.clientHeight*1.37)/2 + document.body.clientHeight*1.37*0.24;
        links[0].style.left = left;
        links[1].style.left = left;
        links[2].style.left = left;
    } else {
        links[0].style.left = '23%';
        links[1].style.left = '23%';
        links[2].style.left = '23%';
        const imgHeight = document.body.clientWidth/1.37;
        const top = (document.body.clientHeight - imgHeight)/2;
        links[0].style.top = top + imgHeight*0.31;
        links[1].style.top = top + imgHeight*0.39;
        links[2].style.top = top + imgHeight*0.47;
    }
}
window.onresize();