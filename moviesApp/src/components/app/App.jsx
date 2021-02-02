/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import * as _ from "lodash";
import Tabs from "../tabs";
import Search from "../search";
import MovieService from "../../services/movies-service";
import MovieList from "../movie-list";
import { ContextProvider } from "../../services/ContextProvider";

class App extends Component {
  state = {
    movieSearchList: [],
    onloading: true,
    onFail: false,
    searchWord: "",
    page: 1,
    totalResults: null,
  };

  updateMovieList = _.debounce((searchWord, searchPage) => {
    MovieService.getMoviesByTitle(searchWord, searchPage)
      .then(({ results, total_results: totalResults, page }) => {
        this.setState({
          movieSearchList: results,
          totalResults,
          page,
          onloading: false,
        });
      })
      .catch((error) => {
        this.setState({
          onFail: error,
          onloading: false,
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
        onloading: true,
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
      onloading: true,
    });
  };

  render() {
    const {
      movieSearchList,
      onloading,
      onFail,
      searchWord,
      page,
      totalResults,
      workMode,
    } = this.state;

    return (
      <ContextProvider>
        <div className="app">
          <Tabs />
          <Search
            searchWord={searchWord}
            changeSearchWord={this.changeSearchWord}
          />
          <MovieList
            movieSearchList={movieSearchList}
            onloading={onloading}
            onFail={onFail}
            page={page}
            totalResults={totalResults}
            changePage={this.changePage}
            workMode={workMode}
          />
        </div>
      </ContextProvider>
    );
  }
}

export default App;
