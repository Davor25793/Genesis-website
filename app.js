const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('#btnLeft')
const btnRight = document.querySelector('#btnRight')
let curSlide = 0;
const maxSlide = slides.length;
let auto = true;
let slideInterval;
const intervalTime = 5000;



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

  if(auto){
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, intervalTime)
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

  if(auto){
    clearInterval(slideInterval)
    slideInterval = setInterval(prevSlide, intervalTime)
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

//Auto slide
if(auto){
  slideInterval = setInterval(nextSlide, intervalTime)
}


//Smooth scroll
document.querySelectorAll('.nav-link').forEach(function(el){
  el.addEventListener('click', function(e){
    // console.log('clicked')
    e.preventDefault()

    const id = this.getAttribute('href')
    // console.log(id)
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  })
})

// //Sticky navbar
// const navbar = document.querySelector('.navbar');
// const showcase = document.getElementById('showcase');
// const initCords = showcase.getBoundingClientRect();
// const navToggle = document.querySelector('.navbar-toggle')

// window.addEventListener('scroll', function() {
//   if(window.scrollY > initCords.top){
//     navbar.classList.add('navbar-sticky')
//     navToggle.style.top = '30px'
//   }else{
//     navbar.classList.remove('navbar-sticky')
//   }
// })

//Sidebar
const navbarToggle = document.querySelector('.navbar-toggle')
const navbarClose = document.querySelector('.navbar-close')
const navbarList = document.querySelector('.navbar-list')

navbarToggle.addEventListener('click', () => {
  navbarList.classList.toggle('active')
})

navbarClose.addEventListener('click', () => {
  navbarList.classList.toggle('active')
})

