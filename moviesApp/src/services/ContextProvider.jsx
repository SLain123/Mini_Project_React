import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieService from "./movies-service";

const { Provider, Consumer } = React.createContext();

class ContextProvider extends Component {
  state = {
    movieRateList: [],
    workMode: "search",
    onloadingRate: false,
    onFailDownloadRate: false,
    onFailUploadRate: false,
  };

  componentDidMount() {
    this.getGuestRateList(1);
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

    const token = localStorage.getItem("token");

    MovieService.getGuestRateList(token, needPage)
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

  render() {
    const {
      movieRateList,
      workMode,
      onFailDownloadRate,
      onFailUploadRate,
      onloadingRate,
    } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          movieRateList,
          getGuestRateList: this.getGuestRateList,
          cleanGuestRateList: this.cleanGuestRateList,
          changeWorkMode: this.changeWorkMode,
          setRate: this.setRate,
          onFailDownloadRate,
          onFailUploadRate,
          onloadingRate,
          workMode,
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
