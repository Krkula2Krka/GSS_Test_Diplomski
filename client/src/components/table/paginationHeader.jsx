// libraries
import React from 'react'
import toast from 'react-hot-toast'

// css
import '../../css/table.css'

// icons
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ImPlus } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai'
import { BiChevronsRight } from 'react-icons/bi'
import { BiChevronsLeft } from 'react-icons/bi'

export const PaginationHeader = (props) => {
    return (
        <div className='header'>
            <button
                className='userButton'
                onClick={() => {
                    const selectedItems =
                        props.calledFrom === 'users'
                            ? props.api
                                  .getSelectedRows()
                                  .map((row) => row.GSS_identification)
                            : props.api.getSelectedRows().map((row) => row.id)
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
                            ? props.api
                                  .getSelectedRows()
                                  .map((row) => row.GSS_identification)
                            : props.api.getSelectedRows().map((row) => row.id)
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
            {props.page +
                1 +
                ' / ' +
                Math.ceil(
                    props.itemsCount / props.pageSize !== 0
                        ? props.itemsCount / props.pageSize
                        : 1
                )}
            <button
                className='userButton'
                onClick={() => {
                    props.setPage(props.page + 1)
                }}
                disabled={(props.page + 1) * props.pageSize >= props.itemsCount}
            >
                <BiChevronsRight />
            </button>
        </div>
    )
}
