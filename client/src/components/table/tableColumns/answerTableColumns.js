export const AnswerTableColumns = [
  {
    Header: 'Одговор',
    accessor: 'answer_text'
  },
  {
    Header: 'Тачност одговора',
    accessor: d => d.correctness === true ? <div>Да</div> : <div>Не</div>
  }
]
