
const route = (event) => {
    event = event || window.event;
    console.log(event)
    event.preventDefault();
    console.log(window.history)
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    "/": "/App.html",
    "/index.html": "/App.html",
    "/search": "/Search.html",
    "/library": "/library.html",
}

const handleLocation = async () => {
    let path = window.location.pathname;
    const route = routes[path];
    console.log(path)
    let className = "main_content";

    // To handle edge case when user direactly redirect to root directory
    if(route === "/App.html"){
        const html = await fetch(route).then((data) => data.text());
        document.getElementById('root').innerHTML = html;
        return;
    }else if(route === "/Search.html"){
        const html = await fetch(route).then((data) => data.text());
        document.getElementById("left_section").innerHTML = html;
        return;
    }

    // To Display updated content into main_content box
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("dynamic_content").innerHTML = html;
    console.log(html)
};

window.onpopstate = handleLocation;
// window.route = route;    why we are writing this?


handleLocation(); 





