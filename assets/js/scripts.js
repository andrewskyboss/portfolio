
/*----------- Mobile menu Open Close ----------*/
// var scrollThreshold = 50;

// const mainMenuTrigger = document.querySelector(".main-menu-trigger");
// const mainMenu = document.querySelector(".main-menu");

// mainMenuTrigger.addEventListener("click", () => {
// 	mainMenuTrigger.classList.toggle("main-menu-visible");
// 	mainMenu.classList.toggle("visible");
// })

// document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", ()=> {
// 	mainMenuTrigger.classList.remove("main-menu-visible");
// 	mainMenu.classList.remove("visible");
// }))

/*----------- Page adding scrolled class ----------*/

// $(window).on('load scroll', function(e) {
//     // Handle scroll
//     if($(document).scrollTop() > scrollThreshold) {
//         $('body').addClass('scrolled');
//     } else {
//         $('body').removeClass('scrolled');
//     }
// });

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

/*Start ------------ Title animation --------------*/
var sectionAnimations = document.querySelectorAll('.section-module');
var accordionAllTriggers = document.querySelectorAll('.work-history-item--trigger');
var skillsItems = document.querySelectorAll('.skills-item');

observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.intersectionRatio > 0) {
			entry.target.classList.add('add-animation');
		} else {
			entry.target.classList.remove('add-animation');
		}
	});
});

sectionAnimations.forEach(sectionAnimation => {
	observer.observe(sectionAnimation);
});
accordionAllTriggers.forEach(accordionAllTrigger => {
    observer.observe(accordionAllTrigger);
});
skillsItems.forEach(skillsItem => {
    observer.observe(skillsItem);
});

/*----------- Accordion Open Close ----------*/


const accordionTriggers = document.querySelectorAll('.work-history-item--trigger');

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', expandAccordion);
});

function expandAccordion(event) {
    const { target: targetElement } = event;
    const isPanelExpanded = targetElement.getAttribute('aria-expanded');
    
    collapseAllAccordions();
    
    if (isPanelExpanded === "false") {
        targetElement.setAttribute('aria-expanded', true);
    } else {
        targetElement.setAttribute('aria-expanded', false);
    }
}

function collapseAllAccordions() {
    accordionTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', false);
    });
}

/*----------- Scroll to top ----------*/
var btn = $('.btt-link');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
} else {
    btn.removeClass('show');
}
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '800');
});

/*----------- Hero image slider ----------*/
var index = 0;

show_slide = (i) => {
  //increment/decrement slide index
  index += i;

  //grab all the images
  var images = document.getElementsByClassName("hero-image-slider-image");
  //grab all the dots
  var dots = document.getElementsByClassName("dot");

  // hide all the images
  for (i = 0; i < images.length; i++) 
    images[i].style.display = "none";

  // remove the active class from the dot
for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
}

  // if index is greater than the amount of images (set it to zero)
if (index > images.length - 1) {
    index = 0 ;
}

  // if index is less than zero (set it to the length of images)
if (index < 0) {
    index = images.length - 1;
}

  // only display the image that's next or previous
images[index].style.display = "block";
  // only make the current dot active
dots[index].className += " active";

}

window.addEventListener("onload", show_slide(index));

// window.onload = function() {

// 	document.getElementById('confirmation-title').textContent = '';

// 	document.getElementById('contact-us-form').addEventListener('submit', function(event) {
// 	event.preventDefault();

// 		emailjs.sendForm('service_u9b5bpg', 'emplate_4bc1e0j', this)
// 		.then(function() {
// 			console.log('SUCCESS!');
// 			$('.form-input').val('');
// 			document.getElementById('confirmation-title').textContent = 'Thank You. I will be in touch with you';

// 		}, function(error) {
// 			console.log('FAILED...', error);
// 			document.getElementById('confirmation-title').textContent = 'Sorry, something went wrong. Try Later.';
// 		});
// 	});
// };


// document.addEventListener("DOMContentLoaded", () => {
//   const section = document.querySelector(".hotel-scroll-section");
//   const topRow = document.querySelector(".hotel-row-top");
//   const bottomRow = document.querySelector(".hotel-row-bottom");

//   if (!section || !topRow || !bottomRow) return;

//   let ticking = false;

//   const animateOnScroll = () => {
//     const rect = section.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     const windowWidth = window.innerWidth;

//     // Total vertical distance over which the section is visible in the viewport
//     const totalVisibleDistance = rect.height + windowHeight;

//     if (totalVisibleDistance <= 0) return;

//     // Calculate progress (0 when top enters bottom of viewport -> 1 when bottom leaves top)
//     let progress = (windowHeight - rect.top) / totalVisibleDistance;
//     progress = Math.max(0, Math.min(1, progress));

