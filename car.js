// Dynmaic Data for images
import sliderImageDetails from "./ImageDetails.js";

// --------------Global DOM imports-------------
// For Slider
const sliderContainer = document.querySelector(".slider");
const sliderDots = document.querySelector(".slider-dots");
const slides = document.getElementsByClassName("slider-item");
const nextButton = document.getElementById("slider-button-next");
const prevButton = document.getElementById("slider-button-prev");
const dots = document.getElementsByClassName("dot");
let position = 0;

// For Scrolling
let mybutton = document.getElementById("myBtn");
const links = document.querySelectorAll(".nav-link");

// Dynamic input for Slider's Images



const sliderItemMarkup = ({ imageURL, placeholder, className }) => {
  let div = document.createElement("div");
  div.className = className;
  div.innerHTML = `<img src=${imageURL} alt="${placeholder}" cross-origin="anonymous"/>`;
  sliderContainer.appendChild(div);
  return;
};

// Dynamic Input for Slider dots or indicators
const sliderDotsMarkup = ({ radioButtonChecked }) => {
  sliderDots.innerHTML += `<input class="dot selected-dot" type="radio" name="dot" ${radioButtonChecked} />`;
  return;
};

// Mapping Details array -- To display Images--------

sliderImageDetails.forEach((ele) => {
  sliderItemMarkup(ele);
  sliderDotsMarkup(ele);
});

// -----------------Logic for image slider----------------------------------
function hideAllSlides() {
  // remove all slides not currently being viewed
  for (const slide of slides) {
    slide.classList.remove("slider-item-visible");
    slide.classList.add("slider-item-hidden");
  }
}

const handleVisibility = (pos) => {
  // make current slide visible
  slides[pos].classList.add("slider-item-visible");

  // update dot to represent current slide
  dots[pos].classList.add("selected-dot");
  dots[pos].checked = true;
};

const handleMoveForRadioButton = function (e) {
  hideAllSlides();
  const selectedRadioButton = document.querySelector(".dot:checked");

  position = Array.from(selectedRadioButton.parentElement.children).indexOf(
    selectedRadioButton
  );
  // Use to make appropriate image visible
  handleVisibility(position);
};

const handleMoveToNextSlide = function (e) {
  hideAllSlides();

  // check if last slide has been reached
  if (position === slides.length - 1) {
    position = 0; // go back to first slide
  } else {
    // move to next slide
    position++;
  }
  // Use to make appropriate image visible
  handleVisibility(position);
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
  // Use to make appropriate image visible
  handleVisibility(position);
};

// listen for slide change events
nextButton.addEventListener("click", handleMoveToNextSlide);
prevButton.addEventListener("click", handleMoveToPrevSlide);
sliderDots.addEventListener("click", handleMoveForRadioButton);

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

document.getElementById("myBtn").addEventListener("click", () => {
  document.body.scrollTop = 0;
})

// ------------ Helper Function for scrolling to any particular element----------

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
