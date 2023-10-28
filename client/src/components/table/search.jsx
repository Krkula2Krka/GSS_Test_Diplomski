import React from 'react'
import toast from 'react-hot-toast'

export const Search = (props) => {
    return (
        <div className='search'>
            <label className='search-label'>Претражи: </label>
            <input
                className='search-input'
                onChange={(e) => {
                    if (props.selectedItems.length === 0) {
                        toast.remove()
                        toast.error(
                            'Нисте изабрали ниједан параметар за претрагу'
                        )
                    } else props.searchItems(e.target.value)
                }}
            />
        </div>
    )
}
