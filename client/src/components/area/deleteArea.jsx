// libraries
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// icons
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// css
import '../../css/getAllAreas.css'

// queries
import { deleteAreaMutation } from '../../queries/areaQueries'

export const DeleteArea = (props) => {
    const queryClient = useQueryClient()

    const { mutateAsync: deleteArea } = useMutation(
        deleteAreaMutation(queryClient)
    )

    return (
        <div className='confirmDeleteOrEditArea'>
            <h1 className='areaConfirmQuestion'>Да ли сте сигурни?</h1>
            <h5 className='areaMessage'>
                Брисањем ове области обрисаћете сва питања везана за ову област
                и све њихове одговаре.
            </h5>
            <div class='confirm-buttons-container'>
                <div className='confirmButtons'>
                    <button
                        onClick={async () => await deleteArea(props.id)}
                        className='confirm-button'
                    >
                        <BsFillCheckCircleFill />
                    </button>
                    <button
                        onClick={props.setDeleteState}
                        className='confirm-button'
                    >
                        <RxCrossCircled />
                    </button>
                </div>
            </div>
        </div>
    )
}
