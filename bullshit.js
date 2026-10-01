const images = [

    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=90"

];


const cards =
    document.querySelectorAll(".stack-card");

const cardImages =
    document.querySelectorAll(".stack-card img");

const pctNum =
    document.getElementById("pctNum");

const pct =
    document.querySelector(".pct");

const preloader =
    document.getElementById("preloader");

const heroImage =
    document.getElementById("heroImage");

const heroOverlay =
    document.getElementById("heroOverlay");

const heroContent =
    document.getElementById("heroContent");

const sideContent =
    document.getElementById("sideContent");

const navbar = document.querySelector(".navbar");




let loaded = 0;




/* LOAD ALL STACK IMAGES */
let displayedProgress = 0;
let stackedCards = 0;

images.forEach((src, index) => {

    const loader = new Image();

    loader.onload = () => {
        loaded++;
        updateProgress();
    };

    loader.onerror = () => {
        loaded++;
        updateProgress();
    };

    loader.src = src;

    cardImages[index].src = src;

});


let progressStarted = false;

function updateProgress() {

    if (loaded !== images.length || progressStarted) return;

    progressStarted = true;

    let progress = 0;

    const interval = setInterval(() => {

        progress++;

        pctNum.textContent = progress;

        // Add cards one by one
        const cardIndex = Math.floor(
            (progress / 100) * cards.length
        );

        if (cardIndex > 0) {

            for (let i = 0; i < cardIndex; i++) {

                cards[i].style.opacity = "1";

                cards[i].style.transform =
                    `translate(${cards[i].style.getPropertyValue("--x")}, 
                    ${cards[i].style.getPropertyValue("--y")}) 
                    rotate(${cards[i].style.getPropertyValue("--r")})`;
            }
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(startReveal, 500);

        }

    }, 20);
}

function startReveal() {

    /*
      REMOVE TOP CARDS ONE BY ONE
    */

    cards.forEach((card, index) => {

        if (index < cards.length - 1) {

            setTimeout(() => {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(-40px) rotate(0deg)";

            }, index * 120);

        }

    });


    /*
      SHOW FINAL IMAGE
    */

    const finalImage =
        images[images.length - 1];

    setTimeout(() => {

        heroImage.src = finalImage;

        heroImage.classList.add("visible");

    }, 650);


    /*
      REMOVE PRELOADER
    */

    setTimeout(() => {

        preloader.classList.add("hidden");

        pct.classList.add("hidden");

    }, 900);


    /*
      SHOW WEBSITE CONTENT
    */

    setTimeout(() => {

        heroOverlay.classList.add("visible");
        heroContent.classList.add("visible");
        sideContent.classList.add("visible");
        navbar.classList.add("visible");

    }, 1200);

}

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


const contactArea = document.querySelector(".contact-area");
const contactCircle = document.querySelector(".contact-circle");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {

    const rect = contactArea.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    /* GRAVITY STRENGTH */

    mouseX = distanceX * 0.18;
    mouseY = distanceY * 0.18;

    /* KEEP INSIDE INVISIBLE SQUARE */

    mouseX = Math.max(-70, Math.min(70, mouseX));
    mouseY = Math.max(-70, Math.min(70, mouseY));

});


function animateCircle() {

    /* SMOOTH MAGNETIC MOVEMENT */

    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;

    contactCircle.style.transform = `
        translate(
            calc(-50% + ${currentX}px),
            calc(-50% + ${currentY}px)
        )
    `;

    requestAnimationFrame(animateCircle);
}

animateCircle();