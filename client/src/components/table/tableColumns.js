export const TableColumns = [
  {
    Header: 'ГСС број',
    accessor: 'GSS_identification'
  },
  {
    Header: 'Име',
    accessor: 'first_name'
  },
  {
    Header: 'Презиме',
    accessor: 'last_name'
  },
  {
    Header: 'Надимак',
    accessor: 'nickname'
  },
  {
    Header: 'Администратор',
    accessor: d => (d.admin ? <div>Да</div> : <div>Не</div>)
  },
  {
    Header: 'Супер администратор',
    accessor: d => (d.super_admin ? <div>Да</div> : <div>Не</div>)
  }
]