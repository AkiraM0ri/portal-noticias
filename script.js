const colorsArr = ["#ffffff", "#ec1861", "#0d68f5", "#5a2cad", "#ef6c0a", "#88bb06"]

let i = 0

function animeScroll() {
  const r = document.querySelector(':root');
  
  const windowTop = window.scrollY;

  if(windowTop >= 1000) {
    r.style.setProperty('--menu-item-color', '#ffffff');
    r.style.setProperty('--user-icon-color', '#ffffff');
    r.style.setProperty('--menu-hamburger-bg-color', '#ffffff');
  } else {
    r.style.setProperty('--menu-item-color', '#232323');
    r.style.setProperty('--user-icon-color', '#232323');
    r.style.setProperty('--menu-hamburger-bg-color', '#232323');
  }

  const intervalsPassed = Math.floor(windowTop / 1000);
  if(colorsArr[intervalsPassed]) {
    r.style.setProperty('--main-bg-header', colorsArr[intervalsPassed])
  }
};

window.addEventListener('scroll', ()=>{
  animeScroll();
})

function createNews() {
  const numberOfNews = 62
  const container = document.querySelector('.infinite-wrapper')

  if(!container) {
    setTimeout(createNews, 1000)
    return
  }

  for(let i = 0; i < numberOfNews; i++) {
    container.innerHTML += `
    <div class="card-infinite">
      <div class="card-infinite__img-container">
        <img src="imgs/infinite-scroll.jpg" alt="">
      </div>
      <div class="card-infinite__infos-container">
        <div class="infos-container__title">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id mollitia saepe corrupti perspiciatis et architecto quod adipisci quidem sunt quia. Ratione pariatur nemo molestias harum reprehenderit. Pariatur odio reiciendis deleniti.</p>
        </div>
        <div class="infos-container__author">
          <div class="card-news__author-img-container">
            <img class="card-news__author-img" src="imgs/trali.jpeg" alt="imagem do autor">
          </div>
          <div class="card-news__author-name-container">
            <p class="card-news__author-name">César Tralli</p>
            <p class="card-news__author-date">28/04/2023</p>
          </div>
        </div>
      </div>
    </div>
    `
  }

  const loader = document.querySelector('.loader')
  loader.style.display = 'none'
}

createNews()
