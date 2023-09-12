import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsQuestionOctagonFill } from 'react-icons/bs'
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
    title: 'Додај ново питање',
    path: '/addQuestion',
    icon: <BsQuestionOctagonFill />,
    cName: 'side-text'
  },
  {
    title: 'Литература',
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