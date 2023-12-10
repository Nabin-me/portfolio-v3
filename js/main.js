// Initiate Lucide icons CDN
lucide.createIcons();

// Variables
const loaderContainer = document.querySelector(".loader-container");
const mainContent = document.getElementById("main-content");
const contentWrapper = document.querySelector(".content-wrapper");
const pageSections = Array.from(document.querySelectorAll(".page-section"));
const navLinks = Array.from(document.querySelectorAll(".nav-links"));
const sectionMapping = {
  skills: "about",
};
const chipsContainer = document.querySelector(".chips-container");
const chips = Array.from(chipsContainer.querySelectorAll(".chip"));
const cardsContainers = Array.from(
  document.querySelectorAll(".cards-container")
);
const submitBtn = document.getElementById("submit-btn");
const dialog = document.querySelector("dialog-container");
const cards = Array.from(document.querySelectorAll(".card"));
let current = "home";
changeCurrent(current);

// Intial Loading Animation
window.addEventListener("load", () => {
  setTimeout(() => {
    loaderContainer.classList.add("invisible");
    contentWrapper.classList.add("visible");
    mainContent.classList.add("visible");
  }, 2900);
});

// Scroll Event Listener that makes icon active in navbar when section is in view

window.addEventListener("scroll", () => {
  pageSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  // check if the current section is in the sectionMapping object
  if (sectionMapping[current]) {
    current = sectionMapping[current];
  }

  // check if the user has scrolled to the bottom of the page
  const isBottomOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (isBottomOfPage) {
    current = "contact";
  }

  changeCurrent(current);
});

// Function to Change Active Class
function changeCurrent(current) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
}

// Function to Scroll to Works Section
function scrollToWorks() {
  const section = document.getElementById("works");
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  }
}

// Function to scale image on hover on cards

cards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    card.classList.add("hover");
  });
  card.addEventListener("mouseout", () => {
    card.classList.remove("hover");
  });
});

// Button Function for Contact Form
submitBtn.addEventListener("click", showDialog);
// Function to Show Dialog
function showDialog(event) {
  // Prevent the form from submitting and refreshing the page before the user can read the alert
  event.preventDefault();
  // Show the dialog box that says "Thank you for your message!"
  const dialog = document.querySelector(".dialog-container");
  const closeBtn = document.getElementById("close-btn");
  dialog.classList.add("visible");
  closeBtn.addEventListener("click", () => {
    dialog.classList.remove("visible");
  });
}

// Event Listener for Form Click
const form = document.querySelector(".contact-form");
form.addEventListener("click", () => {
  const audio = document.getElementById("audio");
  audio.play();
});

// Event Listener for Chips, adds active class to clicked chip and removes active class from other chips
// Also shows the cards container that matches the chip clicked and hides the other cards containers

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const chipText = chip.textContent.toLowerCase();
    const mappedChipText = chipText.replace(/\s+/g, "-");
    cardsContainers.forEach((container) => {
      const containerId = container.getAttribute("id");
      if (containerId === mappedChipText) {
        container.classList.remove("hidden");
        console.log(mappedChipText);
      } else {
        container.classList.add("hidden");
      }
    });
  });
});
