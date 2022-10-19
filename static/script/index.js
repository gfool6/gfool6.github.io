document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initTransition();
});

function initTransition(){
    document.querySelector("#transition-picture").addEventListener('click', ev => {
        location.href = "/pages/picture.html"
    });
    document.querySelector("#transition-3d").addEventListener('click', ev => {
        location.href = "/pages/3dmodel.html"
    });
    document.querySelector("#transition-software").addEventListener('click', ev => {
        location.href = "/pages/software.html"
    });
    document.querySelector("#transition-social").addEventListener('click', ev => {
        location.href = "/pages/social.html"
    });
    document.querySelector("#transition-blog").addEventListener('click', ev => {
        location.href = "/pages/blog.html"
    });
}

function initHamburger(){
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