// libraries
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// queries
import { getAllAreasQuery } from './queries/areaQueries'

// css
import './css/getAllAreas.css'

// icons
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'

// components
import { AddArea } from '../components/addArea'

// queries
import { deleteAreaMutation } from './queries/areaQueries'

export const GetAllAreas = () => {

  const navigate = useNavigate()

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
                <div className='col-sm-12 col-md-6 col-lg-4'>
                  <div className='area' key={key}>
                    <h1 className='areaName'>{area.area_name}</h1>
                    <div className='areaButtons'>
                      <button className='areaButton'>
                        <AiFillEdit />
                      </button>
                      <button 
                        onClick={ async () =>  await deleteArea(area.id)}
                        className='areaButton'>
                        <RiDeleteBin6Fill />
                      </button>
                      <button
                        onClick={() => navigate(`/areaDetails/${area.id}`)}
                        className='areaButton'
                      >
                        <FaQuestion />
                      </button>
                    </div>
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
