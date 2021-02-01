/* eslint-disable arrow-body-style */
import Request from "./request-service";

class MovieService {
  static getMoviesByTitle = (title = "return", page = 1) => {
    const correctTitle = title === "" ? "return" : title;
    return Request.sendRequest(
      `https://api.themoviedb.org/3/search/movie?api_key=174f3d1cd84f12ef2ac5c402cc19a666&query=${correctTitle}&page=${page}`
    );
  };

  static getGuestToken = () =>
    Request.sendRequest(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=174f3d1cd84f12ef2ac5c402cc19a666"
    ).then(({ guest_session_id: token }) =>
      localStorage.setItem("token", token)
    );

  static getGuestRateList = (token, page) => {
    return Request.sendRequest(
      `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=174f3d1cd84f12ef2ac5c402cc19a666&language=en-US&sort_by=created_at.asc&page=${page}`
    );
  };

  static setRate = async (rateNum, movieId) => {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=174f3d1cd84f12ef2ac5c402cc19a666&guest_session_id=dd7078c9124ef4fa5a2cd94b5beed17e`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rateNum }),
      }
    );
    const result = await request.json();

    return result;
  };
}

// MovieService.getGuestToken();

// MovieService.getGuestRateList(localStorage.getItem('token'), 2).then((data) =>
//     console.log(data),
// );

export default MovieService;

// 174f3d1cd84f12ef2ac5c402cc19a666
