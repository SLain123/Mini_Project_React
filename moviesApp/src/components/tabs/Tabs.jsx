import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ tabs, workMode, changeWorkMode }) => (
    <header className='tabs'>
        {tabs.map(({ id, label, aria }) => (
            <button
                key={id}
                className={
                    workMode === label
                        ? 'tabs__btn tabs__btn_active'
                        : 'tabs__btn'
                }
                type='button'
                aria-label={aria}
                onClick={() => {
                    changeWorkMode(label);
                }}
            >
                {label}
            </button>
        ))}

        <a href='#head' className='tabs-anchor'>
            ANCHOR
        </a>
    </header>
);

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    workMode: PropTypes.string,
    changeWorkMode: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
    workMode: 'Search',
};

export default Tabs;
