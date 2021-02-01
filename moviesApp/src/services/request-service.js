class Request {
  static sendRequest = async (url) => {
    const request = await fetch(url);
    const result = await request.json();

    return result;
  };
}

export default Request;

// https://api.themoviedb.org/3/movie/635744/rating?api_key=174f3d1cd84f12ef2ac5c402cc19a666&guest_session_id=53f32a0b4f52234021bef57b96f2c8af
