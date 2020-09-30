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
            <div className="test-error">
                <button 
                    className="test-error__btn" 
                    onClick={() => this.setState({renderError: true})}>
                        Get Error
                </button>
            </div>
        )
    }
}

export default TestError;