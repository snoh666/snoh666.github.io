document.getElementsByClassName('menu-btn')[0].addEventListener('click', () => {
  document.getElementsByClassName('menu-list')[0].classList.add('menu-list-active');
});
document.getElementsByClassName('menu-btn-inside')[0].addEventListener('click', () => {
  document.getElementsByClassName('menu-list')[0].classList.remove('menu-list-active');
});
document.querySelector('nav > h2').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});
window.addEventListener('scroll', () => {
  const menuEl = document.getElementById('menu');
  const placeholderMenu = document.getElementsByClassName('placeholder')[0];
  if(window.scrollY >= (window.innerHeight / 6) * 2) {
    menuEl.classList.add('menu-bg');
    placeholderMenu.classList.remove('display');
  } else if (window.scrollY == 0) {
    if(menuEl.classList.contains('menu-bg')) {
      menuEl.classList.remove('menu-bg');
      placeholderMenu.classList.add('display');
    }
  }
});
document.getElementById('menu-scroll').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  document.getElementsByClassName('menu-list')[0].classList.remove('menu-list-active');
});
document.getElementById('github-scroll').addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementById('web').offsetTop - 25,
    left: 0,
    behavior: 'smooth'
  });
  document.getElementsByClassName('menu-list')[0].classList.remove('menu-list-active');
});
document.getElementById('jpg-scroll').addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementsByClassName('photo-section')[0].offsetTop + 25,
    left: 0,
    behavior: 'smooth'
  });
  document.getElementsByClassName('menu-list')[0].classList.remove('menu-list-active');
});
document.getElementsByClassName('scroll')[0].addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementById('web').offsetTop - 25,
    left: 0,
    behavior: 'smooth'
  });
});
//Github APi connection
fetch('https://api.github.com/users/snoh666/repos')
  .then(data => data.json())
  .then(data => {

    const webContentBox = document.getElementsByClassName('web-content')[0];
    webContentBox.innerHTML = '';
    data.forEach(element => {
      const repoItems = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
      repoItems[0].setAttribute('class', 'repo-name');
      let repoName = element.name.replace('-', ' ').replace('-', ' ').replace('_', ' ');
      repoItems[0].appendChild(document.createTextNode(repoName));
      repoItems[1].setAttribute('class', 'repo-desc');
      repoItems[1].appendChild(document.createTextNode(element.description));
      if(element.language == 'JavaScript'){
        repoItems[2].setAttribute('class', 'repo-lang javascript');
      } else if(element.language == 'CSS') {
        repoItems[2].setAttribute('class', 'repo-lang css');
      } else if(element.language == 'HTML') {
        repoItems[2].setAttribute('class', 'repo-lang html');
      } else {
        repoItems[2].setAttribute('class', 'repo-lang ');
      }
      repoItems[2].appendChild(document.createTextNode(element.language));
      let mainReposElem;
      if (element.homepage === '') {
        console.warn(`${element.name}: homepage isnt avaible`);
        mainReposElem = document.createElement('div');
        mainReposElem.setAttribute('class', `git-repo ${element.name}`);
      } else {
        mainReposElem = document.createElement('a');
        mainReposElem.setAttribute('class', `git-repo ${element.name} homepage-active`);
        mainReposElem.setAttribute('href', element.homepage);
      }
      repoItems.forEach(element => {
        mainReposElem.appendChild(element);
      });

      webContentBox.appendChild(document.createElement('a').appendChild(mainReposElem));
    });

  });