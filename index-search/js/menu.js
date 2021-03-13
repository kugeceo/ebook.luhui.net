const button = document.querySelector('#dropdown-button');
const subMenu = document.querySelector('#dropdown-menu');
const subMenuItem = document.querySelectorAll('#dropdown-menu li');
const searchButton = document.querySelector('#search-button');
const searchBox = document.querySelector('#search-box');

window.addEventListener('resize', () => {    
	if (window.innerWidth <= 750) {	
		searchButton.innerHTML = 'Search <i class="fal fa-search">';
	} else {
    searchButton.innerHTML = '<i class="fal fa-search">';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  button.addEventListener('click', () => subMenu.style.display = 'block');

  subMenuItem.forEach(item => {
    item.addEventListener('click', () => {
      let { value } = item.attributes.value;
      button.innerHTML = `${item.innerText} <i class="fal fa-${value}">`;
      subMenu.style.display = 'none';
    });
  });
  
  searchButton.addEventListener('click', search);
  document.addEventListener('keyup', e => {
    if (e.which == 13) search();
  });

  searchBox.focus();
});

function search() {
	let type = button.innerText;
  let query = searchBox.value;
  let commonToAll = `
    -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)
    -inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)
    intitle:\"index.of./\"
  `;

  const extensions = {
    '视频': '(avi|mkv|mov|mp4|mpg|wmv)',
    '音频': '(ac3|flac|m4a|mp3|ogg|wav|wma)',
    '电子书': '(CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|txt)',
    '图片': '(bmp|gif|jpg|png|psd|tif|tiff)',
    '软件/游戏': '(apk|exe|iso|rar|tar|zip)',
    '压缩包': '(apk|exe|iso|rar|tar|zip|7z)'
  }

  let searchTerms = query.split(',');
  searchTerms = searchTerms.map(term => `intext:"${term.trim()}"`).join(' ');

  let finalquery = `${searchTerms} ${extensions[type]} ${commonToAll}`;

  let url = `http://search.luhui.net/search?q=${encodeURIComponent(finalquery)}`;

  window.open(url, '_blank');
}