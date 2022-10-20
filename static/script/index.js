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

window.onload = async () => {
    await markdown.ready;
}

function loadingRecentArticle(){
    fetchAsJson("/articles/information.json")
        .then(j => {
            setArticle(`/articles/${j.recent}`);
        });
}

function fetchAsJson(path){
    return fetch(path, {
        referrerPolicy: "origin",
        mode: "cors",
    })
    .then(response => response.json());
}

function fetchAsText(path){
    return fetch(path, {
        referrerPolicy: "origin",
        mode: "cors",
    })
    .then(response => response.text());
}

function setArticle(loadingArticlePath){
    const articleArea = document.querySelector(".article-area");
    fetchAsText(loadingArticlePath)
    .then(t => {
        var parsedMarkdown = markdown.parse(t);
        articleArea.innerHTML = parsedMarkdown;
        articleArea.querySelectorAll("a").forEach(elem => {
            elem.setAttribute("target", "_blank")
        });
    });   
}

function initContent(loadingFile){
    const contentArea = document.getElementById("content-area");
    fetchAsText(loadingFile)
    .then(t => {
        contentArea.innerHTML = t;
    });
}   

function initTransition(){
    document.querySelector("#transition-picture").addEventListener('click', ev => {
        initContent(pictureViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-3d").addEventListener('click', ev => {
        initContent(modelViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-software").addEventListener('click', ev => {
        initContent(softwareViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-social").addEventListener('click', ev => {
        initContent(socialViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-blog").addEventListener('click', ev => {
        initContent(blogViewPath);
        loadingRecentArticle();
        menuCloseIfShown();
    });
    document.querySelector("header>row>h1").addEventListener('click', ev => {
        initContent(indexViewPath);
        menuCloseIfShown();
        if(location.hash != undefined && location.hash){
            location.href = location.href.replace(location.hash, "");
        }
    });
}

function menuCloseIfShown(){
    const hamburgerButton = document.querySelector("button.hamburger");
    if(hamburgerButton.classList.contains("onclose")){
        hamburgerButton.click();
    }
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