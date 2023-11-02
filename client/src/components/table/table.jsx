// libraries
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from 'react-router-dom'

// css
import '../../css/table.css'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ImPlus } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'
import { BiChevronsRight } from 'react-icons/bi'
import { BiChevronsLeft } from 'react-icons/bi'

export const Table = (props) => {
    const tableData = useMemo(() => props.tableData, [props.tableData])
    const tableColumns = useMemo(() => props.tableColumns, [props.tableColumns])
    const [api, setApi] = useState(null)

    const navigate = useNavigate()

    const defaultColumn = useMemo(
        () => ({
            flex: 1,
            sortable: true,
            cellStyle: { color: '#F5F5F5', backgroundColor: '#060B26' }
        }),
        []
    )

    useEffect(() => {
        return () => {
            props.setSearchInput({ search: '' })
            props.setSearchFilters({ search: '' })
            props.setPageSize({ pageSize: 30 })
            props.setStartId({ startId: '1' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='tableContainer'>
            <div className='header'>
                <button
                    className='userButton'
                    onClick={() => {
                        const selectedItems =
                            props.calledFrom === 'users'
                                ? api
                                      .getSelectedRows()
                                      .map((row) => row.GSS_identification)
                                : api.getSelectedRows().map((row) => row.id)
                        if (selectedItems.length === 0) {
                            toast.remove()
                            toast.error(
                                'Један или више редова мора бити изабрано за опцију брисања.'
                            )
                        } else {
                            props.deleteItems(selectedItems)
                        }
                    }}
                >
                    <RiDeleteBin6Fill />
                </button>
                <button className='userButton' onClick={props.openAddForm}>
                    <ImPlus />
                </button>
                <button
                    className='userButton'
                    onClick={() => {
                        const selectedItems =
                            props.calledFrom === 'users'
                                ? api
                                      .getSelectedRows()
                                      .map((row) => row.GSS_identification)
                                : api.getSelectedRows().map((row) => row.id)
                        if (selectedItems.length !== 1) {
                            toast.remove()
                            toast.error(
                                'Један ред мора бити изабран за опцију ажурирања.'
                            )
                        } else props.openEditForm(selectedItems[0])
                    }}
                >
                    <AiFillEdit />
                </button>
                <select
                    onChange={(e) => {
                        props.setPage(0)
                        props.setPageSize({
                            pageSize: Number(e.target.value)
                        })
                    }}
                >
                    <option value='30'>30</option>
                    <option value='25'>25</option>
                    <option value='20'>20</option>
                    <option value='15'>15</option>
                    <option value='10'>10</option>
                    <option value='1'>1</option>
                </select>
                <button
                    className='userButton'
                    onClick={() => {
                        props.setPage(props.page - 1)
                    }}
                    disabled={props.page === 0}
                >
                    <BiChevronsLeft />
                </button>
                <button
                    className='userButton'
                    onClick={() => {
                        props.setPage(props.page + 1)
                    }}
                    disabled={
                        (props.page + 1) * props.pageSize >= props.usersCount
                    }
                >
                    <BiChevronsRight />
                </button>
            </div>
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
                        <>
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
                            <select className='table-select'>
                                <option value='gte'>веће или једнако</option>
                                <option value='lte'>мање или једнако</option>
                            </select>
                        </>
                    ) : null
                })}
            </div>
            <div className='ag-theme-alpine'>
                <AgGridReact
                    columnDefs={tableColumns}
                    domLayout='autoHeight'
                    rowSelection='multiple'
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    rowData={tableData}
                    onGridReady={(e) => setApi(e.api)}
                    onCellClicked={(e) => {
                        const location =
                            props.calledFrom === 'users'
                                ? `/userResults/${e.data.GSS_identification}`
                                : props.calledFrom === 'questions'
                                ? `/questionDetails/${e.data.id}`
                                : null
                        if (location !== null) {
                            navigate(location, {
                                state: {
                                    questionText: e.data.question_text,
                                    difficulty: e.data.difficulty,
                                    importance: e.data.importance
                                }
                            })
                        }
                    }}
                />
            </div>
        </div>
    )
}
