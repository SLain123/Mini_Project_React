/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Spin, Alert } from "antd";
import MovieService from "../../services/movies-service";
import MovieList from "../movie-list";

class App extends Component {
  state = {
    movieListArr: [],
    onLoad: true,
    onFail: false,
  };

  componentDidMount() {
    MovieService.getMoviesByTitle("return")
      .then(({ results }) => {
        this.setState({
          movieListArr: results,
          onLoad: false,
        });
      })
      .catch((error) => {
        this.setState({
          onFail: error,
          onLoad: false,
        });
      });
  }

  render() {
    const { movieListArr, onLoad, onFail } = this.state;
    let content = <MovieList movieListArr={movieListArr} />;

    if (onLoad) {
      content = <Spin tip="Loading..." size="large" />;
    } else if (!onLoad && onFail) {
      content = (
        <Alert
          type="error"
          message={`Error: Can't download data! ${onFail}`}
          description="An error occurred while downloading data from a remote server"
          banner
        />
      );
    }

    return <div className="app">{content}</div>;
  }
}

export default App;
