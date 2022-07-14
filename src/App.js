import React from 'react';
import { Form } from './components/Form.jsx';
import { ListItem } from './components/ListItem.jsx'; 
import { getData, deleteOne } from './lib/firebase.js';

export function App() {
    let [items, setItems] = React.useState([]);

    React.useEffect(() => {
        getData().then(res => {
            setItems(prev => {
                return [...prev, ...res];
            });
        })
    }, []);

    const deleteItem = (index) => {
        setItems(() => {
            let filtred = items.filter((_, i) => i !== index);
            deleteOne(filtred);
            return filtred;
        });
    };

    const setCompleted = (index) => {
        setItems(() => {
            let completed = items.map((el, i) => {
                if(i === index){
                    el.completed = !el.completed;
                }
        
                return el;
            });

            deleteOne(completed.filter(el => el.completed !== true));
            return completed;
        });
    };

    return(
        <div className='container'>
            <Form  setTodos={setItems}/>
            <ul className='container__list'>
                {
                    items.length 
                    ? items.map((item, index) => {
                        return <ListItem key={item.id} text={item.text} 
                        deleteItem={() => deleteItem(index)}
                        setCompleted={() => setCompleted(index)}
                        iscompleted={item.completed}
                    />
                    })
                    : <li className="list__item">You don't have any tasks yet!</li>
                }
            </ul>
        </div>
    );
}