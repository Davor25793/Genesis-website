const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('#btnLeft')
const btnRight = document.querySelector('#btnRight')
let curSlide = 0;
const maxSlide = slides.length;


const goToSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
}

goToSlide(0)

//Next slide
const nextSlide = function(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide++;
  }

  goToSlide(curSlide)
  activateDot(curSlide)
}

//Prev slide
const prevSlide = function(){

  if(curSlide === 0){
    curSlide = maxSlide - 1
  }else{
    curSlide--;
  }

  goToSlide(curSlide)
  activateDot(curSlide)
  
}


//Btn right
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//Move slider with arrows
document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight'){
    nextSlide()
  }else if(e.key === 'ArrowLeft'){
    prevSlide()
  }
})

//Carousel
const dotContainer = document.querySelector('.dots')

//Create dots
const createDots = function(){
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots-btn" data-slide=${i}></button>`)
  })
}

createDots()

//Carousel event list(event delegation)
dotContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('dots-btn')){
    const slide = e.target.dataset.slide;
    goToSlide(slide)
    activateDot(slide)
  }
})


//Activate active dot
const activateDot = function(slide){
  document.querySelectorAll('.dots-btn').forEach(dot => {
    dot.classList.remove('dots-btn-active') 
  })

  document.querySelector(`.dots-btn[data-slide="${slide}"]`).classList.add('dots-btn-active')
}

activateDot(0)


