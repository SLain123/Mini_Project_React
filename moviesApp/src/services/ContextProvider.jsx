import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieService from "./movies-service";

const { Provider, Consumer } = React.createContext();

class ContextProvider extends Component {
  state = {
    movieRateList: [],
    genresListPattern: [],
    workMode: "search",
    onloadingRate: false,
    onFailDownloadRate: false,
    onFailUploadRate: false,
    onFailGenres: false,
  };

  componentDidMount() {
    this.getGuestRateList(1);
    this.getGenres();
  }

  getGuestRateList = (needPage) => {
    const addRateToState = (resultsArr) => {
      this.setState(({ movieRateList }) => {
        const newList = [...movieRateList, ...resultsArr];
        return {
          movieRateList: newList,
          onloadingRate: false,
        };
      });
    };

    MovieService.getGuestRateList(needPage)
      .then(({ results, total_pages: totalPage, page }) => {
        if (results.length === 20 && page !== totalPage) {
          this.getGuestRateList(needPage + 1);
        }
        addRateToState(results);
      })
      .catch((error) => {
        this.setState({
          onFailDownloadRate: error,
        });
      });
  };

  cleanGuestRateList = () => {
    this.setState({
      movieRateList: [],
      onloadingRate: true,
    });
  };

  setRate = (num, id) => {
    this.cleanGuestRateList();
    MovieService.setRate(num, id)
      .then(({ success }) => {
        if (success) {
          setTimeout(() => {
            this.getGuestRateList(1);
          }, 1000);
        }
      })
      .catch((error) => {
        this.setState({
          onFailUploadRate: error,
        });
      });
  };

  changeWorkMode = (workMode) => {
    this.setState({
      workMode,
    });
  };

  getGenres = () => {
    MovieService.getGenres()
      .then((genresListPattern) => this.setState({ genresListPattern }))
      .catch((error) => this.setState({ onFailGenres: error }));
  };

  render() {
    const {
      movieRateList,
      workMode,
      onFailDownloadRate,
      onFailUploadRate,
      onloadingRate,
      genresListPattern,
      onFailGenres,
    } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          getGuestRateList: this.getGuestRateList,
          cleanGuestRateList: this.cleanGuestRateList,
          changeWorkMode: this.changeWorkMode,
          setRate: this.setRate,
          workMode,
          movieRateList,
          onFailDownloadRate,
          onFailUploadRate,
          onloadingRate,
          genresListPattern,
          onFailGenres,
        }}
      >
        {children}
      </Provider>
    );
  }
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextProvider, Consumer as ContextConsumer };
