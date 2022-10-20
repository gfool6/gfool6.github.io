const indexViewPath = "/pages/indexContent.html";
const pictureViewPath = "/pages/picture.html";
const modelViewPath = "/pages/3dmodel.html";
const softwareViewPath = "/pages/software.html";
const socialViewPath = "/pages/social.html";
const blogViewPath = "/pages/blog.html";


document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initTransition();
    initContent(indexViewPath);
});

function initContent(loadingFile){
    const contentArea = document.querySelector("#content-area");
    fetch(loadingFile, {
        referrerPolicy: "origin",
        mode: "cors",
    })
    .then(response => response.text())
    .then(t => {
        contentArea.innerHTML = t;
    });
}   

function initTransition(){
    document.querySelector("#transition-picture").addEventListener('click', ev => {
        initContent(pictureViewPath);
    });
    document.querySelector("#transition-3d").addEventListener('click', ev => {
        initContent(modelViewPath);
    });
    document.querySelector("#transition-software").addEventListener('click', ev => {
        initContent(softwareViewPath);
    });
    document.querySelector("#transition-social").addEventListener('click', ev => {
        initContent(socialViewPath);
    });
    document.querySelector("#transition-blog").addEventListener('click', ev => {
        initContent(blogViewPath);
    });
    document.querySelector("header>row>h1").addEventListener('click', ev => {
        initContent(indexViewPath);
    });;
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