// libraries
import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from 'react-router-dom'

// hooks
import { useUnloadConditionally } from '../hooks/useUnloadConditionally'

// components
import { FilterHeader } from './filterHeader'
import { PaginationHeader } from './paginationHeader'

// css
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'

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

    useUnloadConditionally(() => {
        props.setSearchInput({ search: '' })
        props.setPageSize({ pageSize: 30 })
        props.setStartId({ startId: '1' })
        props.setOperator({ operator: 'gte' })
        if (props.calledFrom === 'users') props.setSearchFilters({ search: '' })
        else if (props.calledFrom === 'questions') {
            props.setDifficultyFilters({ search: 'све' })
            props.setImportanceFilters({ search: 'све' })
        } else if (props.calledFrom === 'answers') {
            props.setCorrectnessFilters({ correctness: 'оба' })
        }
    }, true)

    return (
        <>
            <PaginationHeader
                calledFrom={props.calledFrom}
                api={api}
                deleteItems={props.deleteItems}
                openAddForm={props.openAddForm}
                openEditForm={props.openEditForm}
                setPage={props.setPage}
                setPageSize={props.setPageSize}
                page={props.page}
                pageSize={props.pageSize}
                itemsCount={props.itemsCount}
            />
            <FilterHeader
                setPage={props.setPage}
                setSearchInput={props.setSearchInput}
                searchFields={props.searchFields}
                setStartId={props.setStartId}
                setOperator={props.setOperator}
            />
            <div className='ag-theme-alpine'>
                <AgGridReact
                    columnDefs={tableColumns}
                    domLayout='autoHeight'
                    rowSelection='multiple'
                    suppressRowClickSelection={true}
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    overlayNoRowsTemplate={`<label style='font-size:1.1rem'>${props.noRowsMessage}</label>`}
                    rowData={tableData}
                    onGridReady={(e) => setApi(e.api)}
                    onCellClicked={(e) => {
                        const state =
                            props.calledFrom === 'questions'
                                ? {
                                      questionText: e.data.question_text,
                                      difficulty: e.data.difficulty,
                                      importance: e.data.importance
                                  }
                                : null
                        const location =
                            props.calledFrom === 'users'
                                ? `/userResults/${e.data.GSS_identification}`
                                : props.calledFrom === 'questions'
                                ? `/questionDetails/${e.data.id}`
                                : null
                        if (location !== null)
                            navigate(location, { state: state })
                    }}
                />
            </div>
        </>
    )
}
