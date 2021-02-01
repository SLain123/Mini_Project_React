/* eslint-disable react/prop-types */
import React, { Component } from "react";
import MovieService from "./movies-service";

const { Provider, Consumer } = React.createContext();

class ContextProvider extends Component {
  state = {
    movieRateList: [],
  };

  getGuestRateList = (page) => {
    const token = localStorage.getItem("token");
    MovieService.getGuestRateList(token, page).then(({ results }) => {
      if (results.length === 20) {
        this.setState(({ movieRateList }) => {
          const newList = [...movieRateList, ...results];
          return {
            movieRateList: newList,
          };
        });

        this.getGuestRateList(page + 1);
      }

      this.setState(({ movieRateList }) => {
        const newList = [...movieRateList, ...results];
        return {
          movieRateList: newList,
        };
      });
    });
  };

  cleanGuestRateList = () => {
    this.setState({
      movieRateList: [],
    });
  };

  render() {
    const { movieRateList } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          movieRateList,
          getGuestRateList: this.getGuestRateList,
          cleanGuestRateList: this.cleanGuestRateList,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { ContextProvider, Consumer as ContextConsumer };
