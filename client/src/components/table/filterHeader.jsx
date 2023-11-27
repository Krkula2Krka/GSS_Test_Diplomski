// libraries
import React, { Fragment } from 'react'

// css
import '../../css/table.css'

export const FilterHeader = (props) => {
    return (
        <div className='header filter-header'>
            {props.calledFrom !== 'results' ? (
                <div className='filter-container'>
                    <div className='search-label'>Претражи:</div>
                    <input
                        onChange={(e) => {
                            props.setPage(0)
                            props.setSearchInput({
                                search: e.target.value.trim()
                            })
                        }}
                    />
                </div>
            ) : null}
            {props.searchFields.map((searchField, index) => {
                return searchField.type === 'enum' ? (
                    <div key={index} className='filter-container'>
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
                    </div>
                ) : searchField.type === 'bool' ? (
                    <div key={index} className='filter-container'>
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
                    </div>
                ) : searchField.type === 'int' ? (
                    <div key={index} className='filter-container'>
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
                    </div>
                ) : searchField.type === 'date' ? (
                    <div key={index} className='filter-container'>
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
                    </div>
                ) : null
            })}
        </div>
    )
}
