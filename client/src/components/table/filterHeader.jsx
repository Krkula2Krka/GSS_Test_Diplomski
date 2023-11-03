// libraries
import React, { Fragment } from 'react'

// css
import '../../css/table.css'

export const FilterHeader = (props) => {
    return (
        <div className='header'>
            <div className='search-label'>Претражи:</div>
            <input
                onChange={(e) => {
                    props.setPage(0)
                    props.setSearchInput({ search: e.target.value.trim() })
                }}
            />
            {props.searchFields.map((searchField, index) => {
                return searchField.type === 'enum' ? (
                    <select
                        className='table-select'
                        key={index}
                        onChange={(e) => {
                            props.setPage(0)
                            props.setSearchFilters({
                                search: e.target.value
                            })
                        }}
                    >
                        <option value='сви'>сви</option>
                        {searchField.values.map((value, index) => {
                            return (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            )
                        })}
                    </select>
                ) : searchField.type === 'int' ? (
                    <Fragment key={index}>
                        <div className='search-label'>
                            Претражи по идентификатору:
                        </div>
                        <input
                            type='number'
                            min='1'
                            onChange={(e) => {
                                props.setPage(0)
                                props.setStartId({
                                    startId: e.target.value
                                })
                            }}
                        />
                        <select
                            className='table-select'
                            onChange={(e) => {
                                props.setPage(0)
                                props.setOperator({
                                    operator: e.target.value
                                })
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
