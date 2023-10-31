// libraries
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AgGridReact } from 'ag-grid-react'

// css
import '../../css/table.css'
import 'ag-grid-community/styles//ag-grid.css'
import 'ag-grid-community/styles//ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom'

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
            suppressFiltersToolPanel: true,
            filter: true,
            floatingFilter: true,
            cellStyle: { color: '#F5F5F5', backgroundColor: '#060B26' }
        }),
        []
    )

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
                        const items = []
                        if (items.length !== 1) {
                            toast.remove()
                            toast.error(
                                'Један ред мора бити изабран за опцију ажурирања.'
                            )
                        } else props.openEditForm(items[0])
                    }}
                >
                    <AiFillEdit />
                </button>
                <select>
                    <option value='1'>1</option>
                    <option value='5'>5</option>
                    <option value='20'>20</option>
                    <option value='30'>30</option>
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
                    disabled={(props.page + 1) * 5 >= props.usersCount}
                >
                    <BiChevronsRight />
                </button>
            </div>
            <div className='ag-theme-alpine'>
                <AgGridReact
                    columnDefs={tableColumns}
                    domLayout='autoHeight'
                    rowSelection='multiple'
                    defaultColDef={defaultColumn}
                    animateRows={true}
                    rowData={tableData}
                    onGridReady={(e) => {
                        console.log(e)
                        setApi(e.api)
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
