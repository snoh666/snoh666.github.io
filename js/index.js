fetch('https://api.github.com/users/snoh666/repos')
  .then(data => data.json())
  .then(data => {

    const webContentBox = document.getElementsByClassName('web-content')[0];
    webContentBox.innerHTML = '';
    data.forEach(element => {
      /*
        Wrap everything in 'a' link or add click listener
        element =
        name = name of repo
        description = description of repo
        homepage = link of homepage repo
        language = language of repo
        HTML, JAVASCRIPT, CSS
        #e34c26, #f1e05a, #563d7c
      */
      const linkFunction = function (link) {
        console.log(link);
      };
      const repoItems = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
      repoItems[0].setAttribute('class', 'repo-name');
      let repoName = element.name.replace('-', ' ').replace('-', ' ').replace('_', ' ');
      console.log(repoName);
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
      const mainReposElem = document.createElement('div');
      repoItems.forEach(element => {
        mainReposElem.appendChild(element);
      });
      mainReposElem.setAttribute('class', `git-repo ${element.name}`);
      webContentBox.appendChild(mainReposElem);
      if(element.homepage === '') {
        console.warn(`${element.name}: homepage isnt avaible`);
      } else {
        const repoElement = document.getElementsByClassName(element.name)[0];
        repoElement.classList.add('homepage-active');
        repoElement.addEventListener('click', () => {
          window.location = element.homepage;
        });
      }
    });

  });