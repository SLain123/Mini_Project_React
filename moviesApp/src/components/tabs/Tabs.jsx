import React from "react";
import PropTypes from "prop-types";

const Tabs = ({ changeWorkMode, workMode }) => (
  <div className="tabs">
    <button
      className={
        workMode === "search" ? "tabs__btn tabs__btn_active" : "tabs__btn"
      }
      type="button"
      aria-label="Select search section"
      onClick={() => {
        changeWorkMode("search");
      }}
    >
      Search
    </button>
    <button
      className={
        workMode === "rated" ? "tabs__btn tabs__btn_active" : "tabs__btn"
      }
      type="button"
      aria-label="Select rate section"
      onClick={() => {
        changeWorkMode("rated");
      }}
    >
      Rated
    </button>
  </div>
);

Tabs.propTypes = {
  changeWorkMode: PropTypes.func.isRequired,
  workMode: PropTypes.string,
};

Tabs.defaultProps = {
  workMode: "search",
};

export default Tabs;
