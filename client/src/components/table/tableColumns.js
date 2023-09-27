// libraries
import { Link } from 'react-router-dom'

// css
import '../../css/getAllUsers.css'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaHandHoldingMedical } from 'react-icons/fa'

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
    Cell: ({ cell }) => (
      <div className='userButtons'>
        <button className='userButton'>
          <AiFillEdit />
        </button>
        <button className='userButton'>
          <RiDeleteBin6Fill />
        </button>
        <Link
          to={`/userResults/${cell.row.original.GSS_identification}`}
          className='userButton'
        >
          <FaHandHoldingMedical />
        </Link>
      </div>
    )
  }
]
