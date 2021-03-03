import Request from './request-service';

class MovieService {
    static getMoviesByTitle = (title, needPage = 1) => {
        const correctTitle =
            title === '' || title.match(/[\S]/) === null ? 'bat' : title;
        return Request.getRequest(
            `https://api.themoviedb.org/3/search/movie?api_key=174f3d1cd84f12ef2ac5c402cc19a666&query=${correctTitle}&page=${needPage}`,
        );
    };

    static getGuestToken = () =>
        Request.getRequest(
            'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=174f3d1cd84f12ef2ac5c402cc19a666',
        ).then(({ guest_session_id: token, expires_at: expDate }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('expDate', expDate);
        });

    static getGuestRateList = (needPage) =>
        MovieService.returnRightToken().then((token) =>
            Request.getRequest(
                `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=174f3d1cd84f12ef2ac5c402cc19a666&language=en-US&sort_by=created_at.asc&page=${needPage}`,
            ),
        );

    static setRate = async (rateNum, movieId) =>
        MovieService.returnRightToken().then((token) =>
            Request.postRequest(
                `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=174f3d1cd84f12ef2ac5c402cc19a666&guest_session_id=${token}`,
                JSON.stringify({ value: rateNum }),
            ),
        );

    static returnRightToken = async () => {
        const expDate = new Date(localStorage.getItem('expDate'));
        const currentDate = new Date();

        if (expDate <= currentDate) {
            await MovieService.getGuestToken();
            return localStorage.getItem('token');
        }

        return localStorage.getItem('token');
    };

    static getGenres = () =>
        Request.getRequest(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=174f3d1cd84f12ef2ac5c402cc19a666&language=en-US',
        ).then(({ genres }) => genres);
}

export default MovieService;

// 174f3d1cd84f12ef2ac5c402cc19a666
