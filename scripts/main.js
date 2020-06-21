'use strict';

const btnPrev = document.querySelector('.carousel__btn_prev');
const btnNext = document.querySelector('.carousel__btn_next');
const carousel = document.querySelector('.carousel');
const slides = [...carousel.children];
const dotsWrap = document.querySelector('.carousel__dots-wrap');
const dots = [...dotsWrap.children];

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveSlides = (tracking, currentSlide, nextSlide) => {
  tracking.style.transform = 'translateX(-' + nextSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
};

const moveDots = (currentDot, nextDot) => {
  currentDot.classList.remove('carousel__dot_active');
  nextDot.classList.add('carousel__dot_active');
};

btnNext.addEventListener('click', (e) => {
  const currentSlide = carousel.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsWrap.querySelector('.carousel__dot_active');
  let nextDot = currentDot.nextElementSibling;

  if (!nextSlide) {
    nextSlide = slides[0];
    nextDot = dots[0];
  }

  moveSlides(carousel, currentSlide, nextSlide);
  moveDots(currentDot, nextDot);
});

btnPrev.addEventListener('click', (e) => {
  const currentSlide = carousel.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsWrap.querySelector('.carousel__dot_active');
  let prevDot = currentDot.previousElementSibling;

  if (!prevSlide) {
    prevSlide = slides[slides.length - 1];
    prevDot = dots[dots.length - 1];
  }

  moveSlides(carousel, currentSlide, prevSlide);
  moveDots(currentDot, prevDot);
});

dotsWrap.addEventListener('click', (e) => {
  const nextDot = e.target.closest('.carousel__dot');

  if (!nextDot) {
    return;
  }

  const currentSlide = carousel.querySelector('.current-slide');
  const currentDot = dotsWrap.querySelector('.carousel__dot_active');
  const targetIndex = dots.findIndex((dot) => dot === nextDot);
  const nextSlide = slides[targetIndex];

  moveSlides(carousel, currentSlide, nextSlide);
  moveDots(currentDot, nextDot);
});
