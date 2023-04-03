// --------------Global DOM imports-------------
// For Slider
const sliderContainer = document.querySelector('.slider');
const sliderDots = document.querySelector('.slider-dots');
const slides = document.getElementsByClassName("slider-item");
const nextButton = document.getElementById("slider-button-next");
const prevButton = document.getElementById("slider-button-prev");
const dots = document.getElementsByClassName("dot");
let position = 0;
// const numberOfSlides = slides.length;
console.log()

const sliderImageDetails = [
  {
    imageURL: "https://images.unsplash.com/photo-1537211261771-e525b9e4049b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: `slider-item slider-item-visible`,
    radioButtonChecked: "checked",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: "slider-item",
    radioButtonChecked: "",

  },
  {
    imageURL: "https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: "slider-item",
    radioButtonChecked: "",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: "slider-item",
    radioButtonChecked: "",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: "slider-item",
    radioButtonChecked: "",
  },
  {
    imageURL: "https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80",
    placeholder: "Squirrel zombie",
    className: "slider-item",
    radioButtonChecked: "",
  }
];

const sliderItemMarkup = ({imageURL, placeholder, className}) => {
  // console.log(className);
  let div = document.createElement("div");
  div.className = className;
  div.innerHTML =  `<img src=${imageURL} alt=${placeholder}/>`;
  sliderContainer.appendChild(div);
  return ;
};

const sliderDotsMarkup = ({radioButtonChecked}) => {
  console.log(`<input class="dot selected-dot" type="radio" name="dot" ${radioButtonChecked} />`, radioButtonChecked)
  sliderDots.innerHTML += `<input class="dot selected-dot" type="radio" name="dot" ${radioButtonChecked} />`;
  return ;
};

sliderImageDetails.forEach(ele => {
  // console.log(typeof sliderItemMarkup(ele))
  sliderItemMarkup(ele);
  // console.log(sliderContainer, "Container");
  
  sliderDotsMarkup(ele);
  console.log(sliderDots, "Dots");

  // console.log("Adding Slider Images....", ele);
});

// For Scrolling
let mybutton = document.getElementById("myBtn");
const links = document.querySelectorAll(".nav-link");

// -----------------Logic for image slider--------------
function hideAllSlides() {
  // remove all slides not currently being viewed
  for (const slide of slides) {
    slide.classList.remove("slider-item-visible");
    slide.classList.add("slider-item-hidden");
  }
}

const handleMoveToNextSlide = function (e) {
  hideAllSlides();

  // check if last slide has been reached
  if (position === slides.length - 1) {
    position = 0; // go back to first slide
  } else {
    // move to next slide
    position++;
  }
  // make current slide visible
  slides[position].classList.add("slider-item-visible");

  // update dot to represent current slide
  dots[position].classList.add("selected-dot");
  dots[position].checked = true;
};

const handleMoveToPrevSlide = function (e) {
  hideAllSlides();

  // check if we're on the first slide
  if (position === 0) {
    position = slides.length - 1; // move to the last slide
  } else {
    // move back one
    position--;
  }
  // make current slide visible
  slides[position].classList.add("slider-item-visible");

  // update dot to represent current slide
  dots[position].classList.add("selected-dot");
  dots[position].checked = true;
};

// listen for slide change events
nextButton.addEventListener("click", handleMoveToNextSlide);
prevButton.addEventListener("click", handleMoveToPrevSlide);

//------------ When the user scrolls down 300px from the top of the document, ----------
// ---------------show the button, Scroll to top button---

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
}

// ------------ Helper Function to scroll to any particular element------

for (const ele of links) {
  // console.log(ele);
  ele.addEventListener("click", () => {
    scrolldiv(ele.getAttribute("data-custom-value"));
  });
}

function scrolldiv(idValue) {
  let navbarHeight = document.querySelector(".navbar").offsetHeight;
  window.scroll(
    0,
    findPosition(document.getElementById(idValue), navbarHeight)
  );
}

function findPosition(obj, navbarHeight) {
  var currenttop = 0;
  console.log();
  if (obj.id == "home") {
    // To handle scroll to navbar -- HOME
    return 0;
  } else if (obj.offsetParent) {
    do {
      currenttop += obj.offsetTop;
      console.log(currenttop);
      // offsetTop -- distance between outer border of current element to inner border of offsetParent Element

    } while ((obj = obj.offsetParent)); // offsetParent -- returns closest positioned ancestor element

    return [currenttop - navbarHeight];
  }
}

// document.querySelectorAll(".nav-link[data-custom-value]").forEach((element) => {
//   element.addEventListener("click", function (event) {
//     document
//       .getElementById(this.getAttribute("data-custom-value"))
//       .scrollIntoView({ behavior: "smooth", block: "nearest", inline:"nearest" });
//   });
// });
