import React from 'react'

export const TableFooter = (props) => {
    return (
        <div>
            <button onClick={() => props.nextPage()}>Next</button>
            <button onClick={() => props.previousPage()}>Previous</button>
        </div>
    )
}
