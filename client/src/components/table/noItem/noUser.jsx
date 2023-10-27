import React from 'react'
import { AddUser } from '../addItem/addUser'

export const NoUser = () => {
    return (
        <div>
            <h1 className="centeredHorizontal errorPageMessage">
                У бази тренутно нема корисника.
            </h1>
            <AddUser noBackButton={true} />
        </div>
    )
}
