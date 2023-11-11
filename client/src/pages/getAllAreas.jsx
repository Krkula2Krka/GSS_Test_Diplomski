// libraries
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// queries
import { getAllAreasQuery } from '../queries/areaQueries'

// css
import '../css/getAllAreas.css'

// components
import { AddArea } from '../components/area/addArea'
import { EditArea } from '../components/area/editArea'
import { Area } from '../components/area/area'
import { DeleteArea } from '../components/area/deleteArea'
import { NoArea } from '../components/area/noArea'
import { ErrorData } from '../utils/error/errorData'
import { LoadingData } from '../utils/loadingData'

export const GetAllAreas = () => {
    const [stateButton, setStateButton] = useState(0)

    const {
        data: areas,
        isLoading,
        isError,
        isFetching
    } = useQuery(getAllAreasQuery())

    const areasWithDummyData = [...areas.data]
    if (areas.data.length !== 0)
        areasWithDummyData.push({ id: -1, area_name: 'dummy' })

    if (isLoading || isFetching) return <LoadingData />
    if (isError) return <ErrorData />

    if (areasWithDummyData.length === 0) return <NoArea />

    return (
        <div className='areas'>
            {areasWithDummyData.map((area, key) => {
                return (
                    <div key={key}>
                        {area.id > 0 ? (
                            stateButton !==
                                key + 1 + areasWithDummyData.length &&
                            stateButton !== key + 1 ? (
                                <Area
                                    setEditState={() => setStateButton(key + 1)}
                                    setDeleteState={() =>
                                        setStateButton(
                                            areasWithDummyData.length + key + 1
                                        )
                                    }
                                    areaName={area.area_name}
                                    id={area.id}
                                />
                            ) : stateButton > areasWithDummyData.length ? (
                                <DeleteArea
                                    id={area.id}
                                    setDeleteState={() => setStateButton(0)}
                                />
                            ) : (
                                <EditArea
                                    id={area.id}
                                    resetState={() => setStateButton(0)}
                                />
                            )
                        ) : (
                            <AddArea
                                buttonPressed={stateButton}
                                setAddNewAreaState={() => setStateButton(-1)}
                                resetState={() => setStateButton(0)}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
