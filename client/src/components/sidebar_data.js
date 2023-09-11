import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsQuestionOctagonFill } from 'react-icons/bs'
import { RiMedicineBottleFill, RiBook2Fill, RiBookOpenFill } from 'react-icons/ri'
import { BiSolidBookmarkAltPlus } from 'react-icons/bi'

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
    title: 'Области',
    collapsedIcon: <RiBook2Fill />,
    expandedIcon: <RiBookOpenFill />,
    cName: 'side-text',
    children: [
      {
        title: 'Додај нову област',
        path: '/addArea',
        icon: <BiSolidBookmarkAltPlus />,
        cName: 'side-text'
      },
      {
        title: 'Прегледај све области',
        path: '/getAllAreas',
        icon: <RiMedicineBottleFill />,
        cName: 'side-text'
      }
    ]
  }
]