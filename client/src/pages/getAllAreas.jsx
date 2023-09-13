// libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getAllAreasQuery } from './queries/areaQueries'

// css
import './css/getAllAreas.css'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'

// components
import { AddArea } from '../components/addArea'

// queries
import { deleteAreaMutation } from './queries/areaQueries'

export const GetAllAreas = () => {
  const [deleteButtonId, setDeleteButtonId] = useState(0)

  const queryClient = useQueryClient()

  const { data: areas } = useQuery(getAllAreasQuery())

  const { mutateAsync: deleteArea } = useMutation(
    deleteAreaMutation(queryClient)
  )

  return (
    <div>
      <div className='areas'>
        <div className='container'>
          <div className='row'>
            {areas.map((area, key) => {
              return (
                <div className='col-sm-12 col-md-6 col-lg-4' key={key}>
                  <div>
                    {deleteButtonId !== area.id ? (
                      <div className='area'>
                        <h1 className='areaName'>{area.area_name}</h1>
                        <div className='areaButtons'>
                          <button className='areaButton'>
                            <AiFillEdit />
                          </button>
                          <button
                            onClick={() => setDeleteButtonId(area.id)}
                            //onClick={ async () =>  await deleteArea(area.id)}
                            className='areaButton'
                          >
                            <RiDeleteBin6Fill />
                          </button>
                          <Link
                            to={`/areaDetails/${area.id}`}
                            className='areaButton'
                          >
                            <FaQuestion />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='confirmDeleteArea'>
                        <h1 className='areaName'>Да ли сте сигурни?</h1>
                        <h6 className='areaMessage'>
                          Брисањем ове области обрисаћете сва питања везана за
                          ову област и све њихове одговаре.
                        </h6>
                        <div className='confirmButtons'>
                          <button
                            onClick={ async () =>  await deleteArea(area.id)}
                            className='areaButton'
                          >
                            <BsFillCheckCircleFill />
                          </button>
                          <button
                            onClick={() => setDeleteButtonId(0)}
                            className='areaButton'
                          >
                            <RxCrossCircled />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <AddArea />
    </div>
  )
}
