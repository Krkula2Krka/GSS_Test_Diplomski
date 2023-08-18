import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'



export const SidebarData = [
    {
        title: 'Почетна страна',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Прегледај све области',
        path: '/getAllAreas',
        icon: <RiIcons.RiMedicineBottleFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Додај нову област',
        path: '/addArea',
        icon: <AiIcons.AiOutlineMedicineBox/>,
        cName: 'nav-text'
    },
    {
        title: 'Додај ново питање',
        path: '/addQuestion',
        icon: <BsIcons.BsQuestionOctagonFill/>,
        cName: 'nav-text'
    }
]