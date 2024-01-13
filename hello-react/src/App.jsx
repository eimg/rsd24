import { useState } from "react"

export default function App() {
    const [list, setList] = useState([
        { _id: 1, subject: 'Apple', done: false },
        { _id: 2, subject: 'Orange', done: true },
        { _id: 3, subject: 'Mango', done: false },
    ]);

    const add = () => {
        const _id = list[list.length - 1]._id + 1;
        setList([...list, { _id, subject: 'Add' }]);
    }

    return <div role='main'>
        <h1>Hello React</h1>
        <button onClick={add}>Button</button>
        <ul>
            {list.map(item => {
                return <li key={item._id}>
                    {item.subject}
                </li>
            })}
        </ul>
    </div>
}
