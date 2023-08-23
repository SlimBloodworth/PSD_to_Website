/*MOBILE NAVIGATION*/
const primaryNav = document.querySelector('.primary-nav');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute('data-visible');
  /*console.log(visibility); for testing*/
  if(visibility === "false"){
    primaryNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);    
  }else{
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  };
});

/*IMAGE CAROUSEL*/
const track = document.querySelector('.carousel__track');

const slides = Array.from(track.children);

const prevBtn = document.querySelector('.carousel__button--previous');

const nextBtn = document.querySelector('.carousel__button--next');

const indicatorNav = document.querySelector('.carousel__nav');

const indicatorDots = Array.from(indicatorNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

/*Arranging the slides next to one another*/
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };

slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };
  
  const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('current-slide');
    targetIndicator.classList.add('current-slide');
  };
  
  const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
     if (targetIndex === 0) {
      prevBtn.classList.add('hide');
      nextBtn.classList.remove('hide');
    } else if (targetIndex === slides.length - 1) {
      prevBtn.classList.remove('hide');
      nextBtn.classList.add('hide');
    } else {
      prevBtn.classList.remove('hide');
      nextBtn.classList.remove('hide');
    }
  };

  /*When click left, move slides to left*/
prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;  
    const currentIndicator = indicatorNav.querySelector('.current-slide');
    const prevIndicator = currentIndicator.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
  
    moveToSlide(track, currentSlide, prevSlide);
    updateIndicators(currentIndicator, prevIndicator);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
      
  });

  /*When click right, move slides to right*/
nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = indicatorNav.querySelector('.current-slide');
    const nextIndicator = currentIndicator.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
  });

  /*When click nav indicators, move to that slide*/
indicatorNav.addEventListener('click', e => {
    const targetIndicator = e.target.closest('button');    
    if(!targetIndicator) return;
    const currentSlide = track.querySelector('.current-slide');
  const currentIndicator = indicatorNav.querySelector('.current-slide');
  const targetIndex = indicatorDots.findIndex(dot => dot === targetIndicator);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
      
});

/*MOUNTAIN IMAGES*/

const mountain1Btn = document.querySelector('.mountain-btn--one');

const mountain2Btn = document.querySelector('.mountain-btn--two');

const mtnOneImage = document.querySelector('.mtnOne');

const mtnTwoImage = document.querySelector('.mtnTwo');

mountain1Btn.addEventListener('click', e => {
  e.preventDefault(); // Prevent default behavior of the link

  // Show Mountain 1 image and hide Mountain 2 image
  mtnOneImage.classList.remove('hidden');
  mtnTwoImage.classList.add('hidden');
});

mountain2Btn.addEventListener('click', e => {
  e.preventDefault();

  // Show Mountain 2 image and hide Mountain 1 image
  mtnTwoImage.classList.remove('hidden');
  mtnOneImage.classList.add('hidden');
});