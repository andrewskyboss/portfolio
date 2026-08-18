/*----------- Mobile menu Open Close ----------*/
// Uncomment if using pure vanilla mobile menu toggle
/*
const mainMenuTrigger = document.querySelector(".main-menu-trigger");
const mainMenu = document.querySelector(".main-menu");

if (mainMenuTrigger && mainMenu) {
  mainMenuTrigger.addEventListener("click", () => {
    mainMenuTrigger.classList.toggle("main-menu-visible");
    mainMenu.classList.toggle("visible");
  });

  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainMenuTrigger.classList.remove("main-menu-visible");
      mainMenu.classList.remove("visible");
    });
  });
}
*/

/*----------- Page adding scrolled class ----------*/
$(document).ready(function() {
  function handleScroll() {
    const scrollY = $(window).scrollTop();
    if (scrollY > 0) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  }

  $(window).scroll(handleScroll);
  handleScroll();
});

/*----------- Title & Section Scroll Animations ----------*/
const sectionAnimations = document.querySelectorAll('.section-module');
const accordionAllTriggers = document.querySelectorAll('.work-history-item--trigger');
const skillsItems = document.querySelectorAll('.skills-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('add-animation');
    } else {
      entry.target.classList.remove('add-animation');
    }
  });
});

sectionAnimations.forEach((item) => observer.observe(item));
accordionAllTriggers.forEach((item) => observer.observe(item));
skillsItems.forEach((item) => observer.observe(item));

/*----------- Accordion Open / Close ----------*/
const accordionTriggers = document.querySelectorAll('.work-history-item--trigger');

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', expandAccordion);
});

function expandAccordion(event) {
  const triggerElement = event.currentTarget;
  const isPanelExpanded = triggerElement.getAttribute('aria-expanded');
  
  collapseAllAccordions();
  
  if (isPanelExpanded === "false" || !isPanelExpanded) {
    triggerElement.setAttribute('aria-expanded', "true");
  } else {
    triggerElement.setAttribute('aria-expanded', "false");
  }
}

function collapseAllAccordions() {
  accordionTriggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', "false");
  });
}

/*----------- Scroll to Top ----------*/
const $btn = $('.btt-link');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $btn.addClass('show');
  } else {
    $btn.removeClass('show');
  }
});

$btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 800);
});

/*----------- Hero Image Slider ----------*/
let index = 0;

const show_slide = (step) => {
  const images = document.getElementsByClassName("hero-image-slider-image");
  const dots = document.getElementsByClassName("dot");

  if (images.length === 0) return;

  index += step;

  if (index > images.length - 1) {
    index = 0;
  }
  if (index < 0) {
    index = images.length - 1;
  }

  // Hide all images
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }

  // Remove active class from dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display target slide
  images[index].style.display = "block";
  if (dots[index]) {
    dots[index].className += " active";
  }
};

window.addEventListener("load", () => {
  show_slide(0);
});

/*----------- Dual-Row Scroll Slider Interpolation ----------*/
// document.addEventListener("DOMContentLoaded", () => {
//   const section = document.querySelector(".hotel-scroll-section");
//   const topRow = document.querySelector(".hotel-row-top");
//   const bottomRow = document.querySelector(".hotel-row-bottom");

//   if (!section || !topRow || !bottomRow) return;

//   const supportsScrollTimeline = CSS.supports && CSS.supports("animation-timeline: view()");

//   if (!supportsScrollTimeline) {
//     const updateRowPositions = () => {
//       const rect = section.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
//       const totalScrollableDistance = rect.height - windowHeight;

//       if (totalScrollableDistance <= 0) return;

//       let progress = -rect.top / totalScrollableDistance;
//       progress = Math.max(0, Math.min(1, progress));

//       const topX = 0 - progress * 150;
//       const bottomX = -150 + progress * 150;

//       topRow.style.transform = `translateX(${topX}vw)`;
//       bottomRow.style.transform = `translateX(${bottomX}vw)`;
//     };

//     window.addEventListener("scroll", () => {
//       requestAnimationFrame(updateRowPositions);
//     });

//     window.addEventListener("resize", updateRowPositions);
//     updateRowPositions();
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".hotel-scroll-section");
  const stickyContainer = document.querySelector(".hotel-scroll-sticky");
  const topRow = document.querySelector(".hotel-row-top");
  const bottomRow = document.querySelector(".hotel-row-bottom");

  if (!section || !stickyContainer || !topRow || !bottomRow) return;

  let ticking = false;

  const calculateTransforms = () => {
    const sectionRect = section.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Total distance the section can scroll while pinned
    const maxScrollDistance = sectionRect.height - viewportHeight;

    if (maxScrollDistance <= 0) return;

    // Calculate progress: 0 when top of section meets top of viewport, 1 when section ends
    let progress = -sectionRect.top / maxScrollDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Calculate exact scroll overflow distances in pixels for accurate edge-to-edge sliding
    const topRowOverflow = topRow.scrollWidth - viewportWidth + 32; // 32px padding offset
    const bottomRowOverflow = bottomRow.scrollWidth - viewportWidth + 32;

    // Top row: starts at 0, slides LEFT by the exact overflow amount
    const topX = -progress * Math.max(topRowOverflow, 0);

    // Bottom row: starts offset to the LEFT (-overflow), slides RIGHT to 0
    const bottomX = -Math.max(bottomRowOverflow, 0) + (progress * Math.max(bottomRowOverflow, 0));

    // Apply hardware-accelerated transforms
    topRow.style.transform = `translate3d(${topX}px, 0, 0)`;
    bottomRow.style.transform = `translate3d(${bottomX}px, 0, 0)`;

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(calculateTransforms);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", calculateTransforms, { passive: true });

  // Initial calculation
  calculateTransforms();
});



