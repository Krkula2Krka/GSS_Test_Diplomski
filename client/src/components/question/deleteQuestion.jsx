// libraries
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/areaDetails.css'

// queries
import { deleteQuestionMutation } from '../../queries/questionQueries'

export const DeleteQuestion = props => {

  const queryClient = useQueryClient()

  const { mutateAsync: deleteQuestion } = useMutation(
    deleteQuestionMutation(queryClient, props.areaId)
  )

  return (
    <div className='confirmDeleteOrEditQuestion'>
      <h1 className='questionConfirmQuestion'>Да ли сте сигурни?</h1>
      <h6 className='questionMessage'>
        Брисањем овог питања обрисаћете све одговоре везане за ово питање.
      </h6>
      <div className='confirmButtons'>
        <button
          onClick={async () => await deleteQuestion(props.questionId)}
          className='questionButton'
        >
          <BsFillCheckCircleFill />
        </button>
        <button
          onClick={props.setDeleteState}
          className='questionButton'
        >
          <RxCrossCircled />
        </button>
      </div>
    </div>
  )
}