import React from 'react'

export const Search = () => {
    return (
        <div className='search'>
            <label className='search-label'>Претражи: </label>
            <input
                className='search-input'
                onChange={(e) => console.log(e.target.value)}
            />
        </div>
    )
}
