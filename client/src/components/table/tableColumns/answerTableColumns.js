export const AnswerTableColumns = [
  {
    Header: 'одговор',
    accessor: 'answer_text'
  },
  {
    Header: 'тачност одговора',
    accessor: d => d.correctness === true ? <div>да</div> : <div>не</div>
  }
]
