import React from 'react';
import PropTypes from 'prop-types';
import { ContextConsumer } from '../contextProvider/ContextProvider';

const Tabs = ({ tabs }) => (
    <ContextConsumer>
        {({ workMode, changeWorkMode }) => (
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
        )}
    </ContextConsumer>
);

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tabs;
