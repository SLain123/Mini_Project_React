import React from "react";
import { ContextConsumer } from "../../services/ContextProvider";

const Tabs = () => (
  <ContextConsumer>
    {({ workMode, changeWorkMode }) => (
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
    )}
  </ContextConsumer>
);

export default Tabs;
