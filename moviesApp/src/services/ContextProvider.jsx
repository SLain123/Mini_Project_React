/* eslint-disable react/prop-types */
import React, { Component } from "react";
import MovieService from "./movies-service";

const { Provider, Consumer } = React.createContext();

class ContextProvider extends Component {
  state = {
    movieRateList: [],
    workMode: "search",
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
        };
      });
    };

    const token = localStorage.getItem("token");

    MovieService.getGuestRateList(token, needPage).then(
      ({ results, total_pages: totalPage, page }) => {
        if (results.length === 20) {
          if (page !== totalPage) {
            this.getGuestRateList(needPage + 1);
          }
        }
        addRateToState(results);
      }
    );
  };

  cleanGuestRateList = () => {
    this.setState({
      movieRateList: [],
    });
  };

  changeWorkMode = (workMode) => {
    this.setState({
      workMode,
    });
  };

  render() {
    const { movieRateList, workMode } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          movieRateList,
          getGuestRateList: this.getGuestRateList,
          cleanGuestRateList: this.cleanGuestRateList,
          changeWorkMode: this.changeWorkMode,
          workMode,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { ContextProvider, Consumer as ContextConsumer };
