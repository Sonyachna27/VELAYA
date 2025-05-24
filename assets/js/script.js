
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	animationHeader();
	accordionFunction();
	addAnimationInit();
 requestAnimationFrame(() => {
    toggleIngredients();
  });
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


const toggleIngredients = () => {
  let isIngredientEnabled = false;
  let allIngredient = [];
  let rows = new Map();

  const clearListeners = () => {
    allIngredient.forEach((item, index) => {
      const newItem = item.cloneNode(true);
      item.replaceWith(newItem);
      allIngredient[index] = newItem; 
    });
  };

  const groupByRow = () => {
    rows.clear();
    allIngredient.forEach((item) => {
      const top = item.offsetTop;
      if (!rows.has(top)) rows.set(top, []);
      rows.get(top).push(item);
    });
  };

  const setActiveItems = () => {
    rows.forEach((itemsInRow) => {
      itemsInRow.forEach((item) => item.classList.remove('active'));
      if (itemsInRow.length > 0) itemsInRow[0].classList.add('active');
    });
  };

  const setWidths = () => {
    rows.forEach((itemsInRow) => {
      const activeItem = itemsInRow.find((el) => el.classList.contains('active')) || itemsInRow[0];
      const parentWidth = activeItem?.parentElement?.clientWidth || 0;
      const activeWidth = parentWidth * 0.39;

      itemsInRow.forEach((item) => {
        const inner = item.querySelector('.ingredients__item__inner');
        if (inner) {
          inner.style.width = `calc(${activeWidth}px - 60px)`;
        }
      });
    });
  };

  const addEventListeners = () => {
    allIngredient.forEach((item) => {
      item.addEventListener('mouseover', () => {
        const top = item.offsetTop;
        const itemsInRow = rows.get(top);
        if (!itemsInRow) return;

        itemsInRow.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
        setWidths();
      });
    });
  };

  const openIngredient = () => {
    allIngredient = Array.from(document.querySelectorAll('.ingredients__item'));
    if (allIngredient.length === 0) return;
console.log('init!');
    groupByRow();
    setActiveItems();
    setWidths();
    addEventListeners();
  };

  const initIngredient = () => {
    clearListeners(); // Завжди чистимо і перевизначаємо
    openIngredient();
    isIngredientEnabled = true;
  };

  const destroyIngredient = () => {
    if (isIngredientEnabled) {
      clearListeners();
      rows.clear();
      isIngredientEnabled = false;
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      initIngredient();
    } else {
      destroyIngredient();
    }
  };

  // Initial call and debounce resize
  handleResize();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });
};



