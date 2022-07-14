import React from 'react'
import { BsFillTrashFill, BsCheckLg } from 'react-icons/bs';

export const ListItem = ({text, deleteItem, setCompleted, iscompleted}) => {
    return (
        <li className='list__item'>
            <label className='custom__check'>
                <input type="checkbox" 
                    className='check__input' 
                    onChange={setCompleted}
                />
                <span className='custom__check__ico'>
                    <BsCheckLg />
                </span>
            </label>
            <p className={iscompleted ? 'item__text completed' : 'item__text'}>{text}</p>
            <div onClick={deleteItem} className='list__item__remove'>
                <BsFillTrashFill />
            </div>
        </li>
    )
}
