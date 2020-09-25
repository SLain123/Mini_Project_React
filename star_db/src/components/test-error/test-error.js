import React, {Component} from 'react';
import './test-error.css';

class TestError extends Component {
    state = {
        renderError: false
    }

    render() {
        if(this.state.renderError) {
            this.foo.bar = 0;
        }
        return (
            <button className="test-error" onClick={() => this.setState({renderError: true})}>Get Error</button>
        )
    }
}

export default TestError;