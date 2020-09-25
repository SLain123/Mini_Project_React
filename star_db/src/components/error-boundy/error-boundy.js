import React, { Component } from 'react';
import ErrorMessage from '../error-message/error-message';

class ErrorBoundy extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error) {
        this.setState({
            hasError: true
        })
        console.log(`Error: ${error}`);
    }

    render() {
        if(this.state.hasError) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundy;