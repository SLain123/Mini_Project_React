import Request from "./request-service";

class MovieService {
  static getMoviesByTitle = (title = "return", page = 1) => {
    const correctTitle = title === "" ? "return" : title;
    return Request.sendRequest(
      `https://api.themoviedb.org/3/search/movie?api_key=174f3d1cd84f12ef2ac5c402cc19a666&query=${correctTitle}&page=${page}`
    );
  };

  static getGuestSession = (token) =>
    Request.sendRequest(
      `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=174f3d1cd84f12ef2ac5c402cc19a666&language=en-US&sort_by=created_at.asc`
    );

  static getGuestToken = () =>
    Request.sendRequest(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=174f3d1cd84f12ef2ac5c402cc19a666"
    ).then(({ guest_session_id: token }) =>
      localStorage.setItem("token", token)
    );
}

// MovieService.getGuestSession().then((data) => console.log(data));

export default MovieService;

// 174f3d1cd84f12ef2ac5c402cc19a666
