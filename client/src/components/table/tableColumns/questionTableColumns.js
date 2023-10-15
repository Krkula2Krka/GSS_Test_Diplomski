export const QuestionTableColumns = [
  {
    Header: 'Питање',
    accessor: 'question_text'
  },
  {
    Header: 'Тежина питања',
    accessor: d =>
      d.difficulty === 'tesko' ? (
        <div>Тешко</div>
      ) : d.difficulty === 'srednje' ? (
        <div>Средње</div>
      ) : (
        <div>Лако</div>
      )
  },
  {
    Header: 'Важност питања',
    accessor: d =>
      d.importance === 'bitno' ? (
        <div>Битно</div>
      ) : d.importance === 'srednje' ? (
        <div>Средње</div>
      ) : (
        <div>Мање</div>
      )
  }
]
