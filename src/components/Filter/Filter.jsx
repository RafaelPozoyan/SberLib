import React from "react";
import "./Filter.css";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={filter.title}
            placeholder="Filter by title..."
            onChange={(event) =>
              setFilter({ ...filter, title: event.target.value })
            }
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={filter.author}
            placeholder="Filter by author..."
            onChange={(event) =>
              setFilter({ ...filter, author: event.target.value })
            }
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={filter.isFavorite}
              onChange={(event) =>
                setFilter({ ...filter, isFavorite: !filter.isFavorite })
              }
            />
            Only favorite
          </label>
        </div>
        <button
          type="button"
          onClick={() =>
            setFilter({ title: "", author: "", isFavorite: false })
          }
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
