document.addEventListener('DOMContentLoaded', function() {
    initialize();
});

function initialize(){
    const hamburgerButton = document.querySelector("button.hamburger");
    
    hamburgerButton.addEventListener('click', ev => {
        const menu = document.querySelector(".slidemenu");
        ev.preventDefault();
        if(hamburgerButton.classList.contains("onshow")){
            
            menu.classList.remove("state-hidden");
            requestAnimationFrame(function () {
                menu.classList.add("state-show");
            });

            hamburgerButton.classList.remove("onshow");
            requestAnimationFrame(function () {
                hamburgerButton.classList.add("onclose");
            });
        }
        else{
            menu.classList.remove("state-show");
            requestAnimationFrame(function () {
                menu.classList.add("state-hidden");
            });

            hamburgerButton.classList.remove("onclose");
            requestAnimationFrame(function () {
                hamburgerButton.classList.add("onshow");
            });
            
        }
    });
}