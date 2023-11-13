// libraries
import React, { Fragment, useState } from 'react'

// css
import '../../css/quiz.css'

export const Quiz = ({ questions }) => {
    const [index, setIndex] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [answerId, setAnswerId] = useState(0)

    return (
        <div className='quiz-container'>
            <span>{index + 1 + ' / ' + questions.length}</span>
            <br />
            <h2>{questions[index].question_text}</h2>
            <br />
            {questions[index].answers.map((answer) => (
                <Fragment key={answer.id}>
                    <input
                        type='radio'
                        id={answer.id}
                        name='quiz_questions'
                        checked={
                            Number(
                                localStorage.getItem(questions[index].id)
                            ) === answer.id
                                ? true
                                : null
                        }
                        value={answer.answer_text}
                        onClick={() => {
                            const answer_id = localStorage.getItem(
                                questions[index].id
                            )
                            if (answer_id !== null && answer_id !== answer.id) {
                                localStorage.removeItem(questions[index].id)
                                localStorage.setItem(
                                    questions[index].id,
                                    answer.id
                                )
                                setAnswerId(answer.id)
                            } else {
                                localStorage.setItem(
                                    questions[index].id,
                                    answer.id
                                )
                                setAnswerId(answer.id)
                            }
                        }}
                    />
                      <label htmlFor={answer.id}>{answer.answer_text}</label>
                    <br />
                </Fragment>
            ))}
            <br />
            {questions.map((question, index) => (
                <button
                    className='quiz-button'
                    value={question.id}
                    onClick={() => setIndex(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}
