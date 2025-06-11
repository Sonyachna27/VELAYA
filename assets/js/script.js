
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	animationHeader();
	accordionFunction();
	addAnimationInit();
	openIngredient();
	productSliderInit();
//  requestAnimationFrame(() => {
//     toggleIngredients();
//   });
});

setTimeout(function () {
	let aosOffset = 120;
	if (window.innerWidth < 480) {
		aosOffset = 30;
	}
	AOS.init({
		// duration: 400,
		// easing: 'ease-out-quart',
		offset: aosOffset
	});
}, 100);


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
const productSliderInit = () =>{
	const productSliderWrap = document.querySelector('.productSlider');
	if(!productSliderWrap) return;
	var productSlider = new Swiper(productSliderWrap, {
		  slidesPerView: 1.3,
  		spaceBetween: 10,
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
    414: {
      slidesPerView:1.5,
      spaceBetween: 10
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 20
    }
  },
    });
}



