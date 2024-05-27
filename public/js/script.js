const colorsArr = ["#ffffff", "#ec1861", "#0d68f5", "#5a2cad", "#ef6c0a", "#88bb06"]

let i = 0

function animeScroll() {
  const r = document.querySelector(':root');
  
  const windowTop = window.scrollY;

  if(windowTop >= 1000) {
    r.style.setProperty('--menu-item-color', '#ffffff');
    r.style.setProperty('--user-icon-color', '#ffffff');
    r.style.setProperty('--menu-hamburger-bg-color', '#ffffff');
    r.style.setProperty('--menu-mobile-bg', '#23232e');
  } else {
    r.style.setProperty('--menu-item-color', '#232323');
    r.style.setProperty('--user-icon-color', '#232323');
    r.style.setProperty('--menu-hamburger-bg-color', '#232323');
    r.style.setProperty('--menu-mobile-bg', '#ffffff');
  }

  const intervalsPassed = Math.floor(windowTop / 1000);
  if(colorsArr[intervalsPassed]) {
    r.style.setProperty('--main-bg-header', colorsArr[intervalsPassed])
  }
};

window.addEventListener('scroll', ()=>{
  animeScroll();
})

function menuMobile() {
  const hamburguerBtn = document.querySelector('.menu-hamburger')

  hamburguerBtn.addEventListener('click', () => {
    const menu = document.querySelector('.menu')
    menu.classList.toggle('menu-active')
  });
}

menuMobile()

function changeMainBG() {
  const mainBG = document.querySelector('main')
  const bg = mainBG.getAttribute('bg')
  mainBG.style.backgroundImage = `url("${bg}")`
}

changeMainBG()