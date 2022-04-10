const gallerySwiper = new Swiper(".gallery__swiper", {
  // Optional parameters
  speed: 2000,
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  autoplay: {
    delay: 5000,
  },
});

const projectsSlider = document.querySelector(".projects__slider");

let mySwiper;

function mobileSlider() {
  if (window.innerWidth <= 420 && projectsSlider.dataset.mobile == "false") {
    mySwiper = new Swiper(projectsSlider, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      slideClass: "swiper__card",
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    });

    projectsSlider.dataset.mobile = "true";
  }

  if (window.innerWidth > 420) {
    projectsSlider.dataset.mobile = "false";
    if (projectsSlider.classList.contains("swiper-initialized")) {
      mySwiper.destroy();
    }
  }
}

window.addEventListener("resize", () => {
  mobileSlider();
});

// валидация формы

const validation = new JustValidate(".feedback__form");

validation
  .addField(".feedback__input--name", [
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 30,
    },
    {
      rule: "required",
      errorMessage: "Name is required",
    },
  ])
  .addField(".feedback__input--email", [
    {
      rule: "required",
      errorMessage: "Email is required",
    },
	 {
		rule: 'customRegexp',
		value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	 },
  ]);

// отправка формы
document.querySelector(".feedback__form").addEventListener("submit", (e) => {
  e.preventDefault();
  const popup = document.querySelector(".popup");
  const popupHeader = document.querySelector(".popup__header");
  const formInputs = document.querySelectorAll(".feedback__input");
  const formName = document.querySelector(".feedback__input--name");
  const error = document.querySelector(".just-validate-error-label");
  if (!error) {
    popup.classList.add("popup-active");
    popupHeader.textContent = "Dear " + formName.value;

    document.querySelector(".popup__icon").addEventListener("click", () => {
      popup.classList.remove("popup-active");
    });
    document.body.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("popup-active");
      }
    });
    formInputs.forEach((el) => (el.value = ""));
  }
});

// Меню бургер
const menuBurger = document.querySelector(".burger__icon");
if (menuBurger) {
  const menuBody = document.querySelector(".header__nav");
  menuBurger.addEventListener("click", function (e) {
    menuBurger.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
