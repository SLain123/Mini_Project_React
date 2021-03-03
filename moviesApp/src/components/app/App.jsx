import React, { Component } from "react";
import { debounce } from "lodash";
import Tabs from "../tabs";
import Search from "../search";
import MovieService from "../../services/movies-service";
import MovieList from "../movie-list";
import { ContextProvider } from "../contextProvider";

class App extends Component {
  state = {
    movieList: [],
    page: 1,
    totalResults: null,
    workMode: "Search",
    searchWord: "",
    onloading: true,
    onFail: false,
    scroll: false,
    tabs: [
      {
        id: 1,
        label: "Search",
        aria: "Select search section",
      },
      {
        id: 2,
        label: "Rated",
        aria: "Select rate section",
      },
    ],
  };

  updateMovieList = debounce((searchWord, searchPage) => {
    MovieService.getMoviesByTitle(searchWord, searchPage)
      .then(({ results, total_results: totalResults, page }) => {
        if (results.length > 0) {
          this.setState({
            movieList: results,
            totalResults,
            page,
            onloading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          onFail: error,
          onloading: false,
        });
      });
  }, 500);

  componentDidMount() {
    MovieService.returnRightToken();
    this.updateMovieList("bat", 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchWord, page, workMode } = this.state;

    if (
      (prevState.searchWord !== searchWord && searchWord) ||
      prevState.page !== page ||
      prevState.workMode !== workMode
    ) {
      if (workMode === "Search") {
        this.updateMovieList(searchWord, page);
      } else {
        this.getGuestRateList(page);
      }
    }
  }

  getGuestRateList = (ratePage) => {
    setTimeout(() => {
      MovieService.getGuestRateList(ratePage)
        .then(({ results, page, total_results: totalResults }) => {
          this.setState({
            movieList: results,
            page,
            onloading: false,
            totalResults,
          });
        })
        .catch((error) => {
          this.setState({
            onFail: error,
            onloading: false,
          });
        });
    }, 1000);
  };

  setRate = (rating, id) => {
    MovieService.setRate(rating, id).then(({ success }) => {
      if (success) {
        const currentStarsList = JSON.parse(localStorage.getItem("starsList"));

        if (currentStarsList !== null) {
          const newStarsList = [...currentStarsList];
          const doubleIndex = currentStarsList.findIndex(
            ({ id: innerId }) => id === innerId
          );

          if (doubleIndex !== -1) {
            newStarsList[doubleIndex] = { id, rating };
          } else {
            newStarsList.push({ id, rating });
          }

          localStorage.setItem("starsList", JSON.stringify(newStarsList));
        } else {
          localStorage.setItem("starsList", JSON.stringify([{ id, rating }]));
        }
      }
    });
  };

  changeWorkMode = (workMode) => {
    this.setState({
      workMode,
      onloading: true,
      page: 1,
    });
  };

  changeSearchWord = (searchWord) => {
    if (searchWord !== "" && searchWord.match(/[\S]/) !== null) {
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
      scroll: true,
    });
    this.scrollToTop();
  };

  scrollToTop = () => {
    const { scroll, onloading } = this.state;

    setTimeout(() => {
      if (!onloading && scroll) {
        document.querySelector('a[href*="#"]').scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        this.setState({
          scroll: false,
        });
      } else {
        this.scrollToTop();
      }
    }, 250);
  };

  render() {
    const {
      movieList,
      onloading,
      onFail,
      searchWord,
      page,
      totalResults,
      tabs,
      workMode,
    } = this.state;

    return (
      <ContextProvider>
        <div className="app">
          <Tabs
            tabs={tabs}
            workMode={workMode}
            changeWorkMode={this.changeWorkMode}
          />
          <Search
            searchWord={searchWord}
            changeSearchWord={this.changeSearchWord}
            workMode={workMode}
          />
          <MovieList
            movieList={movieList}
            page={page}
            totalResults={totalResults}
            changePage={this.changePage}
            onloading={onloading}
            onFail={onFail}
            workMode={workMode}
            setRate={this.setRate}
          />
        </div>
      </ContextProvider>
    );
  }
}

export default App;