//     // TOP ROW: Start at +viewportWidth (off right), end at -topRow.scrollWidth (off left)
//     const topStart = windowWidth;
//     const topEnd = -topRow.scrollWidth;
//     const topX = topStart + progress * (topEnd - topStart);

//     // BOTTOM ROW: Start at -bottomRow.scrollWidth (off left), end at +viewportWidth (off right)
//     const bottomStart = -bottomRow.scrollWidth;
//     const bottomEnd = windowWidth;
//     const bottomX = bottomStart + progress * (bottomEnd - bottomStart);

//     // Hardware-accelerated 3D translations
//     topRow.style.transform = `translate3d(${topX}px, 0, 0)`;
//     bottomRow.style.transform = `translate3d(${bottomX}px, 0, 0)`;

//     ticking = false;
//   };

//   const onScroll = () => {
//     if (!ticking) {
//       requestAnimationFrame(animateOnScroll);
//       ticking = true;
//     }
//   };

//   window.addEventListener("scroll", onScroll, { passive: true });
//   window.addEventListener("resize", animateOnScroll, { passive: true });

//   // Initial calculation on page load
//   animateOnScroll();
// });

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".hotel-scroll-section");
  const wrapper = document.querySelector(".hotel-scroll-wrapper");
  const topRow = document.querySelector(".hotel-row-top");
  const bottomRow = document.querySelector(".hotel-row-bottom");
  const prevBtn = document.querySelector(".hotel-nav-btn.prev-btn");
  const nextBtn = document.querySelector(".hotel-nav-btn.next-btn");

  if (!section || !topRow || !bottomRow) return;

  // Desktop Scroll Variables
  let currentTopX = 0;
  let targetTopX = 0;
  let currentBottomX = 0;
  let targetBottomX = 0;
  const ease = 0.08;
  let isAnimating = false;
  let isMobile = window.innerWidth < 992;

  // -------------------------------------------------------------
  // DESKTOP: Scroll-Driven Lerp Motion
  // -------------------------------------------------------------
  const calculateTargets = () => {
    if (isMobile) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const totalVisibleDistance = rect.height + windowHeight;

    if (totalVisibleDistance <= 0) return;

    let progress = (windowHeight - rect.top) / totalVisibleDistance;
    progress = Math.max(0, Math.min(1, progress));

    const topStart = windowWidth;
    const topEnd = -topRow.scrollWidth;
    targetTopX = topStart + progress * (topEnd - topStart);

    const bottomStart = -bottomRow.scrollWidth;
    const bottomEnd = windowWidth;
    targetBottomX = bottomStart + progress * (bottomEnd - bottomStart);

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(render);
    }
  };

  const render = () => {
    if (isMobile) return;

    currentTopX += (targetTopX - currentTopX) * ease;
    currentBottomX += (targetBottomX - currentBottomX) * ease;

    topRow.style.transform = `translate3d(${currentTopX.toFixed(2)}px, 0, 0)`;
    bottomRow.style.transform = `translate3d(${currentBottomX.toFixed(2)}px, 0, 0)`;

    const topDelta = Math.abs(targetTopX - currentTopX);
    const bottomDelta = Math.abs(targetBottomX - currentBottomX);

    if (topDelta > 0.1 || bottomDelta > 0.1) {
      requestAnimationFrame(render);
    } else {
      isAnimating = false;
    }
  };

  // -------------------------------------------------------------
  // MOBILE: Button Navigation for Touch Slider
  // -------------------------------------------------------------
  const scrollMobile = (direction) => {
    const tile = wrapper.querySelector(".hotel-tile");
    if (!tile) return;
    
    // Width of one slide including CSS flex gap (16px)
    const slideWidth = tile.offsetWidth + 16; 
    const scrollAmount = direction === "next" ? slideWidth : -slideWidth;

    wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (prevBtn) prevBtn.addEventListener("click", () => scrollMobile("prev"));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollMobile("next"));

  // -------------------------------------------------------------
  // RESIZE & BREAKPOINT STATE MANAGEMENT
  // -------------------------------------------------------------
  const handleResize = () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 992;

    if (isMobile) {
      // Reset JS inline transforms on mobile so CSS snap flex layout takes over
      topRow.style.transform = "";
      bottomRow.style.transform = "";
      isAnimating = false;
    } else {
      if (wasMobile !== isMobile) {
        wrapper.scrollLeft = 0; // Reset scroll container on desktop switch
      }
      calculateTargets();
    }
  };

  window.addEventListener("scroll", calculateTargets, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  // Initial setup
  handleResize();
});




