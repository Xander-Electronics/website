const sections = document.querySelectorAll(".section-container");
const navbuttonContainer = document.querySelector(".navbutton-container");
const navButtons = document.querySelectorAll(".nav-button");
const hero = document.querySelector(".hero");
const heroLogo = document.querySelector(".hero-logo");
const aboutSection = document.querySelector("#about");
const socialIcons = document.querySelector(".social-icons");
const productsDiscoverMoreButton = document.querySelector(".products-discover-more-button");
const productsButtons = document.querySelectorAll(".products-button-list-button");
const productsButtonSublist = document.querySelector(".products-hidden-button-sublist");
const productsButtonSublistButtons = document.querySelectorAll(".products-button-sublist-button");
const productCards = document.querySelectorAll(".products-card");
const navbar = document.querySelector(".navbar");
const navLanguageSelection = document.querySelector(".nav-language-selection");
const navbarButton = document.querySelector(".navbar-button");
const navbarContent = document.querySelector(".navbar-content");
const cursor = document.querySelector(".cursor");
const allLinks = document.querySelectorAll("a");
const preloader = document.querySelector(".preloader");
const preloaderContainerText = document.querySelector(".preloader-container-text");
let navbarOpen = false;

const textLight = "#dddddd";
const textDark = "#19180a";
const backgroundColorDarker = "#393d3fff";

const preloaderText = "Loading";
let preloaderCounter = "";
let preloaderProgress = 0;
let preloaderInterval = setInterval(setPreloaderContainerText, 500);
let preloaderProgressInterval = setInterval(setPreloaderBackgroundColor, 5);
let progress = 0;

function setPreloaderContainerText() {
  if(preloaderCounter == "...") {
    preloaderCounter = "";
  } else {
    preloaderCounter += ".";
  }

  preloaderContainerText.innerHTML = preloaderText.concat(preloaderCounter, " ", progress, "%");

}

function setPreloaderBackgroundColor() {
  preloaderInterval += 1;
  const computedStyle = getComputedStyle(preloader);
  progress = parseFloat(computedStyle.getPropertyValue("--progress-bar-loading-percentage"));
  // console.log(progress);
  if(progress < 100) {
    preloader.style.setProperty("--progress-bar-loading-percentage", progress + 1);
  } else {
    clearInterval(preloaderProgressInterval);
    preloader.style.opacity = "0";
  }
}



window.addEventListener("mousemove", function(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  // console.log(cursor);
});

function setLinkCursorAnimation(){
  cursor.classList.add("cursor-animation");
  
  cursor.onanimationend = () => {
    cursor.classList.remove("cursor-animation");
  };
}

allLinks.forEach((link) => {
  link.addEventListener("click", setLinkCursorAnimation);
  
  link.addEventListener("mouseover", function(){
    cursor.style.transform = "scale(10)";
  });

  link.addEventListener("mouseout", function(){
    cursor.style.transform = "scale(1)";
  });

});

productsButtons.forEach((button) => {
  button.removeEventListener("click", setLinkCursorAnimation);
});

productsButtonSublistButtons.forEach((button) => {
  button.removeEventListener("click", setLinkCursorAnimation);
});

navbarButton.addEventListener("mouseover", function(){
  cursor.style.transform = "scale(10)";
});

navbarButton.addEventListener("mouseout", function(){
  cursor.style.transform = "scale(1)";
});

socialIcons.addEventListener("mouseover", function(){
  cursor.style.transform = "scale(10)";
});

socialIcons.addEventListener("mouseout", function(){
  cursor.style.transform = "scale(1)";
});

navbarButton.addEventListener("click", function () {
  if(navbarOpen == false) {
    navbarButton.classList.add("navbar-button-open"); 
    navbarContent.style.display = "initial";
    navbarContent.style.opacity = "1";
    navbarOpen = true;
    console.log("open");
  } else {
    navbarButton.classList.remove("navbar-button-open"); 
    navbarContent.style.opacity = "0";
    navbarContent.style.display = "none";
    navbarOpen = false;
    console.log("close");
  };
});

function displayHideProductCards(tag) {
  productCards.forEach(product => {
    if(product.dataset.producttag == tag) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  })
}

function displayHideEffectsProductCards(effectsTag) {
  console.log(effectsTag);
  productCards.forEach(product => {
    if(product.dataset.producttag == "effects" && product.dataset.effecttag == effectsTag) {
        product.style.display = "flex";
      } else {
      product.style.display = "none";
    }
  })
}

function showSublistButtons() {
  productsButtonSublist.style.display = "flex";
}

function hideSublistButtons() {
  productsButtonSublist.style.display = "none";
}

productsButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (button.dataset.buttonid == "effects") {
      for(let i = 0; i < productsButtonSublistButtons.length; i++) {
      
        if(productsButtonSublistButtons[i] == button) {
          productsButtonSublistButtons[i].style.backgroundColor = backgroundColorDarker;
        } else {
          productsButtonSublistButtons[i].style.backgroundColor = "transparent";
        }
      }  
      showSublistButtons();
    } else {
      hideSublistButtons();
    }

    for(let i = 0; i < productsButtons.length; i++) {
      
      if(productsButtons[i] == button) {
        productsButtons[i].style.backgroundColor = backgroundColorDarker;
      } else {
        productsButtons[i].style.backgroundColor = "transparent";
      }
    }
    displayHideProductCards(button.dataset.buttonid);
  });
});

productsButtonSublistButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    for(let i = 0; i < productsButtonSublistButtons.length; i++) {

      if(productsButtonSublistButtons[i] == button) {
        productsButtonSublistButtons[i].style.backgroundColor = backgroundColorDarker;
      } else {
        productsButtonSublistButtons[i].style.backgroundColor = "transparent";
      }
    }

    displayHideEffectsProductCards(button.dataset.buttonid);
  });
});

productsDiscoverMoreButton.addEventListener("click", function (e) {
  e.preventDefault();
  const productsNameSection = document.querySelector("#products .section-name");
  const productsContainerSection = document.querySelector(
    "#products .section-content"
  );

  productsContainerSection.style.transform = "translateX(-100vw)";
  productsNameSection.style.transform = "translateX(100vw)";

  productsContainerSection.onanimationend = () => {
    productsContainerSection.style.display = none;
    productsNameSection.style.display = none;
  };
});

let activeSection;

/* function setStyle(link, button, sectionId) {
  if (sectionId == "about") {
    //link.style.borderBottomColor = brighter;
    button.style.backgroundColor = textLight;
    button.style.borderColor = textLight;
    //navbar.style.color = brighter;
  } else if (sectionId == "services") {
    //link.style.borderBottomColor = bright;
    button.style.backgroundColor = textLight;
    button.style.borderColor = textLight;
    //navbar.style.color = bright;
  } else if (sectionId == "products") {
    button.style.backgroundColor = textLight;
    button.style.borderColor = textLight;
  } else if (sectionId == "testimonials") {
    button.style.backgroundColor = textLight;
    button.style.borderColor = textLight;
  } else if (sectionId == "contact-us") {
    button.style.backgroundColor = textLight;
    button.style.borderColor = textLight;
  }
}
 */
const sectionObserverCallback = (sections, sectionObserver) => {
  let navLink, navButton;

  sections.forEach((section) => {
    if (section.isIntersecting) {
      /* navLinks.forEach((link) => {
        if (link.dataset.navid == section.target.id) {
          navLink = link;
        }
        link.style.borderBottomColor = "transparent";
      }); */
      


      navButtons.forEach((button) => {
        if (button.dataset.navid == section.target.id) {
          // navButton = button;
          button.style.backgroundColor = textLight;
          button.style.borderColor = textLight;
        } else {
          button.style.backgroundColor = "transparent";
        }
      });

      // navLink = null;

      // console.log(section.target.id);

      // setStyle(navLink, navButton, section.target.id);
      // section.target.style.opacity = "1";
      activeSection = section.target;
      
    } else {
      // section.target.style.opacity = "0";
    }
  });
};

const sectionObserverOptions = {
  threshold: 0.5,
};

const sectionObserver = new IntersectionObserver(
  sectionObserverCallback,
  sectionObserverOptions
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

function moveToPreviousSection() {
  previousSection = activeSection.previousElementSibling;
  if (previousSection != null) {
    previousSection.scrollIntoView();
  }
}

function moveToNextSection() {
  nextSection = activeSection.nextElementSibling;
  if (nextSection != null) {
    nextSection.scrollIntoView();
  }
}

window.addEventListener("keydown", (key) => {
  if (key.key == "ArrowLeft") {
    moveToPreviousSection();
  } else if (key.key == "ArrowRight") {
    moveToNextSection();
  }
});

preloader.ontransitionend = () => {
  heroLogo.classList.add("hero-logo-animation");
}

window.onload = function () {
    
  // preloader.style.display = "none";
  // heroLogo.classList.add("hero-logo-animation");
    
  navbar.style.opacity = "0";
  navLanguageSelection.style.opacity = "0";
  navbuttonContainer.style.opacity = "0";
  socialIcons.style.opacity = "0";
  heroLogo.onanimationend = () => {
    aboutSection.scrollIntoView({ behaviour: "smooth" });
    navbar.style.opacity = "1";
    navLanguageSelection.style.opacity = "1";
    navbuttonContainer.style.opacity = "1";
    socialIcons.style.opacity = "1";
    preloader.style.display = "none";
  };
};






/////////PARTICLES/////////

const canvas = document.querySelector(".product-section-hidden-canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth;  //set canvas to size of the screen
canvas.height = innerHeight;

let particles = [];

class Particle {
  constructor(radius, step, position, size) {
    this.radius = radius;
    this.step = step;
    this.position = position;
    this.size = size;
  }

  draw() {
    context.beginPath();
    context.arc(Math.cos(this.position) * this.radius + canvas.width/2, 
                Math.sin(this.position) * this.radius + canvas.height/2, 
                this.size, 0, Math.PI*2);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
  }

  update() {
    this.position += this.step;
    this.draw();
  }

}

function setUpParticles(particlesNumber) {
  particles = [];
  for(let i = 0;  i < particlesNumber; i++) {
    let radius = Math.random() * canvas.width //random number between 0 and canvas.width
    let step = (Math.random() * 0.002) + 0.002;
    let position = Math.random() * (Math.PI*2);
    let size = (Math.random() * 4) + 0.5;

    particles.push(new Particle(radius, step, position, size));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "rgba(0, 0, 0, 0.01)"; //basically instead of cleaning the screen, renders it with a certain opacity, in order to simulate
                                             //particle's trails
  context.fillRect(0, 0, canvas.width, canvas.height);
  for(let i=0; i<particles.length; i++) {
    particles[i].update();
  }
}

setUpParticles(500);
animate();

window.addEventListener("resize", function(){
  canvas.width = innerWidth;  //reset canvas to new size of the screen
  canvas.height = innerHeight;
  setUpParticles(500);
});