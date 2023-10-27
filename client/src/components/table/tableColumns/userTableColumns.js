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
