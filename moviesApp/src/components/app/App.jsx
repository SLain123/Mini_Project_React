import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Spin } from 'antd';
import ErrorMessage from '../errorMessage';
import Tabs from '../tabs';
import Search from '../search';
import MovieService from '../../services/movies-service';
import MovieList from '../movie-list';
import { ContextProvider } from '../contextProvider';

class App extends Component {
    state = {
        movieSearchList: [],
        onloadingSearch: true,
        onFailSearch: false,
        searchWord: '',
        page: 1,
        totalResults: null,
        scroll: false,
    };

    updateMovieList = debounce((searchWord, searchPage) => {
        if (searchWord !== '' && searchWord.match(/[\S]/) !== null) {
            MovieService.getMoviesByTitle(searchWord, searchPage)
                .then(({ results, total_results: totalResults, page }) => {
                    this.setState({
                        movieSearchList: results,
                        totalResults,
                        page,
                        onloadingSearch: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        onFailSearch: error,
                        onloadingSearch: false,
                    });
                });
        }
    }, 500);

    componentDidMount() {
        this.updateMovieList('return', 1);
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
        if (searchWord !== '' && searchWord.match(/[\S]/) !== null) {
            this.setState({
                onloadingSearch: true,
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
            onloadingSearch: true,
            scroll: true,
        });
        this.scrollToTop();
    };

    scrollToTop = () => {
        const { scroll, onloadingSearch } = this.state;

        setTimeout(() => {
            if (!onloadingSearch && scroll) {
                document.querySelector('a[href*="#"]').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
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
            movieSearchList,
            onloadingSearch,
            onFailSearch,
            searchWord,
            page,
            totalResults,
            workMode,
        } = this.state;

        const loadContent = onloadingSearch ? (
            <Spin tip='Loading...' size='large' />
        ) : (
            <MovieList
                movieSearchList={movieSearchList}
                page={page}
                totalResults={totalResults}
                changePage={this.changePage}
                workMode={workMode}
            />
        );

        const isError = onFailSearch ? (
            <ErrorMessage error={onFailSearch} />
        ) : null;

        return (
            <ContextProvider>
                <div className='app'>
                    <Tabs />
                    <Search
                        searchWord={searchWord}
                        changeSearchWord={this.changeSearchWord}
                    />
                    {loadContent}
                    {isError}
                </div>
            </ContextProvider>
        );
    }
}

export default App;
