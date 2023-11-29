// libraries
import React from 'react'

// components
import { SaveResultsForm } from '../components/form/saveResultsForm'
import { ChangePassworfForm } from '../components/form/changePassworfForm'

export const Settings = () => {
    return (
        <div className='centered'>
            <ChangePassworfForm />
            <SaveResultsForm />
        </div>
    )
}
