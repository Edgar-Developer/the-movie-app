headerInicio.addEventListener('click', homePage); 
headerCategorias.addEventListener('click', categoryPage);
headerProximas.addEventListener('click', () => {
  upComingPage();
  getMovioeByUpcoming();
});  
headerPopulares.addEventListener('click', () => {
  popularyPage();
  getMovioeByPopular();
});

arrow.addEventListener('click', () => {  
    history.back(); // Retrocede una página en el historial 
    //location.hash = '#home';  
});

btnfrom.addEventListener('click', (event) => {
  event.preventDefault();
  location.hash = `#search=${input.value}`;  
})

let lastClicked = null;

function toogleNav() {
  headerUlGeneral.forEach((boton) => {
    boton.addEventListener('click', () => {

      if(lastClicked) {
        lastClicked.style.color = '';
      }

      boton.style.color = "#c90900",
      lastClicked = boton; 

      setTimeout(() => {
      boton.style.color = ""        
      }, 20000);     
    })
  })
}
toogleNav()

let currentPage = 1;// Variable para llevar el seguimiento de la página actual

verMas.addEventListener('click', () => {
  currentPage++; // Incrementa la página actual
  trendingPreviewHome(currentPage); // Llama a la función con la nueva página
  console.log(currentPage);
  
})

window.addEventListener('DOMContentLoaded', () => {
  homePage() }); // DOMContentLoaded: Se utiliza para ejecutar código una vez que el DOM está completamente cargado, permitiendo la manipulación de elementos del DOM. en el evento o solo 'load' funciona tambien El evento load se desencadena cuando se ha cargado toda la página, incluidos todos los recursos dependientes, como hojas de estilo e imágenes. Esto contrasta con DOMContentLoaded, que se activa tan pronto como se ha cargado el DOM de la página, sin esperar a que los recursos terminen de cargarse.
window.addEventListener('hashchange', navigator, false); // hashchange: Se utiliza para detectar cambios en el hash de la URL, permitiendo la navegación en aplicaciones de una sola página sin recargar la página.

function navigator() {
  console.log({ location });

  if (location.hash.startsWith('#trends')) { // este metodo nos permite preguntarle a un string osea a location.hash si empieza de cierta forma
      homePage();
  } else if (location.hash.startsWith('#search=')) {
      searchPage();
  } else if (location.hash.startsWith('#movie=')) {
      movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
     categoryPage();
  }
}

function homePage() {
  console.log('Home...');  

  btntrending.classList.remove('inactive');
  search.classList.remove('inactive');  
  divFromContainerGeneral.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  articleTrendingList.classList.remove('inactive');
  previewArticleCategoriesList.classList.add('inactive');
  titlePopulary.classList.add('inactive');
  titleProxima.classList.add('inactive');
  trailerButton.classList.add('inactive');
  divConatinerLong.classList.add('inactive');
  arrow.classList.add('inactive');
  movieDetailsSection.classList.add('inactive');
  titleCategories.classList.add('inactive');
  moviePopularySection.classList.add('inactive');
  genericListSection.classList.add('inactive');
  movieProximaSection.classList.add('inactive');
  headerSection.style.background = '';
  divFromContainerGeneral.style.justifyContent = '';

  trendingPreviewHome(); 
}

function searchPage() {
  console.log('Search...');  

  search.classList.remove('inactive');  
  genericListSection.classList.remove('inactive');
  arrow.classList.remove('inactive');
  previewArticleCategoriesList.classList.add('inactive');
  divConatinerLong.classList.add('inactive'); 
  titlePopulary.classList.add('inactive');
  titleProxima.classList.add('inactive');
  trailerButton.classList.add('inactive');
  articleTrendingList.classList.add('inactive');  
  titleCategories.classList.add('inactive');
  moviePopularySection.classList.add('inactive');
  movieProximaSection.classList.add('inactive');
  btntrending.classList.add('inactive');
  divFromContainerGeneral.style.display = 'flex';
  divFromContainerGeneral.style.justifyContent = 'center';    
  
  // ['#search', 'platzi']
  const [_, query] = location.hash.split('=');

  getMovioeBySearch(query);    
}

function movieDetailsPage() {
  console.log('Movie Details...'); 

  search.classList.add('inactive');  
  titleCategories.classList.add('inactive');
  genericListSection.classList.add('inactive');
  divFromContainerGeneral.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  movieProximaSection.classList.add('inactive');
  titlePopulary.classList.add('inactive');
  titleProxima.classList.add('inactive');
  previewArticleCategoriesList.classList.add('inactive');
  moviePopularySection.classList.add('inactive');
  btntrending.classList.add('inactive');
  articleTrendingList.classList.add('inactive');
  trailerButton.classList.remove('inactive');
  movieDetailsSection.classList.remove('inactive');
  divConatinerLong.classList.remove('inactive');
  arrow.classList.remove('inactive');
  divFromContainerGeneral.style.display = '';  

  // ['movie', '123']
  const [_, movieId] = location.hash.split('=');

  getMovioeByDetalis(movieId);
}

function categoryPage() {
  console.log('Categories...');  

  arrow.classList.remove('inactive');
  titleCategories.classList.remove('inactive');
  genericListSection.classList.remove('inactive');
  previewArticleCategoriesList.classList.remove('inactive');
  search.classList.add('inactive');  
  titlePopulary.classList.add('inactive');
  btntrending.classList.add('inactive');
  titleProxima.classList.add('inactive');
  divConatinerLong.classList.add('inactive');
  movieDetailsSection.classList.add('inactive');
  moviePopularySection.classList.add('inactive');
  divFromContainerGeneral.classList.add('inactive');
  movieProximaSection.classList.add('inactive');
  trailerButton.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  divFromContainerGeneral.style.display = '';  
  
  categoriesPreviewHome(); 
}

function upComingPage() {

  console.log('upComingPage...');
  
  arrow.classList.remove('inactive');
  titleProxima.classList.remove('inactive');
  movieProximaSection.classList.remove('inactive');
  titleCategories.classList.add('inactive');
  titlePopulary.classList.add('inactive');
  search.classList.add('inactive');
  divConatinerLong.classList.add('inactive');
  previewArticleCategoriesList.classList.add('inactive');
  articleTrendingList.classList.add('inactive');
  trailerButton.classList.add('inactive');
  divFromContainerGeneral.classList.add('inactive');
  moviePopularySection.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  movieDetailsSection.classList.add('inactive');
  btntrending.classList.add('inactive');
  genericListSection.classList.add('inactive'); 

}

function popularyPage() {
  
  console.log('popularyPage...');

  arrow.classList.remove('inactive');
  titlePopulary.classList.remove('inactive');
  moviePopularySection.classList.remove('inactive');
  titleCategories.classList.add('inactive');
  search.classList.add('inactive');
  articleTrendingList.classList.add('inactive');
  divConatinerLong.classList.add('inactive');
  previewArticleCategoriesList.classList.add('inactive');
  divFromContainerGeneral.classList.add('inactive');
  trailerButton.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  movieDetailsSection.classList.add('inactive');
  genericListSection.classList.add('inactive'); 
  btntrending.classList.add('inactive');
  titleProxima.classList.add('inactive');    
  movieProximaSection.classList.add('inactive');
}
