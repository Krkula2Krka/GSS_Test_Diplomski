// libraries
import React, { Fragment, useEffect, useState } from 'react'

// css
import '../css/quiz.css'

// icons
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

export const Quiz = ({ questions, save, logoutForTesting, addResult, id }) => {
    const [index, setIndex] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [answerId, setAnswerId] = useState(0)
    const [testDone, setTestDone] = useState(0)
    const [minutes, setMinutes] = useState(30)
    const [seconds, setSeconds] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes > 0) {
                setSeconds(59)
                setMinutes(minutes - 1)
            }
            if (seconds > 0) setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds])

    useEffect(() => {
        questions.forEach((question) => {
            localStorage.removeItem(question.id)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const countCorrectAnswers = () => {
        let result = 0
        questions.forEach((question) => {
            if (localStorage.getItem(question.id) !== null) {
                question.answers.forEach((answer) => {
                    if (
                        answer.id ===
                            Number(localStorage.getItem(question.id)) &&
                        answer.correctness
                    )
                        result++
                })
            }
        })
        return result
    }

    const saveResults = () => {
        if (save) {
            const pointsAcquired = countCorrectAnswers()
            const result = []
            questions.forEach((question) => {
                const answer_id = Number(localStorage.getItem(question.id))
                let answer_text = 'Није одговорио на питање'
                let correctness = false
                question.answers.forEach((answer) => {
                    if (answer.id === answer_id) {
                        answer_text = answer.answer_text
                        correctness = answer.correctness
                    }
                })
                localStorage.getItem(question.id) !== null
                    ? result.push({
                          question_id: question.id,
                          question_text: question.question_text,
                          answer_id: answer_id,
                          answer_text: answer_text,
                          correctness: correctness
                      })
                    : result.push({
                          question_id: question.id,
                          question_text: question.question_text,
                          answer_id: null,
                          answer_text: answer_text,
                          correctness: correctness
                      })
            })
            const newResult = {
                points_acquired: pointsAcquired,
                test_passed: pointsAcquired > 15,
                questions_answers: JSON.stringify(result),
                date_of_application: new Date(),
                user_id: id
            }
            addResult(newResult)
        }
    }

    return (
        <div className='quiz-container centered'>
            {testDone === 0 ? (
                <>
                    {seconds < 10 ? (
                        <span>{minutes + ' : 0' + seconds}</span>
                    ) : (
                        <span>{minutes + ' : ' + seconds}</span>
                    )}
                    <br />
                </>
            ) : null}
            <span>{index + 1 + ' / ' + questions.length}</span> <br />
            <h2 className='quiz-h2'>{questions[index].question_text}</h2>
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
                        disabled={
                            testDone === 1 || (minutes === 0 && seconds === 0)
                                ? true
                                : false
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
                    <label className='quiz-label' htmlFor={answer.id}>
                        {answer.answer_text}
                    </label>
                    {testDone === 1 ? (
                        <>
                            {answer.correctness === true ? (
                                <>
                                    {' '}
                                    <FaCheck color='#0BFC03' />
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <ImCross color='red' />
                                </>
                            )}
                        </>
                    ) : null}
                    <br />
                </Fragment>
            ))}
            <br />
            {testDone === 1 ? (
                <>
                    <h2 className='quiz-h2'>
                        Освојили сте {correctAnswers} / 30 поена
                    </h2>
                    <br />
                </>
            ) : null}
            <div className='quiz-buttons'>
                {questions.map((_, index) => (
                    <button
                        key={index}
                        className='quiz-button'
                        onClick={() => setIndex(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <br />
            <div className='end-button-wrapper'>
                {testDone === 0 ? (
                    <button
                        className='end-button'
                        onClick={() => {
                            const count = countCorrectAnswers()
                            setCorrectAnswers(count)
                            saveResults()
                            setTestDone(1)
                            setMinutes(0)
                            setSeconds(0)
                        }}
                    >
                        заврши и види резултате
                    </button>
                ) : (
                    <button
                        className='end-button'
                        onClick={() => {
                            logoutForTesting()
                            window.close()
                        }}
                    >
                        изађи
                    </button>
                )}
            </div>
        </div>
    )
}
