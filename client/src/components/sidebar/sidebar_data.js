import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { RiBook2Fill, RiBookOpenFill } from 'react-icons/ri'
import { GiNotebook } from 'react-icons/gi'

export const SidebarData = [
  {
    title: 'Почетна страна',
    path: '/',
    icon: <AiFillHome />,
    cName: 'side-text'
  },
  {
    title: 'База',
    collapsedIcon: <RiBook2Fill />,
    expandedIcon: <RiBookOpenFill />,
    cName: 'side-text',
    children: [
      {
        title: 'Преглед свих области',
        path: '/getAllAreas',
        icon: <GiNotebook />,
        cName: 'side-text'
      }
    ]
  }
]