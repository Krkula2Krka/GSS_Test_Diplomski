export const QuestionTableColumns = [
    {
        Header: 'питање',
        accessor: 'question_text'
    },
    {
        Header: 'тежина питања',
        accessor: (d) =>
            d.difficulty === 'tesko' ? (
                <div>тешко</div>
            ) : d.difficulty === 'srednje' ? (
                <div>средње</div>
            ) : (
                <div>лако</div>
            )
    },
    {
        Header: 'важност питања',
        accessor: (d) =>
            d.importance === 'bitno' ? (
                <div>битно</div>
            ) : d.importance === 'srednje' ? (
                <div>средње</div>
            ) : (
                <div>мање</div>
            )
    }
]
