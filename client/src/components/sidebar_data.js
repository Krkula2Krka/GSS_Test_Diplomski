import React from 'react'
import { AiFillHome, AiOutlineMedicineBox } from 'react-icons/ai'
import { BsQuestionOctagonFill } from 'react-icons/bs'
import { RiMedicineBottleFill } from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Почетна страна',
    path: '/',
    icon: <AiFillHome />,
    cName: 'side-text'
  },
  {
    title: 'Прегледај све области',
    path: '/getAllAreas',
    icon: <RiMedicineBottleFill />,
    cName: 'side-text'
  },
  {
    title: 'Додај нову област',
    path: '/addArea',
    icon: <AiOutlineMedicineBox />,
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
    icon: <BsQuestionOctagonFill />,
    cName: 'side-text',
    children: [
      {
        title: 'Додај нову област',
        path: '/addArea',
        icon: <AiOutlineMedicineBox />,
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
