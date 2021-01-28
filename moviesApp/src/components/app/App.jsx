import React, { Component } from "react";
import * as _ from "lodash";
import Search from "../search";
import MovieService from "../../services/movies-service";
import MovieList from "../movie-list";

class App extends Component {
  state = {
    movieListArr: [],
    onLoad: true,
    onFail: false,
    searchWord: "",
    page: 1,
    totalResults: null,
  };

  updateMovieList = _.debounce((searchWord, searchPage) => {
    MovieService.getMoviesByTitle(searchWord, searchPage)
      .then(({ results, total_results: totalResults, page }) => {
        this.setState({
          movieListArr: results,
          totalResults,
          page,
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
    this.updateMovieList("return", 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;

    if (
      (prevState.searchWord !== searchWord && searchWord) ||
      prevState.page !== page
    ) {
      this.updateMovieList(searchWord, page);
    }
  }

  changeSearchWord = (searchWord) => {
    if (searchWord !== "") {
      this.setState({
        onLoad: true,
      });
    }

    this.setState({
      searchWord,
      page: 1,
    });
  };

  changePage = (page) => {
    this.setState({
      page,
      onLoad: true,
    });
  };

  render() {
    const {
      movieListArr,
      onLoad,
      onFail,
      searchWord,
      page,
      totalResults,
    } = this.state;

    return (
      <div className="app">
        <Search
          searchWord={searchWord}
          changeSearchWord={this.changeSearchWord}
        />
        <MovieList
          movieListArr={movieListArr}
          onLoad={onLoad}
          onFail={onFail}
          page={page}
          totalResults={totalResults}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default App;
