import React from "react";
import { ContextConsumer } from "../../services/ContextProvider";

const Tabs = () => (
  <ContextConsumer>
    {({ workMode, changeWorkMode }) => (
      <header className="tabs">
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
        <a href="#head" className="tabs-anchor">
          ANCHOR
        </a>
      </header>
    )}
  </ContextConsumer>
);

export default Tabs;
