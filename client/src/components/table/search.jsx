import React from 'react'

export const Search = (props) => {
    return (
        <div className="search">
            <label className="search-label">Претражи: </label>
            <input
                className="search-input"
                onChange={(e) => props.searchItems(e.target.value)}
            />
        </div>
    )
}
