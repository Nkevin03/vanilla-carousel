import './style.css'

const slider = document.querySelector('.slider');
const sliderNavPrev = document.querySelector('.slider-nav-prev');
const sliderNavNext = document.querySelector('.slider-nav-next');
const sliderNavCurrent = document.querySelector('#slider-nav-current');
const sliderNavTotal = document.querySelector('#slider-nav-total');
const sliderNavDivider = document.querySelector('.slider-nav-divider');
const sliderNavDividerProgress = document.querySelector('.slider-nav-divider-progress');

sliderNavPrev.innerHTML = `<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`;

sliderNavNext.innerHTML = `<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`;

let path_images = [
  '../public/images/1.jpeg',
  '../public/images/2.jpeg',
  '../public/images/3.jpeg',
  '../public/images/4.jpeg',
  '../public/images/5.jpeg',
  '../public/images/4.jpeg',
  '../public/images/3.jpeg',
  '../public/images/1.jpeg',
  '../public/images/5.jpeg',
  '../public/images/3.jpeg',
  '../public/images/1.jpeg',
  '../public/images/5.jpeg',
  '../public/images/3.jpeg',
  '../public/images/1.jpeg',
  '../public/images/5.jpeg',
]

for (let i = 0; i < path_images.length; i++) {
  slider.innerHTML += `<div class="slider-item-container"><div class="slider-item" style="background-image: url(${path_images[i]})"></div></div>`;
}

const sliderItemsContainers = document.querySelectorAll('.slider-item-container');
const singleSlideWidth = sliderItemsContainers[0].clientWidth;

const totalSlides = sliderItemsContainers.length;
const slidesPerPage = Math.floor(slider.clientWidth / singleSlideWidth);
const totalPages = Math.ceil(totalSlides / slidesPerPage);

let isClick = false;

sliderNavCurrent.innerHTML = 1;
sliderNavTotal.innerHTML = totalPages;

const currentSlide = Math.round(slider.scrollLeft / slider.clientWidth) + 1;
sliderNavCurrent.innerHTML = currentSlide;

const updateCurrentSlide = () => {
  const currentSlide = Math.round(slider.scrollLeft / slider.clientWidth) + 1;
  sliderNavCurrent.innerHTML = currentSlide;
  updateSliderNavDividerProgress();
};

const startProgress = Math.round(slider.scrollLeft / slider.clientWidth * 100 / totalPages);

sliderNavDividerProgress.style.width = `${startProgress}%`;


const updateSliderNavDividerProgress = () => {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const progress = Math.round((slider.scrollLeft / maxScrollLeft) * 100);
  sliderNavDividerProgress.style.width = `${progress}%`;
};

sliderNavPrev.addEventListener('click', () => {
  if (isClick) return;
  isClick = true;
  slider.scrollLeft -= slider.clientWidth;
  setTimeout(() => {
    isClick = false;
    updateCurrentSlide();
    updateSliderNavDividerProgress();
  }, 800);
});


sliderNavNext.addEventListener('click', () => {
  if (isClick) return;
  isClick = true;
  slider.scrollLeft += slider.clientWidth;
  setTimeout(() => {
    isClick = false;
    updateCurrentSlide();
    updateSliderNavDividerProgress();
  }, 800);
});

slider.addEventListener('scroll', () => {
  updateCurrentSlide();
});

sliderNavDivider.addEventListener('click', () => {
  slider.scrollLeft = 0;
});