document.addEventListener('DOMContentLoaded', function() {
    initialize();
});

function initialize(){
    const hamburgerButton = document.querySelector("button.hamburger");
    console.log(hamburgerButton);
    hamburgerButton.addEventListener('click', ev => {
        const menu = document.querySelector(".slidemenu");
        console.log(getComputedStyle(menu).opacity);
        if(getComputedStyle(menu).opacity == 0){
            menu.classList.add("fade-in-rtl");
            menu.classList.remove("fade-in-ltr");
        }
        else{
            menu.classList.add("fade-in-ltr");
            menu.classList.remove("fade-in-rtl");
        }
    });
}