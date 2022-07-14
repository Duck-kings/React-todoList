import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { setData } from "../lib/firebase";

export function Form({setTodos}) {
    let [state, setState] = React.useState('');

    const handleClick = () => {
        let todo = {
            id: uuidv4(),
            completed: false,
            text: state
        };

        setData(todo);
        setTodos(prev => [...prev, todo]);
        setState('');
    }

    const handleChande = (e) => {
        setState(e.target.value);
    }

    return(
        <form className="container__form">
            <input type="text" className="form__input" value={state} onChange={handleChande}/>
            <div className="form__btn" onClick={handleClick}>Create task</div>
        </form>
    )
}