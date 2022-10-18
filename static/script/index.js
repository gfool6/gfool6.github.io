document.addEventListener('DOMContentLoaded', function() {
    initialize();
});

function initialize(){
    const hamburgerButton = document.querySelector("button.hamburger");
    
    hamburgerButton.addEventListener('click', ev => {
        const menu = document.querySelector(".slidemenu");
        ev.preventDefault();
        if(hamburgerButton.classList.contains("onshow")){
            
            menu.classList.remove("fade-in-ltr");
            requestAnimationFrame(function () {
                menu.classList.add("fade-in-rtl");
            });

            hamburgerButton.classList.remove("onshow");
            requestAnimationFrame(function () {
                hamburgerButton.classList.add("onclose");
            });
        }
        else{
            menu.classList.remove("fade-in-rtl");
            requestAnimationFrame(function () {
                menu.classList.add("fade-in-ltr");
            });

            hamburgerButton.classList.remove("onclose");
            requestAnimationFrame(function () {
                hamburgerButton.classList.add("onshow");
            });
            
        }
    });
}