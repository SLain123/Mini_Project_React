import Request from "./request-service";

class MovieService {
  static getMoviesByTitle = (title = "return", page = 1) => {
    const correctTitle = title === "" ? "return" : title;
    return Request.sendRequest(
      `https://api.themoviedb.org/3/search/movie?api_key=174f3d1cd84f12ef2ac5c402cc19a666&query=${correctTitle}&page=${page}`
    );
  };
}

// MovieService.getMoviesByTitle().then((data) => console.log(data));

export default MovieService;

// 174f3d1cd84f12ef2ac5c402cc19a666
