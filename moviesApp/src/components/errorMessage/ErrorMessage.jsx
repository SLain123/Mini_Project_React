import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const ErrorMessage = ({ error }) => (
    <Alert
        className='error'
        type='error'
        message={`Error: Can't download data! ${error}`}
        description='An error occurred while downloading data from a remote server'
        banner
    />
);

ErrorMessage.propTypes = {
    error: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ErrorMessage;
