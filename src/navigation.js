window.addEventListener('DOMContentLoaded', navigator); // DOMContentLoaded: Se utiliza para ejecutar código una vez que el DOM está completamente cargado, permitiendo la manipulación de elementos del DOM. en el evento o solo 'load' funciona tambien El evento load se desencadena cuando se ha cargado toda la página, incluidos todos los recursos dependientes, como hojas de estilo e imágenes. Esto contrasta con DOMContentLoaded, que se activa tan pronto como se ha cargado el DOM de la página, sin esperar a que los recursos terminen de cargarse.
window.addEventListener('hashchange', navigator); // hashchange: Se utiliza para detectar cambios en el hash de la URL, permitiendo la navegación en aplicaciones de una sola página sin recargar la página.

headerInicio.addEventListener('click', () => {
  currentPage = 1; // Reinicia la página a 1 al cambiar a populares
  homePage();
  //trendingPreviewHome(currentPage);
  indicadorPage.textContent = `Página ${currentPage}`;
}); 

headerCategorias.addEventListener('click',categoryPage);

headerProximas.addEventListener('click', () => {
  upComingPage();
  getMovioeByUpcoming();
});  

headerPopulares.addEventListener('click', () => {
  currentPage = 1; // Reinicia la página a 1 al cambiar a populares
  popularyPage();
  getMovioeByPopular(currentPage);
  indicadorPage.textContent = `Página ${currentPage}`;
});

headerFavoritas.addEventListener('click', FavoryPage);

arrow.addEventListener('click', () => {
   history.back(); // Retrocede una página en el historial 
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

function updateBtnPre() {
  if (currentPage <= 1) {
    btnPre.disabled = true; 
  } else {
    btnPre.disabled = false;
  }
}

btnNext.addEventListener('click', () => {
  currentPage++; // Incrementa la página actual
    trendingPreviewHome(currentPage); // Llama a la función con la nueva página
    getMovioeByPopular(currentPage);

  console.log(currentPage); 
  indicadorPage.textContent = `Página ${currentPage}`
  document.documentElement.scrollTop = 0;
  updateBtnPre()
})

btnPre.addEventListener('click', () => {

  if(currentPage > 1) {
    currentPage--; // Incrementa la página actual
    trendingPreviewHome(currentPage); // Llama a la función con la nueva página
    getMovioeByPopular(currentPage);

    console.log(currentPage);  
    indicadorPage.textContent = `Página ${currentPage}` 
  }
  document.documentElement.scrollTop = 0;
  updateBtnPre()
})

function navigator() {
  console.log({ location });

  // este metodo nos permite preguntarle a un string osea a location.hash si empieza de cierta forma
if (location.hash.startsWith('#search=')) { 
      searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
     categoryPage();
  } else if (location.hash.startsWith('#populary')) {
    popularyPage();
  } else if (location.hash.startsWith('#proximas')) {
    upComingPage();
  } else {
    homePage();
  }
}

function toggleVisibility(elementsToRemove, elementsToAdd) {
  elementsToRemove.forEach(element => element.classList.remove('inactive'));
  elementsToAdd.forEach(element => element.classList.add('inactive'));
} 

function homePage() {
  console.log('Home...');  
  
  const elementsToRemove = [btntrending, divContrls, search, divFromContainerGeneral, trendingPreviewSection, articleTrendingList];
  const elementsToAdd = [previewArticleCategoriesList, titleFavory, movieFavorySection, titlePopulary, titleProxima, trailerButton, divConatinerLong, arrow, movieDetailsSection, titleCategories, moviePopularySection, genericListSection, movieProximaSection]; 
  
  headerSection.style.background = '';
  divFromContainerGeneral.style.justifyContent = '';
  
  toggleVisibility(elementsToRemove, elementsToAdd);
  trendingPreviewHome(); 
}

function searchPage() {
  console.log('Search...');  

  const elementsToRemove = [search, divContrls, genericListSection, arrow];
  const elementsToAdd = [previewArticleCategoriesList, titleFavory, movieFavorySection, divConatinerLong, titlePopulary, titleProxima, trailerButton, articleTrendingList, titleCategories, moviePopularySection, movieProximaSection, btntrending];

  divFromContainerGeneral.style.display = 'flex';
  divFromContainerGeneral.style.justifyContent = 'center';    
  
  // ['#search', 'platzi']
  const [_, query] = location.hash.split('=');

  toggleVisibility(elementsToRemove, elementsToAdd);
  getMovioeBySearch(query);    
}

function movieDetailsPage() {
  console.log('Movie Details...'); 
  
  const elementsToRemove = [trailerButton, movieDetailsSection, divConatinerLong, arrow];

  const elementsToAdd = [search, titleCategories, genericListSection, divFromContainerGeneral, trendingPreviewSection, titleFavory, movieFavorySection,movieProximaSection, titlePopulary, titleProxima, previewArticleCategoriesList, moviePopularySection, btntrending,articleTrendingList, divContrls];
  divFromContainerGeneral.style.display = '';  

  // ['movie', '123']
  const [_, movieId] = location.hash.split('=');
  
  toggleVisibility(elementsToRemove, elementsToAdd);
  getMovioeByDetalis(movieId);
}

function categoryPage() {
  console.log('Categories...');  

  const elementsToAdd = [search,divContrls, titlePopulary, btntrending, titleProxima, divConatinerLong, movieDetailsSection, moviePopularySection, divFromContainerGeneral, movieProximaSection, trailerButton, titleFavory, movieFavorySection, trendingPreviewSection];
  
  const elementsToRemove = [arrow, titleCategories, genericListSection, previewArticleCategoriesList];

  divFromContainerGeneral.style.display = '';  

  toggleVisibility(elementsToRemove, elementsToAdd);  
  categoriesPreviewHome(); 
}

function FavoryPage() {  
  console.log('FavoryPage...');

  const elementsToAdd = [moviePopularySection, divContrls, titleCategories, articleTrendingList, divConatinerLong, previewArticleCategoriesList, divFromContainerGeneral, trailerButton, trendingPreviewSection, movieDetailsSection, genericListSection, btntrending, titleProxima, movieProximaSection];
  
  const elementsToRemove = [arrow,divContrls,titleFavory,movieFavorySection];

  toggleVisibility(elementsToRemove, elementsToAdd);  
  getLikedMovies()
}

function upComingPage() {

  console.log('upComingPage...');
  
  const elementsToAdd = [divContrls, titleCategories, titlePopulary, search, divConatinerLong, previewArticleCategoriesList, articleTrendingList, trailerButton, divFromContainerGeneral, moviePopularySection, trendingPreviewSection, movieDetailsSection, btntrending, genericListSection, titleFavory, movieFavorySection];
  
  const elementsToRemove = [arrow, titleProxima, movieProximaSection];

  toggleVisibility(elementsToRemove, elementsToAdd); 
}

function popularyPage() {
  
  console.log('popularyPage...');

  arrow.classList.remove('inactive');
  titlePopulary.classList.remove('inactive'); 
  divContrls.classList.remove('inactive');
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
  titleFavory.classList.add('inactive');
  movieFavorySection.classList.add('inactive');
}
