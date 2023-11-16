// libraries
import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from 'react-router-dom'

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
                calledFrom={props.calledFrom}
            />
            <div className='ag-theme-alpine'>
                <AgGridReact
                    columnDefs={tableColumns}
                    domLayout='autoHeight'
                    rowSelection='multiple'
                    suppressRowClickSelection={true}
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    overlayNoRowsTemplate={`<label>${props.noRowsMessage}</label>`}
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
                                : props.calledFrom === 'users'
                                ? {
                                      first_name: e.data.first_name,
                                      last_name: e.data.last_name,
                                      nickname: e.data.nickname
                                  }
                                : props.calledFrom === 'results'
                                ? {
                                      id: e.data.user_id
                                  }
                                : null
                        const location =
                            props.calledFrom === 'users'
                                ? `/userResults/${e.data.GSS_identification}`
                                : props.calledFrom === 'questions'
                                ? `/questionDetails/${e.data.id}`
                                : props.calledFrom === 'results'
                                ? `/testResult/${e.data.id}`
                                : null
                        if (location !== null)
                            navigate(location, { state: state })
                    }}
                />
            </div>
        </>
    )
}
