// libraries
import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import toast from 'react-hot-toast'
import { AgGridReact } from 'ag-grid-react'

// components
import { TableRow } from './tableRow'
import { TableRowName } from './tableRowName'
import { TableHeader } from './tableHeader'

// css
import '../../css/table.css'
import { TableFooter } from './tableFooter'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom'

export const Table = (props) => {
    const [selectedItems, setSelectedItems] = useState(() => new Set())
    const tableData = useMemo(() => props.tableData, [props.tableData])
    const tableColumns = useMemo(() => props.tableColumns, [props.tableColumns])
    const tableColumnsAgGrid = useMemo(
        () => props.tableColumnsAgGrid,
        [props.tableColumnsAgGrid]
    )

    const navigate = useNavigate()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns
    } = useTable(
        { columns: tableColumns, data: tableData },
        useFilters,
        useSortBy,
        usePagination
    )

    const defaultColumn = useMemo(
        () => ({
            flex: 1,
            sortable: true,
            filterParams: {
                buttons: ['apply', 'clear']
            }
        }),
        []
    )

    return (
        <div className='tableContainer'>
            <div className='ag-theme-alpine' style={{ height: 500 }}>
                <AgGridReact
                    rowData={tableData}
                    columnDefs={tableColumnsAgGrid}
                    rowSelection='multiple'
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    onCellClicked={(e) => {
                        console.log(e.data)
                        const location =
                            props.calledFrom === 'users'
                                ? `/userResults/${e.data.GSS_identification}`
                                : props.calledFrom === 'questions'
                                ? `/questionDetails/${e.data.id}`
                                : null
                        navigate(location, {
                            state: {
                                questionText: e.data.question_text,
                                difficulty: e.data.difficulty,
                                importance: e.data.importance
                            }
                        })
                    }}
                />
            </div>
            <TableHeader
                openAddForm={props.openAddForm}
                openEditForm={() => {
                    const items = Array.from(selectedItems)
                    if (items.length !== 1) {
                        toast.remove()
                        toast.error(
                            'Један ред мора бити изабран за опцију ажурирања.'
                        )
                    } else props.openEditForm(items[0])
                }}
                calledFrom={props.calledFrom}
                deleteItems={() => {
                    const items = Array.from(selectedItems)
                    if (items.length === 0) {
                        toast.remove()
                        toast.error(
                            'Један или више редова мора бити изабрано за опцију брисања.'
                        )
                    } else {
                        props.deleteItems(items)
                        setSelectedItems(new Set())
                    }
                }}
                allColumns={allColumns}
            />
            <div className='table-main-wrapper'>
                <table className='table-main' {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, key) => (
                            <TableRowName headerGroup={headerGroup} key={key} />
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <TableRow
                                    row={row}
                                    key={row.id}
                                    goto={
                                        props.calledFrom === 'users'
                                            ? `/userResults/${row.original.GSS_identification}`
                                            : props.calledFrom === 'questions'
                                            ? `/questionDetails/${row.original.id}`
                                            : null
                                    }
                                    selectID={() =>
                                        setSelectedItems((prev) =>
                                            new Set(prev).add(
                                                props.calledFrom === 'users'
                                                    ? row.original
                                                          .GSS_identification
                                                    : row.original.id
                                            )
                                        )
                                    }
                                    unselectID={() =>
                                        setSelectedItems((prev) => {
                                            const next = new Set(prev)
                                            next.delete(
                                                props.calledFrom === 'users'
                                                    ? row.original
                                                          .GSS_identification
                                                    : row.original.id
                                            )
                                            return next
                                        })
                                    }
                                    checkIfItemExists={() =>
                                        selectedItems.has(
                                            props.calledFrom === 'users'
                                                ? row.original
                                                      .GSS_identification
                                                : row.original.id
                                        )
                                    }
                                    selectMode={() => selectedItems.size !== 0}
                                    calledFrom={props.calledFrom}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <TableFooter
                nextPage={props.nextPage}
                previousPage={props.previousPage}
                specificPage={props.specificPage}
            />
        </div>
    )
}
