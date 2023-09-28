// css
import '../../css/getAllUsers.css'

// icons
import { AiFillEdit } from 'react-icons/ai'

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
    Header: 'Дугмићи',
    Cell: () => (
      <button className='userButton'>
        <AiFillEdit />
      </button>
    )
  }
]
