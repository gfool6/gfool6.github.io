const indexViewPath = "/pages/indexContent.html";
const pictureViewPath = "/pages/picture.html";
const modelViewPath = "/pages/3dmodel.html";
const softwareViewPath = "/pages/software.html";
const socialViewPath = "/pages/social.html";
const blogViewPath = "/pages/blog.html";

var viewStack = [];

document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initTransition();
    transition(indexViewPath, null);
});

window.addEventListener('popstate', (e) => {
    pop();
});

window.onload = async () => {
    await markdown.ready;
}

function pop(){
    if(viewStack.length === 1) return;
    viewStack.pop();
    var stackParam = viewStack[viewStack.length-1];
    transition(stackParam);
}

function initCardContent(){
    fetchAsJson("/static/resources/json/indexcard.json")
        .then(j => {
            j.cards.forEach((jElem, ind)=> {
                var card = document.querySelectorAll(".card")[ind];
                card.querySelector(".title").innerHTML = jElem.title;
                card.querySelector(".detail").innerHTML = jElem.detail;
                card.querySelector("img").setAttribute("src", jElem.image);
                jElem.tags.forEach(tag => {
                    card.querySelector(".optional>.tags").innerHTML += `<li class="tag-${tag}">${tag}</li>`;
                });
                card.onclick = () => {
                    transition(blogViewPath, jElem.link);
                };
            });
        });
}

function loadingRecentArticle(){
    fetchAsJson("/static/resources/json/information.json")
        .then(j => {
            setArticle(j.recent);
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
    fetchAsText(`/articles/${loadingArticlePath.slice(0,6)}/${loadingArticlePath}.md`)
    .then(t => {
        var parsedMarkdown = markdown.parse(t);
        articleArea.innerHTML = parsedMarkdown;
        articleArea.querySelectorAll("a").forEach(elem => {
            elem.setAttribute("target", "_blank")
        });
    });   
}

function transition(param, query){
    
    if(param == "") 
        return;
    
    console.log(param instanceof Object);
    if(param instanceof Object) {
        console.log("transition pop");
        initContent(param["view"], param["query"]);
        return;
    }

    initContent(
        param, 
        query, 
        () => {
            console.log("transition push");
            viewStack.push({"view":param, "query":query});
            if(viewStack.length > 0)
                history.pushState(null, null, window.location);
        }
    );
}

function initContent(loadingFile, query, callback = () => {}){
    const contentArea = document.getElementById("content-area");
    fetchAsText(loadingFile)
    .then(t => {
        contentArea.innerHTML = t;
        if(loadingFile.includes("blog") && (query ?? false)){
            setArticle(query.split("=")[1])
        }
        if(loadingFile.includes("index")){
            initCardContent();
        }

        window.scroll({top: 0});

        callback();
    });
}

function initTransition(){
    document.querySelector("#transition-picture").addEventListener('click', ev => {
        transition(pictureViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-3d").addEventListener('click', ev => {
        transition(modelViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-software").addEventListener('click', ev => {
        transition(softwareViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-social").addEventListener('click', ev => {
        transition(socialViewPath);
        menuCloseIfShown();
    });
    document.querySelector("#transition-blog").addEventListener('click', ev => {
        transition(blogViewPath);
        loadingRecentArticle();
        menuCloseIfShown();
    });
    document.querySelector("header>row>h1").addEventListener('click', ev => {
        transition(indexViewPath);
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