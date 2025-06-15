
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	animationHeader();
	accordionFunction();
	addAnimationInit();
	openIngredient();
	productSliderInit();
	reviewsSliderInit();
socialsSliderInit();
});



const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}

const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
			
		});
	}
}
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  accordionItems.forEach((item) => {
		const top = item.querySelector(".accord-item-top");
		if(top){
			top.addEventListener("click", function () {
				item.classList.toggle("active");
			});
		}
  });
};

const openIngredient = () => {
	if (window.innerWidth >= 1024) {
	const allIngredient = document.querySelectorAll('.ingredients__item');

	if (allIngredient.length === 0) return;

	const setWidths = () => {
		const activeItem = document.querySelector('.ingredients__item.active') || allIngredient[0];
		const parentWidth = activeItem.parentElement.clientWidth;
		const activeWidth = parentWidth * 0.39;

		allIngredient.forEach((item) => {
			const inner = item.querySelector('.ingredients__item__inner');
			if (inner) {
				inner.style.width = `calc(${activeWidth}px - 60px)`;
			}
		});
	};

	const setActive = (index) => {
		allIngredient.forEach((item) => item.classList.remove('active'));
		allIngredient[index].classList.add('active');
	};

	setActive(0);
	setWidths();

	allIngredient.forEach((item, index) => {
		item.addEventListener('mouseover', () => {
			setActive(index);
		});
	});

	window.addEventListener('resize', setWidths);
};
};
const reviewsSliderInit = () =>{
	const reviewsSliderWrap = document.querySelector('.reviewsSlider');
	if(!reviewsSliderWrap) return;
	const reviewsArrowNext = document.querySelector('.reviews-button-next'); 
		const reviewsArrowPrev = document.querySelector('.reviews-button-prev');
		const reviewsSlides = document.querySelectorAll('.reviews__slide');
		if(reviewsSlides.length <= 2){
			reviewsArrowNext.style.display ="none";
			reviewsArrowPrev.style.display ="none";
		}
	const reviewsSlider = new Swiper(reviewsSliderWrap, {
		
		  slidesPerView: 1,
  		spaceBetween: 20,
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
      },
			breakpoints: {
			414: {
				slidesPerView:1.5,
				spaceBetween: 10
			},
    550: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 2.4,
      spaceBetween: 20
    }
  },
    });
}
const productSliderInit = () =>{
	const productSliderWrap = document.querySelector('.productSlider');
	if(!productSliderWrap) return;
	const productArrowNext = document.querySelector('.product-button-next'); 
		const productArrowPrev = document.querySelector('.product-button-prev');
		const productSlides = document.querySelectorAll('.product__slide');
		if(productSlides.length <= 2 || window.innerWidth <= 767) {
			productArrowNext.style.display ="none";
			productArrowPrev.style.display ="none";
		}
	const productSlider = new Swiper(productSliderWrap, {
		  slidesPerView: 1.3,
  		spaceBetween: 20,
			centeredSlides: true,
    	loop: true,
      navigation: {
        nextEl: ".product-button-next",
        prevEl: ".product-button-prev",
      },
			 pagination: {
        el: ".product-pagination",
				clickable: true,
      },
			breakpoints: {
    768: {
      slidesPerView: 2.3,
    },
    1024: {
      slidesPerView: 3.4,
    }
  },
    });
}
const socialsSliderInit = () =>{
	const socialsSliderWrap = document.querySelector('.socialsSlider');
	if(!socialsSliderWrap) return;

	const socialsSlider = new Swiper(socialsSliderWrap, {
		  slidesPerView: 1.5,
  		spaceBetween: 10,
			// centeredSlides: true,
    	loop: true,
			autoplay: {
			delay: 2000,
		},
			breakpoints: {
  
    550: {
      slidesPerView: 2.5,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  },
    });
}



