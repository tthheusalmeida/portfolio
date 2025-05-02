document.addEventListener("DOMContentLoaded", () => {
  onAnimationAtHeader();
  onAnimationAtHome();
  onAnimationAtSkills();
  onAnimationAtProjects();
  onAnimationAtContact();
});

const THRESHOLD = 0.3;

function onAnimationAtHeader() {
  const elementsToAnimate = [
    {
      el: document.querySelector(".logo"),
      animation: "animate__fadeInDown",
    },
    {
      el: document.querySelector(".header__tabs"),
      animation: "animate__fadeInDown",
    },
  ];

  onAnimation(elementsToAnimate);
}

function onAnimationAtHome() {
  const elementsToAnimate = [
    {
      el: document.querySelector(".home__all-text"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".home__button"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".home__check-out"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".image-perfil"),
      animation: "animate__fadeInRight",
    },
  ];

  onAnimation(elementsToAnimate);
}

function onAnimationAtSkills() {
  const elementsToAnimate = [
    {
      el: document.querySelector(".skills__already-has"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".grouped-one"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".skills__in-development-title"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".grouped-two"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".skills__about-me"),
      animation: "animate__fadeInRight",
    },
    {
      el: document.querySelector(".skills__quote"),
      animation: "animate__fadeInRight",
    },
  ];

  onAnimation(elementsToAnimate);
}

function onAnimationAtProjects() {
  const projectElements = [...document.querySelectorAll(".project")].map(
    (el) => ({ el, animation: "animate__fadeInUp" })
  );

  const elementsToAnimate = [
    ...projectElements,
    {
      el: document.querySelector(".projects__content-title"),
      animation: "animate__fadeInUp",
    },
  ];

  onAnimation(elementsToAnimate);
}

function onAnimationAtContact() {
  const projectElements = [...document.querySelectorAll(".social-network")].map(
    (el) => ({ el, animation: "animate__fadeInLeft" })
  );

  const elementsToAnimate = [
    ...projectElements,
    {
      el: document.querySelector(".contact__logo"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".contact__title"),
      animation: "animate__fadeInRight",
    },
    {
      el: document.querySelector(".contact__left-content-title"),
      animation: "animate__fadeInLeft",
    },
    {
      el: document.querySelector(".contact__right-content"),
      animation: "animate__fadeInRight",
    },
  ];

  onAnimation(elementsToAnimate);
}

function onAnimation(elementsToAnimate) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const config = elementsToAnimate.find((e) => e.el === target);
          if (config) {
            target.classList.add("animate__animated", config.animation);
            observer.unobserve(target);
          }
        }
      });
    },
    { threshold: THRESHOLD }
  );

  elementsToAnimate.forEach(({ el }) => {
    if (el) {
      observer.observe(el);
    }
  });
}
