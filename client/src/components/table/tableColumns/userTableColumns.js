import { memo } from 'react'

export const UserTableColumns = [
    {
        Header: 'ГСС број',
        accessor: 'GSS_identification'
    },
    {
        Header: 'име',
        accessor: 'first_name'
    },
    {
        Header: 'презиме',
        accessor: 'last_name'
    },
    {
        Header: 'надимак',
        accessor: 'nickname'
    },
    {
        Header: 'тип корисника',
        id: 'user_type',
        accessor: (d) =>
            d.user_type === 'user' ? (
                <div>корисник</div>
            ) : d.user_type === 'admin' ? (
                <div>администратор</div>
            ) : (
                <div>супер администартор</div>
            )
    }
]

export const UserTableColumnsAgGrid = [
    {
        field: 'GSS_identification',
        headerName: 'ГСС број',
        filter: true
    },
    {
        field: 'first_name',
        headerName: 'име',
        filter: true
    },
    {
        field: 'last_name',
        headerName: 'презиме',
        filter: true
    },
    {
        field: 'nickname',
        headerName: 'надимак',
        filter: true
    },
    {
        field: 'user_type',
        headerName: 'тип корисника',
        filter: true,
        cellRenderer: memo((params) => {
            return params.value === 'user' ? (
                <label className='table-data'>корисник</label>
            ) : params.value === 'admin' ? (
                <label className='table-data'>администратор</label>
            ) : (
                <label className='table-data'>супер администратор</label>
            )
        })
    }
]
