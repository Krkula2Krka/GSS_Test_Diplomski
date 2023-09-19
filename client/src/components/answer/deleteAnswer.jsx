// libraries
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/questionDetails.css'

// queries
import { deleteAnswerMutation } from '../../queries/answerQueries'

export const DeleteAnswer = props => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteAnswer } = useMutation(
    deleteAnswerMutation(queryClient, props.questionId)
  )

  return (
    <div className='confirmDeleteOrEditAnswer'>
      <h1 className='answerConfirmQuestion'>Да ли сте сигурни?</h1>
      <h6 className='questionMessage'>
        Брисањем овог питања обрисаћете све одговоре везане за ово питање.
      </h6>
      <div className='confirmButtons'>
        <button
          onClick={async () => await deleteAnswer(props.answerId)}
          className='questionButton'
        >
          <BsFillCheckCircleFill />
        </button>
        <button onClick={props.setDeleteState} className='questionButton'>
          <RxCrossCircled />
        </button>
      </div>
    </div>
  )
}
