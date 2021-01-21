import React, { Component } from 'react';
import MovieService from '../../services/movies-service';
import MovieList from '../movie-list';

class App extends Component {
    state = {
        movieListArr: [],
    };

    componentDidMount() {
        MovieService.getMoviesByTitle('return').then(({ results }) => {
            this.setState({
              movieListArr: results,
            });
        });
    }

    render() {
        const { movieListArr } = this.state;
        return (
            <div className='App'>
                <MovieList movieListArr={movieListArr} />
            </div>
        );
    }
}

export default App;
