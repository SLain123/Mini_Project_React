/* eslint-disable arrow-body-style */
import Request from "./request-service";

class MovieService {
  static getMoviesByTitle = (title = "return", needPage = 1) => {
    const correctTitle = title === "" ? "return" : title;
    return Request.getRequest(
      `https://api.themoviedb.org/3/search/movie?api_key=174f3d1cd84f12ef2ac5c402cc19a666&query=${correctTitle}&page=${needPage}`
    );
  };

  static getGuestToken = () =>
    Request.getRequest(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=174f3d1cd84f12ef2ac5c402cc19a666"
    ).then(({ guest_session_id: token, expires_at: expData }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("expData", expData);
    });

  static getGuestRateList = (token, needPage) => {
    return Request.getRequest(
      `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=174f3d1cd84f12ef2ac5c402cc19a666&language=en-US&sort_by=created_at.asc&page=${needPage}`
    );
  };

  static setRate = async (rateNum, movieId) => {
    const token = localStorage.getItem("token");

    return Request.postRequest(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=174f3d1cd84f12ef2ac5c402cc19a666&guest_session_id=${token}`,
      JSON.stringify({ value: rateNum })
    );
  };
}

// MovieService.getGuestToken();

// MovieService.getGuestRateList(localStorage.getItem('token'), 1).then((data) =>
//     console.log(data),
// );

export default MovieService;

// 174f3d1cd84f12ef2ac5c402cc19a666
