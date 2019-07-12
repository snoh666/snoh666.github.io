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
document.getElementById('about-scroll').addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementsByClassName('about')[0].offsetTop - 30,
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
document.getElementsByClassName('scroll')[0].addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementsByClassName('about')[0].offsetTop - 30,
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
      const repoItems = {
        titleElement: document.createElement('div'),
        descriptionElement: document.createElement('div'),
        bottomElement: document.createElement('div')
      };

      repoItems.titleElement.classList =  'repo-name';
      repoItems.descriptionElement.classList =  'repo-desc';
      repoItems.bottomElement.classList = 'repo-bottom';

      let repoName = element.name;

      repoItems.titleElement.appendChild(document.createTextNode(repoName));

      repoItems.descriptionElement.appendChild(document.createTextNode(element.description));

      let detectedLanguage;

      switch(element.language){
        case 'JavaScript':
          detectedLanguage = 'javascript';
          break;
        case 'CSS':
          detectedLanguage = 'css'
          break;
        case 'HTML':
          detectedLanguage = 'html';
          break;
        case 'Python':
          detectedLanguage = 'python';
          break;
        default:
          detectedLanguage = '';
          break;
      }

      const codeHyperLink = document.createElement('a');
      codeHyperLink.setAttribute('href', element.html_url);
      codeHyperLink.append('CODE');
      codeHyperLink.classList = 'code-link';
      repoItems.bottomElement.appendChild(codeHyperLink);

      if(element.has_pages) {
        const siteHyperLink = document.createElement('a');
        siteHyperLink.setAttribute('href', element.homepage);
        siteHyperLink.append('SITE');
        siteHyperLink.classList = 'site-link';
        repoItems.bottomElement.appendChild(siteHyperLink);
      }

      const languageElement = document.createElement('span');
      languageElement.classList = detectedLanguage;
      languageElement.append(element.language);
      repoItems.bottomElement.appendChild(languageElement);


      // repoItems[2].appendChild(document.createTextNode(element.language));
      let mainReposElem;
      mainReposElem = document.createElement('div');
      mainReposElem.appendChild(repoItems.titleElement);
      mainReposElem.appendChild(repoItems.descriptionElement);
      mainReposElem.appendChild(repoItems.bottomElement);
      mainReposElem.setAttribute('class', `git-repo ${element.name}`);



      // if (!element.has_pages) {

      //   console.warn(`${element.name}: homepage isnt avaible`);
        // mainReposElem = document.createElement('div');
        // mainReposElem.setAttribute('class', `git-repo ${element.name}`);
      //   const bottomElementsSection = [document.createElement('a'), document.createElement('div')]
      //   bottomElementsSection[0].classList = 'git-code';
      //   bottomElementsSection[1].classList =

      // } else {

      //   mainReposElem = document.createElement('div');
      //   mainReposElem.setAttribute('class', `git-repo ${element.name} homepage-active`);
      //   const bottomElementsSection = [document.createElement('a'), document.createElement('a'), document.createElement('div')]
      //   // mainReposElem.setAttribute('href', element.homepage);

      // }

      // repoItems.forEach(element => mainReposElem.appendChild(element));

      webContentBox.appendChild(document.createElement('a').appendChild(mainReposElem));
    });

  });