import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'



export const SidebarData = [
    {
        title: 'Почетна страна',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'side-text'
    },
    {
        title: 'Прегледај све области',
        path: '/getAllAreas',
        icon: <RiIcons.RiMedicineBottleFill/>,
        cName: 'side-text'
    },
    {
        title: 'Додај нову област',
        path: '/addArea',
        icon: <AiIcons.AiOutlineMedicineBox/>,
        cName: 'side-text'
    },
    {
        title: 'Додај ново питање',
        path: '/addQuestion',
        icon: <BsIcons.BsQuestionOctagonFill/>,
        cName: 'side-text'
    }
]