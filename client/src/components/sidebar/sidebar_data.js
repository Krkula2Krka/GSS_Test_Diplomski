import React from 'react'
import { GiNotebook } from 'react-icons/gi'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdInformationCircle } from 'react-icons/io'

export const SidebarData = [
    {
        id: 1,
        title: 'Преглед свих области',
        path: '/getAllAreas',
        icon: <GiNotebook />,
        cName: 'side-text'
    },
    {
        id: 2,
        title: 'Преглед свих корисника',
        path: '/getAllUsers',
        icon: <HiUserGroup />,
        cName: 'side-text'
    },
    {
        id: 3,
        title: 'Подешавања',
        path: '/settings',
        icon: <IoMdInformationCircle />,
        cName: 'side-text'
    }
]
