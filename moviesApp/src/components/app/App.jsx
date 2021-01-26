/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { Spin, Alert } from "antd";
import * as _ from "lodash";
import Search from "../search";
import MovieService from "../../services/movies-service";
import MovieList from "../movie-list";

const MainContent = ({
  movieListArr,
  searchWord,
  changeSearchWord,
  onLoad,
  onFail,
}) => {
  if (onLoad) {
    return <Spin tip="Loading..." size="large" />;
  }
  if (!onLoad && onFail) {
    return (
      <Alert
        type="error"
        message={`Error: Can't download data! ${onFail}`}
        description="An error occurred while downloading data from a remote server"
        banner
      />
    );
  }
  return (
    <>
      <Search searchWord={searchWord} changeSearchWord={changeSearchWord} />
      <MovieList movieListArr={movieListArr} />
    </>
  );
};

class App extends Component {
  state = {
    movieListArr: [],
    onLoad: true,
    onFail: false,
    searchWord: "",
  };

  updateMovieList = _.debounce((searchWord) => {
    MovieService.getMoviesByTitle(searchWord)
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
  }, 500);

  componentDidMount() {
    this.updateMovieList("return");
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchWord } = this.state;
    if (prevState.searchWord !== searchWord && searchWord) {
      this.updateMovieList(searchWord);
    }
  }

  changeSearchWord = (searchWord) => {
    this.setState({
      searchWord,
    });
  };

  render() {
    const { movieListArr, onLoad, onFail, searchWord } = this.state;

    return (
      <div className="app">
        <MainContent
          movieListArr={movieListArr}
          searchWord={searchWord}
          changeSearchWord={this.changeSearchWord}
          onLoad={onLoad}
          onFail={onFail}
        />
      </div>
    );
  }
}

export default App;
