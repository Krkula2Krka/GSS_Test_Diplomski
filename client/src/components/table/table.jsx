// libraries
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AgGridReact } from 'ag-grid-react'

// components
import { TableHeader } from './tableHeader'

// css
import '../../css/table.css'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom'

export const Table = (props) => {
    const [selectedItems, setSelectedItems] = useState([])
    const tableData = useMemo(() => props.tableData, [props.tableData])
    const tableColumns = useMemo(() => props.tableColumns, [props.tableColumns])

    const navigate = useNavigate()

    const defaultColumn = useMemo(
        () => ({
            flex: 1,
            sortable: true,
            suppressFiltersToolPanel: true,
            filter: true,
            floatingFilter: true
        }),
        []
    )

    const getRowId = useCallback(
        (params) => {
            return props.calledFrom === 'users'
                ? params.data.GSS_identification
                : params.data.id
        },
        [props.calledFrom]
    )

    return (
        <div className='tableContainer'>
            <TableHeader
                openAddForm={props.openAddForm}
                openEditForm={() => {
                    const items = []
                    if (items.length !== 1) {
                        toast.remove()
                        toast.error(
                            'Један ред мора бити изабран за опцију ажурирања.'
                        )
                    } else props.openEditForm(items[0])
                }}
                calledFrom={props.calledFrom}
                deleteItems={() => {
                    if (selectedItems.length === 0) {
                        toast.remove()
                        toast.error(
                            'Један или више редова мора бити изабрано за опцију брисања.'
                        )
                    } else {
                        props.deleteItems(selectedItems)
                        setSelectedItems([])
                    }
                }}
            />
            <div className='ag-theme-alpine' style={{ height: 500 }}>
                <AgGridReact
                    getRowId={getRowId}
                    rowData={tableData}
                    columnDefs={tableColumns}
                    rowSelection='multiple'
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    onSelectionChanged={(e) => {
                        setSelectedItems(
                            e.api
                                .getSelectedRows()
                                .map((row) => row.GSS_identification)
                        )
                    }}
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
