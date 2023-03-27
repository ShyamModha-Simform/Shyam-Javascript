
// Route Function for Updating window.history------------
const route = (event) => {
  event = event || window.event;
  console.log(event);
  event.preventDefault();
  console.log(window.history);
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

// Routes Mapping-----------------
const routes = {
    "/404": {
        "file": "/404.html",
        "title": "Error | Spotify",
    },
  "/": {
    "file": "/App.html",
    "title": "Home | Spotify",
  },
  "/index.html": {
    "file": "/App.html",
    "title": "Home | Spotify"
}
    ,
  "/search": {
    "file": "/Search.html",
    "title": "Search | Spotify"
},
  "/library":  {
    "file": "/Library.html",
    "title": "Library | Spotify"
},
};

const handleLocation = async () => {
  let path = window.location.pathname;
  const route = routes[path].file || routes["/404"].file;
  const title = routes[path].title || routes["/404"].title;

  waitForElm(".row_cards").then((slider) => {
    console.log("Element is ready");
    // console.log(slider);
      
    // This is logic for scroll horizontally by dragging
    scrollByDragging(slider, "grabbing");
  });
  // To handle edge case when user direactly redirect to root directory
  if (route === "/App.html") {
    addInnerHtml(route, "root",title);
    addInnerHtml("/Library.html", "dynamic_content", title);
    return;
  } else if (route === "/Search.html") {
    addInnerHtml(route, "left_section", title);
    return;
  } else if (route === "/Library.html") {
    addInnerHtml(route, "dynamic_content", title);
    
    
    return;
  }
};

// ------------Helper Function -----------------------------------------------------

const addInnerHtml = async (routePath, id, title) => {
  const html = await fetch(routePath).then((data) => data.text());
  document.getElementById(id).innerHTML = html;
  document.title = title;
  console.log(html)
};

const scrollByDragging = (attacherElement, toggleClassName) => {
  let isDown = false;
  console.log(attacherElement)
  let startX;
  let scrollLeft;

  attacherElement.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - attacherElement.offsetLeft;
    scrollLeft = attacherElement.scrollLeft;
    attacherElement.classList.add(toggleClassName);
    console.log("mousedown");
  });

  attacherElement.addEventListener("mouseleave", () => {
    isDown = false;
    attacherElement.classList.remove(toggleClassName);
    console.log("mouseleave");
  });

  attacherElement.addEventListener("mouseup", () => {
    isDown = false;
    attacherElement.classList.remove(toggleClassName);
    console.log("mouseup");
  });

  attacherElement.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - attacherElement.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    attacherElement.scrollLeft = scrollLeft - walk;
    console.log("mousemove");
  });
};

// Function to find whether element is attached or not
function waitForElm(selector) {
  return new Promise((resolve) => {

    // ------------------- If this below code exists then it will create loop hole,
    //  --------------------which not allow us to double click same navigation link twice------------------------
    // if (document.querySelector(selector)) {
    //   console.log("Already Exists...");
    //   return resolve(document.querySelector(selector));
    // }

    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      if (document.querySelector(selector)) {
        console.log("Inside observer");
        observer.disconnect();
        return resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}


window.onpopstate = handleLocation;
// window.route = route;    why we are writing this?
handleLocation();
