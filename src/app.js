// Abstraccion

function createMovie(movie, container) { // Le enviamos el llamado a la API y el contenedor al q queremos iterar

  container.innerHTML = '', // Limpia lo q este y evita la carga dulicada

  movie.forEach(movie => {        
    const movieConatainer = document.createElement('div');
    movieConatainer.classList.add('movie-container');
    movieConatainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    movieImg.setAttribute('alt', movie.title)

    movieConatainer.appendChild(movieImg)
    container.appendChild(movieConatainer)
  });
}

function createDeltailsMovie(movie, container) {

    container.innerHTML = ''; //evita la carga duplicada  

    movie.forEach(category => {        
      const categoriesConatainer = document.createElement('div');
      categoriesConatainer.classList.add('category-container');

      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;

      // ['#category', 'id-name']
      const [_, categoryData] = location.hash.split('=');
      const [categoryId, categoryName] = categoryData.split('-');

      titleCategories.innerHTML = categoryName;
      
      document.documentElement.scrollTop = 0;
      getMovioeByCategory(categoryId)

      });

      const categoriesTitleText = document.createTextNode(category.name);      
      
      categoryTitle.appendChild(categoriesTitleText);
      categoriesConatainer.appendChild(categoryTitle);
      container.appendChild(categoriesConatainer);
    });
}

async function trendingPreviewHome(page = 1) { // Agrega un parámetro para la página
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, {
      method: 'GET',
      headers: {        
        Authorization: API_TOKEN,
      }
    })
    const data = await res.json();
    const movie = data.results
    console.log('tendencias-home:', {movie});
    
    createMovie(movie, articleTrendingList); // contenedor de tendendia se coloca aqui

  } catch (error) {
    console.error(error);    
  }
}

async function categoriesPreviewHome() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      method: 'GET',
      headers: {   
        Authorization: API_TOKEN,
      }
    })
    const data = await res.json();
    const categories = data.genres
    console.log('list-categories:',{categories});    
    
    createDeltailsMovie(categories, previewArticleCategoriesList);

  } catch (error) {
    console.error(error);    
  }
}

async function getMovioeByCategory(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, {

      method: 'GET',
      headers: {        
        Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    const movie = data.results
    console.log('ID-category:', {movie});
    
    createMovie(movie, genericListSection);

  } catch (error) {
    console.error(error);    
  }
}

async function getMovioeBySearch(query) {
  try {
    //const encodedQuery = encodeURIComponent(query); // Codifica el query
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, {

      method: 'GET',
      headers: {       
         Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    const movie = data.results
    console.log('search:', {movie});
    
    createMovie(movie, genericListSection);

  } catch (error) {
    console.error(error);    
  }
}

async function getMovioeByDetalis(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {

      method: 'GET',
      headers: {       
         Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    console.log('categoryIDDetails:', {data});    

    const movieImg = `https://image.tmdb.org/t/p/w300${data.poster_path}`;

    divConatinerLong.style.backgroundImage = `url(${movieImg})`
    titleMovieDetails.textContent = data.title; 
    spanMovieDetails.textContent = `⭐${data.vote_average.toFixed(1)}`;
    parrafoMovieDetails.textContent = data.overview;
    spanDateReleaseDetails.textContent = data.release_date;

   createDeltailsMovie(data.genres, articleCategoriesList);
   document.documentElement.scrollTop = 0;

   getMovioeByRecommendations(id)
  } catch (error) {
    console.error(error);    
  }
}

async function getMovioeByUpcoming() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, {

      method: 'GET',
      headers: {       
         Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    const movie = data.results
    console.log('Proximas:', {movie});    

    createMovie(movie, movieProximaSection);

} catch (error) {
    console.error(error);    
  }
}

async function getMovioeByRecommendations(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, {

      method: 'GET',
      headers: {       
         Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    const movie = data.results
    console.log('Recomendadas:', {movie});    

    createMovie(movie, movieRecomentSection);

  } catch (error) {
    console.error(error);    
  }
}

async function getMovioeByPopular() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {

      method: 'GET',
      headers: {       
         Authorization: API_TOKEN,
      },
    })
    const data = await res.json();
    const movie = data.results
    console.log('Populares:', {movie});    

    createMovie(movie, moviePopularySection);

  } catch (error) {
    console.error(error);    
  }
}