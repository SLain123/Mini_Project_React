import React, {Component} from 'react';

class TestError extends Component {
    state = {
        renderError: false
    }

    render() {
        if(this.state.renderError) {
            this.foo.bar = 0;
        }
        return (
            <button onClick={() => this.setState({renderError: true})}>Error</button>
        )
    }
}

export default TestError;