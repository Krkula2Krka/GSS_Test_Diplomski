// libraries
import React, { Fragment } from 'react'

// css
import '../../css/table.css'

export const FilterHeader = (props) => {
    return (
        <div className='header'>
            {props.calledFrom !== 'results' ? (
                <>
                    <div className='search-label'>Претражи:</div>
                    <input
                        onChange={(e) => {
                            props.setPage(0)
                            props.setSearchInput({
                                search: e.target.value.trim()
                            })
                        }}
                    />
                </>
            ) : null}
            {props.searchFields.map((searchField, index) => {
                return searchField.type === 'enum' ? (
                    <Fragment key={index}>
                        <div className='search-label'>
                            {searchField.display}
                        </div>
                        <select
                            className='table-select'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.filters(e.target.value)
                            }}
                        >
                            <option value='све'>све</option>
                            {searchField.values.map((value, index) => {
                                return (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                )
                            })}
                        </select>
                    </Fragment>
                ) : searchField.type === 'bool' ? (
                    <Fragment key={index}>
                        <div className='search-label'>
                            {searchField.display}
                        </div>
                        <select
                            className='table-select'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.filters(e.target.value)
                            }}
                        >
                            <option value='оба'>оба</option>
                            {searchField.values.map((value, index) => {
                                return (
                                    <option key={index} value={value}>
                                        {value === true ? <>да</> : <>не</>}
                                    </option>
                                )
                            })}
                        </select>
                    </Fragment>
                ) : searchField.type === 'int' ? (
                    <Fragment key={index}>
                        <div className='search-label'>
                            {searchField.display}
                        </div>
                        <input
                            type='number'
                            min='0'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.filters(e.target.value)
                            }}
                        />
                        <select
                            className='table-select'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.operator(e.target.value)
                            }}
                        >
                            <option value='gte'>веће или једнако</option>
                            <option value='lte'>мање или једнако</option>
                        </select>
                    </Fragment>
                ) : searchField.type === 'date' ? (
                    <Fragment key={index}>
                        <div className='search-label'>
                            {searchField.display}
                        </div>
                        <input
                            type='date'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.filters(e.target.value)
                            }}
                        />
                        <select
                            className='table-select'
                            onChange={(e) => {
                                props.setPage(0)
                                searchField.operator(e.target.value)
                            }}
                        >
                            <option value='gte'>веће или једнако</option>
                            <option value='lte'>мање или једнако</option>
                        </select>
                    </Fragment>
                ) : null
            })}
        </div>
    )
}
