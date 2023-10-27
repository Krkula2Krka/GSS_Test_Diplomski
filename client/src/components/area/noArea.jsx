// libraries
import React, { useState } from 'react'

// components
import { AddArea } from './addArea'

export const NoArea = () => {
    const [buttonClicked, setButtonClicked] = useState(false)

    return (
        <div className="centered">
            <h1>
                У бази тренутно нема ниједна област. Кликните{' '}
                <button
                    onClick={() => setButtonClicked(true)}
                    className="noAreaButton"
                >
                    овде
                </button>{' '}
                да додате област!
            </h1>
            <div className="centeredHorizontal">
                {buttonClicked ? (
                    <AddArea
                        buttonPressed={200}
                        resetState={() => setButtonClicked(false)}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
