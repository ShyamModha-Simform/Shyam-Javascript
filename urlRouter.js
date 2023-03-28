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
    file: "/404.html",
    title: "Error | Spotify",
  },
  "/": {
    file: "/App.html",
    title: "Home | Spotify",
  },
  "/index.html": {
    file: "/App.html",
    title: "Home | Spotify",
  },
  "/search": {
    file: "Components/Search.html",
    title: "Search | Spotify",
  },
  "/library": {
    file: "/Library.html",
    title: "Library | Spotify",
  },
};

// Global container for toggle functionality
let attachedOpen = false;
let isSearchbarActivated = false;

// Whenever location change happers this will help to serve precise HTML data
const handleLocation = async () => {
  let path = window.location.pathname;
  const route = routes[path].file || routes["/404"].file;
  const title = routes[path].title || routes["/404"].title;

  waitForElm(".row_cards").then((slider) => {
    console.log("Element is ready");
    scrollByDragging(slider, "grabbing");
  });


  // To handle edge case when user direactly redirect to root directory
  if (route === "/App.html") {
    addInnerHtml(route, "root", title);
    addInnerHtml("/Library.html", "dynamic_content", title);

    waitForElm("#hamburger_menu").then((hamburger)=>{
      console.log("Hamburger is ready..")
      hamburger.addEventListener("click", (event) => {
        console.log(event.target)
        let navBarWrapper = document.querySelector('.nav_bar_wrapper');
        attachedOpen = !attachedOpen;
        if(attachedOpen === true){

          hamburger.classList.add("open");
          navBarWrapper.classList.add("side_menu");
        }
        else {
          hamburger.classList.remove("open");
          navBarWrapper.classList.remove("side_menu");
          

        }
      });
    })
    return;
  } else if (route === "Components/Search.html") {
    addInnerHtml(route, "left_section", title);

    // To toggle search bar
    isSearchbarActivated = !isSearchbarActivated;
    let userLogo = document.querySelector(".right_section");
    if(isSearchbarActivated){
      userLogo.style.display = "none";
    }else {
      userLogo.style.display = "flex";
    }

    return;
  } else if (route === "/Library.html") {
    addInnerHtml(route, "dynamic_content", title);

    return;
  }
};

// ------------Helper Functions -----------------------------------------------------

// Adding retrived data to HTML document
const addInnerHtml = async (routePath, id, title) => {
  const html = await fetch(routePath).then((data) => data.text());
  document.getElementById(id).innerHTML = html;
  document.title = title;
  console.log(html);
};

// Horizontal dragging by scrolling
const scrollByDragging = (attacherElement, toggleClassName) => {
  let isDown = false;
  console.log(attacherElement);
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
// And if not attached then wait until it gets attach 
// Used Mutation Observer

function waitForElm(selector) {
  return new Promise((resolve) => {

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
